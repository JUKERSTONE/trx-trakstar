import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {useLITELISTState} from '../..';
import {useSelector} from 'react-redux';
import {useGenerate} from '../../.../../app';
import {useAPI, api} from '../../.../../api';
import {store, setREGEN, PlayerContext} from '../../stores';

const {handleGetState} = useLITELISTState();

export const useRegen = ({navigation, route}: any) => {
  // const {query} = route.params;
  const keys = useSelector((state: any) => state.keys);
  const player = useSelector((state: any) => state.player);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(0);
  const [seed, setSeed] = useState<any>([]);
  const [query, setQuery] = useState<any>([]);
  const {useGET, usePOST} = useAPI();
  const {userData, setUserData} = useContext(PlayerContext);

  const spotify = keys.spotify;
  const appToken = spotify.appToken;

  const {
    handleRecommendations,
    // recommendations,
    progress,
    // handleReload,
  } = useGenerate();

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
    const tracks = await axios
      .get(
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
      )
      .then(
        ({
          data: {
            tracks: {items},
          },
        }: any) => {
          return items;
        },
      );
    console.log(
      '🚀 ~ file: useRegen.ts:93 ~ handleRegenerate ~ tracks:',
      tracks,
    );
    setResults(tracks);
  };

  const handleSelect = ({item}: any) => {
    console.log('🚀 ~ file: useRegen.ts:48 ~ handleSelect ~ item:', item);
    setSeed([...seed, item.id]);
    setSelected(selected => selected + 1);
    //
  };

  return {
    results,
    selected,
    handleSelect,
    query,
    setQuery,
    handleRegenerate,
  };
};
