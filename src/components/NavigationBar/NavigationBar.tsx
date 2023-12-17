import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LibraryPage from '../../pages/Library/Library.page';
import NavigationBarItem from './NavigationBarItem';
import SchoolClassOverview from '../../pages/SchoolClassOverview/SchoolClassOverview.page';

const Tab = createBottomTabNavigator()

export default function NavigationBar() {
  return (
    <Tab.Navigator initialRouteName={'home'} tabBar={props => <NavigationBarItem {...props} />}>
      <Tab.Screen name={'home'} component={LibraryPage} options={{ headerShown: false }}/>
      <Tab.Screen name={'classes'} component={SchoolClassOverview} options={{ headerShown: false }}/>
      <Tab.Screen name={'tests'} component={LibraryPage} options={{ headerShown: false }}/>
      <Tab.Screen name={'settings'} component={LibraryPage} options={{ headerShown: false }}/>
    </Tab.Navigator>
  )
}
