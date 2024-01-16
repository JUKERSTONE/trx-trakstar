import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
import {useTRAKLISTState} from '../..';
import {useAPI, api} from '../../api';
import {store, handleExchangeTRAK, appendWallet} from '../../stores';

export const useWalletTab = ({navigation, title, artist, item, id}: any) => {
  const {handleGetState} = useTRAKLISTState();
  const {useGET, usePOST} = useAPI();

  const keys = handleGetState({index: 'keys'});
  const accessToken = keys.trx.accessToken;

  const handleExchange = ({trak}: any) => {
    Alert.alert(
      'Pending TRX Exchange',
      `You are about to swap '${title}' by ${artist} for '${trak.title}' by ${trak.artist}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'EXCHANGE',
          onPress: async () => {
            const wallet = handleGetState({index: 'wallet'});
            const trakWallet = wallet.trak;

            const route = api.bernie({
              method: 'exchange_trak',
            });

            const newTRAK = await usePOST({
              route,
              payload: {boughtID: id, soldID: trak.trakID},
              token: accessToken,
            })
              .then(res => {
                return res.data;
              })
              .catch(err => {
                console.log(
                  '🚀 ~ file: useWalletTab.ts ~ line 46 ~ onPress: ~ err',
                  err,
                );
              });

            const newWallet = trakWallet.filter((item: any) => {
              return item.trakID != trak.trakID;
            });
            console.log(
              '🚀 ~ file: useWalletTab.ts ~ line 52 ~ newWal ~ newWallet',
              newWallet,
              newTRAK,
            );

            const action = handleExchangeTRAK([...newWallet, newTRAK]);
            store.dispatch(action);

            navigation.navigate('WALLET+');
          },
        },
      ],
    );
  };

  return {
    handleExchange,
  };
};
