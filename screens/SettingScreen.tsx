import * as React from 'react';
import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import { SafeArea, View, Text } from '../components/Theme';

export default function SettingScreen() {
  return (
    <SafeArea>
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.box}>
          <View style={styles.info}>
            <Text style={styles.infoLeft}>Name:</Text>
            <Text style={styles.infoRight}>Test Name</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.info}>
            <Text style={styles.infoLeft}>Email:</Text>
            <Text style={styles.infoRight}>test@gmail.com</Text>
          </View>
        </View>
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
  actions: {
    backgroundColor: Colors.dark.darkBackground,
    borderRadius: 4,
    padding: 10,
  },
});
