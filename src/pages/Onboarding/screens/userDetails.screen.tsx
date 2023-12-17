import { StyleSheet, Text, View } from 'react-native';
import BasicInput from '../../../components/BasicInput';
import TagInput from '../../../components/TagInput/TagInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useOnboardingContext } from '../context/useOnboardingContext';
import BasicHeader from '../../../components/BasicHeader';

const UserDetailsScreen = () => {
  const { userDetails, setUserDetails } = useOnboardingContext()

  return (
    <View style={styles.uploadContainer}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}
                               keyboardShouldPersistTaps={'always'}
                               contentContainerStyle={styles.innerContainer}>

        {/* Title */}
        <BasicHeader
          title={'About You'}
          subTitle={'Hier dreht sich alles um dich. Um dir den perfekten start in eine Korigierfreie Zeit zu ermöglichen, brauchen wir noch ein paar infos über dich.'}
          imageURI={'https://assets3.lottiefiles.com/packages/lf20_hl1cxbdk.json'} />
        {/* END Title*/}

        {/* User Details Container - first/last/school-name */}
        <View style={{ gap: 10 }}>
          <View style={styles.nameInputContainer}>
            <BasicInput onChangeText={(i) => setUserDetails({ ...userDetails, firstName: i })}
                        header={'Vorname'}
                        placeholder={'Max'}
                        style={{ flex: 1 }}/>
            <BasicInput onChangeText={(i) => setUserDetails({ ...userDetails, lastName: i })}
                        header={'Nachname'}
                        placeholder={'Musterman'}
                        style={{ flex: 1 }}/>
          </View>
          <BasicInput onChangeText={(i) => setUserDetails({ ...userDetails, school: i })}
                      header={'Schule'}
                      placeholder={'Testive Gemeinschaftsschule'}
                      isRequired={false}/>
        </View>
        {/* END User Details Container */}

        {/* Subjects Input Container */}
        <View>
          <View style={{ gap: 5 }}>
            <Text style={styles.subjectsHeader}>Deine Fächer</Text>
            <Text style={styles.subjectSubtitle}>Füge hier alle deine Fächer hinzu die du unterichtest,
              indem du entweder unsere vorschläge anklickst oder deine Fächer selber einträgst. Die Fächer kannst du
              später zum sortieren und zuortnen deiner Tests nutzen.</Text>
          </View>
          {/* TODO: Rework! */}
          <TagInput
            title={''}
            placeholder={'Fach-Name'}
            tagSuggestions={[]}
            tags={[]}
            setTags={(tags) => setUserDetails({ ...userDetails, subjects: tags })}/>
        </View>
        {/* END Subjects Input Container */}
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
  nameInputContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
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

export default UserDetailsScreen
