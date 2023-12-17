import { Text, TouchableOpacity, View } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import { VerifyEmailLottie } from '../../../assets/lottiefiles';

type VerifyEmailProps = {
  onClose: () => void;
  onRegister?: boolean
}

export default function VerifyEmail({ onClose, onRegister }: VerifyEmailProps) {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <View style={{
        width: 900,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 50,
        borderRadius: 20
      }}>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            fontFamily: '',
            fontSize: 32,
            fontWeight: '500'
          }}>Verify your email</Text>
          <Text style={{
            fontSize: 16,
            color: '#6e6e6e'
          }}>
            { onRegister ? 'You will need to verify your email to complete registration!' : 'You will need to verify your email before you can login!'}
          </Text>
        </View>

        <AnimatedLottieView
          source={VerifyEmailLottie}
          style={{ height: 400, width: '100%' }}
          speed={0.3}
          autoPlay
        />

        <View style={{
          gap: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{
            fontSize: 14,
            width: 550,
            textAlign: 'center',
            color: '#727272'
          }}>We send you an email with a link to verify your account.
            If you have not received the email after a few minutes, please check your spam folder.</Text>

          <View style={{
            flexDirection: 'row',
            gap: 30,
          }}>
            {/* Done BTN */}
            <TouchableOpacity
              style={{
                width: 200,
                alignItems: 'center',
                paddingVertical: 12,
                backgroundColor: '#0048ff',
                borderWidth: 3,
                borderColor: '#0048ff',
                borderRadius: 8
              }}
              onPress={() => onClose()}
            >
              <Text style={{
                color: '#fff',
                fontWeight: '600',
              }}>Ok!</Text>
            </TouchableOpacity>

            {/* Support BTN */}
            <TouchableOpacity
              style={{
                width: 200,
                alignItems: 'center',
                paddingVertical: 12,
                borderWidth: 3,
                borderColor: '#0048ff',
                borderRadius: 8
              }}
              onPress={() => null}
            >
              <Text style={{
                color: '#0048ff',
                fontWeight: '600',
              }}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
