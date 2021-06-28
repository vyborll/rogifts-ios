/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { useSelector } from 'react-redux';

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

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
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

  console.log(user.loggedIn);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user.loggedIn ? (
        <>
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
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
