import * as React from 'react';
import { TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AuthNavProps } from '../../types';
import { SafeArea, View, Text, InputStyle, AuthStyles } from '../../components/Theme';

export default function RegisterScreen({ navigation }: AuthNavProps<'Register'>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data: { email: string; password: string; confirmPassword: string }) => {
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
            <Text style={AuthStyles.brand}>Register</Text>
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
              {errors.email?.type === 'required' && <Text style={styles.errorText}>Email is required</Text>}
              {errors.email?.type === 'pattern' && <Text style={styles.errorText}>Please enter a valid email</Text>}
            </View>
            <View style={AuthStyles.inputContainer}>
              <Text style={AuthStyles.inputTitle}>Password</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput secureTextEntry={true} style={InputStyle} onBlur={onBlur} onChangeText={(value) => onChange(value)} value={value} />
                )}
                name="password"
                rules={{ required: true, minLength: 6 }}
                defaultValue=""
              />
              {errors.password?.type === 'required' && <Text style={styles.errorText}>Password is required</Text>}
              {errors.password?.type === 'minLength' && <Text style={styles.errorText}>Password must be 6 or more characters</Text>}
            </View>
            <View style={AuthStyles.inputContainer}>
              <Text style={AuthStyles.inputTitle}>Confirm Password</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput secureTextEntry={true} style={InputStyle} onBlur={onBlur} onChangeText={(value) => onChange(value)} value={value} />
                )}
                name="confirmPassword"
                rules={{
                  required: true,
                  validate: (value) => {
                    if (value === getValues()['password']) {
                      return true;
                    } else {
                      return 'Passwords do not match';
                    }
                  },
                }}
                defaultValue=""
              />
              {errors.confirmPassword?.type === 'validate' && <Text style={styles.errorText}>Passwords do not match</Text>}
            </View>
            <View>
              <TouchableOpacity style={AuthStyles.authButton}>
                <Text style={AuthStyles.authText} onPress={handleSubmit(onSubmit)}>
                  Register
                </Text>
              </TouchableOpacity>
              <View style={styles.loginContainer}>
                <Text style={{ marginRight: 5, fontSize: 18 }}>Have an account?</Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate('Login');
                  }}
                >
                  <Text style={styles.loginText}>Login</Text>
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
  header: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brand: {
    fontSize: 50,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  body: {
    height: '60%',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 7,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
