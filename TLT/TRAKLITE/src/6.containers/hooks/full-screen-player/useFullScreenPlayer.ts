import React, {useEffect, useState, useContext} from 'react';
import {useProvider} from '../../../3.stores';

export const useFullScreenPlayer = () => {
  const {state} = useContext(useProvider);
  const player = state.player;

  return {
    player,
  };
};
