import {
  toggleExchangeView,
  store,
  setAuthentication,
  handleMediaPlayerAction,
  appendLike,
} from '../../stores';
import {handleLikeTRAK, useLITELISTState, handleLikeExists} from '../../app';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {api, useAPI, APIKeys} from '../../api';
import algoliasearch from 'algoliasearch';
import {ALGOLIA_APP_ID, ALGOLIA_API_KEY} from '../../auth';
import Toast from 'react-native-toast-message';

export const useAIMusic = ({query, navigation}: any) => {
  console.log('🚀 ~ file: useTRAKTab.ts ~ line 8 ~ useTRAKTab ~ query', query);
  const {useGET} = useAPI();
  const [originals, setOriginals] = useState<any>([]);
  const [results, setResults] = useState<any>([]);
  console.log(
    '🚀 ~ file: useTRAKTab.ts ~ line 15 ~ useTRAKTab ~ results',
    results,
  );

  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;

  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
  const index = client.initIndex('trx-01');
  console.log('🚀 ~ file: useTRAKTab.ts ~ line 16 ~ useTRAKTab ~ index', index);

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  const handleSearch = async (query: any) => {
    console.log(
      '🚀 ~ file: useTRAKTab.ts ~ line 29 ~ handleSearch ~ query',
      query,
    );

    const titleQuery = !query.split('-')[1] ? query : query.split('-')[1];

    // SEARCH
    index
      .search(titleQuery)
      .then(({hits}) => {
        console.log('🚀 ~ file: useOriginals.ts:56 ~ .then ~ hits:', hits);
        setOriginals(hits);
      })
      .catch(err => {
        // alert(2);
        console.log(err);
      });
  };

  const handleTRAK = async ({trak}: any) => {
    // Alert.alert(`TRX ORIGINAL TRACK`, `${trak.artist} - ${trak.title}`, [
    //   {
    //     text: 'Cancel',
    //     onPress: () => console.log('Cancel Pressed'),
    //     style: 'cancel',
    //   },
    //   {
    //     text: 'Play Song',
    //     onPress: async () => {
    console.log('🚀 ~ file: useOriginals.ts:67 ~ handleTRAK ~ trak:', trak);
    Toast.show({
      type: 'success',
      text1: 'Playing TRX Original Track',
      text2: `${trak.artist} - ${trak.title}`,
    });

    const action = handleMediaPlayerAction({
      playbackState: 'source',
      uri: trak.trakAUDIO,
      url: trak.cover_art,
      artist: trak.artist,
      title: trak.title,
      mode: 'header',
      id: {
        spotify: null,
        apple_music: null,
        traklist: trak.NFTFileName,
      },
      isrc: null,
    });
    store.dispatch(action);
    //     },
    //   },
    //   {
    //     text: 'Save Song',
    //     onPress: async () => {
    //       console.log(
    //         '🚀 ~ file: useOriginals.ts:114 ~ onPress: ~ trak:',
    //         trak,
    //       );
    //       // check if already liked
    //       const likeExists = await handleLikeExists({trak});
    //       console.log(
    //         '🚀 ~ file: useOriginals.ts:120 ~ onPress: ~ likeExists:',
    //         likeExists,
    //       );

    //       if (likeExists) {
    //         alert('already liked');
    //       } else {
    //         handleLikeTRAK({trak}).then(() => {
    //           const action = appendLike(trak);
    //           store.dispatch(action);
    //         });
    //       }
    //     },
    //   },
    //   {
    //     text: 'Buy Merchandise',
    //     onPress: async () => {
    //       alert('Coming soon');
    //     },
    //   },
    // ]);
  };
  return {
    originals,
    handleTRAK,
    results,
    TRXProfile,
    // handleDeposit,
    // handleGoBack,
    // isLoggedIn,
    // handleAuthentication,
  };
};
