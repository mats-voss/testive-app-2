import {
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTestSessionContext } from '../../context/testSession.context';
import { useEffect } from 'react';
import TagInput from '../../../../components/TagInput/TagInput';
import { useAppSelector } from '../../../../redux/reduxHooks';
import { getAllTags } from '../../../Library/redux/tags.slice';
import { Tag } from '../../../Library/interfaces/tag.interface';
import { SingleTagSelection } from './components/singleTagSelection.component';
import { TagCategory } from '../../../Library/interfaces/TagCategory.enum';
import { getAllClasses } from '../../../SchoolClassOverview/redux/schoolClass.slice';
import { SingleClassSelection } from './components/singleClassSelection.component';
import BasicButton from '../../../../components/BasicButton';
import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../../App';
import { TestInstanceStack } from '../../StartTestSession.page';
import { useAuth0 } from 'react-native-auth0';
import { CreateTestSessionData } from '../../types/createTestInstanceData.type';
import { CreateTestInstanceResponse } from '../../types/createTestInstanceReponse.type';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

type ComponentProps = {
  worksheetId: string;
  onNextPage: () => void;
};

export function InstanceDetails({ worksheetId, onNextPage }: ComponentProps) {
  const { getCredentials } = useAuth0();
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    socket,
    setWorksheetId,
    schoolClassId,
    setSchoolClassId,
    subjectTag,
    setSubjectTag,
    themeTag,
    setThemeTag,
    setSessionCode: setInstanceCode,
  } = useTestSessionContext();
  const tags = useAppSelector(getAllTags);
  const schoolClasses = useAppSelector(getAllClasses);

  function isAllSelected(): boolean {
    return (
      schoolClassId !== undefined &&
      subjectTag !== undefined &&
      themeTag !== undefined
    );
  }

  async function onStartRoom() {
    const accessToken = (await getCredentials()).accessToken;
    socket.emit(
      'createTestSession',
      {
        schoolClassId,
        worksheetId,
        subjectTag,
        themeTag,
        accessToken,
      } as CreateTestSessionData,
      (response: CreateTestInstanceResponse) => {
        console.log(response);
        if (response.success) {
          setInstanceCode(response.sessionCode);
          onNextPage();
        } else {
          Toast.show({
            type: 'error',
            text1: response?.error,
            text2: response?.message,
          });
        }
      },
    );
  }

  useEffect(() => {
    setWorksheetId(worksheetId);
  }, [worksheetId]);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          height: '100%',
          width: '100%',
          gap: 20,
        }}
      >
        {/* Header */}
        <View style={{ alignSelf: 'flex-start', gap: 20, width: '100%' }}>
          <View>
            <Text style={{ fontSize: 25, fontWeight: '600' }}>
              Lege die Sortierung der Testergebnisse fest
            </Text>
            <Text style={{ fontSize: 13, textAlign: 'left', color: '#545454' }}>
              Wähle hier die Klasse, das Fach und das Thema des Testes aus um
              sie später in der gewünschten Notenübersicht zu sehen
            </Text>
          </View>

          <View style={styles.card}>
            <SingleClassSelection
              header="Mit welcher Klasse schreibst du den Test?"
              subHeader="Durch die auswahl der Klasse legst du fest welche Schüler diesen Test schreiben können und wo die Ergebnisse des Tests später gespeichert werden"
              schoolClasses={schoolClasses}
              onSchoolClassSelect={(schoolClass) =>
                setSchoolClassId(schoolClass._id!)
              }
              selectedSchoolClass={schoolClasses.find(
                (fSchoolClass) => fSchoolClass._id === schoolClassId,
              )}
            />
          </View>

          <View style={styles.card}>
            <SingleTagSelection
              header="In welchem Fach schreibst du den Test?"
              subHeader="Mit der Auswahl des Fachs bestimmst du unter welchem Fach, inerhalb der oben ausgewählten Klasse, die Ergebnisse des Tests gespeichert werden."
              onTagSelect={(tag) => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );
                setSubjectTag(tag);
              }}
              tags={tags.filter(
                (filterTag) => filterTag.category === TagCategory.SUBJECT,
              )}
              selectedTag={subjectTag}
            />
          </View>

          <View style={styles.card}>
            <SingleTagSelection
              header="Zu welchem Thema schreibst du den Test?"
              subHeader="Die auswahl des Themas wird bestimmt unter welchem Theme die Ergebnisse später zum Notendurchschnit zählen."
              onTagSelect={(tag) => setThemeTag(tag)}
              tags={tags.filter(
                (filterTag) => filterTag.category === TagCategory.THEME,
              )}
              selectedTag={themeTag}
            />
          </View>
        </View>
      </ScrollView>
      {isAllSelected() && (
        <View
          style={{
            position: 'absolute',
            bottom: 75,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <BasicButton
            color="#c5ebc5"
            shadowColor="#afe8af"
            icon="lock-open-outline"
            title="Test-Raum eröffnen" // TODO: Besseren Header!
            onPress={async () => await onStartRoom()}
            iconSize={20}
            containerStyle={{ paddingHorizontal: 70, paddingVertical: 10 }}
            textStyle={{ fontSize: 16 }}
          />
        </View>
      )}
      {/* <TouchableOpacity
        onPress={() => rootNavigation.goBack()}
        style={{
          position: 'absolute',
          top: 50,
          left: 25,
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center',
        }}
      >
        <Icon name="arrow-back-circle-outline" size={25} color={'#3d3d3d'} />
        <Text style={{ fontWeight: '700', color: '#3d3d3d' }}>Zurück</Text>
      </TouchableOpacity> */}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 0.5,
    borderColor: '#ccc',
    gap: 30,
    padding: 30,
    borderRadius: 20,
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
});
