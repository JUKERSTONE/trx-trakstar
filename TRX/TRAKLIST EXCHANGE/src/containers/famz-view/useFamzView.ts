import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {useTRAKLISTState} from '../../app';
import {store} from '../../stores';
import {api, useAPI} from '../../api';
import {tempAppendWallet} from '../../stores';

const {handleGetState} = useTRAKLISTState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;
const profile = handleGetState({index: 'profile'});
const TRX = profile.TRX;
const hasForchainId = TRX.hasOwnProperty('forchainId');
const publicKey = TRX.stacks_public_key;
console.log(
  '🚀 ~ file: useFamzView.ts ~ line 14 ~ hasForchainId',
  hasForchainId,
);

export const useFamzView = ({navigation, item}: any) => {
  const {usePOST} = useAPI();

  const senderKey = TRX.stacks_keys.private;

  const handlePurchaseWhitelist = async ({
    event,
    nft,
    quantity,
    id,
    market,
  }: any) => {
    if (event.nativeEvent.data === 'failed') {
      alert('error processign transaction');
      return;
    } else {
      alert('tx : ' + event.nativeEvent.data);

      const route = api.bernie({
        method: 'purchase_nft',
        payload: {nftID: id},
      });

      const tx_id = event.nativeEvent.data;

      const blockchain = {
        status: {
          purchase_whitelist: {
            timestamp: new Date().toString(),
            tx_id,
            tx_status: 'pending',
          },
          claim_whitelist: {
            timestamp: null,
            tx_id: null,
            tx_status: null,
          },
          claim_nft: {
            timestamp: null,
            tx_id: null,
            tx_status: null,
          },
        },
        state: 'purchase_whitelist',
      };

      const response: any = await usePOST({
        route,
        token: accessToken,
        payload: {market, blockchain},
      });

      const data = response.data;
      console.log(
        '🚀 ~ file: useFamzView.ts ~ line 53 ~ useFamzView ~ data',
        data,
      );

      if (data === 'not updated') {
        alert('error contacting bernie regarding purchase');
        return;
      } else alert('Congrats. NFT succesfully purchased');

      // action to temporailly append wallet item

      // const action = tempAppendWallet(data);
      // store.dispatch(action);

      navigation.navigate('WALLET+');
    }
  };

  return {
    senderKey,
    handlePurchaseWhitelist,
    accessToken,
    publicKey,
  };
};
