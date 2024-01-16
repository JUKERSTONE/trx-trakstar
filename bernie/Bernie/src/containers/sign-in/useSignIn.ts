import React, {useEffect, useState, useContext} from 'react';
import {useFirebase} from '../../app';
import {
  store,
  storeKeysTRX,
  asyncStorageIndex,
  useAsyncStorage,
} from '../../stores';

export const useSignIn = () => {
  const {handleStore} = useAsyncStorage();
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
    const idToken = await handleSignIn({
      email: signIn.email,
      password: signIn.password,
    });

    const action_2 = storeKeysTRX(idToken.token);
    store.dispatch(action_2);

    const key = asyncStorageIndex.accessTokenTRX;
    handleStore({key, value: idToken.token});
  };
  return {
    handleSignInChange,
    handleSignInEvent,
  };
};
