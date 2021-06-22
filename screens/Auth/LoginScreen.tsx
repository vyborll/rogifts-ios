import * as React from 'react';
import { TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AuthNavProps } from '../../types';
import { SafeArea, View, Text, InputStyle, AuthStyles } from '../../components/Theme';

export default function LoginScreen({ navigation }: AuthNavProps<'Login'>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: { email: string; password: string }) => {
    console.log(data);
  };

  return (
    <SafeArea>
      <View style={{ flex: 1, margin: '5%' }}>
        <KeyboardAwareScrollView
          scrollEnabled={true}
          enableAutomaticScroll={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={AuthStyles.header} backgroundColor="background">
            <Text style={AuthStyles.brand}>Login</Text>
          </View>
          <View style={AuthStyles.body}>
            <View style={AuthStyles.inputContainer}>
              <Text style={AuthStyles.inputTitle}>Email</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput style={InputStyle} onBlur={onBlur} onChangeText={(value) => onChange(value)} value={value} />
                )}
                name="email"
                rules={{ required: true, pattern: /^\S+@\S+$/i }}
                defaultValue=""
              />
              {errors.email && <Text style={styles.errorText}>Please enter a valid email</Text>}
            </View>
            <View style={AuthStyles.inputContainer}>
              <Text style={AuthStyles.inputTitle}>Password</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput secureTextEntry={true} style={InputStyle} onBlur={onBlur} onChangeText={(value) => onChange(value)} value={value} />
                )}
                name="password"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.password && <Text style={styles.errorText}>Password is required</Text>}
            </View>
            <View>
              <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
              <View style={styles.registerContainer}>
                <Text style={{ marginRight: 5, fontSize: 18 }}>Need an account?</Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate('Register');
                  }}
                >
                  <Text style={styles.registerText}>Register</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    marginTop: 15,
    backgroundColor: 'rgb(16, 185, 129)',
    borderRadius: 4,
    padding: 10,
  },
  loginText: {
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 7,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  registerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
