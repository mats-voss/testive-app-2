import { Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TagItem = (props: {
  text: string;
  onRemove: () => void;
  readOnly?: boolean;
}) => {
  return (
    <View
      style={{
        backgroundColor: '#000',
        borderColor: '#000',
        borderRadius: 5,
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5,
        paddingHorizontal: 12,
        paddingVertical: 6,
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 14,
          fontWeight: '500',
        }}
      >
        {props.text}
      </Text>
      {props.readOnly !== true && (
        <TouchableOpacity onPress={() => props.onRemove()}>
          <FontAwesome name={'minus'} color={'#ffe5e5'} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TagItem;
