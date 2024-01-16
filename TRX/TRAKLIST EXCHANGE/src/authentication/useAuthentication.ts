import React, {useEffect, useState, useContext} from 'react';
// import {useMusicKit} from './music-kit';
import {useGoogle} from './google';
import {useSpotify} from './spotify';
export const useAuthentication = () => {
  return {
    // useMusicKit,
    useGoogle,
    useSpotify,
  };
};
