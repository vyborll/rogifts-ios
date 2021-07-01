import * as React from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CogIcon, BookOpenIcon, BookmarkIcon, TrashIcon } from 'react-native-heroicons/solid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';

import Colors from '../constants/Colors';
import { SafeArea, View, Text, TouchableOpacity } from '../components/Theme';
import { SettingNavProps } from '../types';
import { RootState } from '../store';
import { logout } from '../store/reducers/user';
import Api, { removeAuthToken } from '../utils/api';

export default function SettingScreen({ navigation }: SettingNavProps<'Setting'>) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const actions: { title: string; icon: React.ReactElement; onPress?: () => void }[] = [
    {
      title: 'Edit Settings',
      icon: <CogIcon color={Colors.dark.lightGreen} />,
      onPress: () => navigation.push('EditSettings'),
    },
    {
      title: 'FAQ',
      icon: <BookOpenIcon color={Colors.dark.lightGreen} />,
      onPress: () => navigation.push('FAQ'),
    },
    {
      title: 'Privacy Policy',
      icon: <BookmarkIcon color={Colors.dark.lightGreen} />,
      onPress: async () => await WebBrowser.openBrowserAsync('http://localhost:3000/privacy'),
    },
    {
      title: 'Delete Account',
      icon: <TrashIcon color={Colors.dark.lightRed} />,
      onPress: () =>
        Alert.alert(
          'Delete Account',
          'Are you sure you want to delete your account?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Confirm',
              onPress: async () => {
                try {
                  await Api.post('/user/delete');
                  await removeAuthToken();
                  await AsyncStorage.removeItem('@token');
                  dispatch(logout());
                } catch (err) {
                  Alert.alert('Error', err.response.data.message ?? 'Error deleting account. Please contact an owner on our discord!');
                }
              },
            },
          ],
          { cancelable: true }
        ),
    },
    {
      title: 'Logout',
      icon: <CogIcon color={Colors.dark.lightRed} />,
      onPress: async () => {
        const token = await AsyncStorage.getItem('@token');
        if (token) {
          await AsyncStorage.removeItem('@token');
        }

        await removeAuthToken();
        dispatch(logout());
      },
    },
  ];

  return (
    <SafeArea>
      <ScrollView
        style={styles.body}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.box}>
          <View style={styles.info}>
            <Text style={styles.infoLeft}>Name:</Text>
            <Text style={styles.infoRight}>{user.name}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.info}>
            <Text style={styles.infoLeft}>Email:</Text>
            <Text style={styles.infoRight}>{user.email}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ ...styles.box, flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
            <Text style={styles.statTitle}>{user.spent}</Text>
            <Text>Entries</Text>
          </View>
          <View style={{ ...styles.box, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.statTitle}>{user.winnings}</Text>
            <Text>Winnings</Text>
          </View>
        </View>

        <View>
          {actions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.action} onPress={action.onPress}>
              <Text
                style={
                  action.title === 'Logout' || action.title === 'Delete Account'
                    ? { ...styles.actionTitle, color: Colors.dark.lightRed }
                    : styles.actionTitle
                }
              >
                {action.title}
              </Text>
              {action.icon}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  body: {
    margin: '5%',
  },
  header: {
    marginTop: '5%',
    marginBottom: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.dark.green,
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  divider: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.divider,
  },
  box: {
    backgroundColor: Colors.dark.darkBackground,
    marginBottom: '5%',
    padding: 15,
    borderRadius: 4,
  },
  info: {
    flexDirection: 'row',
  },
  infoLeft: {
    width: 50,
  },
  infoRight: {
    fontWeight: 'bold',
  },
  statTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.dark.darkBackground,
    borderRadius: 4,
    padding: 15,
    marginBottom: '5%',
  },
  actionTitle: {
    color: Colors.dark.lightGreen,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
