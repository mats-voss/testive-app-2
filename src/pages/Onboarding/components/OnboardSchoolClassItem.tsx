import { ISchoolClass } from '../interface/schoolClass.interface';
import { useState } from 'react';
import { useOnboardingContext } from '../context/useOnboardingContext';
import uuid from 'react-native-uuid';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';

interface ComponentProps {
  schoolClass: ISchoolClass,
  onClick: () => void,
  isCollapsed: boolean,
  onChange: (school: ISchoolClass) => void
}

const OnboardSchoolClassItem = (
  {
    schoolClass,
    onClick,
    isCollapsed,
    onChange,
  }: ComponentProps
) => {
  const [addStudentInput, setAddStudentInput] = useState({ firstName: '', lastName: '' })
  const { customGradeSchemas, predefinedGradeSchemas } = useOnboardingContext()

  function addStudent(): void {
    onChange({
      ...schoolClass,
      students: [...schoolClass.students, { ...addStudentInput, creationId: uuid.v4().toString() }]
    })
    setAddStudentInput({ firstName: '', lastName: '' })
  }

  function removeUser(creationId?: string): void {
    onChange({
      ...schoolClass,
      students: [...schoolClass.students.filter((student) => student.creationId !== creationId)]
    })
  }

  return (
    <View style={{ flexDirection: 'column' }}>
      {/* Header */}
      <TouchableOpacity onPress={() => onClick()} activeOpacity={0.6} style={{
        backgroundColor: '#fff',
        paddingVertical: 14,
        paddingHorizontal: 22,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 6,
        shadowOpacity: 0.07
      }}>
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15 }}>
            <View style={{
              backgroundColor: '#1874ff',
              borderRadius: 5,
              width: 35,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#1874ff',
              shadowOffset: {
                width: 0,
                height: 0
              },
              shadowRadius: 8,
              shadowOpacity: 0.5
            }}>
              <Icon name={'people'} size={25} color={'#fff'}/>
            </View>
            <Text style={{ fontWeight: '600', fontSize: 15 }}>Klasse {schoolClass.year}{schoolClass.identifier}</Text>
          </View>
          <Icon name={!isCollapsed ? 'chevron-back' : 'chevron-down'} size={18}/>
        </View>
      </TouchableOpacity>
      {/* END Header */}

      {/* Student List */}
      <Collapsible collapsed={!isCollapsed} style={{
        flexDirection: 'row',
        gap: 6,
        flexWrap: 'wrap',
        borderColor: '#fff',
        borderWidth: 0,
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 6,
        shadowOpacity: 0.05
      }}>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          paddingVertical: 7,
          paddingHorizontal: 11,
          borderRadius: 5,
          width: '100%'
        }}>
          <Text><Text style={{ fontWeight: '500' }}>Noten-Schema: </Text> {
            customGradeSchemas.filter((schema) => schema?.creationId == schoolClass.gradeSchema)[0]?.name
            || predefinedGradeSchemas.filter((schema) => schema?._id == schoolClass.gradeSchema)[0]?.name || 'N/A'
          }</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          gap: 6,
          flexWrap: 'wrap',
        }}>
          {schoolClass.students.map(({ firstName, lastName, creationId }) => (
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 3,
              backgroundColor: '#fff',
              alignSelf: 'flex-start',
              paddingVertical: 7,
              paddingHorizontal: 11,
              borderRadius: 5,
            }}>
              <TouchableOpacity onPress={() => removeUser(creationId)}>
                <Icon name={'close'} size={15} color={'#720000'}/>
              </TouchableOpacity>
              <Text>{lastName}, <Text style={{ fontWeight: '500' }}>{firstName}</Text></Text>
            </View>
          ))}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 6,
            backgroundColor: '#fff',
            alignSelf: 'flex-start',
            paddingVertical: 7,
            paddingHorizontal: 11,
            borderRadius: 5,
          }}>
            <View style={{ flexDirection: 'row' }}>
              <TextInput placeholder={'Nach-'} value={addStudentInput.lastName}
                         onChangeText={(i) => setAddStudentInput({ ...addStudentInput, lastName: i })}/>
              <Text>, </Text>
              <TextInput placeholder={'Vorname'} style={{ fontWeight: '500' }} value={addStudentInput.firstName}
                         onChangeText={(i) => setAddStudentInput({ ...addStudentInput, firstName: i })}/>
            </View>
            <TouchableOpacity onPress={() => addStudent()}>
              <Icon name={'person-add'} size={15} color={'#0e9817'} style={{
                shadowColor: '#0e9817',
                shadowOffset: {
                  width: 0,
                  height: 0
                },
                shadowRadius: 6,
                shadowOpacity: 0.5
              }}/>
            </TouchableOpacity>
          </View>
        </View>
      </Collapsible>
      {/* END Student List*/}

    </View>
  )
}

export default OnboardSchoolClassItem
