import React, {useEffect, useState, useContext} from 'react';
import {routes, useAPI} from '../../api';
import {useBERNIEState, handleRequests} from '../../app';

const {handleGetState} = useBERNIEState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useNFTRequests = ({navigation}: any) => {
  const [NFTRequests, setNFTRequests] = useState(null);
  const {GET} = useAPI();

  useEffect(() => {
    handleTRAKRequest();
  }, []);

  const handleNFTRequest = ({item, trak}: any) => {
    console.log(
      '🚀 ~ file: useNFTRequests.ts:19 ~ handleNFTRequest ~ trak:',
      trak,
    );
    navigation.navigate('VERIFY_NFT', {item, trak});
  };

  const handleTRAKRequest = async () => {
    const requests: any = await handleRequests();
    console.log(
      '🚀 ~ file: useNFTRequests.ts:37 ~ handleTRAKRequest ~ requests:',
      requests,
    );
    setNFTRequests(requests);
  };

  return {
    NFTRequests,
    handleNFTRequest,
  };
};
