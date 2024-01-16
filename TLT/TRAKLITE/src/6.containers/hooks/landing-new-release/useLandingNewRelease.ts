import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {
  SPOTIFY_NEW_RELEASES,
  SPOTIFY_GET_ALBUM,
  SPOTIFY_GET_TRACK,
  MUSIXMATCH_GET_LYRICS,
  SPOTIFY_GET_ARTIST,
} from '../../../1.api';
import {useProvider} from '../../../3.stores';
import Share from 'react-native-share';

export const useLandingNewRelease = ({navigation}: any) => {
  const [releases, setReleases] = useState();
  const {state} = useContext(useProvider);
  useEffect(() => {
    handleGetNewReleases();
  }, []);

  const handleGetNewReleases = () => {
    axios
      .get(SPOTIFY_NEW_RELEASES, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
        },
      })
      .then(response => {
        setReleases(response.data.albums.items);
      })
      .catch(err => {
        console.log('lemme knoiw');
      });
  };

  return {
    releases,
  };
};
