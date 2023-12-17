import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import {
  createSchoolClass,
  deleteSchoolClass,
  editSchoolClass,
  getAllClasses,
} from '../SchoolClassOverview/redux/schoolClass.slice';
import { MultiPageScreenProps } from '../../components/MultPageContainer/interfaces/MultiPageScreenProps';
import MultiPageContainer from '../../components/MultPageContainer/MultiPageContainer';
import BasicSchoolClassDataScreen from './screens/basicSchoolClassData.screen';
import {
  SchoolClassViewProvider,
  useSchoolClassViewContext,
} from './context/schoolClassView.context';
import { useEffect, useState } from 'react';
import StudentDetailsScreen from './screens/studentDetails.screen';
import { ActivityIndicator, Alert, LayoutAnimation } from 'react-native';
import { addTagManually, getAllTags } from '../Library/redux/tags.slice';
import { SchoolClass } from '../SchoolClassOverview/interfaces/schoolClass.interface';
import { unwrapResult } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import FadeInView from '../../components/FadeInView';

type Props = NativeStackScreenProps<RootStackParamList, 'SchoolClassView'>;

const SchoolClassViewContent = ({ route, navigation }: Props) => {
  const dispatch = useAppDispatch();

  const tags = useAppSelector(getAllTags);
  const schoolClasses = useAppSelector(getAllClasses);

  const [schoolClassId, setSchoolClassId] = useState<string | undefined>(
    route.params.schoolClassId,
  );
  const [interactionButtons, setInteractionButtons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLoadingComponent, setShowLoadingComponent] =
    useState<boolean>(false);

  const {
    setSchoolClass,
    setCanEdit,
    canEdit,
    schoolClass,
    isSchoolClassValid,
  } = useSchoolClassViewContext();

  // Load context
  useEffect(() => {
    if (schoolClassId) {
      // Get School-class out of state
      const schoolClass = schoolClasses.find(
        (schoolClass) => schoolClass._id === schoolClassId,
      );
      if (schoolClass) {
        // If school-class is found the context gets initialised
        setCanEdit(false);
        setSchoolClass(schoolClass);
        console.log('[ClassView] Class successful loaded');
      } else {
        // If school class is not found go back to overview (just in case)
        console.log('[ClassView] Given class not found. Redirected back!');
        return navigation.goBack();
      }
    } else {
      setCanEdit(true);
      setSchoolClass({} as SchoolClass);
      console.log('[ClassView] Empty context loaded');
    }
  }, [schoolClassId]);

  // TODO: Consider to refactor? Idk what I should think about that...
  useEffect(() => {
    if (schoolClassId) {
      if (canEdit)
        setInteractionButtons([deleteInteractionButton, saveInteractionButton]);
      else
        setInteractionButtons([deleteInteractionButton, editInteractionButton]);
    } else {
      setInteractionButtons([createInteractionButton]);
    }
  }, [canEdit, schoolClass, schoolClassId, isSchoolClassValid]);

  const deleteInteractionButton = {
    title: 'Delete',
    isActive: true,
    icon: 'trash',
    color: '#ffbcbc',
    shadowColor: 'rgba(255,188,188,0.2)',
    onPress: () => deleteClass(),
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
    isActive: isSchoolClassValid && schoolClass._id,
    icon: 'save',
    color: '#daffbc',
    shadowColor: 'rgba(218,255,188,0.2)',
    onPress: () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      console.log('[ClassView] Save button pressed!');
      if (
        schoolClass !==
        schoolClasses.find((findClass) => findClass._id === schoolClass._id)
      ) {
        setIsLoading(true);
        console.log('[ClassView] Edit process started...');
        dispatch(editSchoolClass(schoolClass))
          .then(unwrapResult)
          .then((editedClass) => {
            const tagExists = tags.find(
              (tag) => tag._id === editedClass.year?._id,
            );
            if (!tagExists) dispatch(addTagManually(editedClass.year!));
            setSchoolClass(editedClass);
            setCanEdit(false);
            Toast.show({
              type: 'success',
              text1: 'Changes Saved',
              text2: 'Your changes got successful saved!',
            });
            setIsLoading(false);
          });
      } else {
        console.log('[ClassView] No changes made!');
        setCanEdit(false);
        Toast.show({
          type: 'info',
          text1: 'No changes made',
          text2: 'You made no changes to the class.',
        });
      }
    },
  };
  const createInteractionButton = {
    title: 'Create',
    isActive: isSchoolClassValid,
    icon: 'send',
    color: '#daffbc',
    shadowColor: 'rgba(218,255,188,0.2)',
    onPress: () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      console.log('[ClassView] Create button pressed with:', schoolClass);
      if (schoolClass) {
        setIsLoading(true);
        console.log('[ClassView] Creation process started...');
        dispatch(createSchoolClass(schoolClass))
          .then(unwrapResult)
          .then((createdClass) => {
            const tagExists = tags.find(
              (tag) => tag._id === createdClass.year?._id,
            );
            if (!tagExists) dispatch(addTagManually(createdClass.year!));
            setSchoolClassId(createdClass._id);
            Toast.show({
              type: 'success',
              text1: 'Class Created',
              text2: 'Your class got successful created!',
            });
            setIsLoading(false);
          });
      }
    },
  };

  const pagesData: MultiPageScreenProps[] = [
    {
      name: 'BasicData',
      title: '1. Basic Data',
      icon: 'bookmarks',
      page: <BasicSchoolClassDataScreen />,
    },
    {
      name: 'StudentDetails',
      title: '2. Student Details',
      icon: 'people',
      page: <StudentDetailsScreen />,
    },
  ];

  function deleteClass() {
    Alert.alert('Delete Class', 'Do you really want to delete the class?', [
      {
        onPress: () => null,
        style: 'cancel',
        text: 'Cancel',
        isPreferred: true,
      },
      {
        onPress: () => {
          if (schoolClassId) {
            console.log('[ClassView] Deleted process started...');
            setIsLoading(true);
            dispatch(deleteSchoolClass(schoolClassId)).then(() => {
              navigation.goBack();
            });
          }
        },
        style: 'destructive',
        text: 'Delete',
        isPreferred: false,
      },
    ]);
  }

  return (
    <>
      <MultiPageContainer
        screensDetailsList={pagesData}
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
            backgroundColor: 'rgba(255,255,255,0.8)',
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

const SchoolClassView = ({ route, navigation }: Props) => {
  return (
    <SchoolClassViewProvider>
      <SchoolClassViewContent navigation={navigation} route={route} />
    </SchoolClassViewProvider>
  );
};

export default SchoolClassView;
