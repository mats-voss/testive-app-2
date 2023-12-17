import { LayoutAnimation, Text, TouchableOpacity, View } from 'react-native';
import { IMultiQuestion } from '../interface/questions/multiQuestion.interface';
import { ISingleQuestion } from '../interface/questions/singleQuestion.interface';
import { TaskContainer } from './QuestionContainer/questionContainer.component';
import { SubQuestionContainer } from './QuestionContainer/subQuestionContainer.component';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import BasicButton from '../../../components/BasicButton';
import { useWorksheetViewContext } from '../context/worksheetView.context';
import { TaskType } from '../enum/taskType.enum';
import { clearMultipleChoiceTask } from '../constants/clearMultipleChoise.constant';
import { TaskContainer } from '../interface/taskContainer.interface';
import { clearCompareTask } from '../constants/clearCompare.constant';

type ComponentProps = {
  questionContainer: IMultiQuestion;
  questionIndex: number;
};

export function QuestionRow({
  questionIndex,
  questionContainer,
}: ComponentProps) {
  const [subTasksShow, setSubTasksShow] = useState<boolean>(true);
  const { worksheet, setWorksheet } = useWorksheetViewContext();

  function getCleanQuestion() {
    switch (questionContainer.taskType) {
      case TaskType.MULTIPLE_CHOICE:
        return {
          points: 1,
          task: clearMultipleChoiceTask(),
        } as TaskContainer;
      case TaskType.COMPARE:
        return {
          points: 1,
          task: clearCompareTask(),
        } as TaskContainer;
    }
  }

  function handleAddNewSubTask() {
    const questionCopy = worksheet.questions;
    const modifiedQuestion = worksheet.questions[
      questionIndex
    ] as IMultiQuestion;

    modifiedQuestion.tasks.push(getCleanQuestion());

    questionCopy.splice(questionIndex, 1, modifiedQuestion);

    setWorksheet({
      ...worksheet,
      questions: questionCopy,
    });
  }

  return (
    <View style={{ gap: 5, alignItems: 'flex-end' }} key={questionIndex}>
      <TaskContainer
        hasSubTasks={questionContainer.tasks.length >= 1}
        onSubTaskToggle={(isOpen) => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setSubTasksShow(isOpen);
        }}
        subTaskOpen={subTasksShow}
        questionIndex={questionIndex}
        taskType={questionContainer.taskType}
        questionContainer={questionContainer}
      />
      {subTasksShow &&
        questionContainer.tasks?.map((task, taskIndex) => (
          <SubQuestionContainer
            taskIndex={taskIndex}
            questionIndex={questionIndex}
            taskContainer={task}
            key={task.task._id || taskIndex}
          />
        ))}
      {subTasksShow && (
        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
            handleAddNewSubTask();
          }}
          style={{
            borderWidth: 0.3,
            backgroundColor: '#e7f2e5',
            borderRadius: 5,
            padding: 10,
            width: '95%',
            borderColor: '#cccccc',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <Icon name="add-circle" size={20} />
          <Text>Neue Aufgabe zum Arbeitsauftag hinzufügen</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
