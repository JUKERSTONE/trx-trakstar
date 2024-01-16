import React, {useEffect, useState, useContext} from 'react';
import {APIKeys, api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
  setTraklist,
} from '../../stores';
import {
  useGenerate,
  useFirebase,
  useLITELISTState,
  useEffectAsync,
} from '../../app';
import {Alert} from 'react-native';

export const useOffline = ({navigation, route}: any) => {
  //
  //
};
