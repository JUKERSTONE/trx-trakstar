import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
// import {
//   SPOTIFY_NEW_RELEASES,
//   SPOTIFY_GET_ALBUM,
//   SPOTIFY_GET_TRACK,
//   MUSIXMATCH_GET_LYRICS,
//   SPOTIFY_GET_ARTIST,
// } from '../../../1.api';

// import {useGenerate} from '../../../0.app';

export const useLandingRecommendations = ({navigation}: any) => {
  // const {
  //   handleRecommendations,
  //   recommendations,
  //   setRecommendations,
  //   isUnavailable,
  //   handleReload,
  // } = useGenerate();

  // useEffect(() => {
  //   handleRecommendations();
  // }, []);

  // const tracks = state.user_data.services.spotify.top_tracks;

  const onPress = (item: any) => {
    const track_id = item.track.id;
    const artist_id = item.artist.id;

    // axios
    //   .get(SPOTIFY_GET_ARTIST(artist_id), {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
    //     },
    //   })
    //   .then(response => {
    //     axios
    //       .get(SPOTIFY_GET_TRACK(track_id), {
    //         headers: {
    //           'Content-Type': 'application/json',
    //           Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
    //         },
    //       })
    //       .then(response2 => {
    //         const images = response.data.images;

    //         const isrc = response2.data.external_ids.isrc;

    //         axios.get(MUSIXMATCH_GET_LYRICS(isrc)).then(response3 => {
    //           const lyrics_body = response3.data.message.body
    //             ? response3.data.message.body.lyrics?.lyrics_body
    //             : null;
    //           const track = {
    //             ...response2.data,
    //             lyrics: lyrics_body,
    //             artistImage: images,
    //           };

    //           navigation.navigate('TrackView', {track});
    //         });
    //       });
    //   })
    //   .catch(error => {
    //     console.error(error, 'sumn went wrong');
    //   });
  };

  return {
    onPress,
    // recommendations,
    // handleReload,
  };
};
