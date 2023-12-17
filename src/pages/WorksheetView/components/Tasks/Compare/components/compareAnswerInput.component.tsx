import { useState } from 'react';
import { StyleProp, Text, TextInput, View, ViewStyle } from 'react-native';
import TagItem from '../../../../../../components/TagInput/TagItem';

type ComponentProps = {
  readOnly?: boolean;
  onAnswersChanged: (answers: string[]) => void;
  answers: string[];
  style?: StyleProp<ViewStyle>;
  hideHeader?: boolean;
};

export function CompareAnswerInput({
  readOnly,
  answers,
  style,
  hideHeader,
  onAnswersChanged,
}: ComponentProps) {
  const [input, setInput] = useState('');

  function addAnswer() {
    if (input && !answers.some((x) => x === input)) {
      onAnswersChanged([...answers, input]);
      setInput('');
    } else {
      setInput('');
    }
  }

  return (
    <View style={[{ flexDirection: 'column', gap: 5 }, style]}>
      {!hideHeader && (
        <Text style={{ fontWeight: '500', fontSize: 14 }}>
          Korrekte Antworten
          <Text style={{ color: '#a80000', fontWeight: '600' }}>*</Text>
        </Text>
      )}
      <View
        style={{
          width: '100%',
          borderWidth: 0.5,
          borderColor: '#989898',
          padding: 6,
          backgroundColor: '#fff',
          borderRadius: 5,
          flexDirection: 'row',
          gap: 5,
          flexWrap: 'wrap',
          minHeight: 43,
        }}
      >
        {!readOnly && (
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderColor: '#000',
              borderRadius: 5,
              borderWidth: 0.5,
            }}
            placeholderTextColor={'#626262'}
            placeholder="Antwort"
            onSubmitEditing={() => addAnswer()}
            blurOnSubmit={false}
            onBlur={() => addAnswer()}
            onChangeText={(input) => setInput(input)}
            value={input}
            autoCorrect={false}
          />
        )}

        {answers.map((answer, index) => (
          <TagItem
            readOnly={readOnly}
            text={answer}
            key={index}
            onRemove={() =>
              onAnswersChanged(
                answers.filter((filteredAnswer) => filteredAnswer !== answer),
              )
            }
          />
        ))}
      </View>
    </View>
  );
}
