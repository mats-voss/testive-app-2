import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import { SuccessStudentsLottie } from '../../../../assets/lottiefiles';

export default function ExamSubmittedView() {
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
          Glückwunsch! Du hast den Test{' '}
          <Text style={{ fontWeight: '800' }}>erfolgreich</Text> absolviert
        </Text>
        <Text style={styles.subTitle}>
          Der Test wurde an den Lehrer übermittelt. Sobald alle schüler ihren
          Test abgegeben haben, wirst du zu deiner auswertung weitergeleitet.
        </Text>
      </View>

      <AnimatedLottieView
        source={SuccessStudentsLottie}
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
