import React, {useEffect, useState, useContext} from 'react';
import {store, handleMediaPlayerAction} from '../../stores';
import {useLITELISTState, useFirebase} from '../../app';
import {useAPI} from '../../api';

export const useNFT = ({navigation, route}: any) => {
  const {handleGetState} = useLITELISTState();
  const {useGET} = useAPI();
  const {handleAppendTransactions, handleMigrateTransaction} = useFirebase();

  const profile = handleGetState({index: 'profile'});
  const TRX = profile.TRX;
  const stacks_keys = TRX.stacks_keys;

  const senderKey = stacks_keys.private;
  const publicKey = stacks_keys.public;

  const handlePurchaseWhitelist = async (event: any, item: any) => {
    const eventData = event.nativeEvent.data;
    console.log(
      '🚀 ~ file: useNFT.ts ~ line 20 ~ handlePurchaseWhitelist ~ eventData',
      eventData,
    );

    const transactionData = eventData.split(':');

    const eventType = transactionData[0];
    console.log(
      '🚀 ~ file: useNFT.ts ~ line 24 ~ handlePurchaseWhitelist ~ eventType',
      eventType,
    );
    const transactionId = transactionData[1];
    console.log(
      '🚀 ~ file: useNFT.ts ~ line 26 ~ handlePurchaseWhitelist ~ transactionId',
      transactionId,
    );

    alert(transactionId);
    switch (eventType) {
      case 'purchase-whitelist':
        console.log(
          '🚀 ~ file: useNFT.ts ~ line 20 ~ handlePurchaseWhitelist ~ transactionId',
          transactionId,
        );

        const route = `https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/mempool?address=${publicKey}`;

        const response: any = await useGET({
          route,
        });
        console.log(
          '🚀 ~ file: useNFT.ts ~ line 23 ~ handlePurchaseWhitelist ~ response',
          response,
        );

        const mempool = response.data.results;
        console.log(
          '🚀 ~ file: useNFT.ts ~ line 32 ~ handlePurchaseWhitelist ~ mempool',
          mempool,
        );

        const transaction = mempool.find(
          (transaction: any) => transaction.tx_id === '0x' + transactionId,
        );
        console.log(
          '🚀 ~ file: useNFT.ts ~ line 34 ~ handlePurchaseWhitelist ~ transaction',
          transaction,
        );

        // add to state

        await handleAppendTransactions({
          ...transaction,
          asset_name: item.trak.artist,
          cover_art: item.trak.thumbnail,
          nftId: item.nftId,
        });
        break;
      case 'claim-whitelist':
        console.log(
          '🚀 ~ file: useNFT.ts ~ line 20 ~ handlePurchaseWhitelist ~ transactionId',
          transactionId,
        );

        const route1 = `https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/mempool?address=SP26RS42R5ZH10VWWG4HFYPRJRC3JJ3FKWY4V58CW`;

        const response1: any = await useGET({
          route: route1,
        });
        console.log(
          '🚀 ~ file: useNFT.ts ~ line 23 ~ handlePurchaseWhitelist ~ response',
          response1,
        );

        const mempool1 = response1.data.results;
        console.log(
          '🚀 ~ file: useNFT.ts ~ line 32 ~ handlePurchaseWhitelist ~ mempool',
          mempool1,
        );

        const transaction1 = mempool1.find(
          (transaction: any) => transaction.tx_id === '0x' + transactionId,
        );
        console.log(
          '🚀 ~ file: useNFT.ts ~ line 34 ~ handlePurchaseWhitelist ~ transaction',
          transaction1,
        );

        // add to state

        console.log(
          '🚀 ~ file: useNFT.ts ~ line 113 ~ handlePurchaseWhitelist ~ item',
          item,
        );
        await handleMigrateTransaction({
          ...transaction1,
          asset_name: item.asset_name,
          cover_art: item.cover_art,
          nftId: item.nftId,
        });
        break;
      case 'claim-nft':
        console.log(
          '🚀 ~ file: useNFT.ts ~ line 20 ~ handlePurchaseWhitelist ~ transactionId',
          transactionId,
        );

        const route2 = `https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/mempool?address=${publicKey}`;

        const response2: any = await useGET({
          route: route2,
        });
        console.log(
          '🚀 ~ file: useNFT.ts ~ line 23 ~ handlePurchaseWhitelist ~ response',
          response2,
        );

        const mempool2 = response2.data.results;
        console.log(
          '🚀 ~ file: useNFT.ts ~ line 32 ~ handlePurchaseWhitelist ~ mempool',
          mempool2,
        );

        const transaction2 = mempool2.find(
          (transaction: any) => transaction.tx_id === '0x' + transactionId,
        );
        console.log(
          '🚀 ~ file: useNFT.ts ~ line 34 ~ handlePurchaseWhitelist ~ transaction',
          transaction2,
        );

        // add to state

        console.log(
          '🚀 ~ file: useNFT.ts ~ line 157 ~ handlePurchaseWhitelist ~ item',
          item,
        );
        await handleMigrateTransaction({
          ...transaction2,
          asset_name: item.asset_name,
          cover_art: item.cover_art,
          nftId: item.nftId,
        });
        break;
        break;
      default:
        break;
    }

    // find transactionId
    // has ID, update state
    // doesnt have ID, search for transaction and update state
  };

  return {
    senderKey,
    publicKey,
    handlePurchaseWhitelist,
  };
};
