import { StyleSheet, View } from 'react-native';
import BasicHeader from '../../../components/BasicHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BasicInput from '../../../components/BasicInput';
import { useAppSelector } from '../../../redux/reduxHooks';
import { getAllTagsByCategory } from '../../Library/redux/tags.slice';
import { TagCategory } from '../../Library/interfaces/TagCategory.enum';
import SingleSelectSlider from '../../../components/SingleSelectSlider/SingleSelectSlider';
import { useSchoolClassViewContext } from '../context/schoolClassView.context';
import { getAllSchemata } from '../../GradeSchema/redux/gradeSchema.slice';
import BasicSubHeader from '../../../components/BasicSubHeader';

const BasicSchoolClassDataScreen = () => {
  const { schoolClass, canEdit, setSchoolClass } = useSchoolClassViewContext()
  const yearTags = useAppSelector((state) => getAllTagsByCategory(state, TagCategory.YEAR))
  const gradeSchemata = useAppSelector(getAllSchemata)

  return (
    <View style={styles.uploadContainer}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}
                               keyboardShouldPersistTaps={'always'}
                               contentContainerStyle={styles.innerContainer}>
        <BasicHeader
          title={'Basic Data'}
          subTitle={'Here you can specify some basic information about your class that will later be used to write test and manage your grades.'}
          imageURI={'https://assets6.lottiefiles.com/packages/lf20_2Ax8ac7fOD.json'}/>

        <View style={{ gap: 10 }}>
          {/* Year and Identifier */}
          <View style={styles.doubleInputContainer}>
            <BasicInput
              isRequired
              value={schoolClass.year?.name || ''}
              readOnly={!canEdit}
              onChangeText={(i) => setSchoolClass({
                ...schoolClass,
                year: {
                  _id: undefined,
                  name: i,
                  category: TagCategory.YEAR
                }
              })
              }
              header={'Year'}
              placeholder={''}
              style={{ flex: 1 }}
              suggestions={yearTags?.map((tag) => tag.name)}/>

            <BasicInput
              isRequired
              readOnly={!canEdit}
              value={schoolClass.identifier || ''}
              onChangeText={(i) => setSchoolClass({ ...schoolClass, identifier: i })}
              header={'Identifier'}
              style={{ flex: 1 }}
              placeholder={''}/>
          </View>

          <View style={{ gap: 10 }}>
            <BasicSubHeader title={'Grade-Schema'} subTitle={'Here you can select the Grade-Schema you want to use for this class. If you cant find the right one here, you can go back and create a new one.'} />
            <SingleSelectSlider
              isRequired
              onSelect={(i) => setSchoolClass({
                ...schoolClass,
                gradeSchema: i._id
              })}
              readOnly={!canEdit}
              options={gradeSchemata.map((schema) => ({ _id: schema._id!, label: schema.name }))}
              selectedOption={schoolClass?.gradeSchema ? {
                _id: schoolClass!.gradeSchema,
                label: gradeSchemata.find((schema) => schema._id === schoolClass.gradeSchema)!.name
              } : undefined} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  uploadContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  innerContainer: {
    gap: 30,
    width: '65%',
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 80
  },
  doubleInputContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  }
})

export default BasicSchoolClassDataScreen
