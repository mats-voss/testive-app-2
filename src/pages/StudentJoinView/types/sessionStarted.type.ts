import { Task } from '../../WorksheetView/interface/tasks/task.interface';
import { TaskResult } from './task-results/task-result.type';

export type ISessionStarted = {
  tasks: Task[];
  blankResults: TaskResult[];
};
