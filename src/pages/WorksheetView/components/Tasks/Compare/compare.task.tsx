import { LayoutAnimation, View } from 'react-native';
import BasicSubHeader from '../../../../../components/BasicSubHeader';
import { CompareSubTask } from './components/compareSubTask.component';
import {
  ICompareSubTask,
  ICompareTask,
} from '../../../interface/tasks/compareTask.interface';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useWorksheetViewContext } from '../../../context/worksheetView.context';
import { useEffect } from 'react';
import BasicButton from '../../../../../components/BasicButton';
import { BasicQuestionAndAttachment } from '../../basicQuestionAndAttachment.component';
import { IMultipleChoiceTask } from '../../../interface/tasks/multipleChoiceTask.interface';

type ComponentProps = {
  task: ICompareTask;
  taskIndex: number;
};

export function CompareTask({ task, taskIndex }: ComponentProps) {
  const { worksheet, setWorksheet, canEdit, onTaskChanges } =
    useWorksheetViewContext();

  useEffect(() => {
    if (task.subTasks.length == 0) addCleanSubTask();
  }, []);

  function addCleanSubTask() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const modifiedTask = worksheet.tasks[taskIndex] as ICompareTask;

    // Add clean SubTask
    modifiedTask.subTasks.push({
      correctAnswers: [],
      teacherDefault: '',
    });

    onTaskChanges(taskIndex, modifiedTask);
  }

  return (
    <>
      <BasicQuestionAndAttachment
        onTaskChange={(modifiedTask) => onTaskChanges(taskIndex, modifiedTask)}
        task={task}
      />
      <View style={{ gap: 10 }}>
        <BasicSubHeader
          title="Aufgaben"
          subTitle="Trage hier alle gewünschten aufgaben zum akutellen Arbeitsauftrag ein."
        />
        <View style={{ gap: 5 }}>
          {task.subTasks?.map((subTask, subTaskIndex) => (
            <CompareSubTask
              subTask={subTask as ICompareSubTask}
              subTaskIndex={subTaskIndex}
              taskIndex={taskIndex}
              hideHeader={taskIndex != 0}
              key={subTaskIndex}
            />
          ))}
          <BasicButton
            disabled={!canEdit}
            icon="add-circle-outline"
            title="Aufgabe hinzufügen"
            containerStyle={{ width: '60%' }}
            color="#d1e7fc"
            shadowColor="#e0e0e0"
            onPress={() => addCleanSubTask()}
          />
        </View>
      </View>
      <View style={{ gap: 10 }}>
        <BasicSubHeader
          title="Einstellungen"
          subTitle="Stelle hier ein wleche kreterien beim Korigieren beachtet werden sollen und welche nicht."
        />
        <BouncyCheckbox
          disabled={!canEdit}
          fillColor="#77a950"
          text="Groß/Kleinschreibung"
          size={20}
          isChecked={task.ignoreCapitalizations}
          onPress={(checked) =>
            onTaskChanges(taskIndex, {
              ...task,
              ignoreCapitalizations: checked,
            })
          }
        />
      </View>
    </>
  );
}
