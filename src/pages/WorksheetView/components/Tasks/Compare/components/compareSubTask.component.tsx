import { LayoutAnimation, Text, TouchableOpacity, View } from 'react-native';
import BasicInput from '../../../../../../components/BasicInput';
import { CompareAnswerInput } from './compareAnswerInput.component';
import {
  ICompareSubTask,
  ICompareTask,
} from '../../../../interface/tasks/compareTask.interface';
import { useWorksheetViewContext } from '../../../../context/worksheetView.context';
import Icon from 'react-native-vector-icons/Ionicons';

const numberToLetter = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

type ComponentProps = {
  subTask: ICompareSubTask;
  taskIndex: number;
  subTaskIndex: number;
  hideHeader?: boolean;
};

export function CompareSubTask({
  subTask,
  taskIndex,
  subTaskIndex,
  hideHeader,
}: ComponentProps) {
  const { canEdit, worksheet, setWorksheet } = useWorksheetViewContext();

  function handleSubTaskChanges(changedSubTask?: ICompareSubTask) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const tasksCopy = worksheet.tasks;
    const modifiedTask = worksheet.tasks[taskIndex] as ICompareTask;

    if (!changedSubTask) {
      modifiedTask.subTasks.splice(subTaskIndex, 1);
    } else {
      modifiedTask.subTasks.splice(subTaskIndex, 1, changedSubTask);
    }

    tasksCopy.splice(taskIndex, 1, modifiedTask);

    setWorksheet({
      ...worksheet,
      tasks: tasksCopy,
    });
  }

  return (
    <View style={{ gap: 15 }}>
      <View
        style={{
          gap: 5,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Index Container */}
        <View
          style={{
            width: 25,
            height: 25,
            backgroundColor: '#0e6fd5',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 99999,
            marginBottom: hideHeader ? 0 : -15,
          }}
        >
          <Text
            style={{
              fontWeight: '600',
              color: '#fff',
              fontSize: 14,
            }}
          >
            {numberToLetter[taskIndex]}
          </Text>
        </View>

        <BasicInput
          readOnly={!canEdit}
          isRequired
          value={subTask?.teacherDefault || ''}
          onChangeText={(newDefault) =>
            handleSubTaskChanges({
              ...subTask,
              teacherDefault: newDefault,
            })
          }
          placeholder={'Deine vorgabe hier...'}
          header={!hideHeader ? 'Vorgabe' : undefined}
          style={{ flex: 1 }}
        />

        <CompareAnswerInput
          readOnly={!canEdit}
          onAnswersChanged={(answers) => {
            handleSubTaskChanges({
              ...subTask,
              correctAnswers: answers,
            });
          }}
          answers={subTask.correctAnswers}
          style={{ flex: 1 }}
          hideHeader={hideHeader}
        />
        {canEdit && (
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: hideHeader ? 0 : -22.5,
            }}
            onPress={() => handleSubTaskChanges()}
          >
            <Icon name="trash" size={15} color={'#666666'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
