import { TaskResult } from './task-results/task-result.type';

export type DefaultSocketResponse =
  | {
      success: false;
      error: string;
      message: string;
    }
  | {
      success: true;
      type: string;
      message: string;
    };
