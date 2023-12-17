import { Student } from '../../SchoolClassOverview/interfaces/student.interface';

export type IClientSelectedStudent = {
  student: Student;
  socketId: string;
  deviceNickname?: string;
  deviceBrand?: string;
};
