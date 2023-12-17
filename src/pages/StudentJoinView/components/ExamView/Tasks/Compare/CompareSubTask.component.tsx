import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BasicInput from '../../../../../../components/BasicInput';
import {
  ICompareSubTask,
  ICompareTask,
} from '../../../../../WorksheetView/interface/tasks/compareTask.interface';
import { useStudentJoinViewContext } from '../../../../context/StudentJoinView.context';
import { CompareSubTaskResult } from '../../../../types/task-results/compare-sub-task-result.type';
import { TaskResult } from '../../../../types/task-results/task-result.type';
import { TaskType } from '../../../../../WorksheetView/enum/taskType.enum';
import { CompareTaskResult } from '../../../../types/task-results/compare-task-result.type';

type CompareTaskProps = {
  subTask: ICompareSubTask;
  subTaskIndex: number;
  subTaskResult: CompareSubTaskResult;
  onChange: (subTaskResult: CompareSubTaskResult) => void;
};

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

export function CompareSubTask({
  subTask,
  subTaskIndex,
  subTaskResult,
  onChange,
}: CompareTaskProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 15,
      }}
    >
      {/* Index Indicator */}
      <View
        style={{
          width: 27,
          height: 27,
          backgroundColor: '#a6c3ea',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 99999,
        }}
      >
        <Text
          style={{
            fontWeight: '900',
            color: '#ffffff',
            fontSize: 15,
          }}
        >
          {numberToLetter[subTaskIndex]}
        </Text>
      </View>

      {/* Task Container */}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <Text
          style={{
            fontWeight: '500',
            fontSize: 18,
          }}
        >
          {subTask.teacherDefault}
        </Text>

        <Icon name="caret-forward" size={20} color={'#696969'} />

        <BasicInput
          autoCorrectOff
          onChangeText={(i) => {
            onChange({
              ...subTaskResult,
              answer: i,
            });
          }}
          placeholder="Deine Antwort"
          style={{ flexGrow: 1 }}
          value={subTaskResult?.answer || ''}
        />
      </View>
    </View>
  );
}
