import React, {useEffect, useState, useContext} from 'react';
import {useFirebase} from '../../app';

export const useSignIn = () => {
  const {handleSignIn} = useFirebase();
  const [signIn, setSignIn] = useState<any>({
    email: null,
    password: null,
  });

  const handleSignInChange = ({text, type}: any) => {
    switch (type) {
      case 'email':
        setSignIn({...signIn, email: text});
        break;
      case 'password':
        setSignIn({...signIn, password: text});
        break;
    }
  };

  const handleSignInEvent = async () => {
    await handleSignIn({
      email: signIn.email,
      password: signIn.password,
    });
  };
  return {
    handleSignInChange,
    handleSignInEvent,
  };
};
