import { Student } from '../../SchoolClassOverview/interfaces/student.interface';

export type ConnectToTestInstanceResponse = {
  success: true,
  students: Student[];
  worksheetName: string;
  worksheetId: string;
} | {
  success: false,
  error: 'SessionNotFound' | 'SessionIsRunning',
  message: string
};
