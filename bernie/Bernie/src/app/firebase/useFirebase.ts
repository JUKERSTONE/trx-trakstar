import React, {useEffect, useState, useContext} from 'react';
import {handleSignIn} from './hooks';

export const useFirebase = () => {
  return {
    handleSignIn,
  };
};
