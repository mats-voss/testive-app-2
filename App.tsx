import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Auth0Provider, useAuth0 } from 'react-native-auth0';
import NavigationBar from './src/components/NavigationBar/NavigationBar';
import { useEffect, useState } from 'react';
import WelcomePage from './src/pages/Welcome/Welcome.page';
import SplashScreen from './src/pages/SplashScreen/SplashScreen.page';
import { Provider } from 'react-redux';
import { store } from './src/redux/store.store';
import { useAppDispatch, useAppSelector } from './src/redux/reduxHooks';
import { fetchAllTags, getTagsStatus } from './src/pages/Library/redux/tags.slice';
import { EndpointStatus } from './src/interfaces/endpointStatus.enum';
import {
  fetchSchoolClasses,
  getSchoolClassStatus,
} from './src/pages/SchoolClassOverview/redux/schoolClass.slice';
import SchoolClassView from './src/pages/SchoolClassView/SchoolClassView.page';
import OnboardPage from './src/pages/Onboarding/Onboarding.page';
import {
  fetchGradeSchemata,
  getGradeSchemataStatus,
} from './src/pages/GradeSchema/redux/gradeSchema.slice';
import Toast from 'react-native-toast-message';
import WorksheetView from './src/pages/WorksheetView/WorksheetView.page';
import {
  fetchWorksheets,
  getWorksheetStatus,
} from './src/pages/WorksheetView/redux/worksheet.slice';
import { StudentJoinView } from './src/pages/StudentJoinView/StudentJoinView.page';
import { ClickOutsideProvider } from 'react-native-click-outside';
import { StartTestSession } from './src/pages/StartTestSession/StartTestSession.page';
import Modal from 'react-native-modal';
import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo';
import { NoConnectionModal } from './src/components/NoConection.modal';

export type RootStackParamList = {
  SplashScreen: undefined;
  Login: undefined;
  Register: undefined;
  Welcome: undefined;
  Home: undefined | { token: string };
  OnBoarding: undefined;
  SchoolClassOverview: undefined;
  SchoolClassView: {
    schoolClassId?: string;
  };
  WorksheetView: {
    worksheetId?: string;
  };
  StudentJoinView: {
    sessionCode: string;
  };
  StartTestSession: {
    worksheetId: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppEntry() {
  const dispatch = useAppDispatch();
  const { user, error, isLoading, getCredentials } = useAuth0();
  const [splash, setSplash] = useState(true);
  const [isConnectionErrorModalActive, setIsConnectionErrorModalActive] =
    useState(false);

  const tagStateStatus = useAppSelector(getTagsStatus);
  const schoolClassStatus = useAppSelector(getSchoolClassStatus);
  const gradeSchemataStatus = useAppSelector(getGradeSchemataStatus);
  const worksheetStatus = useAppSelector(getWorksheetStatus);

  function checkRequiredStatesForStatus(
    statusToCheckWith: EndpointStatus,
  ): boolean {
    return [
      tagStateStatus,
      schoolClassStatus,
      gradeSchemataStatus,
      worksheetStatus,
    ].every((stateStatus) => stateStatus == statusToCheckWith);
  }

  useEffect(() => {
    /* TODO: FIX! The initial state gets not loaded when the user logs in for the first time! */
    // getCredentials().then((creds) => console.log('creds', creds))

    // Handle Network changes
    const unsubscribeNetworkTracking = NetInfo.addEventListener(
      (networkState) => {
        if (
          !networkState.isConnected ||
          networkState.type !== NetInfoStateType.wifi
        ) {
          setIsConnectionErrorModalActive(true);
        } else {
          setIsConnectionErrorModalActive(false);
        }
      },
    );

    if (isLoading) {
      setSplash(true);
    } else if (!isLoading && !user) {
      // If the user is not logged in...
      setSplash(false);
    } else if (
      // When an auth session is created and the state data should get fetched
      !isLoading &&
      user &&
      !error &&
      checkRequiredStatesForStatus(EndpointStatus.IDLE)
    ) {
      console.log('[App] Base-State fetched by root component');
      dispatch(fetchAllTags());
      dispatch(fetchSchoolClasses());
      dispatch(fetchGradeSchemata());
      dispatch(fetchWorksheets());
      getCredentials().then((creds) => console.log(creds))
    } else if (
      // When the state data got successful fetched
      !isLoading &&
      user &&
      !error &&
      checkRequiredStatesForStatus(EndpointStatus.SUCCEEDED)
    ) {
      setSplash(false);
      console.log('[App] Base-State successful fetched');
    }

    return () => {
      unsubscribeNetworkTracking();
    };
  }, [
    tagStateStatus,
    schoolClassStatus,
    gradeSchemataStatus,
    worksheetStatus,
    isLoading,
    user,
  ]);

  return (
    <ClickOutsideProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {splash ? (
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
          ) : !error && user && !isLoading ? (
            // Container for all the pages
            <>
              <Stack.Screen
                name="Home"
                component={NavigationBar}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='WorksheetView'
                component={WorksheetView}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='SchoolClassView'
                component={SchoolClassView}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='OnBoarding'
                component={OnboardPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="StartTestSession"
                component={StartTestSession}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Welcome"
                component={WelcomePage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='StudentJoinView'
                component={StudentJoinView}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Modal isVisible={isConnectionErrorModalActive}>
        <NoConnectionModal />
      </Modal>
    </ClickOutsideProvider>
  );
}

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Auth0Provider
          domain={'testive.eu.auth0.com'}
          clientId={'Pl3mMDT6uWBuU50R3neW6GXPTyo44Jzo'}
        >
          <AppEntry />
        </Auth0Provider>
      </Provider>
      <Toast />
    </>
  );
}
