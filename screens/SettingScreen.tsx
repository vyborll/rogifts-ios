import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { CogIcon, BookOpenIcon } from 'react-native-heroicons/solid';

import Colors from '../constants/Colors';
import { SafeArea, View, Text, TouchableOpacity } from '../components/Theme';
import { RootState } from '../store';

const actions: { title: string; icon: React.ReactElement }[] = [
  {
    title: 'Edit Settings',
    icon: <CogIcon color={Colors.dark.lightGreen} />,
  },
  {
    title: 'Rules',
    icon: <BookOpenIcon color={Colors.dark.lightGreen} />,
  },
  {
    title: 'Logout',
    icon: <CogIcon color={Colors.dark.lightRed} />,
  },
];

export default function SettingScreen() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <SafeArea>
      <View style={styles.body}>
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
            <Text style={styles.statTitle}>0</Text>
            <Text>Entries</Text>
          </View>
          <View style={{ ...styles.box, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.statTitle}>0</Text>
            <Text>Winnings</Text>
          </View>
        </View>

        <ScrollView style={{ height: '100%' }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          {actions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.action}>
              <Text style={action.title === 'Logout' ? { ...styles.actionTitle, color: Colors.dark.lightRed } : styles.actionTitle}>
                {action.title}
              </Text>
              {action.icon}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
