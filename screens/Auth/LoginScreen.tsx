import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { AuthNavProps } from '../../types';
import { SafeArea, View, Text, TextInput } from '../../components/Theme';

export default function LoginScreen({ navigation }: AuthNavProps<'Login'>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <SafeArea>
      <View style={styles.header} backgroundColor="background">
        <Text style={styles.brand}>Login</Text>
      </View>
      <View style={styles.body}>
        <Text>Welcome</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => <TextInput onBlur={onBlur} onChangeText={(value) => onChange(value)} value={value} />}
          name="email"
          rules={{ required: true, pattern: /^\S+@\S+$/i }}
          defaultValue=""
        />
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  header: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brand: {
    fontSize: 38,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  body: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
