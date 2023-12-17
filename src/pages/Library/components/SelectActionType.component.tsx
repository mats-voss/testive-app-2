import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../../../../App';
import { useTestSessionContext } from '../../StartTestSession/context/testSession.context';

type ComponentTypes = {
  worksheetId: string;
  onDismiss: () => void;
};

export function SelectActionType({
  worksheetId,
  onDismiss: onDismiss,
}: ComponentTypes) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        backgroundColor: '#ffffffd2',
        borderRadius: 5,
      }}
    >
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => {
          navigation.navigate('WorksheetView', {
            worksheetId,
          });
          onDismiss();
        }}
      >
        <Icon size={20} name="pencil-outline" />
        <Text style={{ fontSize: 22 }}>Bearbeiten</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => {
          navigation.navigate('StartTestSession', {
            worksheetId,
          });
          onDismiss();
        }}
      >
        <Icon size={20} name="bookmarks-outline" />
        <Text style={{ fontSize: 22 }}>Schreiben</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
});
