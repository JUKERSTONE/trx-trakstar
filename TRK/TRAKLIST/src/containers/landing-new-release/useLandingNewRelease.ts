import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {api, useAPI} from '../../api';
import {useTRAKLISTState} from '../../app';

export const useLandingNewRelease = ({navigation}: any) => {
  const [releases, setReleases] = useState();
  useEffect(() => {
    handleGetNewReleases();
  }, []);

  const {handleGetState} = useTRAKLISTState();
  const keys = handleGetState({index: 'keys'});
  const spotify = keys.spotify;
  const clientKey = spotify.client;

  const handleGetNewReleases = () => {
    const route: any = api.spotify({method: 'new_releases'});

    axios
      .get(route, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + clientKey,
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
