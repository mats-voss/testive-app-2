import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const FinishOnboardingScreen = () => {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <View style={styles.uploadContainer}>
      <View style={styles.innerContainer}>

        {/* Top animation */}
        <AnimatedLottieView source={{ uri: 'https://assets9.lottiefiles.com/datafiles/cS1fvpgbDlcx9hc/data.json' }}
                            style={{ height: 170 }} speed={0.7}/>

        {/* Title */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Onboarding Abgeschlossen</Text>
          <Text style={styles.headerSubtitle}>
            Du hast das Onboarding erfolgreich abgeschlosse.
            Deine Fächer und Klassen kannst du natürlich auch später noch erweitern und bearbeiten.{'\n'}
            Wenn du auf <Text style={{ fontWeight: '500' }}>"Onboarding Beenden"</Text> drückst wirst du zu deinem
            Dashboard geleitet, dort kannst du dann beginnen Tests zu erstellen.
          </Text>
        </View>
        {/* END Title*/}

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 12,
            borderRadius: 14,
            backgroundColor: '#fff',
            opacity: 1,
            gap: 5,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 8,
            shadowOffset: {
              width: 0,
              height: 0
            }
          }}
          // TODO: consider to use replace?
          onPress={() => nav.navigate('Home')}
        >
          <Icon name={'compass'} size={23}/>
          <Text style={{ fontWeight: '600', fontSize: 16 }}>Onboarding Beenden</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  uploadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    gap: 30,
    width: '65%',
    paddingTop: 30,
    paddingBottom: 80
  },
  headerContainer: {
    alignItems: 'center',
    gap: 5
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  headerSubtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#484848'
  }
})
