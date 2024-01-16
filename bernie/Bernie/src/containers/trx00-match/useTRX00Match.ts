import React, {useEffect, useState, useContext, useCallback} from 'react';
import {routes, useAPI} from '../../api';
import storage from '@react-native-firebase/storage';
import {useBERNIEState, handleAcceptTRAK, handleGetPreviews} from '../../app';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

export const useTRX00Match = ({navigation, route}: any) => {
  const [previews, setPreviews] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      handlePreviews();
    }, []),
  );

  const handlePreviews = async () => {
    const previews: any = await handleGetPreviews();
    console.log(
      '🚀 ~ file: useTRX00Match.ts:10 ~ useEffect ~ previews:',
      previews,
    );
    setPreviews(previews);
  };

  const [refreshing, setRefreshing] = useState(false);
  const [errorLoad, setErrorLoad] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    handlePreviews();

    setRefreshing(false);
  }, [refreshing]);

  const handleMatch = ({reference}: any) => {
    console.log(
      '🚀 ~ file: useTRX00Match.ts:23 ~ handleMatch ~ reference:',
      reference,
    );
    navigation.navigate('GeniusMatch', {
      reference,
    });
  };

  const handleRemoveRequest = async (item: any) => {
    console.log(
      '🚀 ~ file: useTRX00Match.ts:33 ~ handleRemoveRequest ~ item:',
      item,
    );

    return await firestore()
      .collection('likes')
      .where('title', '==', item.title)
      .where('artist', '==', item.artist)
      .limit(1)
      .get()
      .then((doc: any) => {
        const path = doc._changes[0]._nativeData.doc.path;
        firestore().doc(path).update({hasCheck: true});
        console.log('🚀 ~ file: useGeniusMatch.ts:334 ~ .then ~ doc:', doc);
        //
      })
      .then(() => handlePreviews())
      .catch(err => {
        alert('failed');
        console.log('🚀 ~ file: useTRX00Match.ts:62 ~ .then ~ err:', err);
      });

    // return firestore().doc(`requests/trx:01:${payload.NFTFileName}`).delete();
  };

  return {
    previews,
    handleMatch,
    handleRemoveRequest,
    onRefresh,
    refreshing,
    errorLoad,
  };
};
