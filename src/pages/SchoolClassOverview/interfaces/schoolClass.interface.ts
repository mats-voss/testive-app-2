import { Student } from './student.interface';
import { Tag } from '../../Library/interfaces/tag.interface';

export interface SchoolClass {
  _id?: string;
  __v?: number;
  owner?: string;
  year?: Tag;
  identifier?: string;
  gradeSchema?: string;
  students: Student[];
  updatedAt?: string;
  createdAt?: string;
}
