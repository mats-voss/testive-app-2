import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import {
  MultiPageScreenProps
} from '../../components/MultPageContainer/interfaces/MultiPageScreenProps';
import { ActivityIndicator, Alert, LayoutAnimation } from 'react-native';
import MultiPageContainer
  from '../../components/MultPageContainer/MultiPageContainer';
import { useEffect, useState } from 'react';
import FadeInView from '../../components/FadeInView';
import {
  useWorksheetViewContext,
  WorksheetViewContextProvider,
} from './context/worksheetView.context';
import { Worksheet } from './interface/worksheet.interface';
import { BasicWorksheetDataScreen } from './screens/basicWorksheetData.screen';
import { WorksheetQuestionsScreen } from './screens/worksheetQuestions.screen';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import {
  createWorksheet,
  deleteWorksheet,
  saveEditedWorksheet,
} from './redux/worksheet.slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import {
  fetchAllTags,
  getAllTags,
} from '../Library/redux/tags.slice';
import { backendInstance } from '../../axios/instance.axios';
import { Tag } from '../Library/interfaces/tag.interface';
import { WorksheetDTO } from './interface/worksheetDto.interface';

type Props = NativeStackScreenProps<RootStackParamList, 'WorksheetView'>;

const WorksheetViewContent = ({ route, navigation }: Props) => {
  const {
    canEdit,
    setCanEdit,
    worksheet,
    isWorksheetValid,
    setWorksheet,
    rawAttachments,
    setRawAttachments,
  } = useWorksheetViewContext();
  const dispatch = useAppDispatch();
  const tags = useAppSelector(getAllTags)

  const [worksheetId, setWorksheetId] = useState<string | undefined>(
    route.params?.worksheetId,
  );
  const [interactionButtons, setInteractionButtons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showLoadingComponent, setShowLoadingComponent] =
    useState<boolean>(false);

  async function populateAndFetchTags(worksheetIds: string[]): Promise<Tag[]> {
    let updatedTags = tags;
    const tagsMissingInState = worksheetIds.filter((tagId) => !tags.some((stateTag) => stateTag._id == tagId))
    if (tagsMissingInState.length > 0) {
      const fetchTagsResponse = await dispatch(fetchAllTags())
      updatedTags = unwrapResult(fetchTagsResponse)
    }

    return worksheetIds.map((tagId) => {
      const populatedTag = updatedTags.find((tag) => tag._id == tagId) || null;
      if (!populatedTag) throw new Error('Invalid Tag!')
      return populatedTag
    })
  }

  const writeInteractionButton = {
    title: 'Test Schrieben',
    isActive: Boolean(worksheetId != undefined),
    icon: 'school',
    color: '#d2ffbc',
    shadowColor: 'rgba(210,255,188,0.2)',
    onPress: () => {
      if (worksheetId) {
        navigation.navigate('StartTestSession', {
          worksheetId
        });
      } else {
        navigation.goBack();
        Toast.show({
          type: 'error',
          text1: 'Unbekannter Fehler!',
          text2: 'Bitte probiere es erneut.'
        })
      }
    },
  };
  const deleteInteractionButton = {
    title: 'Delete',
    isActive: true,
    icon: 'trash',
    color: '#ffbcbc',
    shadowColor: 'rgba(255,188,188,0.2)',
    onPress: () => {
      Alert.alert('Delete Class', 'Do you really want to delete the class?', [
        {
          onPress: () => null,
          style: 'cancel',
          text: 'Cancel',
          isPreferred: true,
        },
        {
          onPress: () => {
            if (worksheetId) {
              console.log('[WorksheetView] Deleted process started...');
              setIsLoading(true);
              dispatch(deleteWorksheet(worksheetId)).then(() => {
                navigation.goBack();
                Toast.show({
                  type: 'success',
                  text1: 'Erfolgreich gelöscht!',
                  text2: 'Der Text wurde erfolgreich gelöscht.',
                });
              });
            }
          },
          style: 'destructive',
          text: 'Delete',
          isPreferred: false,
        },
      ]);
    },
  };
  const editInteractionButton = {
    title: 'Edit',
    isActive: true,
    icon: 'create',
    color: '#ffeebc',
    shadowColor: 'rgba(255,185,0,0.2)',
    onPress: () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setCanEdit(true);
    },
  };
  const saveInteractionButton = {
    title: 'Save',
    isActive: true,
    icon: 'save',
    color: '#daffbc',
    shadowColor: 'rgba(218,255,188,0.2)',
    onPress: () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsLoading(true);
      console.log('[WorksheetView] Edit process started...');

      async function saveWorksheetAsync() {
        try {
          const response = await dispatch(saveEditedWorksheet({
            worksheet,
            rawAttachments
          }))
          const savedWorksheet = unwrapResult(response);

          const populatedTags = await populateAndFetchTags(savedWorksheet.tags as unknown as string[])

          setWorksheet({
            ...savedWorksheet,
            tags: populatedTags
          });
          setCanEdit(false);
          setRawAttachments([]);
          setWorksheetId(savedWorksheet._id);
          setIsLoading(false);
          Toast.show({
            type: 'success',
            text1: 'Test gespeichert!',
            text2: 'Alle änderungen wurden erfolgreich gespeichert.',
          });
        } catch (error) {
          setIsLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Invalide Eingaben!',
            text2: 'Bitte überprüfe deine eingeaben!',
          });
        }
      }
      saveWorksheetAsync()
    },
  };
  const createInteractionButton = {
    title: 'Create',
    isActive: true,
    icon: 'send',
    color: '#daffbc',
    shadowColor: 'rgba(218,255,188,0.2)',
    onPress: () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      console.log('[WorksheetView] Creation button pressed');
      if (worksheet) {
        setIsLoading(true);
        console.log('[WorksheetView] Creation process started...');

        async function createWorksheetAsync() {
          try {
            const response = await dispatch(
              createWorksheet({
                worksheet,
                rawAttachments,
              }),
            )
            const createdWorksheet = unwrapResult(response)
            const populatedTags = await populateAndFetchTags(createdWorksheet.tags as unknown as string[])

            setWorksheet({
              ...createdWorksheet,
              tags: populatedTags
            });

            // Set component-state data
            setCanEdit(false);
            setRawAttachments([]);
            setWorksheetId(createdWorksheet._id);
            setIsLoading(false);

            Toast.show({
              type: 'success',
              text1: 'Erstellung erfolgreich!',
              text2: 'Dein Test wurde erfolgreich erstellt!',
            });
          } catch (error) {
            console.log(
              '[WorksheetView] Error during worksheet creation process!',
              error,
            );
            setIsLoading(false);
            Toast.show({
              type: 'error',
              text1: 'Internal Server Error!',
              text2: 'Etwas ist schief gelaufen! Wir werden uns darum kümmern.',
            });
          }
        }

        createWorksheetAsync()
      }
    },
  };

  const pageData: MultiPageScreenProps[] = [
    {
      name: 'BasicData',
      title: '1. Test-Setup',
      icon: 'bookmarks',
      page: <BasicWorksheetDataScreen />,
    },
    {
      name: 'QuestionData',
      title: '2. Aufgaben liste',
      icon: 'help-circle',
      page: <WorksheetQuestionsScreen />,
    },
  ];

  useEffect(() => {
    if (worksheetId) {
      if (worksheet._id) return;

      async function loadWorksheet() {
        console.log('[WorksheetView] Fetiching worksheet by ID...');
        setIsLoading(true);
        try {
          const response = await backendInstance.get('/worksheet/' + worksheetId)
          const worksheet: WorksheetDTO = response.data
          if (!worksheet) throw new Error('No Worksheet');

          const populatedTags = await populateAndFetchTags(worksheet.tags);

          setWorksheet({
            ...response.data,
            tags: populatedTags,
          });
          setCanEdit(false);
          setRawAttachments([]);
          setIsLoading(false);
          console.log(
            '[WorksheetView] Finished fetching, worksheet loaded successful!',
          );
        } catch (error) {
          console.log(
            '[WorksheetView] Error while fetching worksheet by ID',
            error,
          );
          setWorksheet({} as Worksheet);
          setCanEdit(true);
          setWorksheetId(undefined);
          setIsLoading(false);
          return Toast.show({
            type: 'error',
            text1: 'Internal Server Error!',
            text2: 'Something went wrong, we will take care of that.',
          });
        }
      }

      loadWorksheet();
    } else {
      setIsLoading(false);
      setCanEdit(true);
      setWorksheet({
        isFavorite: false,
      } as Worksheet);
      console.log('[WorksheetView] Empty context loaded');
    }
  }, [worksheetId]);

  useEffect(() => {
    if (worksheetId) {
      if (canEdit)
        setInteractionButtons([deleteInteractionButton, saveInteractionButton]);
      else
        setInteractionButtons([writeInteractionButton ,deleteInteractionButton, editInteractionButton]);
    } else {
      setInteractionButtons([createInteractionButton]);
    }
  }, [canEdit, worksheet, worksheetId, isWorksheetValid]);

  return (
    <>
      <MultiPageContainer
        screensDetailsList={pageData}
        navigation={navigation}
        backToName={'Overview'}
        interactionButtons={interactionButtons}
      />
      {(showLoadingComponent || isLoading) && (
        <FadeInView
          isShown={isLoading}
          duration={400}
          containerStyle={{
            position: 'absolute',
            backgroundColor: 'rgba(255,255,255,0.95)',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          isAnimationPlaying={(isPlaying) => setShowLoadingComponent(isPlaying)}
        >
          <ActivityIndicator size="large" />
        </FadeInView>
      )}
    </>
  );
};

function WorksheetView({ route, navigation }: Props) {
  return (
    <WorksheetViewContextProvider>
      <WorksheetViewContent navigation={navigation} route={route} />
    </WorksheetViewContextProvider>
  );
}

export default WorksheetView;
