import { TaskType } from '../enum/taskType.enum';
import { ICompareTask } from '../interface/tasks/compareTask.interface';

export const clearCompareTask = (): ICompareTask => {
  return {
    type: TaskType.COMPARE,
    question: '',
    points: 1,
    subTasks: [
      {
        correctAnswers: [],
        teacherDefault: '',
      },
    ],
    ignoreCapitalizations: false,
  } as ICompareTask;
};
