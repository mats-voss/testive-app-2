import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AnimatedLottieView from 'lottie-react-native';
import GradeSchemaAccordion from '../components/GradeSchemaAccordion';
import Icon from 'react-native-vector-icons/Ionicons';
import BasicInput from '../../../components/BasicInput';
import { useOnboardingContext } from '../context/useOnboardingContext';
import { useState } from 'react';
import uuid from 'react-native-uuid';
import BasicHeader from '../../../components/BasicHeader';

const GradeSchemaSetupScreen = () => {
  const { customGradeSchemas, setCustomGradeSchemas, predefinedGradeSchemas } = useOnboardingContext()

  const [createSchemaName, setCreateSchemaName] = useState<string>('')

  return (
    <View style={styles.uploadContainer}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}
                               keyboardShouldPersistTaps={'always'}
                               contentContainerStyle={styles.innerContainer}>

        {/* Title */}
        <BasicHeader
          title={'Deine Notenschema'}
          subTitle={'Um in echtzeit eine Note berechnen zu können brauchen wir ein Notenschema. Die Notenschemata werden später pro Klassen zugeordnet.'}
          imageURI={'https://assets9.lottiefiles.com/packages/lf20_hcwpcdew.json'} />
        {/* END Title*/}

        {/* Pre-Defined grade schemas */}
        <View style={{ gap: 10 }}>
          <Text style={styles.subjectsHeader}>Vordefinirte Schemas</Text>
          <View style={{ flexDirection: 'column', gap: 5 }}>
            {predefinedGradeSchemas.map((gradeSchema, i) => (
              <GradeSchemaAccordion
                key={i}
                gradeSchema={gradeSchema}
                onSchemaChange={() => null}
              />
            ))}
          </View>
        </View>
        {/* END Pre-Defined grade schemas */}

        {/* Custom grade schemas */}
        <View style={{ gap: 10 }}>
          <Text style={styles.subjectsHeader}>Eigene Schemas</Text>
          <View style={{ flexDirection: 'column', gap: 5 }}>
            {customGradeSchemas.length > 0 ? customGradeSchemas.map((gradeSchema, i) => (
              <GradeSchemaAccordion
                key={i}
                gradeSchema={gradeSchema}
                onSchemaChange={() => null}
              />
            )) : (
              <>
                <AnimatedLottieView source={{ uri: 'https://assets7.lottiefiles.com/packages/lf20_ydo1amjm.json' }}
                                    style={{ height: 130 }} speed={0.5}/>
                <Text style={{color: '#838383', fontSize: 12, textAlign: 'center'}}>Du hast bisher noch keine einen Schema angelegt</Text>
              </>
            )}
          </View>
        </View>
        {/* END Custom grade schemas */}

        {/* Subjects Input Container */}
        <View style={{ gap: 15 }}>
          <View style={{ gap: 5 }}>
            <Text style={styles.subjectsHeader}>Schema hinzufügen</Text>
            <Text style={styles.subjectSubtitle}>Solltest du unter den oben gelisten Schematas nicht das richtige
              gefunden haben,
              hast du hier die Möglichkeit ein eigenes zu erstellen. Du kannst auch später in den Einstellungen deine
              Schemata bearbeiten und neue erstellen.</Text>
          </View>

          <View style={{ flexDirection: 'column', gap: 5 }}>
            <BasicInput onChangeText={(i) => setCreateSchemaName(i)} header={'Schema-Name'} placeholder={'E/G'} style={{ flex: 1 }} value={createSchemaName} />
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 8,
                borderRadius: 10,
                backgroundColor: '#fff',
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
                setCustomGradeSchemas([...customGradeSchemas, {
                  name: createSchemaName,
                  creationId: uuid.v4().toString(),
                  schema: [
                    { minPercentage: 0, grade: ''},
                    { minPercentage: undefined, grade: ''}
                  ]
                }])
                setCreateSchemaName('')
              }}
            >
              <Icon name={'add-circle'} size={25} color={'#4fec39'}/>
              <Text>Schema erstellen</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* END Subjects Input Container */}

      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  uploadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerContainer: {
    gap: 30,
    width: '70%',
    paddingTop: 30,
    paddingBottom: 80,
    paddingHorizontal: 20
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

export default GradeSchemaSetupScreen
