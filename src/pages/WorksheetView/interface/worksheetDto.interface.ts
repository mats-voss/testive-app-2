import { Attachment } from './attachment.interface';
import { TaskOptions } from './tasks/task.interface';

export interface WorksheetDTO {
  _id?: string;
  owner?: string;
  name: string;
  isFavorite: boolean;
  tags: string[];
  attachment?: Attachment;
  tasks: TaskOptions[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
