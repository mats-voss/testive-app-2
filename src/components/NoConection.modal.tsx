import AnimatedLottieView from 'lottie-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { LostConnectionLottie } from '../../assets/lottiefiles';

export function NoConnectionModal() {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 100,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        gap: 20,
      }}
    >
      {/* Header */}
      <View style={{ alignSelf: 'flex-start' }}>
        <Text style={{ fontSize: 25, fontWeight: '600' }}>
          Keine <Text style={{ fontWeight: '800' }}>Internetverbindung</Text>!
        </Text>
        <Text style={styles.subTitle}>
          Bitte stelle eine sichere verbindung zum Internet her um fort zu
          fahren!
        </Text>
      </View>

      <AnimatedLottieView
        source={LostConnectionLottie}
        style={{ height: 500, width: '100%' }}
        speed={0.3}
        autoPlay
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  subTitle: { fontSize: 13, textAlign: 'left', color: '#545454', width: 520 },
});
