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
  Giveaway: undefined;
  Earn: undefined;
  Setting: undefined;
  EditSettings: undefined;
  Rules: undefined;
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
  Setting: undefined;
};

export type HomeParamList = {
  Home: undefined;
  Giveaway: {
    id: string;
    name: string;
  };
};

export type EarnParamList = {
  Earn: undefined;
};

export type SettingParamList = {
  Setting: undefined;
  EditSettings: undefined;
  Rules: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type HomeNavProps<T extends keyof HomeParamList> = {
  navigation: StackNavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};

export type EarnNavProps<T extends keyof EarnParamList> = {
  navigation: StackNavigationProp<EarnParamList, T>;
  route: RouteProp<EarnParamList, T>;
};

export type SettingNavProps<T extends keyof SettingParamList> = {
  navigation: StackNavigationProp<SettingParamList, T>;
  route: RouteProp<SettingParamList, T>;
};
