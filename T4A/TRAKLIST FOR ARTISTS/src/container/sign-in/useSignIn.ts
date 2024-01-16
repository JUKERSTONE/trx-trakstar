import React, {useEffect, useState, useContext} from 'react';
import {useFirebase} from '../../app';
import {
  store,
  storeKeysTRX,
  asyncStorageIndex,
  useAsyncStorage,
} from '../../stores';

export const useSignIn = () => {
  const {handleSignIn} = useFirebase();
  const [signIn, setSignIn] = useState<any>({
    email: null,
    password: null,
  });

  useEffect(() => {
    console.log(
      '🚀 ~ file: useSignIn.ts ~ line 12 ~ useSignIn ~ signIn',
      signIn,
    );
  }, [signIn]);

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
