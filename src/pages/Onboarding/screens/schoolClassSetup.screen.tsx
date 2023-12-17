import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import BasicInput from '../../../components/BasicInput';
import { SelectList } from 'react-native-dropdown-select-list/index';
import { useOnboardingContext } from '../context/useOnboardingContext';
import uuid from 'react-native-uuid';
import OnboardSchoolClassItem from '../components/OnboardSchoolClassItem';
import BasicHeader from '../../../components/BasicHeader';

const SchoolClassSetupScreen = () => {
  const [collapsedIndex, setCollapsedIndex] = useState<number | null>(0)

  const [createClassInputs, setCreateClassInputs] = useState<{
    year: string,
    identifier: string,
    gradeSchema: string
  }>({ year: '', gradeSchema: '', identifier: '' })

  const { schoolClasses, setSchoolClasses, customGradeSchemas, predefinedGradeSchemas } = useOnboardingContext()

  return (
    <View style={styles.uploadContainer}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}
                               keyboardShouldPersistTaps={'always'}
                               contentContainerStyle={styles.innerContainer}>

        {/* Title */}
        <BasicHeader
          title={'Deine Schullklassen'}
          subTitle={'Hier dreht sich alles um dich. Um dir den perfekten start in eine Korigierfreie Zeit zu ermöglichen, brauchen wir noch ein paar infos über dich.'}
          imageURI={'https://assets8.lottiefiles.com/packages/lf20_bjyiojos.json'} />
        {/* END Title*/}

        {/* Class List */}
        <View style={{ flexDirection: 'column', gap: 10 }}>
          {schoolClasses.length > 0 ? schoolClasses?.map((schoolClass, i) => (
            <OnboardSchoolClassItem schoolClass={schoolClass}
                             onClick={() => collapsedIndex === i ? setCollapsedIndex(null) : setCollapsedIndex(i)}
                             isCollapsed={collapsedIndex === i}
                             onChange={(editedSchoolClass) => setSchoolClasses(
                               [...schoolClasses.filter((filterClass) => filterClass.creationId !== editedSchoolClass.creationId), editedSchoolClass]
                             )}
            />
          )) : (
            <>
              <AnimatedLottieView source={{ uri: 'https://assets7.lottiefiles.com/packages/lf20_ydo1amjm.json' }}
                                  style={{ height: 130 }} speed={0.5}/>
              <Text style={{ color: '#838383', fontSize: 12, textAlign: 'center' }}>Du hast bisher noch keine Klassen
                angelegt</Text>
            </>
          )}
        </View>
        {/* END Class List */}

        <View style={{ gap: 10 }}>
          <View style={{ gap: 5 }}>
            <Text style={styles.subjectsHeader}>Klasse hinzufügen</Text>
            <Text style={styles.subjectSubtitle}>Füge hier alle deine Fächer hinzu die du unterichtest,
              indem du entweder unsere vorschläge anklickst oder deine Fächer selber einträgst. Die Fächer kannst du
              später zum sortieren und zuortnen deiner Tests nutzen.</Text>
          </View>

          <View style={{ flexDirection: 'row', width: '100%', gap: 10 }}>
            <View style={{ flexDirection: 'row', flex: 1, gap: 10 }}>
              <BasicInput
                onChangeText={(i) => setCreateClassInputs({ ...createClassInputs, year: i })}
                header={'Jahrgang'}
                placeholder={'9'}
                value={createClassInputs.year}
                style={{ flex: 1 }}/>
              <BasicInput
                onChangeText={(i) => setCreateClassInputs({ ...createClassInputs, identifier: i })}
                header={'Kürzel'}
                placeholder={'E'}
                value={createClassInputs.identifier}
                style={{ flex: 1 }}/>
            </View>
            <View style={{ width: '50%', flexDirection: 'column', gap: 5 }}>
              <Text style={{ fontWeight: '500', fontSize: 14 }}>Notenschema<Text
                style={{ color: '#a80000', fontWeight: '600' }}>*</Text></Text>
              <SelectList
                boxStyles={{
                  borderRadius: 5,
                  paddingVertical: 10.5,
                  paddingHorizontal: 10.5,
                  borderWidth: 0.5,
                  backgroundColor: '#fff'
                }}
                inputStyles={{ fontSize: 14 }}
                setSelected={(val: string) => setCreateClassInputs({ ...createClassInputs, gradeSchema: val })}
                data={[
                  ...predefinedGradeSchemas.map((schema) => {
                    return { value: schema.name, key: schema?._id };
                  }),
                  ...customGradeSchemas.map((schema) => {
                    return { value: schema.name, key: schema?.creationId, type: 'custom' };
                  })
                ]}
                notFoundText={'Kein Schema Gefunden!'}
                placeholder={'Wähle ein Schema...'}
                save={'key'}/>
            </View>
          </View>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 8,
              borderRadius: 10,
              backgroundColor: '#fff',
              opacity: 1,
              gap: 3,
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 8,
              shadowOffset: {
                width: 0,
                height: 0
              }
            }}
            onPress={() => {
              setSchoolClasses([...schoolClasses, {
                year: createClassInputs.year,
                identifier: createClassInputs.identifier,
                creationId: uuid.v4().toString(),
                gradeSchema: createClassInputs.gradeSchema,
                students: []
              }])
              setCreateClassInputs({
                year: '',
                identifier: '',
                gradeSchema: ''
              })
            }}
          >
            <Icon name={'add-circle'} size={25} color={'#4fec39'}/>
            <Text>Klasse erstellen</Text>
          </TouchableOpacity>
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
    width: '70%',
    paddingTop: 30,
    paddingBottom: 80,
    paddingHorizontal: 20
  },
  headerContainer: {
    alignItems: 'center',
    gap: 15
  },
  header: {
    fontSize: 30,
    fontWeight: '600'
  },
  headerSubtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#5d5d5d',
    lineHeight: 20
  },
  subjectsHeader: {
    fontWeight: '600',
    fontSize: 18
  },
  subjectSubtitle: {
    color: '#484848',
    fontSize: 13
  }
})

export default SchoolClassSetupScreen
