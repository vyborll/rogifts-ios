import * as React from 'react';
import { Alert, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { useForm, Controller } from 'react-hook-form';

import Colors from '../constants/Colors';
import { SafeArea, View, Text, TouchableOpacity, MainStyles, InputStyle, DismissKeyboard } from '../components/Theme';
import { HomeNavProps } from '../types';
import { RootState } from '../store';

import Api from '../utils/api';
import { setUser } from '../store/reducers/user';
import { setGiveaway } from '../store/reducers/giveaway';

export default function Giveaway({ navigation, route }: HomeNavProps<'Giveaway'>) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = React.useState(false);
  const { id, name } = route.params;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: { points: string }) => {
    if (loading) return;

    const points = parseInt(data.points);
    if (points < 1 || points > user.balance) {
      Alert.alert('Error', 'Not enough points');
      return;
    }

    setLoading(true);
    try {
      const response = await Api.post('/giveaways/join', {
        id,
        points,
      });

      dispatch(setUser(response.data.user));
      dispatch(setGiveaway(response.data.giveaway));
      Alert.alert('Success', 'You have entered the giveaway');
    } catch (err) {
      Alert.alert('Error', err.response.data.message ?? 'Server Error');
      console.warn(err);
    } finally {
      setLoading(false);
    }
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
              <Text style={{ color: Colors.dark.lightGreen, marginBottom: 10, fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>{name}</Text>
              <Text style={{ marginBottom: 15, fontSize: 24, fontWeight: '600', textAlign: 'center' }}>You have {user.balance} Points</Text>

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
