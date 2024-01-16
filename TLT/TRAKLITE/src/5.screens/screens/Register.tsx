import React from 'react';
import {View, ScrollView, Button, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {RegistrationView} from '../../6.containers';

export const Register = ({...props}) => {
  const windowHeight = Dimensions.get('window').height;
  return <RegistrationView {...props} />;
};
