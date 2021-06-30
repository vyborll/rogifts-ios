import * as React from 'react';
import { Image, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import moment from 'moment-timezone';

import { UserGroupIcon, ClockIcon } from 'react-native-heroicons/solid';

import Colors from '../constants/Colors';
import { SafeArea, Text, View, TouchableOpacity, MainStyles } from '../components/Theme';
import { HomeNavProps } from '../types';
// @ts-ignore
import robloxIcon from '../assets/images/roblox-icon.png';
import { RootState } from '../store';
import { GiveawayData, setTabHeight } from '../store/reducers/giveaway';

function Card({ name, usersEntered, maxEntries, endAt, onPress }: GiveawayData & { onPress: () => void }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderStatus}>
          <ClockIcon color="#fff" style={{ marginRight: 5 }} size={20} />
          <Text>{moment(endAt).fromNow()}</Text>
        </View>
        <View style={styles.cardHeaderStatus}>
          <UserGroupIcon color="#fff" style={{ marginRight: 5 }} size={20} />
          <Text>
            {usersEntered} / {maxEntries}
          </Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{name}</Text>
        <Image source={robloxIcon} style={{ height: 60, width: '70%' }} />
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity style={MainStyles.button} backgroundColor="green" onPress={onPress}>
          <Text style={MainStyles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function HomeScreen({ navigation }: HomeNavProps<'Home'>) {
  const dispatch = useDispatch();
  const giveaway = useSelector((state: RootState) => state.giveaway);
  const height = useBottomTabBarHeight();

  React.useEffect(() => {
    dispatch(setTabHeight(height));
  }, []);

  return (
    <SafeArea>
      <ScrollView style={styles.body} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Giveaways</Text>
        </View>
        <View style={styles.cards}>
          {giveaway.giveaways.map((g, i) => (
            <Card
              key={i}
              {...g}
              onPress={() => {
                navigation.navigate('Giveaway', {
                  id: g.id,
                  name: g.name,
                });
              }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
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
  body: {
    flex: 1,
    margin: '5%',
  },
  cards: {
    marginTop: '10%',
    paddingBottom: 50,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.dark.darkBackground,
    borderRadius: 4,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHeaderStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardBody: {
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: '800',
  },
  cardFooter: {
    marginTop: '5%',
  },
});
