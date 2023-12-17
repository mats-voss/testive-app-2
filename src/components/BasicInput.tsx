import { useState } from 'react';
import {
  StyleProp,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface ComponentProps {
  onChangeText: (text: string) => void;
  header?: string;
  placeholder: string;
  isSecure?: boolean;
  style?: StyleProp<ViewStyle>;
  isRequired?: boolean;
  value?: string;
  suggestions?: string[];
  readOnly?: boolean;
  autoCorrectOff?: boolean;
  isNumberInput?: boolean;
}

const BasicInput = ({
  onChangeText,
  header,
  placeholder,
  isRequired,
  style,
  isSecure,
  value,
  suggestions,
  readOnly,
  autoCorrectOff,
  isNumberInput,
}: ComponentProps) => {
  const [focused, setFocused] = useState<boolean>(false);

  function chooseSuggestion(suggestion: string): void {
    onChangeText(suggestion);
  }

  return (
    <View style={[{ flexDirection: 'column', gap: header ? 5 : 0 }, style]}>
      {header && (
        <Text style={{ fontWeight: '500', fontSize: 14 }}>
          {header}
          {isRequired && (
            <Text style={{ color: '#a80000', fontWeight: '600' }}>*</Text>
          )}
        </Text>
      )}
      <TextInput
        keyboardType={isNumberInput ? 'number-pad' : 'default'}
        autoCorrect={!autoCorrectOff}
        editable={readOnly !== true}
        value={value}
        secureTextEntry={isSecure == true}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={(text) => {
          onChangeText(text);
        }}
        placeholderTextColor={'#626262'}
        style={[
          {
            borderWidth: 0.5,
            color: readOnly ? '#626262' : '#000',
            borderColor: '#989898',
            fontSize: 14,
            paddingVertical: 10,
            paddingHorizontal: 12,
            backgroundColor: readOnly ? '#efefef' : '#fff',
            borderRadius: 5,
          },
          focused && {
            borderColor: '#262626',
            shadowOffset: { width: 2, height: 5 },
            shadowColor: '#488296',
            shadowOpacity: 0.1,
            shadowRadius: 5,
          },
        ]}
        placeholder={placeholder}
      />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          gap: 5,
          flexWrap: 'wrap',
        }}
      >
        {!readOnly &&
          suggestions
            ?.filter((filterSuggestion) => filterSuggestion !== value)
            ?.map((suggestions, i) => (
              <TouchableOpacity
                onPress={() => chooseSuggestion(suggestions)}
                key={i.toString()}
              >
                <Text
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderColor: '#989898',
                    borderRadius: 5,
                    borderWidth: 0.5,
                    alignSelf: 'flex-start',
                  }}
                >
                  {suggestions}
                </Text>
              </TouchableOpacity>
            ))}
      </View>
    </View>
  );
};

export default BasicInput;
