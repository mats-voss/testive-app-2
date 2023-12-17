import AnimatedLottieView from 'lottie-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { TimerWithBooksLottie } from '../../../../assets/lottiefiles';

export function SessionStartedWithoutYou() {
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: '100%',
        width: '70%',
        gap: 20,
      }}
    >
      {/* Header */}
      <View style={{ alignSelf: 'flex-start' }}>
        <Text style={{ fontSize: 25, fontWeight: '600' }}>
          Der Test wurde <Text style={{ fontWeight: '800' }}>ohne dich</Text>{' '}
          gestartet
        </Text>
        <Text style={styles.subTitle}>
          Du hast nicht rechtzeitig einen Studenten-Account ausgewählt, oder
          vergessen auf bestätigen zu drücken. Du wirst automatisch zurück
          geleitet!
        </Text>
      </View>

      <AnimatedLottieView
        source={TimerWithBooksLottie}
        style={{ height: 700, width: '100%' }}
        speed={0.8}
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
