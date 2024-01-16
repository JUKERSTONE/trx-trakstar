import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {toggleTRAKRelationshipsView, store} from '../../stores';
import {useTRAKLISTState, useFirebase} from '../../app';

export const useProfile = ({isOwner, navigation, route}: any) => {
  const {handleGetState} = useTRAKLISTState();
  const {handleToggleProfileVisibility, handleToggleFollowUser} = useFirebase();
  const [profile, setProfile] = useState();
  const [favorites, setFavorites] = useState();
  const [playlists, setPlaylists] = useState();
  const [streaming, setStreaming] = useState<any>([]);
  const {useGET} = useAPI();

  function shuffle(array: any) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  useEffect(() => {
    const profile = handleGetState({index: 'profile'});
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 37 ~ useEffect ~ profile',
      profile,
    );
    const TRXProfile = profile.TRX;
    const favorites = JSON.parse(TRXProfile.favorites);
    const playlists = JSON.parse(TRXProfile.playlists);
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 40 ~ useEffect ~ playlists',
      playlists,
    );
    handleProfile(profile);
    setFavorites(favorites);
    setPlaylists(playlists);
  }, []);

  const handleProfile = (profile: any) => {
    const TRXProfile = profile.TRX;
    setProfile(TRXProfile);
  };

  return {
    profile,
    favorites,
    playlists,
    handleToggleProfileVisibility,
    handleToggleFollowUser,
  };
};
