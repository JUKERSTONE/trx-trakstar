import React, {useEffect, useState, useContext} from 'react';
import {
  PlayerContext,
  useAsyncStorage,
  handleUpdateBalances,
  store,
  handlePublicKeys,
} from '../../stores';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import * as Keychain from 'react-native-keychain';
import {handleFirestorePublicKeys} from '../../app';

export const useRSSPitchfork = ({...props}: any) => {
  return {
    // handleLoadHTTPS,
    // handleHTTPSResponse,
    // tuc_public_keys: profileTRX.tuc_public_keys,
  };
};
