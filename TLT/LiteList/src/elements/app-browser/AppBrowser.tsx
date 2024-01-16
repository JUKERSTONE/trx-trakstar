import React, {useRef, useContext} from 'react';
import {WebView} from 'react-native-webview';
import {View} from 'react-native';
import {PlayerContext} from '../../stores';

export const AppBrowserElement = ({
  route = 'https://tsb.media/wallet/reproduce',
  handleHTTPSResponse,
  tuc_public_keys,
  ...props
}: any) => {
  const {userData, setUserData} = useContext(PlayerContext);
  const browserRef = userData.browserRef;
  return (
    <View>
      <WebView
        source={{
          uri: 'https://tsb.media/wallet/reproduce',
        }}
        ref={browserRef}
        onMessage={handleHTTPSResponse}
        injectedJavaScriptBeforeContentLoaded={`window.params='${JSON.stringify(
          tuc_public_keys,
        )}'`}
      />
    </View>
  );
};
