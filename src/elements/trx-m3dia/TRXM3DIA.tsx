import React, {useRef, useContext, useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {StyleSheet, View} from 'react-native';
import {PlayerContext} from '../../stores';
import {useSelector} from 'react-redux';

export const TRXM3DIAElement = ({
  trxUrl,
  handleMessage,
  PiP1Ref,
  fetchVideoTimeJS,
  ...props
}: any) => {
  const {
    mode,
    paused,
    muted,
    players,
    repeat,
    source,
    image,
    cover_art,
    uri,
    title,
    artist,
    queue,
    index,
    youtubeId,
    youtubeMinimize,
    isTraklist,
    traklistIndex,
    traklist,
    id,
    isrc,
    hidden,
    isPrimaryPlayer,
  } = useSelector((state: any) => state.player);

  return (
    <WebView
      ref={PiP1Ref}
      style={styles.container}
      allowsInlineMediaPlayback={true}
      source={{
        uri: trxUrl,
      }}
      onMessage={(event: any) => {
        const message = JSON.parse(event.nativeEvent.data);

        switch (message.eventType) {
          case 'videoReady':
            break;
          case 'videoCurrentTime':
            break;
          case 'videoEnded':
            break;
          default:
            console.warn(`Unhandled event type: ${message.eventType}`);
            break;
        }
      }}
      injectedJavaScript={fetchVideoTimeJS}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    margin: 10,
  },
});
