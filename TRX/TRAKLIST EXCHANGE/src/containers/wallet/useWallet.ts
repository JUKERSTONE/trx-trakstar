import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {useTRAKLISTState} from '../../app';
import {Linking} from 'react-native';
import {toggleExchangeView, store} from '../../stores';
import {useFocusEffect} from '@react-navigation/native';
import {api, useAPI} from '../../api';
import {handleRefreshWallet} from '../../app';

export const useWallet = ({navigation, route}: any) => {
  const {handleGetState} = useTRAKLISTState();

  const keys = handleGetState({index: 'keys'});
  const accessToken = keys.trx.accessToken;
  const [nftWallet, setNFTWallet] = useState([]);
  const [nft, setNFT] = useState(null);
  const [trakWallet, setTRAKWallet] = useState([]);
  const [trak, setTRAK] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const {useGET} = useAPI();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const hasForchain = TRXProfile.stacks_keys.secret ?? null;

  useFocusEffect(
    React.useCallback(() => {
      handleLoad();
    }, []),
  );

  const handleLoad = () => {
    setTimeout(() => {
      const walletState = TRXProfile.wallet;
      const nft = walletState?.nft;
      const trak = walletState?.trak;

      const nftWallet = nft?.map((item: any) => ({
        value: item.isNFT ? item.nft.trakTITLE : item.title,
        key: item.isNFT ? `NFT:${item.nftID}` : `TRX:${item.trakID}`,
      }));
      setNFTWallet(nftWallet);
      setNFT(nft);

      const trakWallet = trak?.map((item: any) => ({
        value: item.isNFT ? item.nft.trakTITLE : item.title,
        key: item.isNFT ? `NFT:${item.nftID}` : `TRX:${item.trakID}`,
      }));
      setTRAKWallet(trakWallet);
      setTRAK(trak);
    }, 1000);
  };

  const handleNavigateTRAK = ({trak}: any) => {
    console.log(
      '🚀 ~ file: useWallet.ts ~ line 44 ~ handleNavigateTRAK ~ trak',
      trak,
    );
    navigation.navigate('TRAK', {
      screen: 'TRAK',
      params: {trak},
    });
  };

  const handleExchange = ({trak}: any) => {
    navigation.navigate('MODAL', {
      type: 'exchange',
      exchange: {
        active: true,
        mode: 'wallet',
        item: trak,
      },
    });
  };

  const handleNavigateNFT = ({trak: nft}: any) => {
    navigation.navigate('TRAK', {
      screen: 'NFT',
      params: {nft},
    });
  };

  const handleConnectWallet = () => {
    navigation.navigate('CONNECT');
  };

  const handleReload = () => {
    handleLoad();
  };

  const handleRefresh = async () => {
    // handleRefreshWallet(accessToken);

    const stacks_public_key = TRXProfile.stacks_public_key;
    const route = `https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/mempool?address=${stacks_public_key}`;

    const response: any = await useGET({route}).catch(err => {});

    const mempool = response.data.results;

    const nfts = TRXProfile.wallet.nft;

    nfts.map(async (nft: any) => {
      console.log('🚀 ~ file: useWallet.ts ~ line 127 ~ nfts.map ~ nft', nft);

      const {
        blockchain: {status, state},
      } = nft;

      const phase = status[state];

      const txId = phase.tx_id; // if doesn't exist them something went horribly wrong

      const foundMempoolTransaction = mempool.some((transaction: any) => {
        const {tx_status, tx_id} = transaction;

        return tx_id === '0x' + txId;
      });

      if (foundMempoolTransaction) {
        alert('reset pending state');
      } else {
        const route = `https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/${txId}`;

        const response: any = await useGET({route}).catch(err => {});

        const transactionResponse = response.data;
        const tx_status = transactionResponse.tx_status;

        if (tx_status === 'abort_by_post_condition') {
          alert('update tx_status to frozen');
        } else {
          alert('update tx_status to success');
          alert('upgrade state');
        }
      }
      /* 
        has transaction tx_id 
          - yes : check mempool for corresponding tx_id
            - yes : reset pending state 
            - no : check transaction is succesfull
              - yes : update tx_status to success
              - no : update tx_status to frozen
          - no : update tx_status to frozen
      */
    });
  };

  return {
    nftWallet,
    trakWallet,
    nft,
    trak,
    handleNavigateTRAK,
    handleNavigateNFT,
    handleExchange,
    handleConnectWallet,
    hasForchain,
    profile: TRXProfile,
    handleReload,
    refreshing,
    setRefreshing,
    handleRefresh,
  };
};
