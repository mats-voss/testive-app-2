import React, { useEffect, useState } from 'react';
import { Tag } from '../../Library/interfaces/tag.interface';
import { Socket, io } from 'socket.io-client';
import Auth0, { useAuth0 } from 'react-native-auth0';
import { Student } from '../../SchoolClassOverview/interfaces/student.interface';
import { SessionStudent } from '../types/sessionStudent.type';
import { StudentStatus } from '../enums/studentStatus.enum';
import { LayoutAnimation } from 'react-native';
import { IClientSelectedStudent } from '../../StudentJoinView/types/clientSelectedStudent.type';

interface ContextProps {
  worksheetId: string;
  setWorksheetId: React.Dispatch<string>;

  schoolClassId: string;
  setSchoolClassId: React.Dispatch<string>;

  subjectTag: Tag;
  setSubjectTag: React.Dispatch<Tag>;

  themeTag: Tag;
  setThemeTag: React.Dispatch<Tag>;

  socket: Socket;
  setSocket: React.Dispatch<Socket>;

  sessionCode: string;
  setSessionCode: React.Dispatch<string>;

  sessionStudents: SessionStudent[];
  setSessionStudents: React.Dispatch<React.SetStateAction<SessionStudent[]>>;

  connectedClients: number;
  setConnectedClients: React.Dispatch<number>;
}

const context = React.createContext({});
const { Provider } = context;

export const TestSessionProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [worksheetId, setWorksheetId] = useState<string>();
  const [schoolClassId, setSchoolClassId] = useState<string | undefined>(
    undefined,
  );
  const [subjectTag, setSubjectTag] = useState<Tag | undefined>(undefined);
  const [themeTag, setThemeTag] = useState<Tag | undefined>(undefined);
  const [socket, setSocket] = useState<Socket>();
  const [sessionCode, setSessionCode] = useState<string | undefined>(undefined);
  const [sessionStudents, setSessionStudents] = useState<SessionStudent[]>([]);
  const [connectedClients, setConnectedClients] = useState<number>(0);

  useEffect(() => {
    const socket = io('http://localhost:6060');
    setSocket(socket);

    socket?.on(
      'clientSelectedStudent',
      ({
        socketId,
        student,
        deviceBrand,
        deviceNickname,
      }: IClientSelectedStudent) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setConnectedClients((state) => state - 1);
        setSessionStudents((state) => [
          ...state,
          {
            status: StudentStatus.ACTIVE,
            student,
            socketId,
            deviceNickname,
            deviceBrand,
          },
        ]);
      },
    );

    socket?.on(
      'studentDisconnected',
      (data: { student: Student; socketId: string }) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setSessionStudents((state) =>
          state.filter(
            (studentInstance) =>
              studentInstance.socketId !== data.socketId &&
              studentInstance.student !== data.student,
          ),
        );
      },
    );

    socket?.on('clientConnected', () =>
      setConnectedClients((currentState) => currentState + 1),
    );
    socket?.on('clientDisconnected', () =>
      setConnectedClients((currentState) => currentState - 1),
    );

    // Close connection on dismount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Provider
      value={{
        worksheetId,
        setWorksheetId,
        setSchoolClassId,
        schoolClassId,
        subjectTag,
        setSubjectTag,
        themeTag,
        setThemeTag,
        socket,
        setSocket,
        sessionCode,
        setSessionCode,
        sessionStudents,
        setSessionStudents,
        connectedClients,
        setConnectedClients,
      }}
    >
      {children}
    </Provider>
  );
};

export function useTestSessionContext(): ContextProps {
  const { ...state } = React.useContext(context);
  return { ...(state as ContextProps) };
}
