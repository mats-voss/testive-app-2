import { MongoDocument } from '../../../../interfaces/document.interface';
import { MultipleChoiceEvaluationType } from '../../enum/multipleChoiceEvaluationType.enum';
import { TaskType } from '../../enum/taskType.enum';
import { Task } from './task.interface';

export interface IMultipleChoiceTask extends MongoDocument, Task {
  type: TaskType.MULTIPLE_CHOICE;
  owner?: string;
  question: string;
  answers: IMultipleChoiceAnswer[];
  isMultiSelect: boolean;
  evaluationType: MultipleChoiceEvaluationType | string;
}

export interface IMultipleChoiceAnswer {
  _id?: string;
  answer: string;
  isCorrect: boolean;
}
