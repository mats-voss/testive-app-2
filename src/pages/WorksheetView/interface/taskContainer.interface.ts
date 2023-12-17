import { ICompareTask } from './tasks/compareTask.interface';
import { IMultipleChoiceTask } from './tasks/multipleChoiceTask.interface';

export interface TaskContainer {
  task: ICompareTask | IMultipleChoiceTask;
  points: number;
}
