/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AuthScreen from '../screens/Auth/AuthScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import Giveaway from '../screens/Giveaway';

import NotFoundScreen from '../screens/NotFoundScreen';
import EditSettingsScreen from '../screens/Settings/EditSettingsScreen';
import RulesScreen from '../screens/Settings/RulesScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import { RootState } from '../store/index';
import { login, setUser, UserData } from '../store/reducers/user';
import { GiveawayData, setGiveaways } from '../store/reducers/giveaway';
import Api from '../utils/api';
import useInterval from '../hooks/useInterval';

export default function Navigation({ colorScheme, user, giveaways }: { colorScheme: ColorSchemeName; user?: UserData; giveaways?: GiveawayData[] }) {
  const dispatch = useDispatch();
  const storedUser = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      dispatch(login(user));
    }

    if (giveaways) {
      dispatch(setGiveaways(giveaways));
    }
  }, []);

  useInterval(
    async () => {
      if (!storedUser.loading && storedUser.loggedIn) {
        const response = await Api.get('/user/me');
        dispatch(setUser(response.data.user));
        return;
      }

      return;
    },
    !storedUser.loading && storedUser.loggedIn ? 30000 : null
  );

  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user.loggedIn ? (
        <>
          <Stack.Screen name="Root" component={BottomTabNavigator} />
          <Stack.Screen name="Giveaway" component={Giveaway} />
          <Stack.Screen name="EditSettings" component={EditSettingsScreen} />
          <Stack.Screen name="Rules" component={RulesScreen} />
          <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
