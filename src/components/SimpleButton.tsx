import {
  ColorValue,
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type SimpleButtonProps = {
  text: string,
  onPress: () => void,
  color: ColorValue,
  textColor?: ColorValue,
  containerStyle?: StyleProp<ViewStyle>,
  outlined?: boolean,
  backgroundColor?: ColorValue,
  iconName?: string,
  disabled?: boolean,
}

export function SimpleButton({
    text,
    onPress,
    color,
    textColor,
    backgroundColor,
    containerStyle,
    outlined,
    iconName,
    disabled
  }: SimpleButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled == true}
      style={[containerStyle, {
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 24,
        backgroundColor: outlined ? backgroundColor : color,
        borderWidth: 3,
        borderColor: color,
        borderRadius: 8,
        opacity: disabled ? 0.3 : 1,
        gap: 5,
      }]}
      onPress={() => onPress()}
    >
      {iconName && <Icon name={'trash'} color={outlined ? color : textColor} size={16} />}
      <Text style={{
        color: outlined ? color : textColor,
        fontSize: 14,
        fontWeight: '600',
      }}>{text}</Text>
    </TouchableOpacity>
  )
}
