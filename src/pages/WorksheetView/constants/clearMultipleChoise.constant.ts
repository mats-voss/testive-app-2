import { MultipleChoiceEvaluationType } from '../enum/multipleChoiceEvaluationType.enum';
import { TaskType } from '../enum/taskType.enum';
import { IMultipleChoiceTask } from '../interface/tasks/multipleChoiceTask.interface';

export const clearMultipleChoiceTask = (): IMultipleChoiceTask => {
  return {
    type: TaskType.MULTIPLE_CHOICE,
    question: '',
    answers: [
      {
        answer: '',
        isCorrect: false,
      },
    ],
    isMultiSelect: false,
    points: 1,
    evaluationType: MultipleChoiceEvaluationType.EXACT_MATCHING,
  } as IMultipleChoiceTask;
};
