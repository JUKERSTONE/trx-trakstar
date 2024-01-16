import React, {useEffect, useState, useContext} from 'react';
import {
  handleRegister,
  handleSignIn,
  handleGetUserProfile,
  handleListenUserProfile,
  handleStreakRewards,
  handleStoreValue,
  handleListenTUC,
  handleSpotifyService,
} from './hooks';

export const useFirebase = () => {
  return {
    handleRegister,
    handleSignIn,
    handleGetUserProfile,
    handleListenUserProfile,
    handleStreakRewards,
    handleStoreValue,
    handleListenTUC,
    handleSpotifyService,
  };
};
