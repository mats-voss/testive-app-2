import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ClassOverviewListItem from './components/ClassOverviewListItem';
import { useAppSelector } from '../../redux/reduxHooks';
import { getAllClasses } from './redux/schoolClass.slice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'SchoolClassOverview'>;

const SchoolClassOverview = ({ navigation }: Props) => {
  const schoolClasses = useAppSelector(getAllClasses)

  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.gridHeaderContainer}>

        {/* Grid Title*/}
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <FontAwesome
            name={'group'}
            color={'#488296'}
            size={18}
            style={styles.gridTitleIcon}/>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Your School-Classes</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          {/* Create new button */}
          <TouchableOpacity style={styles.createNewBtn} onPress={() => navigation.navigate('SchoolClassView', {
            schoolClassId: undefined
          })}>
            <FontAwesome name={'plus-square-o'} size={23} color={'white'}/>
            <Text style={styles.createNewBtnText}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Class Flat-List */}
      <ScrollView contentContainerStyle={{ gap: 25 }}>
        {
          [...new Set(schoolClasses.map((schoolClass) => schoolClass.year?.name))].map((yearTagName) => {
            const classes = schoolClasses.filter((schoolClass) => schoolClass.year?.name === yearTagName)
            return (
              <View key={yearTagName} style={{ gap: 5 }}>
                <Text style={{ fontWeight: '500', fontSize: 22, marginTop: 20 }}><Text
                  style={{ fontWeight: '800' }}>{yearTagName}.</Text> Jahrgang</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
                  {classes.sort((a, b) => {
                    const identifierA = a.identifier!
                    const identifierB = b.identifier!
                    return (identifierA > identifierB) ? 1 : (identifierA < identifierB) ? -1 : 0
                  }).map((classItem) => (
                    <ClassOverviewListItem key={classItem._id} schoolClass={classItem}/>
                  ))}
                </View>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff', //f8f8f8
    flex: 1,
    flexDirection: 'column',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 30
  },
  gridHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40
  },
  gridTitleIcon: {
    borderColor: '#797979',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    shadowColor: '#488296',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  createNewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#7cc3e0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    shadowColor: '#7cc3e0',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  createNewBtnText: { fontSize: 15, fontWeight: 'bold', color: 'white' },
})

export default SchoolClassOverview
