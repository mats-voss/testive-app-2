import {
  ActivityIndicator,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CompareTask } from '../components/ExamView/Tasks/Compare/Compare.task';
import { MultipleChoiceTask } from '../components/ExamView/Tasks/MultipleChoice/MultipleChoice.task';
import { RootStackParamList } from '../../../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StudentJoinViewStack } from '../StudentJoinView.page';
import { useStudentJoinViewContext } from '../context/StudentJoinView.context';
import { Task } from '../../WorksheetView/interface/tasks/task.interface';
import { TaskType } from '../../WorksheetView/enum/taskType.enum';
import { Error404 } from '../../../components/Error404';
import { ICompareTask } from '../../WorksheetView/interface/tasks/compareTask.interface';
import { IMultipleChoiceTask } from '../../WorksheetView/interface/tasks/multipleChoiceTask.interface';
import { CompareTaskResult } from '../types/task-results/compare-task-result.type';
import { MultipleChoiceTaskResult } from '../types/task-results/multiple-choice-task-result.type';
import { useEffect, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DefaultSocketResponse } from '../types/submitExamResponse.type';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<StudentJoinViewStack, 'ExamView'>;

export function ExamView({ navigation, route }: Props) {
  const { tasks, examResults, socket, subPageNavigation } =
    useStudentJoinViewContext();
  const [isLoading, setIsLoading] = useState(false);

  function submitExam() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsLoading(true);
    console.log(JSON.stringify(examResults));

    socket.emit(
      'submitExam',
      examResults,
      (response: DefaultSocketResponse) => {
        if (response.success) {
          subPageNavigation.navigate('ExamSubmittedView');
          setIsLoading(false);
          Toast.show({
            type: 'success',
            text1: 'Test Abgegeben!',
            text2: 'Dein Test wurde erfolgreich abgegeben.',
          });
        } else {
          setIsLoading(false);
          Toast.show({
            type: 'error',
            text1: response.error,
            text2: response.message,
          });
        }
      },
    );
  }

  function getCorrectComponent(task: Task, index: number): JSX.Element {
    switch (task.type) {
      case TaskType.COMPARE: {
        const taskResultIndex = examResults.findIndex(
          (result) => result.taskId === task._id,
        );
        return (
          <CompareTask
            task={task as ICompareTask}
            taskResultIndex={taskResultIndex}
            taskIndex={index}
            taskResult={examResults[taskResultIndex] as CompareTaskResult}
            key={task._id}
          />
        );
      }
      case TaskType.MULTIPLE_CHOICE: {
        const taskResultIndex = examResults.findIndex(
          (result) => result.taskId === task._id,
        );
        return (
          <MultipleChoiceTask
            task={task as IMultipleChoiceTask}
            taskResultIndex={taskResultIndex}
            taskIndex={index}
            taskResult={
              examResults[taskResultIndex] as MultipleChoiceTaskResult
            }
            key={task._id}
          />
        );
      }
      default:
        return <Error404 />;
    }
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: '#f5f5f5',
        }}
      >
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: '45%',
            height: '100%',
            overflow: 'visible',
          }}
          contentContainerStyle={{
            paddingTop: 80,
            paddingBottom: 80,
            gap: 40,
          }}
        >
          {/* Header */}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: '600' }}>
              Bearbeite den folgenden{' '}
              <Text style={{ fontWeight: '800' }}>Test</Text>
            </Text>
            <Text
              style={{
                fontSize: 13,
                textAlign: 'center',
                color: '#545454',
              }}
            >
              Bearbeite den nachfolgenden Test so gut wie möglich. Bei fragen
              kicke auf "Frage Stellen", um den Lehrer zu informieren. Wenn du
              fertig bist kicke auf "Test Abgeben", du kannst den Test wärend
              der Arbeitszeit jederzeit weiter bearbeiten.
            </Text>
          </View>

          {/* Basic Question Container */}
          {tasks.map((task, index) => {
            return getCorrectComponent(task, index);
          })}
        </KeyboardAwareScrollView>

        {/* Interaction Button */}
        <View
          style={{
            position: 'absolute',
            bottom: 30,
            left: 30,
            flexDirection: 'row',
            gap: 15,
          }}
        >
          <TouchableOpacity
            onPress={() => submitExam()}
            style={[
              styles.button,
              { backgroundColor: '#b6e8b1', shadowColor: '#5cd351' },
            ]}
          >
            <Icon name={'send'} size={18} color={'#000'} />
            <Text style={{ color: '#000', fontWeight: '600' }}>
              Test Abgeben
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => null}
            style={[
              styles.button,
              { backgroundColor: '#f0e89e', shadowColor: '#dde665' },
            ]}
          >
            <Icon name={'chatbubbles'} size={18} color={'#000'} />
            <Text style={{ color: '#000', fontWeight: '600' }}>
              Frage Stellen
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(255,255,255,0.9)',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    opacity: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#ccc',
    shadowColor: '#ccc',
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
});
