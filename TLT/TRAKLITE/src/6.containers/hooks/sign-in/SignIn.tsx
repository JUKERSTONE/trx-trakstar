import React from 'react';

import {useSignIn} from './useSignIn';
import SignInForm from '../../../7.elements/sign_in';

export const SignInView = ({navigation}: any) => {
  const {...useProps} = useSignIn(navigation);
  return <SignInForm {...useProps} />;
};
