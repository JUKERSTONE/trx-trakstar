import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {store, toggleExchangeView} from '../../stores';
import {useT4AState} from '../..';
import {handleGetPortfolio} from '../../app';

const {handleGetState} = useT4AState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const usePortfolio = ({navigation}: any) => {
  console.log(
    '🚀 ~ file: usePortfolio.ts ~ line 6 ~ usePortfolio ~ navigation',
    navigation,
  );
  const {useGET, usePOST} = useAPI();
  const [portfolio, setPortfolio] = useState([]);

  const profile = handleGetState({index: 'profile'});
  const firebase = profile.firebase;
  const userID = firebase.uid;

  useEffect(() => {
    handlePortfolio();
  }, []);

  const handlePortfolio = async () => {
    const portfolio: any = await handleGetPortfolio();
    console.log(
      '🚀 ~ file: usePortfolio.ts:39 ~ handlePortfolio ~ portfolio:',
      portfolio,
    );
    setPortfolio(portfolio);
  };

  const handleNavigateNFT = ({item}: any) => {
    console.log(
      '🚀 ~ file: usePortfolio.ts ~ line 47 ~ handleNavigateNFT ~ navigation',
      navigation,
    );
    navigation.navigate('NFT_DASHBOARD', item);
  };

  return {
    portfolio,
    handleNavigateNFT,
  };
};
