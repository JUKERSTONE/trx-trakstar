import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {Input} from '../input';

import styles from './styles';

export interface FormSection {
  handleRegistrationChange?: any;
  handleSignInChange?: any;
  label: string;
  type: string;
  width?: number;
  name: string;
  formType: 'register' | 'sign in';
}

export const FormSection: React.FC<FormSection> = ({
  label,
  width,
  name,
  formType,
  handleRegistrationChange,
  handleSignInChange,
}) => {
  const mode =
    formType === 'register'
      ? (e: any) => handleRegistrationChange(e, name)
      : (e: any) => handleSignInChange(e, name);
  const styleProps: any = {
    width,
  };
  return (
    <View>
      <Input
        option="default"
        label={label}
        onChangeText={mode}
        inputHeight={50}
        // backgroundColor={'#00101F'}
        color={'#fff'}
      />
    </View>
  );
};
