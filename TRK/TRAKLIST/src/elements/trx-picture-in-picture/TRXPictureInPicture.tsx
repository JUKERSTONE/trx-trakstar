import React, {useRef, useContext, useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {StyleSheet, View} from 'react-native';

export const TRXPictureInPictureElement = ({
  picture1,
  picture2,
  handleMessage,
  PiP1Ref,
  PiP2Ref,
  isPrimaryPlayer,
  isPrimaryWebViewLoaded,
  isSecondaryWebViewLoaded,
  fetchVideoTimeJS,
  ...props
}: any) => {
  console.log(
    '🚀 ~ file: TRXPictureInPicture.tsx:19 ~  picture1',
    // picture2,
    picture1,
    // isPrimaryPlayer,
    // isPrimaryWebViewLoaded,
    // isSecondaryWebViewLoaded,
  );
  return (
    <>
      {/* {isPrimaryWebViewLoaded && ( */}
      <WebView
        ref={PiP1Ref}
        style={styles.container}
        allowsInlineMediaPlayback={true}
        source={{
          uri: isPrimaryWebViewLoaded ? picture1 : null,
        }}
        onMessage={handleMessage}
        injectedJavaScript={fetchVideoTimeJS(isPrimaryPlayer)}
      />
      {/* )} */}
      {/* {isSecondaryWebViewLoaded && ( */}
      <WebView
        ref={PiP2Ref}
        style={styles.container}
        allowsInlineMediaPlayback={true}
        source={{
          uri: isSecondaryWebViewLoaded ? picture2 : null,
        }}
        onMessage={handleMessage}
        injectedJavaScript={fetchVideoTimeJS(!isPrimaryPlayer)}
      />
      {/* )} */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    margin: 10,
  },
});
