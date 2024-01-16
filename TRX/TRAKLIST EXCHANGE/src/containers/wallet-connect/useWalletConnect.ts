import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {useAPI, api} from '../../api';
import {useTRAKLISTState} from '../..';

const {handleGetState} = useTRAKLISTState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useWalletConnect = ({navigation}: any) => {
  const {usePOST} = useAPI();

  const handleConnect = async (event: any) => {
    console.log(event.nativeEvent.data);
    const publicKey = event.nativeEvent.data;

    if (publicKey === 'error') {
      alert('INVALID SECRET KEY');
      return;
    }

    const route: any = api.walter({
      method: 'connect_forchain',
    });

    const payload = {
      publicKey,
    };
    console.log(
      '🚀 ~ file: useWalletConnect.ts ~ line 30 ~ handleConnect ~ publicKey',
      publicKey,
    );

    await usePOST({route, payload, token: accessToken})
      .then(() => {
        alert('succesfully connected to forchain wallet');
        navigation.navigate('WALLET', {hasForchain: true});
      })
      .catch(() => {
        alert('failed to connect to forchain wallet');
      });
  };

  return {
    handleConnect,
  };
};
