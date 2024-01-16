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

export const useRSSHotNewHipHop = ({...props}: any) => {
  const rss = 'https://www.hotnewhiphop.com/articles/music/';

  useEffect(() => {
    //
    //
  }, []);
  return {
    // handleLoadHTTPS,
    // handleHTTPSResponse,
    // tuc_public_keys: profileTRX.tuc_public_keys,
  };
};
