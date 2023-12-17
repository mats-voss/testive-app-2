import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ComponentProps {
  title: string,
  icon: any,
  isActive: boolean,
  setActive: () => void
}

const SideNavigationItem = ({ title, icon, setActive, isActive }: ComponentProps) => {
  return (
    <TouchableOpacity
      onPress={() => setActive()}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        backgroundColor: isActive ? '#ecf4ff' : '#fff'
      }}>
      <Icon name={icon} size={18} color={isActive ? '#0e6fd5' : '#000'}/>
      <Text style={{ color: isActive ? '#0e6fd5' : '#000', fontWeight: '600' }}>{title}</Text>
    </TouchableOpacity>
  )
}

export default SideNavigationItem
