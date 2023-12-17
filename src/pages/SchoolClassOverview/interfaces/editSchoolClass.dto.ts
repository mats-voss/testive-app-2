import { Student } from './student.interface';

export interface EditSchoolClassDTO {
  _id: string;
  year: string;
  identifier: string;
  gradeSchema: string;
  students: Student[]
}
