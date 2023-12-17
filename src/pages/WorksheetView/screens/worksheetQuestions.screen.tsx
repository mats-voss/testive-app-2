import { StyleSheet, Text, View } from 'react-native';
import BasicHeader from '../../../components/BasicHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AddQuestion } from '../components/addQuestion.component';
import { TaskContainer } from '../components/QuestionContainer/questionContainer.component';
import { useWorksheetViewContext } from '../context/worksheetView.context';
import AnimatedLottieView from 'lottie-react-native';

export function WorksheetQuestionsScreen() {
  const { worksheet, canEdit } = useWorksheetViewContext();

  return (
    <View style={styles.uploadContainer}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={styles.innerContainer}
        style={{ overflow: 'visible', width: '65%' }}
      >
        <BasicHeader
          title={'2. Aufgaben liste'}
          subTitle={'Trage hier grundlegende Informationen zu deinem Test ein.'}
          imageURI={
            'https://assets7.lottiefiles.com/packages/lf20_s72aydoa.json'
          }
        />

        {/* Questions Container */}
        <View style={{ gap: 25 }}>
          {worksheet.tasks?.map((task, index) => (
            <TaskContainer
              task={task}
              taskIndex={index}
              key={task?._id || index}
            />
          ))}
          {worksheet.tasks?.length == 0 && (
            <>
              <AnimatedLottieView
                source={{
                  uri: 'https://assets7.lottiefiles.com/packages/lf20_ydo1amjm.json',
                }}
                style={{ height: 130 }}
                speed={0.5}
              />
              <Text
                style={{ color: '#838383', fontSize: 12, textAlign: 'center' }}
              >
                Du hast bisher noch keine Klassen angelegt
              </Text>
            </>
          )}
        </View>

        {/* Create Question */}
        {canEdit && <AddQuestion />}
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  uploadContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  innerContainer: {
    gap: 30,
    width: '100%',
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
});
