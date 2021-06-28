import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import { SafeArea, Text, View, TouchableOpacity } from '../components/Theme';
import { RootState } from '../store/index';

interface Task {
  title: string;
  reward: number;
}

function EarnCard({ title, reward, onPress }: Task & { onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.action} onPress={onPress}>
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionTitle}>+{reward}</Text>
    </TouchableOpacity>
  );
}

export default function EarnScreen() {
  const user = useSelector((state: RootState) => state.user);

  const tasks: Task[] = [
    {
      title: 'Daily Bonus',
      reward: 1,
    },
    {
      title: 'Watch Video',
      reward: 1,
    },
  ];

  return (
    <SafeArea>
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.title}>Earn</Text>
        </View>

        <View style={styles.balance}>
          <Text style={styles.balanceText}>Balance:</Text>
          <Text style={styles.balanceText}>{user.balance.toLocaleString()} Points</Text>
        </View>

        <View style={styles.actions}>
          {tasks.map((task, index) => (
            <EarnCard key={index} {...task} />
          ))}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.dark.green,
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  balance: {
    paddingHorizontal: 15,
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  actions: {
    marginTop: '10%',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.dark.darkBackground,
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
