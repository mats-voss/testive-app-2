import { LayoutAnimation, View, } from 'react-native';
import BasicSubHeader from '../../../components/BasicSubHeader';
import BasicButton from '../../../components/BasicButton';
import { TaskType } from '../enum/taskType.enum';
import { useWorksheetViewContext } from '../context/worksheetView.context';
import { clearCompareTask } from '../constants/clearCompare.constant';
import {
  clearMultipleChoiceTask
} from '../constants/clearMultipleChoise.constant';

export function AddQuestion() {
  const { worksheet, setWorksheet } = useWorksheetViewContext();

  function getCleanTaskByType(taskType: TaskType) {
    switch (taskType) {
      case TaskType.COMPARE:
        return clearCompareTask();
      case TaskType.MULTIPLE_CHOICE:
        return clearMultipleChoiceTask();
    }
  }

  function addTaskToWorksheet(taskType: TaskType) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const tasksCopy = worksheet?.tasks || [];

    tasksCopy.push(getCleanTaskByType(taskType));
    setWorksheet({
      ...worksheet,
      tasks: tasksCopy,
    });
  }

  return (
    <View
      style={{
        gap: 10,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {
          width: 0,
          height: 5,
        },
      }}
    >
      <BasicSubHeader
        title={'Aufgabe hinzufügen'}
        subTitle={
          'Add a new question of your choice to the current worksheet. Kick HERE to get more information about the different types.'
        }
        maxTextWidth={'60%'}
      />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <BasicButton
          color={'#fdcfb3'}
          shadowColor={'#fdcfb3'}
          onPress={() => addTaskToWorksheet(TaskType.MULTIPLE_CHOICE)}
          title={'Multiple-Choice'}
          icon={'stop-circle-outline'}
          containerStyle={{ flex: 1 }}
        />
        <BasicButton
          color={'#fdecb3'}
          shadowColor={'#fdecb3'}
          onPress={() => addTaskToWorksheet(TaskType.COMPARE)}
          title={'Compare-Words'}
          icon={'git-compare'}
          containerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  );
}
