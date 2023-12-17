import { Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { IMultipleChoiceAnswer } from '../../../../../WorksheetView/interface/tasks/multipleChoiceTask.interface';

interface ComponentProps {
  answerOption: IMultipleChoiceAnswer;
  isSelected: boolean;
  toggleSelection(isNowSelected: boolean): void;
}

export function MultipleChoiceAnswerOption({
  answerOption,
  isSelected,
  toggleSelection,
}: ComponentProps) {
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
        size={25}
        isChecked={isSelected}
        onPress={() => {
          toggleSelection(!isSelected);
        }}
        fillColor="#63c373"
        iconStyle={{ borderRadius: 5 }}
        innerIconStyle={{ borderRadius: 5 }}
      />
      <Text
        style={{
          fontSize: 16,
          fontWeight: '500',
        }}
      >
        {answerOption.answer}
      </Text>
    </View>
  );
}
