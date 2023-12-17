import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Icon from 'react-native-vector-icons/Ionicons';
import BasicButton from '../../../../components/BasicButton';
import { useTestSessionContext } from '../../context/testSession.context';
import { SessionStudent } from '../../types/sessionStudent.type';

export function ActiveTestSession() {
  const { socket, sessionCode, sessionStudents, connectedClients } =
    useTestSessionContext();
  const [selectedSessionStudent, setSelectedSessionStudent] =
    useState<SessionStudent>();
  const [isSessionStarted, setIsSessionStarted] = useState(false);

  function isSelected(sessionStudent: SessionStudent): boolean {
    return selectedSessionStudent === sessionStudent;
  }

  return (
    <>
      <View
        style={{
          paddingTop: 40,
          width: '90%',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {/* Header */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View></View>

          <View style={styles.multiTextContainer}>
            <Text style={styles.headerText}>
              Verbundene Ipads ohne auswahl:
            </Text>
            <Text
              style={[styles.headerText, { fontWeight: '700', fontSize: 16 }]}
            >
              {connectedClients}
            </Text>
          </View>
        </View>

        {/* Main Content */}
        <View
          style={{
            gap: 20,
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Code Header */}
          <View style={{ gap: -15 }}>
            {isSessionStarted ? (
              <Text
                style={{
                  fontSize: 60,
                  fontWeight: '800',
                  color: '#428248',
                }}
              >
                Test Läuft
              </Text>
            ) : (
              <>
                <Text
                  style={{
                    fontSize: 60,
                    fontWeight: '800',
                    letterSpacing: 15,
                  }}
                >
                  {sessionCode}
                </Text>
                <Text style={[styles.headerText, { fontSize: 16 }]}>
                  Session Code
                </Text>
              </>
            )}
          </View>

          {/* Student List */}
          <View
            style={{
              width: '100%',
              justifyContent: 'flex-start',
              gap: 5,
            }}
          >
            <Text style={{ fontWeight: '500', fontSize: 20 }}>
              Schüler Liste
            </Text>

            {/* Student List Container */}
            <View
              style={{
                width: '100%',
                flexWrap: 'wrap',
                flexDirection: 'row',
                gap: 20,
              }}
            >
              {/* Student Container */}
              {sessionStudents?.map((sessionStudent) => (
                <TouchableOpacity
                  onPress={() => {
                    if (isSelected(sessionStudent))
                      setSelectedSessionStudent(undefined);
                    else setSelectedSessionStudent(sessionStudent);
                  }}
                  style={[
                    styles.card,
                    {
                      borderColor: isSelected(sessionStudent) ? '#000' : '#ccc',
                      shadowOpacity: isSelected(sessionStudent) ? 0.2 : 0.05,
                      margin: isSelected(sessionStudent) ? 15 : 0,
                      alignSelf: 'flex-start',
                    },
                  ]}
                  key={sessionStudent.socketId}
                >
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      gap: 8,
                      alignItems: 'center',
                    }}
                  >
                    <Icon
                      name="checkmark-done-circle"
                      color={'#078a05'}
                      size={25}
                    />
                    <Text style={{ fontWeight: '600', fontSize: 22 }}>
                      {sessionStudent.student.firstName}{' '}
                      {sessionStudent.student.lastName}
                    </Text>
                  </View>
                  <Text>
                    IPad-Name: "{sessionStudent.deviceNickname || 'Unknown'}"
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Footer */}
        <View></View>
      </View>
      {selectedSessionStudent && (
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 75,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={[
              styles.card,
              {
                width: undefined,
                flexDirection: 'row',
                gap: 15,
              },
            ]}
          >
            <BasicButton
              color="#fbb7a7"
              shadowColor="#fbb7a7"
              icon="close-circle"
              title="Enfernen"
              onPress={() => null}
              iconSize={20}
            />
            <BasicButton
              color="#fbcea7"
              shadowColor="#fbcea7"
              icon="lock-closed"
              title="Sperren"
              onPress={() => null}
              iconSize={20}
            />
          </View>
        </View>
      )}
      {sessionStudents.length >= 1 && (
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            right: 60,
          }}
        >
          {isSessionStarted ? (
            <BasicButton
              color="#e0fba7"
              shadowColor="#e0fba7"
              icon="bookmarks"
              title="Test Beenden"
              containerStyle={{ width: 200 }}
              onPress={() => {
                socket?.emit(
                  'finishTest',
                  sessionCode,
                  (response: { success: boolean }) => {
                    if (response.success) {
                      setIsSessionStarted(true);
                      Toast.show({
                        type: 'success',
                        text1: 'Test Gestarted',
                        text2: 'Test wurde erfolgreich gestarted.',
                      });
                    }
                  },
                );
              }}
              iconSize={20}
            />
          ) : (
            <BasicButton
              color="#b8fba7"
              shadowColor="#b8fba7"
              icon="send"
              title="Test Starten"
              containerStyle={{ width: 200 }}
              onPress={() => {
                socket?.emit(
                  'startTest',
                  sessionCode,
                  (response: { success: boolean }) => {
                    if (response.success) {
                      setIsSessionStarted(true);
                      Toast.show({
                        type: 'success',
                        text1: 'Test Gestarted',
                        text2: 'Test wurde erfolgreich gestarted.',
                      });
                    }
                  },
                );
              }}
              iconSize={20}
            />
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  multiTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  headerText: { fontWeight: '500', color: '#3d3d3d' },
  card: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 0.5,
    borderColor: '#ccc',
    paddingHorizontal: 30,
    paddingVertical: 20,
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
