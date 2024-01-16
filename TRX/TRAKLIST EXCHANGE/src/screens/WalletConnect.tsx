import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  Alert,
  TextInput,
  Button,
} from 'react-native';
import {store, depositMoney} from '../stores';

import {WalletConnectContainer} from '../containers';

export const WalletConnectScreen = ({...props}: any) => {
  return <WalletConnectContainer {...props} />;
};
