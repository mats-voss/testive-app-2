import { useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

interface ComponentProps {
  isShown: boolean,
  children: JSX.Element,
  duration?: number,
  containerStyle?: StyleProp<ViewStyle>,
  isAnimationPlaying: (isPlaying: boolean) => void
}

const FadeInView = ({ children, duration, containerStyle, isShown, isAnimationPlaying }: ComponentProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isShown) {
      isAnimationPlaying(true)
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: duration ?? 1000,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: duration ?? 1000,
        useNativeDriver: true
      }).start(() => isAnimationPlaying(false));
    }
  }, [isShown]);
  return (
    <Animated.View
      style={[{
        opacity: fadeAnim,
      }, containerStyle]}
    >
      {children}
    </Animated.View>
  )
}

export default FadeInView
