import { StyleSheet, View } from 'react-native';
import BasicHeader from '../../../components/BasicHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BasicInput from '../../../components/BasicInput';
import { useWorksheetViewContext } from '../context/worksheetView.context';
import BasicSubHeader from '../../../components/BasicSubHeader';
import TagInput from '../../../components/TagInput/TagInput';
import { TagCategory } from '../../Library/interfaces/TagCategory.enum';
import { useAppSelector } from '../../../redux/reduxHooks';
import { getAllTagsGroupedByCategory } from '../../Library/redux/tags.slice';
import { Tag } from '../../Library/interfaces/tag.interface';

export function BasicWorksheetDataScreen() {
  const { worksheet, setWorksheet, canEdit } = useWorksheetViewContext();
  const groupedTags = useAppSelector(getAllTagsGroupedByCategory);

  function setTags(tags: Tag[], category: TagCategory) {
    setWorksheet({
      ...worksheet,
      tags: [
        ...(worksheet?.tags?.filter((tag) => tag.category !== category) || []),
        ...tags,
      ],
    });
  }

  return (
    <View style={styles.uploadContainer}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={styles.innerContainer}
      >
        <BasicHeader
          title={'1. Test-Setup'}
          subTitle={
            'Trage hier grundlegende Informationen zu deinem Test ein. Diese werden später gebraucht um deine Test zu sortieren und zu Organisieren.'
          }
          imageURI={
            'https://assets6.lottiefiles.com/packages/lf20_2Ax8ac7fOD.json'
          }
        />

        <BasicInput
          isRequired
          readOnly={!canEdit}
          value={worksheet?.name || ''}
          onChangeText={(i) => setWorksheet({ ...worksheet, name: i })}
          placeholder={'Name'}
          header={'Name'}
        />

        <View style={{ gap: 10 }}>
          <BasicSubHeader
            title={'Test zugehörigkeiten'}
            subTitle={
              'Hier kannst du die Zugehörigkeit deines Test bestimmen, indem du einen oder mehrere Jahrgänge, Fächer und Themen hinzufügst. Dies ist nützlich um Tests später einfach finden und zuordnen zu können.'
            }
          />
          <View style={styles.multiInputContainer}>
            <TagInput
              readOnly={!canEdit}
              style={{ flex: 1 }}
              title={'Jahrgang'}
              placeholder={'-'}
              tagCategory={TagCategory.YEAR}
              tags={
                worksheet?.tags?.filter(
                  (tag) => tag?.category === TagCategory.YEAR,
                ) || []
              }
              tagSuggestions={groupedTags.year}
              setTags={(tags) => setTags(tags, TagCategory.YEAR)}
            />

            <TagInput
              readOnly={!canEdit}
              style={{ flex: 1 }}
              title={'Fach'}
              placeholder={'-'}
              tagCategory={TagCategory.SUBJECT}
              tags={
                worksheet?.tags?.filter(
                  (tag) => tag?.category === TagCategory.SUBJECT,
                ) || []
              }
              tagSuggestions={groupedTags.subject}
              setTags={(tags) => setTags(tags, TagCategory.SUBJECT)}
            />
          </View>
          <TagInput
            readOnly={!canEdit}
            style={{ flex: 1 }}
            title={'Thema'}
            placeholder={'-'}
            tagCategory={TagCategory.THEME}
            tags={
              worksheet?.tags?.filter(
                (tag) => tag?.category === TagCategory.THEME,
              ) || []
            }
            tagSuggestions={groupedTags.theme}
            setTags={(tags) => setTags(tags, TagCategory.THEME)}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
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
    paddingBottom: 80,
  },
  multiInputContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },
});
