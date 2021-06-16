import * as React from 'react';
import { SafeAreaView as DefaultSafeArea, View as DefaultView, Text as DefaultText, TextInput as DefaultTextInput } from 'react-native';

import Colors from '../constants/Colors';

export type TextProps = DefaultText['props'] & {
  textColor?: keyof typeof Colors.dark;
};
export type ViewProps = DefaultView['props'] & {
  backgroundColor?: keyof typeof Colors.dark;
};
export type SafeAreaProps = DefaultSafeArea['props'];
export type TextInputProps = DefaultTextInput['props'];

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
