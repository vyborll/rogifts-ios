import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  SafeAreaView as DefaultSafeArea,
  View as DefaultView,
  Text as DefaultText,
  TextInput as DefaultTextInput,
  TouchableOpacity as DefaultTouchableOpacity,
} from 'react-native';

import Colors from '../constants/Colors';

export const InputStyle = {
  color: '#fff',
  fontSize: 16,
  width: '100%',
  paddingVertical: 10,
  paddingHorizontal: 15,
  backgroundColor: '#262a33',
  borderRadius: 5,
};

export type TextProps = DefaultText['props'] & {
  textColor?: keyof typeof Colors.dark;
};
export type ViewProps = DefaultView['props'] & {
  backgroundColor?: keyof typeof Colors.dark;
};
export type SafeAreaProps = DefaultSafeArea['props'];
export type TextInputProps = DefaultTextInput['props'];
export type TouchableProps = DefaultTouchableOpacity['props'] & {
  backgroundColor?: keyof typeof Colors.dark;
};

export function Text(props: TextProps) {
  const { style, textColor, ...otherProps } = props;
  const color = textColor != null ? Colors.dark[textColor] : Colors.dark['text'];

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, backgroundColor, ...otherProps } = props;
  const bgColor = backgroundColor != null ? Colors.dark[backgroundColor] : null;

  return <DefaultView style={[bgColor ? { backgroundColor: bgColor } : null, style]} {...otherProps} />;
}

export function SafeArea(props: SafeAreaProps) {
  return <DefaultSafeArea style={{ flex: 1, backgroundColor: Colors.dark.background }} {...props} />;
}

export function TouchableOpacity(props: TouchableProps) {
  const { style, backgroundColor, ...otherProps } = props;
  const bgColor = backgroundColor != null ? Colors.dark[backgroundColor] : null;

  return <DefaultTouchableOpacity style={[bgColor ? { backgroundColor: bgColor } : null, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  return (
    <TextInput
      style={{
        color: '#fff',
        height: 18,
        width: '90%',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: Colors.dark.background,
        borderRadius: 5,
      }}
      {...props}
    />
  );
}

export const MainStyles = StyleSheet.create({
  button: {
    backgroundColor: Colors.dark.green,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    padding: 8,
  },
});

export const AuthStyles = StyleSheet.create({
  header: {
    marginTop: '10%',
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
    marginTop: '30%',
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  authButton: {
    marginTop: 15,
    backgroundColor: 'rgb(16, 185, 129)',
    borderRadius: 4,
    padding: 10,
  },
  authText: {
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
  },
});
