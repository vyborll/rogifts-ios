import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Api, { setAuthToken } from '../utils/api';
import { UserData } from '../store/reducers/user';
import { GiveawayData } from '../store/reducers/giveaway';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [user, setUser] = React.useState<UserData>();
  const [giveaways, setGiveaways] = React.useState<GiveawayData[]>([]);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });

        await Asset.fromModule(require('../assets/images/roblox-icon.png')).downloadAsync();

        const token = await AsyncStorage.getItem('@token');
        let response;
        if (token) {
          await setAuthToken(token);
          response = await Api.get('/user/me');
          setUser(response.data.user);
        }

        const resp = await Api.get('/giveaways/get');
        setGiveaways(resp.data.giveaways);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return { loaded: isLoadingComplete, user, giveaways };
}
