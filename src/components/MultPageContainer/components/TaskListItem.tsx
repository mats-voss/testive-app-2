import { useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ComponentProps {
  title: string,
  description: string,
  isFinished: boolean,
  isActive: boolean
}

const TaskListItem = (
  {
    title,
    description,
    isFinished,
    isActive,
  }: ComponentProps
) => {
  const inactiveOpacity = isFinished ? 0.6 : 0.2
  const [fadeAnimIsActive] = useState(new Animated.Value(inactiveOpacity));

  useEffect(() => {
    Animated.timing(fadeAnimIsActive, {
      toValue: isActive ? 1 : inactiveOpacity,
      duration: 200,
      useNativeDriver: true
    }).start();
  })

  return (
    <Animated.View style={{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 5,
      opacity: fadeAnimIsActive
    }}>
      <Icon name={isFinished ? "checkmark-circle" : "checkmark-circle-outline"} size={25}
            color={isFinished ? "#61bd61" : "#000"}/>
      <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: 3 }}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>{title}</Text>
        <Text style={{ color: '#4b4b4b' }}>{description}</Text>
      </View>
    </Animated.View>
  )
}

export { TaskListItem }
