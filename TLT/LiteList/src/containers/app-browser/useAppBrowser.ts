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

export const useAppBrowser = ({...props}: any) => {
  const {userData, setUserData} = useContext(PlayerContext);
  const {handleStore} = useAsyncStorage();
  const browserRef = userData.browserRef;

  const profileTRX = useSelector((state: any) => state.profile.TRX);

  const handleLoadHTTPS = ({
    route = 'https://tsb.media/wallet',
    params = {},
  }) => {
    const injectedJavaScript: string = `window.params='${params}';window.location.replace('${route}');(function() {
      window.postMessage = function(data) {
        window.ReactNativeWebView.postMessage(data);
      };
    })()`;
    browserRef.current.injectJavaScript(injectedJavaScript);
  };

  const handleHTTPSResponse = async ({nativeEvent}: any) => {
    console.log(
      '🚀 ~ file: useAppBrowser.ts ~ line 18 ~ handleHTTPSResponse ~ nativeEvent',
      nativeEvent,
    );
    console.log(JSON.parse(nativeEvent.data));

    const cryptographicResponse = JSON.parse(nativeEvent.data);
    const mode = cryptographicResponse.mode;
    const data = cryptographicResponse.data;

    // switch (mode) {
    //   case 'create-network-wallet':
    //     const fingerprint = data;
    //     console.log(
    //       '🚀 ~ file: useAppBrowser.ts ~ line 45 ~ handleHTTPSResponse ~ fingerprint',
    //       fingerprint,
    //     );
    //     await handleStore({key: 'fingerprint', value: fingerprint});

    //     // KEYCHAIN
    //     const username = '_trk_utl_cn_hash_';
    //     const password = JSON.stringify(fingerprint);

    //     // Store the credentials
    //     return await Keychain.setGenericPassword(username, password, {
    //       accessControl: Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD,
    //       authenticationType:
    //         Keychain.AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
    //     })
    //       .then(async (data: any) => {
    //         console.log(
    //           '🚀 ~ file: register.ts ~ line 45 ~ awaitKeychain.setGenericPassword ~ data',
    //           data,
    //         );
    //         Toast.show({
    //           type: 'success',
    //           text1: 'Welcome to CRYPTO!!',
    //           text2: 'Your keys on your fingertips.',
    //         });

    //         // await handleFirestorePublicKeys(publicKeys);
    //       })
    //       .catch(err => {
    //         Toast.show({
    //           type: 'info',
    //           text1: 'Could not hash your details!',
    //           text2: 'Please remember your details.',
    //         });
    //       });
    //   case 'reproduce':
    //     const action = handleUpdateBalances(data);
    //     store.dispatch(action);
    //     return Toast.show({
    //       type: 'info',
    //       text1: 'Crypto is working...',
    //       text2: 'Reproducing your wallets from the TSB M3DIA node!',
    //     });

    //   default:
    //     break;
    // }
  };

  return {
    handleLoadHTTPS,
    handleHTTPSResponse,
    tuc_public_keys: profileTRX.tuc_public_keys,
  };
};
