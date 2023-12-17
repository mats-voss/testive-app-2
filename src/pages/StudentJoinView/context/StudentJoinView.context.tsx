import React, { useEffect, useState } from 'react';
import { Student } from '../../SchoolClassOverview/interfaces/student.interface';
import { Socket, io } from 'socket.io-client';
import { ConnectToTestInstanceResponse } from '../types/connectToTestInstanceResponse.types';
import { RootStackParamList } from '../../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LayoutAnimation } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { ConnectToSession } from '../types/connectToSession.types';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { StudentJoinViewStack } from '../StudentJoinView.page';
import { Task } from '../../WorksheetView/interface/tasks/task.interface';
import { ISessionStarted } from '../types/sessionStarted.type';
import { TaskResult } from '../types/task-results/task-result.type';

interface ContextProps {
  instanceCode: string;
  setInstanceCode: React.Dispatch<string>;

  selectedStudent: Student | undefined;
  setSelectedStudent: React.Dispatch<Student | undefined>;

  availableStudents: Student[];
  setAvailableStudents: React.Dispatch<Student[]>;

  socket: Socket;
  setSocket: React.Dispatch<Socket>;

  worksheetName: string;
  setWorksheetName: React.Dispatch<string>;

  worksheetId: string;
  setWorksheetId: React.Dispatch<string>;

  tasks: Task[];

  examResults: TaskResult[];
  setExamResults: React.Dispatch<TaskResult[]>;

  onTaskResultChanges: <T>(
    taskResultIndex: number,
    editedTaskResult: T,
  ) => void;

  subPageNavigation: NativeStackNavigationProp<StudentJoinViewStack>;
}

const context = React.createContext({});
const { Provider } = context;

export const StudentJoinViewProvider = ({
  children,
  initialInstanceCode,
  navigation,
}: {
  children: JSX.Element;
  initialInstanceCode: string;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'StudentJoinView',
    undefined
  >;
}) => {
  const subPageNavigation =
    useNavigation<NativeStackNavigationProp<StudentJoinViewStack>>();

  const [instanceCode, setInstanceCode] = useState<string>(initialInstanceCode);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(
    undefined,
  );
  const [availableStudents, setAvailableStudents] = useState<
    Student[] | undefined
  >([]);
  const [socket, setSocket] = useState<Socket>();
  const [worksheetName, setWorksheetName] = useState<string>();
  const [worksheetId, setWorksheetId] = useState<string>()
  const [tasks, setTasks] = useState<Task[]>([]);
  const [examResults, setExamResults] = useState<TaskResult[]>([]);

  function onTaskResultChanges<T extends TaskResult>(
    taskResultIndex: number,
    editedTaskResult: T,
  ) {
    setExamResults((prevResults) => {
      const resultsCopy = [...prevResults];
      resultsCopy.splice(taskResultIndex, 1, editedTaskResult);
      return resultsCopy;
    });
  }

  useEffect(() => {
    const socket = io('http://localhost:6060');
    setSocket(socket);

    // Connect to session with session code to get related data...
    const connectToSessionData: ConnectToSession = {
      sessionCode: instanceCode,
      deviceBrand: DeviceInfo.getBrand(),
      // TODO: Get access to entitlement from apple - com.apple.developer.device-information.user-assigned-device-name
      deviceNickname: DeviceInfo.getDeviceNameSync(),
    };

    // Connect to session on init
    socket.emit(
      'connectToSession',
      connectToSessionData,
      (response: ConnectToTestInstanceResponse) => {
        if (response.success) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setAvailableStudents(response.students);
          setWorksheetName(response.worksheetName);
          setWorksheetId(response.worksheetId)
        } else {
          navigation.goBack();
          Toast.show({
            type: 'error',
            text1: 'Session nicht gefunden!',
          })
        }

      },
    );

    // Update UI on available Students update on server
    socket.on('availableStudentsUpdated', (newAvailableStudents) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setAvailableStudents(newAvailableStudents);
    });

    // Handle session close
    socket.on('sessionClosed', () => {
      console.log('[TODO] Session closed, need to be handled!');
      navigation.goBack();
      Toast.show({
        type: 'warn',
        text1: 'Session wurde beendet!',
        text2: 'Die Session wurde von Lehrer beendet.',
      });
    });

    // On Session Started
    socket.on('sessionStarted', (data?: ISessionStarted) => {
      if (!data) {
        subPageNavigation.navigate('SessionStartedWithoutYou');
        Toast.show({
          type: 'error',
          text1: 'Session wurde ohne dich gestarted!',
          text2: 'Du hast keinen Studenten ausgewählt.',
          onHide() {
            navigation.goBack();
          },
        });
      } else {
        console.log(data.blankResults);
        setTasks(data.tasks);
        setExamResults(data.blankResults);
        subPageNavigation.navigate('ExamView');
        Toast.show({
          type: 'info',
          text1: 'Session ist gestarted!',
          text2: 'Bearbeite den folgenden Test, Viel Erfolg!',
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Provider
      value={{
        instanceCode,
        setInstanceCode,
        selectedStudent,
        setSelectedStudent,
        availableStudents,
        setAvailableStudents,
        socket,
        setSocket,
        worksheetName,
        setWorksheetName,
        tasks,
        examResults,
        setExamResults,
        onTaskResultChanges,
        subPageNavigation,
      }}
    >
      {children}
    </Provider>
  );
};

export function useStudentJoinViewContext(): ContextProps {
  const { ...state } = React.useContext(context);
  return { ...(state as ContextProps) };
}
