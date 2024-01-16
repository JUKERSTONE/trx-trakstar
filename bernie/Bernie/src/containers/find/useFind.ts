import React, {useEffect, useState, useContext, useCallback} from 'react';
import {routes, useAPI} from '../../api';
import storage from '@react-native-firebase/storage';
import {useBERNIEState, handleAcceptTRAK, handleGetPreviews} from '../../app';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';
import {searchYouTube} from '../../app/handlers/searchYoutube';
import {setTRXFill, store} from '../../stores';

export const useFind = ({navigation, route}: any) => {
  const [text, setText] = useState('');
  const [results, setResults] = useState<any>(null);
  const {GET} = useAPI();

  const params = route.params;
  const provider = params.provider;
  console.log('🚀 ~ file: useFind.ts:15 ~ useFind ~ provider:', provider);

  const {handleGetState} = useBERNIEState();

  const keys = handleGetState({index: 'keys'});
  console.log('🚀 ~ file: useFind.ts:21 ~ useFind ~ keys:', keys);
  const token = keys.spotify.bernie.access_token;

  const handleSubmit = async () => {
    console.log(
      '🚀 ~ file: useFind.ts:24 ~ handleSubmit ~ provider:',
      provider,
    );

    switch (provider) {
      case 'youtube':
        const results = await searchYouTube(text);
        setResults({type: provider, results});
        break;
      case 'spotify':
        const route = routes.spotify({
          method: 'search',
          payload: {query: text, type: 'track'},
        });
        console.log('🚀 ~ file: useFind.ts:46 ~ handleSubmit ~ route:', route);

        const response2 = await GET({route, token});
        console.log(
          '🚀 ~ file: useFind.ts:49 ~ handleSubmit ~ response2:',
          response2,
        );

        const resultsSpotify = await Promise.resolve(response2).then(
          (res: any) => {
            const items = res.data.tracks.items;
            console.log(
              '🚀 ~ file: useFind.ts:57 ~ Promise.resolve ~ items:',
              items,
            );

            return items.map((item: any) => {
              return {
                id: item.id,
                title: item.name,
                thumbnails: item.album.images[0].url,
                description: item.artists[0].name,
              };
            });
          },
        );
        console.log(
          '🚀 ~ file: useFind.ts:76 ~ handleSubmit ~ resultsSpotify:',
          resultsSpotify,
        );

        setResults({type: provider, results: resultsSpotify});

        break;
      case 'soundcloud':
        //
        break;
      default:
        break;
    }
  };

  const handleMatch = (item: any) => {
    // add id with provider to state
    // alert(id);
    console.log(
      '🚀 ~ file: useFind.ts:86 ~ handleMatch ~ navigation:',
      navigation,
    );

    switch (provider) {
      case 'spotify':
        const action = setTRXFill({spotify: item});
        store.dispatch(action);
        break;
      case 'youtube':
        const action1 = setTRXFill({youtube: item});
        store.dispatch(action1);
        break;
      case 'soundcloud':
        const action2 = setTRXFill({soundcloud: item});
        store.dispatch(action2);
        break;
      default:
        break;
    }
    navigation.goBack();
  };

  return {
    provider,
    setText,
    text,
    handleSubmit,
    results,
    handleMatch,
  };
};
