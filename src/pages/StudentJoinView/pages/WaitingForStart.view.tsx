import AnimatedLottieView from 'lottie-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { TimerWithBooksLottie } from '../../../../assets/lottiefiles';

export function WaitingForStartView() {
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
          Warten bis der <Text style={{ fontWeight: '800' }}>Lehrer</Text> den
          Test freigibt
        </Text>
        <Text style={styles.subTitle}>
          Der Lehrer muss den Test freigeben bevor du mit dem bearbeiten
          beginnen kannst. Der Test wird für alle geleichzeitig zugägnlich.
        </Text>
      </View>

      <AnimatedLottieView
        source={TimerWithBooksLottie}
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
