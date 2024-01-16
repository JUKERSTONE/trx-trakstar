import React, {useState} from 'react';
import {TouchableHighlight, View, Text, ActivityIndicator} from 'react-native';

import PropTypes from 'prop-types';

import styles from './styles';

export interface ButtonProps {
  handleRegistrationSubmit?: any;
  handleSignInSubmit?: any;
  handleSignInSpotify?: any;
  formType: 'register' | 'sign in' | 'spotify sign in';
  backgroundColor?: string;
  children: any;
  isLoading: boolean;
}
export const SubmitButton: React.FC<ButtonProps> = ({
  handleRegistrationSubmit,
  handleSignInSubmit,
  handleSignInSpotify,
  formType,
  backgroundColor,
  children,
  isLoading = false,
}) => {
  const [loading, setLoading] = useState(false);
  let mode;

  switch (formType) {
    case 'register':
      mode = handleRegistrationSubmit;
      break;
    case 'sign in':
      mode = handleSignInSubmit;
      break;
  }
  const styleProps = {
    backgroundColor,
  };

  return !isLoading ? (
    <TouchableHighlight onPress={mode}>
      <View style={styles(styleProps).button}>
        <Text style={styles(styleProps).text}>{children}</Text>
      </View>
    </TouchableHighlight>
  ) : (
    <ActivityIndicator size="large" color="#00ff00" />
  );
};

SubmitButton.defaultProps = {
  children: null,
};

SubmitButton.propTypes = {
  children: PropTypes.node,
};
