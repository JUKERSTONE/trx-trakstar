import React, {useEffect, useState, useContext} from 'react';

import {
  handleRegister,
  handleSignIn,
  handleListenUserProfile,
  handleStreakRewards,
  handleStoreValue,
  handleListenTUC,
  handleSpotifyService,
  handleAddStory,
  handleToggleFollowUser,
  handleToggleProfileVisibility,
  handleAppleMusicService,
  handleBuildProfile,
} from './hooks';

export const useFirebase = () => {
  return {
    handleRegister,
    handleSignIn,
    handleListenUserProfile,
    handleStreakRewards,
    handleStoreValue,
    handleListenTUC,
    handleSpotifyService,
    handleAddStory,
    handleToggleFollowUser,
    handleToggleProfileVisibility,
    handleAppleMusicService,
    handleBuildProfile,
  };
};
