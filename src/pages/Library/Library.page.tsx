import {
  Image,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatGrid } from 'react-native-super-grid';
import FilterItem from './components/LibraryFilterItem';
import TestItem from './components/TestItem';
import { Tag } from './interfaces/tag.interface';
import { splitToNChunks } from './utils';
import { getAllTagsGroupedByCategory } from './redux/tags.slice';
import { useAppSelector } from '../../redux/reduxHooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useRelatedSubjectTag } from '../../hooks/useRelatedSubjectTag.hook';
import { useRelatedThemeTag } from '../../hooks/useRelatedThemeTag.hook';
import { useMatchWorksheetsToTagFilter } from '../../hooks/useMatchWorksheetsToTagFilter';

const linearGradientColor = [
  'rgba(255, 255, 255, 0.0)',
  'rgba(255, 255, 255, 0.05)',
  'rgba(255, 255, 255, 1)',
];

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Library = ({ navigation }: Props) => {
  const [smallIcons, setSmallIcons] = useState<boolean>(true);

  // Selected Filters
  const [yearTagFilter, setYearTagFilter] = useState<Tag | undefined>(
    undefined,
  );
  const [subjectTagFilter, setSubjectTagFilter] = useState<Tag | undefined>(
    undefined,
  );
  const [themeTagFilter, setThemeTagFilter] = useState<Tag[]>([]);

  const groupedTags = useAppSelector(getAllTagsGroupedByCategory);

  const relatedSubjectTags = useRelatedSubjectTag(yearTagFilter);
  const relatedThemeTags = useRelatedThemeTag(yearTagFilter, subjectTagFilter);

  const filteredWorksheets = useMatchWorksheetsToTagFilter(
    yearTagFilter,
    subjectTagFilter,
    themeTagFilter,
  );

  useEffect(() => {
    if (subjectTagFilter && !relatedSubjectTags.includes(subjectTagFilter)) {
      setSubjectTagFilter(undefined);
    }
  }, [relatedSubjectTags]);

  useEffect(() => {
    const hasInvalidFilter = !themeTagFilter.some((filterTag) => relatedThemeTags.includes(filterTag))
    if (hasInvalidFilter) {
      setThemeTagFilter((state) => {
        return state.filter((filterTag) => relatedThemeTags.includes(filterTag))
      })
    }
  }, [relatedThemeTags])

  const sortedYearTags = groupedTags.year?.sort((a, b) => {
    const yearA = Number(a.name);
    const yearB = Number(b.name);
    return yearA > yearB ? 1 : yearA < yearB ? -1 : 0;
  });

  return (
    <>
      <View style={styles.mainContainer}>
        {/* Grid Content */}
        <View style={{ flex: 1, width: '100%' }}>
          {/* Grid Title + Settings*/}
          <View style={styles.gridHeaderContainer}>
            {/* Grid Title*/}
            <View
              style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
            >
              <FontAwesome
                name={'folder'}
                color={'#488296'}
                size={20}
                style={styles.gridTitleIcon}
              />
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                Your Tests
              </Text>
            </View>

            {/* Grid Settings*/}
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {/* Grid Size Setting */}
              <View style={styles.gridSettingsContainer}>
                <TouchableOpacity
                  onPress={() => setSmallIcons(true)}
                  style={{
                    backgroundColor: smallIcons ? '#e5e5e5' : '#fff',
                    padding: 6,
                    borderRadius: 5,
                  }}
                >
                  <FontAwesome
                    name={'th'}
                    size={20}
                    color={smallIcons ? '#58acc9' : '#000'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSmallIcons(false)}
                  style={{
                    backgroundColor: smallIcons ? '#fff' : '#e5e5e5',
                    padding: 6,
                    borderRadius: 5,
                  }}
                >
                  <FontAwesome
                    name={'th-large'}
                    size={20}
                    color={smallIcons ? '#000' : '#58acc9'}
                  />
                </TouchableOpacity>
              </View>

              {/* Create new button */}
              <TouchableOpacity
                style={styles.createNewBtn}
                onPress={() =>
                  navigation.navigate('WorksheetView', {
                    worksheetId: undefined,
                  })
                }
              >
                <FontAwesome name={'plus-square-o'} size={23} color={'white'} />
                <Text style={styles.createNewBtnText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tests-File grid */}
          <FlatGrid
            itemDimension={smallIcons ? 180 : 200}
            data={filteredWorksheets}
            style={{ width: '100%', flex: 1 }}
            spacing={10}
            renderItem={({ item }) => (
              <TestItem
                worksheet={item}
                onPress={() => {
                  navigation.navigate('WorksheetView', {
                    worksheetId: item._id,
                  });
                }}
              />
            )}
          />
        </View>

        {/* Right Container */}
        <View
          style={{
            width: 300,
            flexDirection: 'column',
            gap: 10,
            paddingBottom: 20,
          }}
        >
          {/* Filters */}
          <View style={styles.globalFilterContainer}>
            {/* Jahrgänge */}
            <View style={styles.filterContainer}>
              <Text style={styles.filterHeader}>
                Jahrgänge ({groupedTags.year?.length || 0})
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 5 }}
              >
                {sortedYearTags?.map((yearTag: Tag) => (
                  <FilterItem
                    key={yearTag._id}
                    text={yearTag.name}
                    isSelected={yearTagFilter == yearTag}
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut,
                      );
                      if (yearTagFilter == yearTag) setYearTagFilter(undefined);
                      else setYearTagFilter(yearTag);
                    }}
                  />
                ))}
              </ScrollView>

              <LinearGradient
                style={[styles.filterLinearGradiant, { height: '70%' }]}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={linearGradientColor}
                pointerEvents={'none'}
              />
            </View>

            {/* Fächer */}
            <View style={styles.filterContainer}>
              <Text style={styles.filterHeader}>
                Fächer ({relatedSubjectTags?.length || 0})
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexDirection: 'column', gap: 5 }}
              >
                {relatedSubjectTags &&
                  splitToNChunks(relatedSubjectTags, 2).map(
                    (chunk: Tag[], index) => (
                      <View key={index} style={styles.innerFilterContainer}>
                        {chunk.map((subject) => (
                          <FilterItem
                            key={subject._id}
                            text={subject.name}
                            isSelected={subject === subjectTagFilter}
                            onPress={() => {
                              LayoutAnimation.configureNext(
                                LayoutAnimation.Presets.easeInEaseOut,
                              );
                              if (subject === subjectTagFilter)
                                setSubjectTagFilter(undefined);
                              else setSubjectTagFilter(subject);
                            }}
                          />
                        ))}
                      </View>
                    ),
                  )}
              </ScrollView>

              <LinearGradient
                style={[styles.filterLinearGradiant, { height: '80%' }]}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={linearGradientColor}
                pointerEvents={'none'}
              />
            </View>

            {/* Theme */}
            <View style={[styles.filterContainer, { flex: 1 }]}>
              <Text style={styles.filterHeader}>
                Themen ({relatedThemeTags?.length || 0})
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexDirection: 'column', gap: 5 }}
              >
                {relatedThemeTags &&
                  splitToNChunks(relatedThemeTags, 4).map(
                    (chunk: Tag[], index) => (
                      <View key={index} style={styles.innerFilterContainer}>
                        {chunk.map((theme) => (
                          <FilterItem
                            key={theme._id}
                            text={theme.name}
                            isSelected={themeTagFilter.includes(theme)}
                            onPress={() => {
                              LayoutAnimation.configureNext(
                                LayoutAnimation.Presets.easeInEaseOut,
                              );
                              if (themeTagFilter.includes(theme)) {
                                setThemeTagFilter((state) =>
                                  state.filter(
                                    (stateTag) => stateTag !== theme,
                                  ),
                                );
                              } else
                                setThemeTagFilter((state) => [...state, theme]);
                            }}
                          />
                        ))}
                      </View>
                    ),
                  )}
              </ScrollView>

              <LinearGradient
                style={[styles.filterLinearGradiant, { height: '92%' }]}
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={linearGradientColor}
                pointerEvents={'none'}
              />
            </View>
          </View>

          {/* Details/Placeholder Picture */}
          <View style={styles.testDetailsContainer}>
            <TouchableOpacity>
              <Image
                source={require('../../../assets/spaceholder001.jpg')}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff', //f8f8f8
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  gridHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
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
  gridSettingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#cccccc',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  globalFilterContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    height: 370,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
    borderWidth: 0.5,
    borderColor: '#cccccc',
  },
  filterContainer: { gap: 5 },
  filterHeader: { fontWeight: 'bold' },
  filterLinearGradiant: {
    position: 'absolute',
    right: -1,
    bottom: 0,
    width: 50,
  },
  innerFilterContainer: { gap: 5, flexDirection: 'row' },
  testDetailsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'column',
    borderWidth: 0.5,
    borderColor: '#cccccc',
    flexGrow: 1,
    flex: 1,
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
  shadow: {
    shadowColor: '#488296',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default Library;
