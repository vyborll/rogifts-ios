import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { AuthNavProps } from '../../types';
import { SafeArea, View, Text } from '../../components/Theme';

export default function AuthScreen({ navigation }: AuthNavProps<'Auth'>) {
  return (
    <SafeArea>
      <View style={styles.header} backgroundColor="background">
        <Text style={styles.brand} textColor="text">
          ROGifts
        </Text>
      </View>
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => {
            navigation.navigate('Register');
          }}
        >
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
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
  loginButton: {
    backgroundColor: 'rgb(16, 185, 129)',
    borderRadius: 4,
    width: '80%',
    padding: 10,
    marginTop: 20,
  },
  registerButton: {
    marginTop: 20,
    borderRadius: 4,
    width: '80%',
    borderWidth: 1,
    borderColor: 'rgb(16, 185, 129)',
    padding: 10,
  },
  loginText: {
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
  },
});
