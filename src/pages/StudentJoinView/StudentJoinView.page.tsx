import { LayoutAnimation, Text, View } from 'react-native';
import { WaitingForStartView } from './pages/WaitingForStart.view';
import { useEffect, useState } from 'react';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { SelectStudentView } from './pages/SelectStudentView.component';
import { RootStackParamList } from '../../../App';
import { StudentJoinViewProvider } from './context/StudentJoinView.context';
import { ExamView } from './pages/ExamView';
import { SessionStartedWithoutYou } from './pages/SessionStartedWithoutYou.component';
import ExamSubmittedView from './pages/ExamSubmitted.view';

export type StudentJoinViewStack = {
  SelectStudent: undefined;
  WaitingForStart: undefined;
  SessionStartedWithoutYou: undefined;
  ExamView: undefined;
  ExamSubmittedView: undefined;
};

const Stack = createNativeStackNavigator<StudentJoinViewStack>();

type Props = NativeStackScreenProps<RootStackParamList, 'StudentJoinView'>;

export function StudentJoinView({ route, navigation }: Props) {
  useEffect(() => {
    if (!route.params.sessionCode) {
      navigation.goBack();
    }
  });

  return (
    <StudentJoinViewProvider
      initialInstanceCode={route.params.sessionCode}
      navigation={navigation}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SelectStudent" component={SelectStudentView} />
        <Stack.Screen name="WaitingForStart" component={WaitingForStartView} />
        <Stack.Screen
          name="SessionStartedWithoutYou"
          component={SessionStartedWithoutYou}
        />
        <Stack.Screen name="ExamView" component={ExamView} />
        <Stack.Screen name="ExamSubmittedView" component={ExamSubmittedView} />
      </Stack.Navigator>
    </StudentJoinViewProvider>
  );
}
