import React, {useEffect, useState, useContext, useCallback} from 'react';
import {routes, useAPI} from '../../api';
import storage from '@react-native-firebase/storage';
import {
  useBERNIEState,
  handleAcceptTRAK,
  handleSubmitProduct,
  handleGetPreviews,
} from '../../app';
import {useEffectAsync} from '../../app/hooks';
import {handleTRXRequests} from '../../app/firebase/hooks/getTRXRequests';
import firestore from '@react-native-firebase/firestore';

const {handleGetState} = useBERNIEState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useTRXRequests = ({navigation, route}: any) => {
  const [requests, setRequests] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [errorLoad, setErrorLoad] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    handleRequests();

    setRefreshing(false);
  }, [refreshing]);

  useEffectAsync(async () => {
    await handleRequests();
  }, []);

  const handleRequests = async () => {
    const requests = await handleTRXRequests();
    console.log(
      '🚀 ~ file: useTRXRequests.ts:37 ~ handleRequests ~ requests:',
      requests,
    );
    setRequests(requests);
  };

  const handleNavigateTrakFill = async ({reference}: any) => {
    console.log(
      '🚀 ~ file: useTRXRequests.ts:45 ~ handleNavigateTrakFill ~ reference:',
      reference,
    );
    console.log(
      '🚀 ~ file: useTRXRequests.ts:50 ~ handleNavigateTrakFill ~ navigation:',
      navigation,
    );
    navigation.navigate('TRXFill', {trak: reference});
  };

  const handleRemoveRequest = async (item: any) => {
    console.log(
      '🚀 ~ file: useTRX00Match.ts:33 ~ handleRemoveRequest ~ item:',
      item,
    );

    return await firestore()
      .collection('fundamentals/BERNIE/requests')
      .where('trak.title', '==', item.trak.title)
      .where('trak.artist', '==', item.trak.artist)
      .limit(1)
      .get()
      .then((doc: any) => {
        const path = doc._changes[0]._nativeData.doc.path;
        firestore().doc(path).delete();
        console.log('🚀 ~ file: useGeniusMatch.ts:334 ~ .then ~ doc:', doc);
        //
      })
      // .then(() => handlePreviews())
      .catch(err => {
        alert('failed');
        console.log('🚀 ~ file: useTRX00Match.ts:62 ~ .then ~ err:', err);
      });

    // return firestore().doc(`requests/trx:01:${payload.NFTFileName}`).delete();
  };

  return {
    requests,
    refreshing,
    onRefresh,
    errorLoad,
    handleRemoveRequest,
    handleNavigateTrakFill,
  };
};
