import { Student } from '../../SchoolClassOverview/interfaces/student.interface';
import { StudentStatus } from '../enums/studentStatus.enum';

export type SessionStudent = {
  student: Student;
  socketId: string;
  status: StudentStatus;
  deviceNickname?: string;
  deviceBrand?: string;
};
