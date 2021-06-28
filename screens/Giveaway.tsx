import * as React from 'react';
import { Alert, TextInput, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { useForm, Controller } from 'react-hook-form';

import Colors from '../constants/Colors';
import { SafeArea, View, Text, TouchableOpacity, MainStyles, InputStyle, DismissKeyboard } from '../components/Theme';
import { HomeNavProps } from '../types';
import { RootState } from '../store';

export default function Giveaway({ navigation }: HomeNavProps<'Giveaway'>) {
  const user = useSelector((state: RootState) => state.user);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: { points: string }) => {
    const points = parseInt(data.points);
    if (points < 1 || points > user.balance) {
      Alert.alert('Error', 'Not enough points');
      return;
    }

    console.log(data.points);
  };

  return (
    <DismissKeyboard>
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
              <Text style={{ fontWeight: '600', fontSize: 24, marginLeft: -50 }}>Giveaway</Text>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.card}>
              <Text style={{ color: Colors.dark.lightGreen, marginBottom: 15, fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
                $5 Roblox Gift Card
              </Text>
              <Text style={{ marginBottom: 15, fontSize: 24, fontWeight: '600', textAlign: 'center' }}>You have 10 Points</Text>

              <View style={{ marginBottom: 20 }}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      keyboardType="number-pad"
                      style={{ ...InputStyle, textAlign: 'center' }}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                  name="points"
                  rules={{ required: true, pattern: new RegExp('^[0-9]+$') }}
                  defaultValue="1"
                />
                {errors.points?.type === 'required' && <Text style={styles.errorText}>Points is required</Text>}
                {errors.points?.type === 'pattern' && <Text style={styles.errorText}>Points must be a valid number</Text>}
              </View>

              <View>
                <TouchableOpacity style={MainStyles.button} onPress={handleSubmit(onSubmit)}>
                  <Text style={MainStyles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeArea>
    </DismissKeyboard>
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
  content: {
    marginTop: '50%',
  },
  card: {
    padding: 15,
    backgroundColor: Colors.dark.darkBackground,
  },
  errorText: {
    color: 'red',
    marginTop: 7,
  },
});
