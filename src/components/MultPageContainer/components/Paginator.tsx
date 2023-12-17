import { Animated, StyleSheet, useWindowDimensions, View } from 'react-native';

const Paginator = ({ data, scrollX }: {data: string[], scrollX: Animated.Value}) => {
  const width = useWindowDimensions().width - 250

  return (
    <View style={ {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      bottom: 40,
      backgroundColor: '#fff',
      padding: 8,
      borderRadius: 5,
      shadowRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.05,
    } }>
      { data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [15, 50, 15],
          extrapolate: 'clamp'
        })
        const dotOpacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp'
        })

        return <Animated.View style={ [styles.dot, { width: dotWidth, opacity: dotOpacity }] } key={ i.toString() }/>
      })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  dot: {
    height: 7,
    borderRadius: 5,
    backgroundColor: '#1874ff',
    marginHorizontal: 5
  }
})

export default Paginator
