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
    title: '1. How many entries is one point?',
    text: 'One point is equivalent to one entry for all giveaways. So if you have 100 points you are able to enter a giveaway 100 times.',
  },
  {
    title: '2. How do I receive my gift card if I won?',
    text: 'The gift card will emailed within 1-7 days of winning the giveaway. We will send it the email that you have registered with so please verify that your information is correct when registering.',
  },
  {
    title: '3. What are my chances of winning?',
    text: 'If a giveaway was to have 1,000 entries and 100 of those were yours. Then your chances of winning would be 10% or 1/10.',
  },
  {
    title: '4. How old do I have to be to use this app?',
    text: 'You must be 17+ years of age to use this app.',
  },
  {
    title: '5. Can I create more than one account?',
    text: 'No you are not allowed to create more than one account. If we find out you have more than one then we will close all of your accounts without questions asked.',
  },
  {
    title: '6. Disclaimer',
    text: 'Apple is not a sponsor of contest, sweepstakes, or anything in the app. They are in no way affiliated with ROGifts.',
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

export default function RulesScreen({ navigation }: SettingNavProps<'FAQ'>) {
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
      <ScrollView
        style={styles.info}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
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
    marginTop: '25%',
    padding: '5%',
    backgroundColor: Colors.dark.darkBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  rule: {
    marginBottom: 20,
  },
  ruleTitle: {
    marginBottom: 3,
    fontSize: 17,
    fontWeight: 'bold',
  },
  ruleText: {
    fontSize: 14,
  },
});
