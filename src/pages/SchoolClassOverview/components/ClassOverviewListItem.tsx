import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App';
import { SchoolClass } from '../interfaces/schoolClass.interface';

interface ComponentProps {
  schoolClass: SchoolClass
}

const ClassOverviewListItem = ({ schoolClass }: ComponentProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => {
        navigation.navigate(
          'SchoolClassView',
          { schoolClassId: schoolClass._id }
        )
      }}
    >

      {/* File Display */}
      <View style={styles.iconContainer}>
        <Icon name={'people'} size={45} color={'#fff'}/>
      </View>

      {/* Header */}
      <View style={styles.textContainer}>
        <Text style={{ fontWeight: '600', fontSize: 15 }}>Klasse {schoolClass.year?.name}{schoolClass.identifier}</Text>
        <Text style={{fontWeight: '500', fontSize: 11, color: '#9B9B9B'}}>{schoolClass.students.length} Students</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.3,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 20,
    gap: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: '#acccff',
    borderRadius: 5,
    width: 120,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#91bcff',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 8,
    shadowOpacity: 0.5
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ClassOverviewListItem
