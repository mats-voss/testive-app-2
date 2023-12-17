import { StyleSheet, Text, View } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

interface ComponentProps {
  title: string;
  subTitle: string;
  imageURI: string;
}

const BasicHeader = ({ title, subTitle, imageURI }: ComponentProps) => {
  return (
    <View style={styles.headerContainer}>
      {/* Top animation */}
      <AnimatedLottieView source={{ uri: imageURI }}
                          style={{ height: 170, width: '100%' }} speed={0.3}/>

      <Text style={styles.header}>{title}</Text>
      <Text style={styles.headerSubtitle}>{subTitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    gap: 15
  },
  header: {
    fontSize: 30,
    fontWeight: '500'
  },
  headerSubtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#5d5d5d',
    lineHeight: 20
  }
})

export default BasicHeader
