import { CompareSubTaskResult } from './compare-sub-task-result.type';
import { TaskResult } from './task-result.type';

export interface CompareTaskResult extends TaskResult {
  subTaskResults: CompareSubTaskResult[];
}
