import React, {useEffect, useState, useContext} from 'react';
import {handleSignIn, handleGetUserProfile} from './hooks';

export const useFirebase = () => {
  return {
    handleSignIn,
    handleGetUserProfile,
  };
};
