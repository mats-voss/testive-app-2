import { LayoutAnimation, Text, TouchableOpacity, View } from 'react-native';
import BasicInput from '../../../../../components/BasicInput';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import BasicSubHeader from '../../../../../components/BasicSubHeader';
import { MultipleChoiceAnswerOption } from './components/answerOption.component';
import {
  IMultipleChoiceAnswer,
  IMultipleChoiceTask,
} from '../../../interface/tasks/multipleChoiceTask.interface';
import { FileUpload } from '../../fileUpload.component';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import BasicButton from '../../../../../components/BasicButton';
import { useWorksheetViewContext } from '../../../context/worksheetView.context';
import { BasicQuestionAndAttachment } from '../../basicQuestionAndAttachment.component';
import SingleSelectSlider from '../../../../../components/SingleSelectSlider/SingleSelectSlider';
import { MultipleChoiceEvaluationType } from '../../../enum/multipleChoiceEvaluationType.enum';

type ComponentProps = {
  taskIndex: number;
  task: IMultipleChoiceTask;
};

export function MultipleChoiceTask({ task, taskIndex }: ComponentProps) {
  const { canEdit, onTaskChanges } = useWorksheetViewContext();

  const evaluationTypeOptions = [
    { _id: 'exact_matching', label: 'Exakte Übereinstimmung' },
    { _id: 'points_per_answer', label: 'Punkte pro Antwort' },
  ];

  useEffect(() => {
    if (task.answers?.length === 0) {
      task.answers.push({
        answer: '',
        isCorrect: false,
      } as IMultipleChoiceAnswer);
    }

    onTaskChanges<IMultipleChoiceTask>(taskIndex, task);
  }, []);

  return (
    <View style={{ gap: 25 }}>
      <BasicQuestionAndAttachment
        onTaskChange={(modifiedTask) => onTaskChanges(taskIndex, modifiedTask)}
        task={task}
      />

      <View style={{ gap: 10 }}>
        <BasicSubHeader
          title="Bewertungsschema"
          subTitle="Bitte wähle unterhalb ein Bewertungsschema aus. Um mehr über die Schema zu erfahren klicke auf das Fragezeichen."
        />
        <SingleSelectSlider
          readOnly={!canEdit}
          options={evaluationTypeOptions}
          selectedOption={evaluationTypeOptions.find(
            (option) => option._id == task.evaluationType,
          )}
          onSelect={(selectedOption) => {
            onTaskChanges<IMultipleChoiceTask>(taskIndex, {
              ...task,
              evaluationType: selectedOption._id,
            });
          }}
        />
      </View>

      {/* Answer + Description container */}
      <View style={{ gap: 10 }}>
        <View>
          <BasicSubHeader
            title="Antwortmöglichkeiten"
            subTitle="Hier kannst du die gewünschten Antwortmöglichkeiten hinzufügen. Die richtige Antwort/Antworten müssen mit dem haken daneben als diese Makiert werden! Jenachdem ob mehrere Antworten möglich sind wird dies dem Schüler automatisch mitgeteilt."
          />
          <Text
            style={{ fontSize: 10, alignSelf: 'flex-end', color: '#868686' }}
          >
            Hinweis: Freigelesene Antwortmöglichkeiten werden nicht beachtet!
          </Text>
        </View>
        {/* Options... */}
        {task?.answers?.map((answerOption, index) => {
          return (
            <MultipleChoiceAnswerOption
              taskIndex={taskIndex}
              answerIndex={index}
              answerOption={answerOption}
              key={index}
            />
          );
        })}
        <BasicButton
          icon="add-circle-outline"
          title="Antwortmöglichkeit hinzufügen"
          containerStyle={{ width: '60%' }}
          color="#d1e7fc"
          shadowColor="#e0e0e0"
          disabled={!canEdit}
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
            task.answers.push({
              answer: '',
              isCorrect: false,
            } as IMultipleChoiceAnswer);
            onTaskChanges(taskIndex, task);
          }}
        />
      </View>
    </View>
  );
}
