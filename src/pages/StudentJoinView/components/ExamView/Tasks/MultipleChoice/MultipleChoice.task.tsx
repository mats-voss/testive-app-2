import { View } from 'react-native';
import { TaskHeader } from '../../TaskHeader.component';
import { AttachmentRenderer } from '../../AttachmentRenderer.component';
import { TaskContainer } from '../../TaskContainer';
import { MultipleChoiceAnswerOption } from './MultipleChoiceAnswerOption.component';
import { PointsDisplay } from '../../PointsDisplay.component';
import { IMultipleChoiceTask } from '../../../../../WorksheetView/interface/tasks/multipleChoiceTask.interface';
import { MultipleChoiceTaskResult } from '../../../../types/task-results/multiple-choice-task-result.type';
import { useStudentJoinViewContext } from '../../../../context/StudentJoinView.context';

interface MultipleChoiceTaskProps {
  task: IMultipleChoiceTask;
  taskIndex: number;
  taskResultIndex: number;
  taskResult: MultipleChoiceTaskResult;
}

export function MultipleChoiceTask({
  task,
  taskIndex,
  taskResultIndex,
  taskResult,
}: MultipleChoiceTaskProps) {
  const { onTaskResultChanges, examResults } = useStudentJoinViewContext();

  return (
    <>
      <View
        style={{
          gap: 10,
          width: '100%',
        }}
      >
        <TaskHeader index={taskIndex + 1} question={task.question} />
        {task?.attachment && (
          <AttachmentRenderer attachment={task.attachment} />
        )}
        <TaskContainer>
          {task.answers.map((answerOption, index) => {
            const isSelected = taskResult?.selectedOptions.includes(
              answerOption._id!,
            );
            return (
              <MultipleChoiceAnswerOption
                answerOption={answerOption}
                isSelected={isSelected}
                toggleSelection={(isNowSelected) => {
                  let updatedSelectedOptions =
                    taskResult?.selectedOptions || [];
                  if (isNowSelected) {
                    updatedSelectedOptions.push(answerOption._id!);
                  } else {
                    updatedSelectedOptions = taskResult?.selectedOptions.filter(
                      (optionId) => optionId !== answerOption._id,
                    );
                  }

                  onTaskResultChanges(taskResultIndex, {
                    ...taskResult,
                    selectedOptions: updatedSelectedOptions,
                  });
                }}
                key={index}
              />
            );
          })}
        </TaskContainer>
        <PointsDisplay possiblePoints={task.maxPointsPossible!} />
      </View>
    </>
  );
}
