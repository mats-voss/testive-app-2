import { LayoutAnimation, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import BasicInput from '../../../../../../components/BasicInput';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  IMultipleChoiceAnswer,
  IMultipleChoiceTask,
} from '../../../../interface/tasks/multipleChoiceTask.interface';
import { useEffect, useState } from 'react';
import { useForceUpdate } from '../../../../../../hooks/forceUpdate.hook';
import { useWorksheetViewContext } from '../../../../context/worksheetView.context';

type ComponentProps = {
  taskIndex: number;
  answerIndex: number;
  answerOption: IMultipleChoiceAnswer;
};

export function MultipleChoiceAnswerOption({
  answerOption,
  taskIndex,
  answerIndex,
}: ComponentProps) {
  const { canEdit, onTaskChanges, worksheet } = useWorksheetViewContext();

  function onChange(modifiedAnswer?: IMultipleChoiceAnswer) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const modifiedTask = worksheet.tasks[taskIndex] as IMultipleChoiceTask;

    if (!modifiedAnswer) {
      // Replace answer option with edited one...
      modifiedTask.answers.splice(answerIndex, 1);
    } else {
      // Replace answer option with edited one...
      modifiedTask.answers.splice(answerIndex, 1, modifiedAnswer);
    }

    modifiedTask.isMultiSelect =
      modifiedTask.answers.filter((answer) => answer.isCorrect).length > 1;

    // Save task
    onTaskChanges<IMultipleChoiceTask>(taskIndex, modifiedTask);
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 8,
        width: '60%',
      }}
    >
      <BouncyCheckbox
        disableText
        disableBuiltInState
        disabled={!canEdit}
        size={25}
        isChecked={answerOption.isCorrect}
        onPress={() => {
          onChange({ ...answerOption, isCorrect: !answerOption.isCorrect });
        }}
        fillColor="#63c373"
        iconStyle={{ borderRadius: 5 }}
        innerIconStyle={{ borderRadius: 5 }}
      />
      <BasicInput
        readOnly={!canEdit}
        onChangeText={(i) => onChange({ ...answerOption, answer: i })}
        value={answerOption.answer || ''}
        placeholder="Option..."
        style={{ flex: 1 }}
      />
      {canEdit && (
        <TouchableOpacity onPress={() => onChange()}>
          <Icon name="trash" size={15} />
        </TouchableOpacity>
      )}
    </View>
  );
}
