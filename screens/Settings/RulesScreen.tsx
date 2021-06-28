import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';

import Colors from '../../constants/Colors';
import { SafeArea, View, Text, TouchableOpacity } from '../../components/Theme';
import { SettingNavProps } from '../../types';

interface IRule {
  title: string;
  text: string;
}

const rules: IRule[] = [
  {
    title: '1. Multiple Accounts',
    text: 'You are only allowed to create one account. If we believe you have broken any of our rules then we reserve the right to close your account.',
  },
  {
    title: '2. Age',
    text: 'You must be 17+ years of age to use this app.',
  },
  {
    title: '3. Disclaimer',
    text: 'Apple is not a sponsor of contest, sweepstakes or anything in the app.',
  },
];

function Rule({ title, text }: { title: string; text: string }) {
  return (
    <View style={styles.rule}>
      <Text style={styles.ruleTitle}>{title}</Text>
      <Text style={styles.ruleText}>{text}</Text>
    </View>
  );
}

export default function RulesScreen({ navigation }: SettingNavProps<'Rules'>) {
  return (
    <SafeArea>
      <View style={styles.body}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{ width: 50 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ChevronLeftIcon size={40} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Text style={{ fontWeight: '600', fontSize: 24, marginLeft: -50 }}>Rules</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.info} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        {rules.map((rule, index) => (
          <Rule key={index} {...rule} />
        ))}
      </ScrollView>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  body: {
    margin: '5%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginTop: '35%',
    padding: '5%',
    backgroundColor: Colors.dark.darkBackground,
    borderRadius: 20,
  },
  rule: {
    marginBottom: 20,
  },
  ruleTitle: {
    marginBottom: 3,
    fontSize: 18,
    fontWeight: 'bold',
  },
  ruleText: {
    fontSize: 14,
  },
});
