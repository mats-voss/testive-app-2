import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

interface ComponentProps {
  onChangeText?: (value: string) => void,
  displayOnly?: boolean,
  placeholder: string,
  value?: string,
  suffix?: string
}

const SchemaEntryInput = (
  {
    onChangeText,
    displayOnly,
    placeholder,
    value,
    suffix,
  }: ComponentProps
) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [stateValue, setStateValue] = useState(value)

  return (
    <View style={[
      {
        borderBottomWidth: displayOnly ? 0 : 0.5,
        borderColor: '#989898',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 9,
        paddingVertical: 4,
        backgroundColor: '#fff',
        borderRadius: 5,
        minWidth: 40,
      },
      focused && {
        borderColor: '#262626',
        shadowOffset: { width: 2, height: 5 },
        shadowColor: '#488296',
        shadowOpacity: 0.1,
        shadowRadius: 5,
      }
    ]}>
      <TextInput
        editable={!displayOnly}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={(text) => {
          if (onChangeText) {
            onChangeText(text)
          }
          setStateValue(text)
        }}
        value={stateValue}
        placeholderTextColor={'#626262'}
        style={{ fontSize: 14, fontWeight: '500' }}
        placeholder={placeholder}
      />
      <Text>{suffix}</Text>
    </View>
  );
}

export { SchemaEntryInput }
