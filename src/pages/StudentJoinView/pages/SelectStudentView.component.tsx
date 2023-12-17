import { useEffect, useState } from 'react';
import { Student } from '../../SchoolClassOverview/interfaces/student.interface';
import {
  ActivityIndicator,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BasicButton from '../../../components/BasicButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StudentJoinViewStack } from '../StudentJoinView.page';
import { useStudentJoinViewContext } from '../context/StudentJoinView.context';
import { AllStudentsTaken } from '../components/SelectStudentView/allStudentsTaken.component';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<StudentJoinViewStack, 'SelectStudent'>;

export function SelectStudentView({ navigation }: Props) {
  const { availableStudents, socket } = useStudentJoinViewContext();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    if (selectedStudent && !availableStudents.includes(selectedStudent)) {
      setSelectedStudent(null);
      Toast.show({
        type: 'info',
        text1: 'Student ist nicht mehr verfügbar!',
        text2: 'Der student wurde von einem anderen nutzer gewählt.',
      });
    }
  }, [availableStudents]);

  function isSelectedOrNull(student: Student): boolean {
    return !selectedStudent || student === selectedStudent;
  }

  return (
    <>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginTop: 100,
          alignItems: 'flex-start',
          alignSelf: 'center',
          height: '100%',
          width: '70%',
          gap: 20,
        }}
      >
        {/* Header */}
        <View style={{ alignSelf: 'flex-start' }}>
          <Text style={{ fontSize: 25, fontWeight: '600' }}>
            Wähle <Text style={{ fontWeight: '800' }}>deinen</Text> Namen aus
          </Text>
          <Text style={styles.subTitle}>
            Klicke deinen Namen an und bestätige deine Auswahl mit dem grünen
            Button unten...
          </Text>
        </View>
        {availableStudents === undefined ? (
          <View
            style={{
              width: '100%',
              height: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <ActivityIndicator size="large" />
            <Text style={[styles.subTitle, { fontSize: 18 }]}>
              Zur auswahl stehenden Student werden geladen...
            </Text>
          </View>
        ) : availableStudents.length === 0 ? (
          <View style={{ width: '100%', justifyContent: 'center' }}>
            <View style={[styles.container, { paddingVertical: 18 }]}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                Alle Studenten sind bereits belegt!
              </Text>
            </View>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{
              flexDirection: 'row',
              gap: 10,
              flexWrap: 'wrap',
            }}
          >
            {availableStudents?.map((student, i) => (
              <TouchableOpacity
                style={[
                  styles.container,
                  { opacity: isSelectedOrNull(student) ? 1 : 0.2 },
                ]}
                key={i}
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut,
                  );
                  setSelectedStudent(student);
                }}
              >
                <Text style={{ fontSize: 17, fontWeight: '500' }}>
                  {student.firstName} {student.lastName}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      {selectedStudent && (
        <View
          style={{
            position: 'absolute',
            bottom: 100,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <BasicButton
            color="#d2ead2"
            shadowColor="#d2ead2"
            icon="bookmark-outline"
            title="Bestätigen"
            onPress={() => {
              socket.emit(
                'selectStudent',
                selectedStudent._id,
                (response: any) => {
                  if (response['success'])
                    navigation.navigate('WaitingForStart');
                  else {
                    setSelectedStudent(null);
                    Toast.show({
                      type: 'info',
                      text1: 'Student ist nicht mehr verfügbar!',
                      text2:
                        'Der student wurde von einem anderen nutzer gewählt.',
                    });
                  }
                },
              );
            }}
            iconSize={20}
            containerStyle={{ width: '25%', paddingVertical: 10 }}
            textStyle={{ fontSize: 16 }}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  subTitle: { fontSize: 13, textAlign: 'center', color: '#545454' },
});
