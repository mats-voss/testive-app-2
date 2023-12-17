import { OnboardContextProvider } from './context/useOnboardingContext';
import { MultiPageScreenProps } from '../../components/MultPageContainer/interfaces/MultiPageScreenProps';
import UserDetailsScreen from './screens/userDetails.screen';
import GradeSchemaSetupScreen from './screens/gradeSchemaSetup.screen';
import SchoolClassSetupScreen from './screens/schoolClassSetup.screen';
import { FinishOnboardingScreen } from './screens/finishOnboarding.screen';
import MultiPageContainer from '../../components/MultPageContainer/MultiPageContainer';

const OnboardPage = () => {
  const pagesData: MultiPageScreenProps[] = [
    {
      name: 'UserDetails',
      title: '1. About You',
      icon: 'cog',
      page: <UserDetailsScreen/>
    },
    {
      name: 'GradeSchemaSetup',
      title: '2. Grade-Schema',
      icon: 'analytics',
      page: <GradeSchemaSetupScreen/>
    },
    {
      name: 'SchoolClassSetup',
      title: '3. Classes',
      icon: 'people',
      page: <SchoolClassSetupScreen/>
    },
    {
      name: 'FinishOnboarding',
      title: '4. Finish Onboarding',
      icon: 'send',
      page: <FinishOnboardingScreen/>
    },
  ]

  return (
    <OnboardContextProvider>
      <MultiPageContainer screensDetailsList={pagesData} />
    </OnboardContextProvider>
  )
}

export default OnboardPage
