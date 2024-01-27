import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {useLITELISTState} from '../..';
import {useSelector} from 'react-redux';
import {useGenerate} from '../../app';
import {useAPI, api, APIKeys, SOUNDCLOUD_SEARCH_TRACKS} from '../../api';
import {store, setREGEN, PlayerContext, selectFeedTrack} from '../../stores';
import {SOUNDCLOUD_OAUTH_KEY} from '../../auth';
import {TabView, TabBar} from 'react-native-tab-view';

const {handleGetState} = useLITELISTState();

export const useFeedAddTrack = ({navigation, route}: any) => {
  // const {query} = route.params;
  const keys = useSelector((state: any) => state.keys);
  const player = useSelector((state: any) => state.player);
  const [results, setResults] = useState<any>([]);
  const [selected, setSelected] = useState(0);
  const [seed, setSeed] = useState<any>([]);
  const [query, setQuery] = useState<any>([]);
  const {useGET, usePOST} = useAPI();
  const {userData, setUserData} = useContext(PlayerContext);

  const spotify = keys.spotify;
  const appToken = spotify.appToken;

  useEffect(() => {
    if (4 - selected === 0) {
      handleTriggerRecommendations();
    }
  }, [seed]);

  const handleTriggerRecommendations = async () => {
    console.log(
      "🚀 ~ file: useRegen.ts:31 ~ handleRecommendations ~ seed.join(','):",
      seed.join(','),
    );
    const recommendations = await axios
      .get(
        'https://api.spotify.com/v1' +
          '/recommendations?limit=15&seed_tracks=' +
          seed.join(','),

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + keys.spotify.appToken,
          },
        },
      )
      .then(({data: {tracks}}: any) => {
        console.log('🚀 ~ file: useRegen.ts:44 ~ .then ~ tracks:', tracks);
        return tracks;
      })
      .catch((err: any) => {
        console.log('🚀 ~ file: useRegen.ts:46 ~ .then ~ err:', err);
      });
    console.log(
      '🚀 ~ file: useRegen.ts:42 ~ handleRecommendations ~ recommendations:',
      recommendations,
    );

    const TRAK = await Promise.all(
      recommendations.map(async (item: any) => {
        const artistId = item.artists[0].id;
        const route = api.spotify({
          method: 'get-artist',
          payload: {artistId},
        });

        const artist = await useGET({route, token: appToken})
          .then(res => {
            return res.data;
          })
          .catch(() => console.log('error'));

        const spotifyMeta = {
          isrc: item.external_ids.isrc,
          id: item.id,
          preview: item.preview_url,
          artist: item.artists[0].name,
          title: item.name,
          cover_art: item.album.images[0].url,
          artist_art: artist.images[0].url,
        };
        return {
          player: 'primary',
          artist: spotifyMeta.artist,
          title: spotifyMeta.title,
          cover_art: spotifyMeta.cover_art,
          web: {
            spotify: spotifyMeta,
            apple_music: null,
            genius: null,
            youtube: null,
            soundcloud: null,
          },
        };
      }),
    );

    const swiperRef = userData.swiperRef;
    for (let i = 0; i < player.index; i++) {
      swiperRef.current.goBackFromTop();
    }
    const action = setREGEN({traklist: TRAK});
    store.dispatch(action);
    navigation.navigate('SWIPE.');
    console.log('🚀 ~ file: useRegen.ts:105 ~ tracks ~ tracks:', TRAK);
    // alert('naviagte back to swipe with recs');
    // await handleRecommendations(true, recommendations);
    // navigation.goBack();/
  };

  const handleRegenerate = async () => {
    const token = APIKeys.genius.accessToken;
    const route = api.genius({method: 'search', payload: {query}});
    console.log(
      '🚀 ~ file: useFeedAddTrack.ts:124 ~ handleRegenerate ~ route:',
      route,
    );

    const results = await axios
      .all([
        axios.get(
          'https://api.spotify.com/v1' +
            '/search?query=' +
            query +
            '&type=' +
            'track' +
            '&market=US&offset=0&limit=20',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + keys.spotify.appToken,
            },
          },
        ),
        axios.get(route!, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }),
        axios.get(SOUNDCLOUD_SEARCH_TRACKS(query), {
          headers: {
            Authorization: 'Bearer ' + SOUNDCLOUD_OAUTH_KEY,
          },
        }),
      ])
      .then(
        axios.spread((data1, data2, data3, data4, data5) => {
          console.log(
            '🚀 ~ file: useFeedAddTrack.ts:155 ~ axios.spread ~ data3:',
            data3,
          );
          console.log(
            '🚀 ~ file: useFeedAddTrack.ts:155 ~ axios.spread ~ data2:',
            data2,
          );
          console.log(
            '🚀 ~ file: profileRefresh.ts ~ line 77 ~ axios.spread ~ data1',
            data1,
          );

          return {
            spotify: data1.data.tracks.items,
            genius: data2.data.response.hits,
            soundcloud: data3.data.collection,
          };
        }),
      )
      .catch(error => {
        console.log(
          '🚀 ~ file: useFeedAddTrack.ts:219 ~ handleRegenerate ~ error:',
          error,
        );
      });
    console.log(
      '🚀 ~ file: useFeedAddTrack.ts:198 ~ handleRegenerate ~ results:',
      results,
    );

    setResults(results);
  };

  const handleSelectTrack = (item: any) => {
    const action = selectFeedTrack({item});
    store.dispatch(action);
    navigation.goBack();
  };

  return {
    results,
    selected,
    handleSelectTrack,
    query,
    setQuery,
    handleRegenerate,
  };
};
