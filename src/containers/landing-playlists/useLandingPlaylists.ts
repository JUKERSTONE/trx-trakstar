import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {SPOTIFY_PLAYLIST_ITEMS, api, useAPI} from '../../api';
import {useLITELISTState} from '../../app';
import {Alert} from 'react-native';
import {store, handleMediaPlayerAction} from '../../stores';

export const useLandingPlaylists = ({navigation}: any) => {
  const handleTRAKNavigation = (item: any) => {
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 394 ~ handlePlaylistNavigation ~ item',
      item,
    );

    const {handleGetState} = useLITELISTState();

    const keys = handleGetState({index: 'keys'});
    const accessToken = keys.spotify.accessToken;
    const appToken = keys.spotify.appToken;

    const type = item.info;

    switch (type) {
      case 'playlists:spotify':
        axios
          .get(SPOTIFY_PLAYLIST_ITEMS(item.id), {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + appToken,
            },
          })
          .then(response => {
            console.log(response.data, 'oiuy');
            const items = {
              tracks: [...response.data.items],
              images: item.images[0].url,
            };
            console.log(
              '🚀 ~ file: useProfile.ts ~ line 89 ~ handleView ~ items',
              items,
            );
            // navigation.navigate('TapeView', {tape: items});
            navigation.navigate('MODAL', {
              type: 'playlist-view',
              exchange: {
                active: true,
                item: items,
              },
            });
          });
        break;
    }
    // alert(JSON.stringify(item));
  };

  return {
    handleTRAKNavigation,
  };
};
