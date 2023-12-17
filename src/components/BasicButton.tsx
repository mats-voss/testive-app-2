import Icon from 'react-native-vector-icons/Ionicons';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface ComponentProps {
  title?: string;
  icon?: string;
  iconSize?: number;
  color: string;
  shadowColor: string;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

const BasicButton = ({
  title,
  icon,
  color,
  iconSize,
  shadowColor,
  onPress,
  containerStyle,
  disabled,
  textStyle,
}: ComponentProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onPress()}
      style={[
        {
          opacity: disabled ? 0.3 : 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 7,
          paddingVertical: 8,
          paddingHorizontal: 15,
          borderRadius: 5,
          backgroundColor: color,
          shadowColor: shadowColor,
          shadowOpacity: 1,
          shadowRadius: 6,
          shadowOffset: {
            width: 0,
            height: 0,
          },
        },
        containerStyle,
      ]}
    >
      {icon && <Icon name={icon} size={iconSize ?? 18} color={'#000'} />}
      {title && (
        <Text style={[{ color: '#000', fontWeight: '600' }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default BasicButton;
