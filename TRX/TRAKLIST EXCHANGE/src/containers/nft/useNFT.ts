import React, {useEffect, useState, useContext} from 'react';
import {store, handleMediaPlayerAction} from '../../stores';

export const useNFT = ({navigation, route}: any) => {
  const NFT = route.params?.nft ?? null;

  const handlePlayNFT = ({type, uri, url, artist, title}: any) => {
    const action = handleMediaPlayerAction({
      playbackState: type,
      uri,
      url,
      artist,
      title,
    });
    store.dispatch(action);
  };

  return {
    NFT,
    handlePlayNFT,
  };
};
