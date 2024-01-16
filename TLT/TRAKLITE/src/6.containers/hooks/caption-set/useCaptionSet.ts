import React, {useState, useEffect, useContext} from 'react';
import {makePost} from './handlers';
import {useProvider, store} from '../../../3.stores';
import * as actions from '../../../3.stores';
import axios from 'axios';
import {USER, SPOTIFY_GET_AUDIO_FEATURES} from '../../../1.api';

export const useCaptionSet = (navigation: any) => {
  const [caption, setCaption] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState('anyone can comment');
  const [toggleProfile, setToggleProfile] = useState(true);
  const {state} = useContext(useProvider);
  const [audioFeatures, setAudioFeatures] = useState<any>({});
  const [finalAudioFeatures, setFinalAudioFeatures] = useState<any>({
    playlist: '',
    topTracks: '',
    topArtists: '',
  });

  const initialAudioFeatures = state.user_data?.gamificataion?.audio_features;

  const token = state.keys.traklist.access_token;

  useEffect(() => {
    axios
      .post(USER, finalAudioFeatures, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + state.keys.traklist.access_token,
        },
      })
      .then(response => {})
      .catch(err => console.log('doesnt workski'));
  }, [finalAudioFeatures]);

  useEffect(() => {
    setFinalAudioFeatures({
      ...finalAudioFeatures,
      acousticness:
        audioFeatures?.acousticness +
        (initialAudioFeatures
          ? initialAudioFeatures?.acousticness.toString()
          : '0'),
      energy:
        audioFeatures?.energy +
        (initialAudioFeatures ? initialAudioFeatures?.energy.toString() : '0'),
      instrumentalness:
        audioFeatures?.instrumentalness +
        (initialAudioFeatures
          ? initialAudioFeatures?.instrumentalness.toString()
          : '0'),
      liveness:
        audioFeatures?.liveness +
        (initialAudioFeatures
          ? initialAudioFeatures?.liveness.toString()
          : '0'),
      loudness:
        audioFeatures?.loudness +
        (initialAudioFeatures
          ? initialAudioFeatures?.loudness.toString()
          : '0'),
      speechiness:
        audioFeatures?.speechiness +
        (initialAudioFeatures
          ? initialAudioFeatures?.speechiness.toString()
          : '0'),
    });
  }, [audioFeatures]);

  const handlePost = async (
    type: string,
    title: string,
    artist: string,
    artwork: string,
    spotifyID: string,
    preview: string,
    isRecent: boolean,
    service: string,
  ) => {
    const body = {
      caption,
      type,
      title,
      artist,
      artwork,
      spotifyID,
      preview,
      isRecent,
      service,
    };
    // console.log(body);
    const hasPosted = await makePost(token, body);
    console.log(hasPosted, 'qwertyu');

    // GET CURRENT AUDIO FEATURES

    // GET NEW AUDIO FEATURES

    if (hasPosted.success) {
      axios
        .get(SPOTIFY_GET_AUDIO_FEATURES(spotifyID), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.keys.spotify.s_client_token,
          },
        })
        .then(response => {
          setAudioFeatures(response.data);

          // const {
          //   acousticness,
          //   energy,
          //   instrumentalness,
          //   liveness,
          //   loudness,
          //   speechiness,
          // } = response.data;

          // axios
          //   .post(USER, spotifyUpdates, {
          //     headers: {
          //       'Content-Type': 'application/json',
          //       Authorization: 'Bearer ' + response.data.token,
          //     },
          //   })
          //   .then(response => {
          //     console.log(response.data, 'over herere');
          //   })
          //   .catch(err => console.log('doesnt work'));
        })
        .catch(err => console.log('doesnt work'));
    }
    navigation.navigate('TIMELINE.');
  };

  const handleInputChange = (text: string) => {
    setCaption(text);
  };

  const handlePreview = (info: any) => {
    store.dispatch(actions.SET_PLAYER('set player.', info));
  };
  return {
    handleInputChange,
    modalVisible,
    setModalVisible,
    handlePost,
    handlePreview,
    status,
    setStatus,
    toggleProfile,
    setToggleProfile,
  };
};

export default useCaptionSet;
