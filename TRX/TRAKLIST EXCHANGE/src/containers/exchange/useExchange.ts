import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {api, useAPI} from '../../api';
import {store, toggleExchangeView} from '../../stores';
import {useTRAKLISTState} from '../../app';

const {handleGetState} = useTRAKLISTState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useExchange = ({navigation}: any) => {
  const {useGET} = useAPI();
  const [nft, setNFT] = useState(null);
  const [trak, setTRAK] = useState(null);

  useEffect(() => {
    handleGetBank();
  }, []);

  const handleGetBank = async () => {
    const route = api.bernie({method: 'bank'});

    const response: any = await useGET({route, token: accessToken});

    const data = response.data;
    setTRAK(data.trak);
    setNFT(data.nft);
  };

  const handleExchange = ({item}: any) => {
    navigation.navigate('MODAL', {
      type: 'exchange',
      exchange: {
        active: true,
        mode: 'exchange',
        item,
      },
    });
  };

  const handleTextInputChange = (text: any) => {
    // const test = bank.filter((item: any) => {
    //   // alert(JSON.stringify(item.title));
    //   return item.title.search(text) != -1;
    // });
  };

  const handleReload = () => {
    handleGetBank();
  };

  return {
    trak,
    nft,
    handleExchange,
    handleTextInputChange,
    handleReload,
  };
};
