import React, {useEffect, useState, useContext} from 'react';
import {store, handleMediaPlayerAction} from '../../stores';
import {useLITELISTState, useFirebase} from '../../app';
import {useAPI, api} from '../../api';

export const useNFTStatus = ({navigation, route, transaction}: any) => {
  const {handleGetState} = useLITELISTState();
  const {useGET} = useAPI();
  const {handleAppendTransactions} = useFirebase();

  useEffect(() => {
    console.log(
      '🚀 ~ file: useNFTStatus.ts ~ line 7 ~ useNFTStatus ~ transaction',
      transaction,
    );

    const transactionId = transaction.tx_id;

    handleGetTransaction(transactionId);
    //
    //
  }, []);

  const handleGetTransaction = async (transactionId: any) => {
    console.log(
      '🚀 ~ file: useNFTStatus.ts ~ line 25 ~ handleGetTransaction ~ transactionId',
      transactionId,
    );
    const route = api.stacks({method: 'transaction', payload: {transactionId}});
    console.log(
      '🚀 ~ file: useNFTStatus.ts ~ line 26 ~ handleGetTransaction ~ route',
      route,
    );

    const response: any = await useGET({route})
      .then(response => {
        return response.data;
      })
      .catch(() => {
        alert('Unrecognised Transaction ID');
      });

    const tx_status = response.tx_status;

    switch (tx_status) {
      case 'abort_by_post_condition':
        alert(tx_status);
        // delete from state
        break;
      default:
        alert(tx_status);
        break;
    }
  };

  return {
    //
    //
  };
};
