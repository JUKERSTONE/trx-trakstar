import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
import {useAuthentication} from '../../authentication';
import {api, useAPI} from '../../api';
import {store, handleExchangeTRAK, appendWallet} from '../../stores';
import {useTRAKLISTState} from '../..';

const {handleGetState} = useTRAKLISTState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useExchange = ({navigation, title, artist, id}: any) => {
  const {useGET, usePOST} = useAPI();
  const [trak, setTRAK] = useState(null);
  const [nft, setNFT] = useState(null);

  useEffect(() => {
    handleGetBank();
  }, []);

  const handleGetBank = async () => {
    const route = api.bernie({method: 'bank'});
    const response: any = await useGET({route, token: accessToken});
    const data = response.data;
    console.log(
      '🚀 ~ file: useWalletExchange.ts ~ line 25 ~ handleGetBank ~ data',
      data,
    );
    setTRAK(data.trak);
    setNFT(data.nft);
  };

  const handleExchange = ({item}: any) => {
    Alert.alert(
      'Pending TRX Exchange',
      `You are about to swap '${title}' by ${artist} for '${item.title}' by ${item.artist} `,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'EXCHANGE',
          onPress: async () => {
            // //
            // const profile = handleGetState({index: 'profile'});

            // const route = api.bernie({
            //   method: 'exchange_trak',
            // });

            // const exchangeTRAK = usePOST({
            //   route,
            //   payload: {boughtID: item.trakID, soldID: id},
            //   token: accessToken,
            // });

            // const wallet = profile.TRX.wallet;

            // const newWallet = wallet.filter((item: any) => {
            //   return item.trakID != id;
            //   //
            // });

            // const action = refreshWallet(newWallet);
            // store.dispatch(action);

            // const action_2 = appendWallet(item);
            // store.dispatch(action_2);

            const wallet = handleGetState({index: 'wallet'});
            const trakWallet = wallet.trak;

            const route = api.bernie({
              method: 'exchange_trak',
            });

            const newTRAK = await usePOST({
              route,
              payload: {boughtID: item.trakID, soldID: id},
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
            console.log(
              '🚀 ~ file: useWalletExchange.ts ~ line 85 ~ onPress: ~ newTRAK',
              newTRAK,
            );

            const newWallet = trakWallet.filter((item: any) => {
              return item.trakID != id;
            });
            console.log(
              '🚀 ~ file: useWalletExchange.ts ~ line 98 ~ newWal ~ newWallet',
              newWallet,
              item,
            );

            console.log(
              '🚀 ~ file: useWalletExchange.ts ~ line 105 ~ onPress: ~ [...newWallet, item]',
              [...newWallet, item],
            );
            const action = handleExchangeTRAK([...newWallet, newTRAK]);
            store.dispatch(action);

            navigation.navigate('TRX');
          },
        },
      ],
    );
  };

  const handleReload = () => {
    handleGetBank();
  };

  return {
    handleExchange,
    trak,
    nft,
    handleReload,
  };
};
