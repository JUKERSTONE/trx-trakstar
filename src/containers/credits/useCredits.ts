import {toggleExchangeView, store, setAuthentication} from '../../stores';
import {useLITELISTState} from '../../app';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {api, useAPI, APIKeys} from '../../api';

export const useCredits = ({navigation}: any) => {
  const {useGET} = useAPI();
  const [trak, setTRAK] = useState();

  const handleGenius = (item: any) => {
    console.log(
      '🚀 ~ file: useCredits.ts ~ line 8 ~ useCredits ~ navigation',
      navigation,
    );
    console.log(
      '🚀 ~ file: useCredits.ts ~ line 12 ~ handleGenius ~ item',
      item,
    );
    navigation.navigate('GENIUS', {
      url: item.url,
    });
  };

  return {
    handleGenius,
  };
};
