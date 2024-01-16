import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {useTRAKLISTApp, useTRAKLISTState} from '../../app';
import {api, useAPI} from '../../api';
export const useSeed = ({navigation, route}: any) => {
  const {
    params: {profile},
  } = route;

  const [searchResult, setSearchResult] = useState<any>(null);
  const {handleSearch} = useTRAKLISTApp();
  const {handleGetState} = useTRAKLISTState();
  const result = handleGetState({index: 'search'});
  const [topTracks, setTopTracks] = useState();

  const {useGET} = useAPI();

  useEffect(() => {
    console.log('🚀 ~ file: useSeed.ts ~ line 9 ~ useSeed ~ profile', profile);
    // access token

    handleGetTopTracks();

    // alert(route);
  }, []);

  const handleGetTopTracks = async () => {
    const accessToken = profile.spotifyAccessToken;

    const route = api.spotify({method: 'top-tracks'});

    const topTracks = await useGET({route, token: accessToken})
      .then((response: any) => {
        return response.data;
      })
      .catch((err: any) => {
        //
        //
      });

    setSearchResult(topTracks.items);
  };

  const handleSearchQuery = (query: any) => {
    if (query == '') {
      handleGetTopTracks();
    }
    setSearchResult(null);
    const resultsPromise = handleSearch(query);

    Promise.resolve(resultsPromise).then((response: any) => {
      const items = response.data.tracks.items;
      setSearchResult(items);
    });
  };

  const handleNavigateNext = () => {
    const {
      params: {profile},
    } = route;

    navigation.navigate('INSTRUCTIONS', {
      profile: {
        ...profile,
        likes: [],
      },
    });
  };

  return {
    handleSearchQuery,
    searchResult,
    handleNavigateNext,
  };
};
