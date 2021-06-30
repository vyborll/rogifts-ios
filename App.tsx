import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { store } from './store';

export default function App() {
  const { loaded, user, giveaways } = useCachedResources();
  const colorScheme = useColorScheme();

  if (!loaded) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} user={user} giveaways={giveaways} />
          <StatusBar style="light" />
        </SafeAreaProvider>
      </Provider>
    );
  }
}
