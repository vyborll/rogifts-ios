import * as React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { useForm, Controller } from 'react-hook-form';

import { SafeArea, View, Text, InputStyle, TouchableOpacity, DismissKeyboard } from '../../components/Theme';
import { SettingNavProps } from '../../types';
import { RootState } from '../../store';

export default function EditSettingsScreen({ navigation }: SettingNavProps<'EditSettings'>) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: { name: string }) => {
    console.log(data);
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
              <ChevronLeftIcon size={40} color="white" />
            </TouchableOpacity>
            <View style={styles.headerTitle}>
              <Text style={{ fontWeight: '600', fontSize: 24, marginLeft: -50 }}>Edit Settings</Text>
            </View>
          </View>

          <View style={styles.profile}>
            <View>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>Name</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput style={InputStyle} onBlur={onBlur} onChangeText={(value) => onChange(value)} value={value} />
                )}
                name="name"
                rules={{ required: true, minLength: 1, maxLength: 20 }}
                defaultValue={''}
              />
              {errors.name?.type === 'required' && (
                <Text textColor="lightRed" style={styles.errorText}>
                  Name is required
                </Text>
              )}
              {errors.name?.type === 'minLength' && (
                <Text textColor="lightRed" style={styles.errorText}>
                  Name must be at least 1 characters
                </Text>
              )}
              {errors.name?.type === 'maxLength' && (
                <Text textColor="lightRed" style={styles.errorText}>
                  Name must be 20 characters or less
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              backgroundColor="green"
              onPress={() => {
                console.log('saved');
              }}
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeArea>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
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
  errorText: {
    marginTop: 7,
  },
  profile: {
    marginTop: '50%',
  },
  saveButton: {
    marginTop: 15,
    backgroundColor: 'rgb(16, 185, 129)',
    borderRadius: 4,
    padding: 10,
  },
  saveText: {
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
});
