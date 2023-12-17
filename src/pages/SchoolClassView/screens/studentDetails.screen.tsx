import { StyleSheet, View } from 'react-native';
import BasicHeader from '../../../components/BasicHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BasicSubHeader from '../../../components/BasicSubHeader';
import BasicInput from '../../../components/BasicInput';
import BasicButton from '../../../components/BasicButton';
import { useSchoolClassViewContext } from '../context/schoolClassView.context';
import { useState } from 'react';
import { Student } from '../../SchoolClassOverview/interfaces/student.interface';

const StudentDetailsScreen = () => {
  const { schoolClass, setSchoolClass, canEdit } = useSchoolClassViewContext()
  const [addStudentValues, setAddStudentValues] = useState({ firstName: '', lastName: '' })

  function addStudent() {
    setSchoolClass({
      ...schoolClass!,
      students: [
        ...schoolClass?.students || [],
        {
          firstName: addStudentValues.firstName,
          lastName: addStudentValues.lastName
        }]
    })
    setAddStudentValues({ firstName: '', lastName: '' })
  }
  function removeStudent(student: Student) {
    const filteredStudents = schoolClass?.students?.filter((filterStudent) => filterStudent !== student)

    setSchoolClass({
      ...schoolClass,
      students: filteredStudents
    })
  }

  return (
    <View style={styles.uploadContainer}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}
                               keyboardShouldPersistTaps={'always'}
                               contentContainerStyle={styles.innerContainer}>
        <BasicHeader
          title={'Student Details'}
          subTitle={'Here you can define all students of the class. The students will later be used, among other things, to identify the individual students behind their iPads.'}
          imageURI={'https://assets5.lottiefiles.com/packages/lf20_xY418y0j6x.json'}/>

        {canEdit && (
          <View style={{ gap: 10 }}>
            <BasicSubHeader title={'Create Student'} subTitle={'Here you can add new Students to the current class.'}/>
            <View style={styles.fullWidthRow}>
              <BasicInput
                placeholder={'Max'}
                value={addStudentValues.firstName}
                onChangeText={(i) => setAddStudentValues({ ...addStudentValues, firstName: i })}
                style={{ flex: 1 }}
              />
              <BasicInput
                placeholder={'Musterman'}
                value={addStudentValues.lastName}
                onChangeText={(i) => setAddStudentValues({ ...addStudentValues, lastName: i })}
                style={{ flex: 1 }}
              />
              <BasicButton
                disabled={addStudentValues.lastName == '' || addStudentValues.firstName == ''}
                title={'Add'}
                icon={'add'}
                color={'#ffeebc'}
                shadowColor={'rgba(255,185,0,0.2)'}
                onPress={() => addStudent()}
              />
            </View>
          </View>
        )}

        <View style={{ gap: 10 }}>
          <BasicSubHeader title={'Student List'}
                          subTitle={'Here you find all the Students participating in this class.'}/>
          <View style={{ gap: 5 }}>
            {schoolClass?.students?.map((student, index) => (
              <View style={styles.fullWidthRow} key={student._id || index}>
                <BasicInput
                  readOnly
                  onChangeText={() => null}
                  placeholder={''}
                  value={student.firstName}
                  style={{ flex: 1 }}
                />
                <BasicInput
                  readOnly
                  onChangeText={() => null}
                  placeholder={''}
                  value={student.lastName}
                  style={{ flex: 1 }}
                />
                {canEdit && (
                  <BasicButton
                    title={''}
                    icon={'trash'}
                    color={'#ffbcbc'}
                    shadowColor={'rgba(255,188,188,0.2)'}
                    onPress={() => removeStudent(student)}
                  />
                )}
              </View>
            ))}
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
  fullWidthRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  }
})

export default StudentDetailsScreen
