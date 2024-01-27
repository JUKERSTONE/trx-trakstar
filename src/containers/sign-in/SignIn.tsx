import React from 'react';
import {View, Text} from 'react-native';
import {useSignIn} from './useSignIn';
import {SignInElement} from '../../elements';

export const SignInContainer = ({...props}) => {
  const {...useSignInProps} = useSignIn();
  return <SignInElement {...useSignInProps} />;
};
