import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';
import { WorksheetHeader } from '../worksheetHeader.component';
import { TaskType } from '../../enum/taskType.enum';
import { useWorksheetViewContext } from '../../context/worksheetView.context';
import Icon from 'react-native-vector-icons/Ionicons';
import { CompareTask } from '../Tasks/Compare/compare.task';
import BasicButton from '../../../../components/BasicButton';
import { TaskOptions } from '../../interface/tasks/task.interface';
import { MultipleChoiceTask } from '../Tasks/MultipleChoice/multipleChoice.task';
import { Error404 } from '../../../../components/Error404';

type ComponentProps = {
  taskIndex: number;
  task: TaskOptions;
};

export function TaskContainer({ taskIndex, task }: ComponentProps) {
  const { worksheet, setWorksheet, canEdit } = useWorksheetViewContext();
  const [isActive, setIsActive] = useState<boolean>(false);

  function handleTaskDelete() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const cleanedQuestions = worksheet.tasks;
    cleanedQuestions.splice(taskIndex, 1);

    setWorksheet({
      ...worksheet,
      tasks: cleanedQuestions,
    });
  }

  function getCorrectTaskComponent(): JSX.Element {
    switch (task.type) {
      case TaskType.COMPARE:
        return <CompareTask task={task} taskIndex={taskIndex} />;
      case TaskType.MULTIPLE_CHOICE:
        return <MultipleChoiceTask task={task} taskIndex={taskIndex} />;
      default:
        console.error(
          '[QuestionContainer][getCorrectTaskComponent] Error case triggered! Task logged...',
          task,
        );
        return <Error404 />;
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsActive(!isActive);
      }}
      style={[
        styles.container,
        {
          borderColor: isActive ? '#0e6fd5' : '#cccccc',
          borderWidth: isActive ? 1 : 0.3,
        },
      ]}
    >
      {/* Index Container */}
      <View
        style={{
          position: 'absolute',
          top: 15,
          left: -45,
        }}
      ></View>

      {/* Header */}
      <View style={{ gap: 10 }}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <WorksheetHeader
            question={task.question || ''}
            index={taskIndex + 1}
            width={350}
          />

          {/* Question-Type */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Text style={{ color: '#5d5d5d' }}>{task.type}</Text>
            <Icon name={'stop-circle-outline'} size={20} color={'#5d5d5d'} />
          </View>
        </View>
      </View>

      {isActive && getCorrectTaskComponent()}

      {isActive && (
        <BasicButton
          disabled={!canEdit}
          color="#fff1d9"
          shadowColor="#fff1d940"
          onPress={() => handleTaskDelete()}
          icon="trash"
          title="Löschen"
          containerStyle={{ alignSelf: 'flex-end' }}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.3,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    width: '100%',
    gap: 20,
  },
});
