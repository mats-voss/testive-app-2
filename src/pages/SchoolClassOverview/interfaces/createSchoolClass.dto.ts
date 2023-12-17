import { Student } from './student.interface';

export interface CreateSchoolClassDTO {
  year: string;
  identifier: string;
  gradeSchema: string;
  students: Student[]
}
