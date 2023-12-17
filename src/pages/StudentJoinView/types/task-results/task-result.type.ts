import { MongoDocument } from '../../../../interfaces/document.interface';
import { TaskType } from '../../../WorksheetView/enum/taskType.enum';
import { CompareSubTaskResult } from './compare-sub-task-result.type';

export interface TaskResult extends MongoDocument {
  taskType: TaskType;
  taskId: string;
  achievedPoints?: number;
}
