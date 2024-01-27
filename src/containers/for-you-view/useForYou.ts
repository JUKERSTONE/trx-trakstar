import {
  toggleExchangeView,
  store,
  setAuthentication,
  setYoutubeId,
  handleMediaPlayerAction,
  setLikes,
  appendLike,
} from '../../stores';
import {useEffectAsync, useLITELISTState} from '../../app';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {api, useAPI, APIKeys} from '../../api';
import algoliasearch from 'algoliasearch';
import {ALGOLIA_APP_ID, ALGOLIA_API_KEY} from '../../auth';
import firestore from '@react-native-firebase/firestore';
import {useTRX} from '../../app/hooks/useTRX';

export const useForYou = (props: any) => {
  const {useGET} = useAPI();
  const [trak, setTRAK] = useState<any>([]);
  const [metaTRAK, setMetaTRAK] = useState<any>([]);
  const [results, setResults] = useState<any>([]);
  console.log(
    '🚀 ~ file: useTRAKTab.ts ~ line 15 ~ useTRAKTab ~ results',
    results,
  );
  const {handlePlayTRX} = useTRX({
    ...props.navigation,
    ...props,
  });
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const keys = handleGetState({index: 'keys'});
  const appToken = keys.spotify.appToken;

  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
  const index = client.initIndex('trx');
  console.log('🚀 ~ file: useTRAKTab.ts ~ line 16 ~ useTRAKTab ~ index', index);

  useEffectAsync(async () => {
    const trak = await firestore()
      .collection('TRX')
      .get()
      .then(data => {
        let trak: any = [];

        data.forEach((doc: any) => {
          trak.push(doc.data());
        });
        console.log(
          '🚀 ~ file: useForYou.ts:41 ~ useEffectAsync ~ trak:',
          trak,
        );

        return trak;
      });
    console.log('🚀 ~ file: useForYou.ts:37 ~ useEffectAsync ~ trak:', trak);

    setMetaTRAK(trak);
  }, []);

  useEffect(() => {
    console.log(
      '🚀 ~ file: useTRAKTab.ts ~ line 36 ~ useEffect ~ metaTRAK',
      metaTRAK,
      trak,
    );
    // const test = metaTRAK.concat(trak);

    if (trak.length != 0) setResults(metaTRAK.concat(trak));
  }, [metaTRAK, trak]);

  const handleTRAK = async (result: any) => {
    console.log('🚀 ~ handleTRAK ~ result:', result);
    const action = appendLike({
      ...result.TRAK.trak,
      userId: TRXProfile.id,
      trxUri: 'trx:00:' + result.isrc,
    });
    store.dispatch(action);
    handlePlayTRX({
      navigation: props.navigation,
      geniusId: result.TRAK.trak.genius.id.replace(/["\\]/g, ''),
      spotifyAccessToken: appToken,
    });
  };
  return {
    metaTRAK,
    handleTRAK,
    results,
    TRXProfile,
    // handleDeposit,
    // handleGoBack,
    // isLoggedIn,
    // handleAuthentication,
  };
};
