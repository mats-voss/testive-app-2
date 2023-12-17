import { Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type FilterItemProps = {
  text: string;
  isSelected: boolean;
  onPress: () => void;
}

const FilterItem = ({text, isSelected, onPress}: FilterItemProps) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isSelected ? '#000' : '#fff',
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
      onPress={() => onPress()}
    >
      <Text style={{
        color: isSelected ? '#fff' : '#000',
        fontSize: 14,
        fontWeight: '500'
      }}>{text}</Text>
      {isSelected && <FontAwesome name={'check'} color={'#fff'}/>}
    </TouchableOpacity>
  )
}

export default FilterItem
