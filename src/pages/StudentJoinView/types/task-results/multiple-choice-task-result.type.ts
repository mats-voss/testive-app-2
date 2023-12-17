import { TaskResult } from './task-result.type';

export interface MultipleChoiceTaskResult extends TaskResult {
  selectedOptions: string[];
}
