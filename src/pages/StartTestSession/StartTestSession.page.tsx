import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { InstanceDetails } from './Screens/InstanceDeatils/InstanceDetails.screen';
import { RootStackParamList } from '../../../App';
import {
  TestSessionProvider,
  useTestSessionContext,
} from './context/testSession.context';
import { useEffect, useRef, useState } from 'react';
import MultiPageContainer from '../../components/MultPageContainer/MultiPageContainer';
import { MultiPageScreenProps } from '../../components/MultPageContainer/interfaces/MultiPageScreenProps';
import { ActiveTestSession } from './Screens/ActiveTestSession/ActiveTestSession.screen';

type ComponentProps = {};

export type TestInstanceStack = {
  InstanceDetails: {
    worksheetId: string;
  };
  ConnectionReadyInstance: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'StartTestSession'>;

export function StartTestSession({ navigation, route }: Props) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const pagesData: MultiPageScreenProps[] = [
    {
      icon: 'funnel',
      name: 'InstanceDetails',
      title: '1. Sortierung festlegen',
      page: (
        <InstanceDetails
          onNextPage={() => setCurrentPageIndex(1)}
          worksheetId={route.params.worksheetId}
        />
      ),
    },
    {
      icon: 'people',
      name: 'ActiveTestSession',
      title: '2. Schüler einladen',
      page: <ActiveTestSession />,
    },
  ];

  return (
    <TestSessionProvider>
      <MultiPageContainer
        screensDetailsList={pagesData}
        navigation={navigation}
        backToName={'Overview'}
        interactionButtons={[]}
        programmaticNavigationOnly
        currentProgrammaticIndex={currentPageIndex}
      />
    </TestSessionProvider>
  );
}
