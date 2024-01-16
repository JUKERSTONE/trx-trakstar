import React, {useState, useContext, useEffect} from 'react';
import {useProvider} from '../../../3.stores';
import axios from 'axios';

export const useUserProfile = (props: any) => {
  const {state} = useContext(useProvider);
  const [userProfile, setUserProfile] = useState();
  const [tab, setTab] = useState('playlists');
  const {playlists, top_tracks, top_artists} = state.user_data.services.spotify;
  // const {audio_features} = state.user_data.gamification;
  const tracks = top_tracks;
  const artists = top_artists;
  // const audioFeatures = audio_features;
  const {posts} = state.user_data;

  // useEffect(() => {
  //   console.log(
  //     '🚀 ~ file: useUserProfile.ts ~ line 20 ~ useUserProfile ~ userProfile',
  //     userProfile,
  //   );
  // }, [userProfile]);

  // console.log(state);
  const handleTabChange = (tab: string) => {
    setTab(tab);
  };

  //   const tracks = () => {
  //     //
  //   };
  //   const artists = () => {
  //     //
  //   };
  //   const playlists = () => {
  //     //
  //   };

  return {
    tab,
    handleTabChange,
    userProfile,
    // audioFeatures,
  };
};
