import { MongoDocument } from '../../../../interfaces/document.interface';
import { TaskType } from '../../enum/taskType.enum';
import { Task } from './task.interface';

export interface ICompareTask extends MongoDocument, Task {
  type: TaskType.COMPARE;
  owner?: string;
  subTasks: ICompareSubTask[];
  ignoreCapitalizations: boolean;
}

export interface ICompareSubTask extends MongoDocument {
  teacherDefault: string;
  correctAnswers: string[];
}
