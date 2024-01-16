import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {useProvider} from '../../../3.stores';
import {MUSIXMATCH_GET_LYRICS, SPOTIFY_GET_TRACK} from '../../../1.api';

export const useTrackCard = (navigation: any) => {
  const {state} = useContext(useProvider);

  //   useEffect(() => {
  //     console.log(trackViewData, 'trackViewData');
  //   }, [trackViewData]);

  const handleTrackPress = (track: any, images: any) => {
    console.log(
      '🚀 ~ file: useTrackCard.ts ~ line 14 ~ handleTrackPress ~ track',
      track,
    );
    const id = track.id;

    axios
      .get(SPOTIFY_GET_TRACK(id), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
        },
      })
      .then(response => {
        console.log(response.data);

        const isrc = response.data.external_ids.isrc;

        axios.get(MUSIXMATCH_GET_LYRICS(isrc)).then(response2 => {
          // console.log(res.data, 'poi');
          //   console.log(
          //     response2.data.message.body.lyrics.lyrics_body,
          //     response.data,
          //   );
          const lyrics_body = response2.data.message.body
            ? response2.data.message.body.lyrics.lyrics_body
            : null;
          const track = {
            ...response.data,
            lyrics: lyrics_body,
          };

          navigation.navigate('TrackView', {track});
        });
      });
  };

  return {
    handleTrackPress,
  };
};
