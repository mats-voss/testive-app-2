import {Image, StyleSheet, Text, View} from 'react-native';
import { useAppSelector } from '../../redux/reduxHooks';
import { getTagsError } from '../Library/redux/tags.slice';

export default function SplashScreen() {
  const hasAnyError = useAppSelector(getTagsError)

  return(
    <View style={{padding: 30, flexDirection: 'column', justifyContent: 'space-between'}}>
      <View style={{height: '90%'}}>
        { hasAnyError ? (
          <Image
            source={{uri: 'https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-404.png'}}
            style={styles.rightImage}/>
        ) : (
          <Image
            source={require('../../../assets/splashbg.jpg')}
            style={styles.rightImage}/>
        )}
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 20}}>
        <Text style={{fontWeight: 'bold', fontSize: 30}}>Testive.de</Text>
        <Text style={{ fontSize: 14, color: 'rgb(136,136,136)'}}>Bring a new, modern touch to your teaching</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  uploadContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontWeight: '800',
    fontSize: 30,
    color: 'white'
  },
  rightImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20
  },
})
