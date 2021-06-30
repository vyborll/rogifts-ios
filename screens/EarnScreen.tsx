import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as linking from 'expo-linking';
import { AdMobRewarded } from 'expo-ads-admob';

import Colors from '../constants/Colors';
import { SafeArea, Text, View, TouchableOpacity } from '../components/Theme';
import { RootState } from '../store/index';
import Api from '../utils/api';
import { setUser } from '../store/reducers/user';

interface Task {
  title: string;
  reward: number;
}

function EarnCard({ title, show = true, reward, onPress }: Task & { show?: boolean; onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.action} onPress={onPress}>
      <Text style={styles.actionTitle}>{title}</Text>
      {show ? <Text style={styles.actionTitle}>+{reward}</Text> : null}
    </TouchableOpacity>
  );
}

export default function EarnScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [playing, setPlaying] = React.useState(false);

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

  const playVideoAd = async () => {
    try {
      if (playing) return;

      setPlaying(true);
      await AdMobRewarded.setAdUnitID('ca-app-pub-3194343103010036/8435273422');
      await AdMobRewarded.requestAdAsync({
        servePersonalizedAds: true,
        additionalRequestParams: {
          user_id: user.id,
        },
      });

      await AdMobRewarded.showAdAsync();
    } catch (err) {
      console.warn(err);
    } finally {
      setTimeout(() => {
        setPlaying(false);
      }, 10000);
    }
  };

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
            <EarnCard key={index} {...task} onPress={playVideoAd} />
          ))}
          <EarnCard
            title="Join Discord"
            show={!user.discord}
            reward={1}
            onPress={async () => {
              linking.openURL('https://discord.gg/dpWQNpnUPd');

              if (!user.discord) {
                const response = await Api.post('/user/claim');
                dispatch(setUser(response.data.user));
              }
            }}
          />
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
