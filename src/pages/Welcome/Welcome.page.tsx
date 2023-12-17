import {
  ActivityIndicator,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import AnimatedLottieView from 'lottie-react-native';
import { useAuth0 } from 'react-native-auth0';
import { useEffect, useState } from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import axios from 'axios';
import Modal from 'react-native-modal';
import VerifyEmail from '../VerifyEmail/VerfiyEmail.page';
import {
  StudentLottie,
  TeacherWithStudentLottie
} from '../../../assets/lottiefiles';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const Welcome = ({ navigation }: Props) => {
  const { authorize, error } = useAuth0();

  const [isLoading, setIsLoading] = useState(false);
  const [instanceCode, setInstanceCode] = useState<undefined | string>();
  const [verifyEmailModalData, setVerifyEmailModalData] = useState({
    shown: false,
    onRegister: true
  })

  useEffect(() => {
    if (!error) return;
    switch (error?.message) {
      case 'EmailNotVerified_AfterSignup':
        setIsLoading(false);
        setVerifyEmailModalData({ shown: true, onRegister: true });
        break;
      case 'EmailNotVerified_Default':
        setIsLoading(false)
        setVerifyEmailModalData({ shown: true, onRegister: false });
        break;
      default:
        // TODO: Handle other errors
        console.log('Auth0-Error:', error)
        break;
    }
  }, [error])

  const onAuthorize = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsLoading(true);
    await authorize(
      {
        scope: 'openid profile email offline_access',
        audience: 'backend-nestjs-api',
        prompt: 'login',
      },
      {
        customScheme: 'de.testive.app',
        ephemeralSession: true,
      },
    )
    setIsLoading(false)
  };

  const checkInstanceCode = (instanceCode: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsLoading(true);
    axios
      .get('http://localhost:6060/api/worksheet/check-instance/' + instanceCode)
      .then((response) => {
        setIsLoading(false);
        if (response.data['success']) {
          navigation.navigate('StudentJoinView', {
            sessionCode: instanceCode,
          });
          Toast.show({
            type: 'success',
            text1: '✅ Instance Found',
            text2: 'You will be redirected in a second!',
          });
          setInstanceCode(undefined);
        }
      })
      .catch((error) => {
        console.log(error);
        Toast.show({
          type: 'info',
          text1: '🔎 Instance not found',
          text2: 'No instance with this code found. Please try again!',
        });
        setInstanceCode(undefined);
        setIsLoading(false);
      });
  };

  return (
    <>
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
            Wähle deine Rolle
          </Text>
          <Text style={styles.subTitle}>
            Wähle deine aktuelle Role aus um fohrt zu fahren...
          </Text>
        </View>

        {/* Card Container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 50,
          }}
        >
          {/* Teacher Container */}
          <TouchableOpacity style={styles.card} onPress={() => onAuthorize()}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Lehrer</Text>
              <Text style={styles.subTitle}>
                Als Lehrer besitz du einen eigenen Account über den du in der
                Lage bist Test-Instanzen zu starten.
              </Text>
            </View>

            <AnimatedLottieView
              source={TeacherWithStudentLottie}
              style={{ height: 380, width: '100%' }}
              speed={0.3}
              autoPlay
            />
          </TouchableOpacity>

          {/* Student Container */}
          <View style={styles.card}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Schüler</Text>
              <Text style={styles.subTitle}>
                Gibt hier drunter den Code, ein den du von deinem Lehrer
                bekommen hast.
              </Text>
              {/* TODO: Check for other options, bug on double input and stuff */}
              <OTPInputView
                style={{ width: '100%', height: 60 }}
                pinCount={6}
                autoFocusOnLoad={false}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                code={instanceCode}
                onCodeChanged={(code) => setInstanceCode(code)}
                onCodeFilled={(code) => {
                  checkInstanceCode(code);
                }}
              />
            </View>

            <AnimatedLottieView
              source={StudentLottie}
              style={{ height: 320, width: '100%' }}
              speed={0.3}
              autoPlay
            />
          </View>
        </View>
      </View>
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(255,255,255,0.95)',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
      <Modal isVisible={verifyEmailModalData.shown} animationOut={"fadeOut"}>
        <VerifyEmail onClose={() => {
          setVerifyEmailModalData({ shown: false, onRegister: false })
        }} onRegister={verifyEmailModalData.onRegister} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 500,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '48%',
    padding: 30,
    borderRadius: 20,
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
  titleContainer: { justifyContent: 'center', alignItems: 'center', gap: 5 },
  uploadContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    color: '#16657f',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitle: { fontSize: 13, textAlign: 'center', color: '#545454' },
  underlineStyleBase: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    color: '#000',
    fontSize: 22,
  },
  underlineStyleHighLighted: {
    borderColor: '#000000',
  },
});

export default Welcome;
