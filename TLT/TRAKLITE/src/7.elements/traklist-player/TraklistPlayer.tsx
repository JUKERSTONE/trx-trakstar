import React, {useContext, useEffect, useState, useRef} from 'react';
import {Text, View, Image, Button} from 'react-native';
import Video from 'react-native-video';
import {useProvider} from '../../3.stores';
import {ProgressBar} from 'react-native-paper';
import {VHeader, Body} from '../../7.elements/typography';
// import styles from './styles';
import {TraklistPlayer as Player} from '../../6.containers';
import {store} from '../../3.stores';
import * as actions from '../../3.stores';

export const TraklistPlayer: React.FC<any> = () => {
  const {state} = useContext(useProvider);
  // const [isLocked, setIsLocked] = useState(true);
  const [preview, setPreview] = useState(undefined);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // const hasReplay = true;
  const hasReplay = state.player?.hasReplay;
  const timer = () => setTimeout(() => setTime(time + 1), 1000);
  const timerId = timer();
  // return () => {
  //   clearTimeout(timerId);
  // };
  const playerRef: any = useRef();
  useEffect(() => {
    setTime(0);
    setPreview(state.player?.preview_url);
    setIsPaused(true);
    clearTimeout(timerId ?? null);
    if (state.player?.preview_url) {
      setIsPaused(false);
    }
    timer();
  }, [state.player]);
  return (
    <>
      <Video
        ref={playerRef}
        playInBackground={true}
        source={{
          uri: preview,
        }}
        style={{
          flex: 1,
          opacity: 0.9,
          backgroundColor: 'black',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
        audioOnly={true}
        paused={state.player?.isPaused}
        muted={state.player?.isMuted}
        controls={false}
        ignoreSilentSwitch="ignore"
        repeat={hasReplay ? true : false}
      />
      {/* <Player/> */}
    </>
  );
};
