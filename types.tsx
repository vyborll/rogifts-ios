/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Auth: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Root: undefined;
  NotFound: undefined;
};

export type AuthStackParamList = {
  Auth: undefined;
  Login: undefined;
  Register: undefined;
};

export type AuthNavProps<T extends keyof AuthStackParamList> = {
  navigation: StackNavigationProp<AuthStackParamList, T>;
  route: RouteProp<AuthStackParamList, T>;
};

export type BottomTabParamList = {
  Home: undefined;
  Earn: undefined;
  TabOne: undefined;
  TabTwo: undefined;
};

export type HomeParamList = {
  Home: undefined;
};

export type EarnParamList = {
  Earn: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};
