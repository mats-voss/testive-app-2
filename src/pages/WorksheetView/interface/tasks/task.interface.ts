import { MongoDocument } from '../../../../interfaces/document.interface';
import { TaskType } from '../../enum/taskType.enum';
import { Attachment } from '../attachment.interface';
import { ICompareTask } from './compareTask.interface';
import { IMultipleChoiceTask } from './multipleChoiceTask.interface';

export interface Task extends MongoDocument {
  type: TaskType;
  question: string;
  points: number;
  attachment?: Attachment;
  maxPointsPossible?: number;
}

export type TaskOptions = ICompareTask | IMultipleChoiceTask;
