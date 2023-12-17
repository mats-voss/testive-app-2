import { View } from 'react-native';
import { TaskHeader } from '../../TaskHeader.component';
import { AttachmentRenderer } from '../../AttachmentRenderer.component';
import { ICompareTask } from '../../../../../WorksheetView/interface/tasks/compareTask.interface';
import { CompareSubTask } from './CompareSubTask.component';
import { TaskContainer } from '../../TaskContainer';
import { PointsDisplay } from '../../PointsDisplay.component';
import { CompareTaskResult } from '../../../../types/task-results/compare-task-result.type';
import { useStudentJoinViewContext } from '../../../../context/StudentJoinView.context';

interface CompareTaskProps {
  task: ICompareTask;
  taskResult: CompareTaskResult;
  taskResultIndex: number;
  taskIndex: number;
}

export function CompareTask({
  task,
  taskIndex,
  taskResult,
  taskResultIndex,
}: CompareTaskProps) {
  const { onTaskResultChanges, worksheetId } = useStudentJoinViewContext();

  return (
    <>
      <View
        style={{
          gap: 10,
          width: '100%',
          alignSelf: 'flex-start',
        }}
      >
        <TaskHeader index={taskIndex + 1} question={task.question} />

        {/* Render Attachment if existing */}
        {task?.attachment && (
          <AttachmentRenderer attachment={task.attachment} worksheetId={worksheetId} />
        )}

        {/* Container for sub-tasks */}
        <TaskContainer>
          {task.subTasks.map((subTask, index) => {
            const subTaskResultIndex = taskResult?.subTaskResults.findIndex(
              (findSubTask) => findSubTask.subTaskId === subTask._id,
            );
            return (
              <CompareSubTask
                subTask={subTask}
                subTaskIndex={index}
                subTaskResult={taskResult?.subTaskResults[subTaskResultIndex]}
                onChange={(updatedSubTask) => {
                  taskResult?.subTaskResults.splice(
                    subTaskResultIndex,
                    1,
                    updatedSubTask,
                  );
                  onTaskResultChanges(taskResultIndex, taskResult);
                }}
                key={subTask._id || index}
              />
            );
          })}
        </TaskContainer>
        <PointsDisplay possiblePoints={task.maxPointsPossible!} />
      </View>
    </>
  );
}
