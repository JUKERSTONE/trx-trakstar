import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {WalletSetupContainer} from '../containers';

export const WalletSetupScreen = ({...props}) => {
  return <WalletSetupContainer {...props} />;
};
