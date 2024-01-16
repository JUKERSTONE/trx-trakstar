import {View, Text, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MediaPlayer from 'react-native-video';
import {store} from '../../stores';
import {ProgressBar, Colors} from 'react-native-paper';
import {VHeader, Body, Caption} from '../typography';
import {useTRAKLISTState} from '../../app';

export const TRXPlayer = ({
  ref,
  handleMedia,
  handleMuted,
  handleRepeat,
}: // handlePlayback,
any) => {
  const [playback, setPlayback] = useState<any>(store.getState().player);
  const [progress, setProgress] = useState<any>(store.getState());
  const {currentTime = 0, playableDuration = 390} = progress;
  store.subscribe(() => {
    const state = store.getState();
    const playback = state.player;
    setPlayback(playback);
  });

  const {handleGetState} = useTRAKLISTState();
  const player = handleGetState({index: 'player'});

  const hasPlayer = Object.keys(player.source).length !== 0;

  const {paused, muted, repeat, source, image, title, artist} = playback;

  return (
    <>
      {hasPlayer && (
        <View
          style={{
            marginTop: 2,
            backgroundColor: '#1d995F',
            height: 80,
            flexDirection: 'column',
            opacity: 0.8,
          }}>
          <View style={{width: '100%', height: 5, backgroundColor: 'green'}}>
            <ProgressBar
              progress={currentTime / playableDuration}
              color={'#fff'}
            />
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, padding: 10}}>
              {/* replace view */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  borderBottomLeftRadius: 30,
                }}>
                <Image
                  source={image}
                  style={{
                    backgroundColor: '#1B4F26',
                    height: '100%',
                    width: '100%',
                    borderBottomLeftRadius: 30,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: 'center',
              }}>
              <VHeader
                numberOfLines={1}
                type="four"
                color={'#1a1a1a'}
                text={title}
              />
              <Body
                numberOfLines={1}
                type="one"
                color={'#1a1a1a'}
                text={artist}
                // textAlign="right"
              />
              {/* <Text>{title}</Text>
            <Text>{artist}</Text> */}
            </View>
            <View
              style={{
                flex: 1.3,
                padding: 10,
                flexDirection: 'row',
                // backgroundColor: 'red',
                justifyContent: 'space-between',
              }}>
              <Pressable onPress={() => handleMedia('pause')}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: paused ? 'green' : 'whitesmoke',
                      borderRadius: 30,
                      padding: 2,
                    }}>
                    <MaterialCommunityIcons
                      name={paused ? 'play' : 'pause'}
                      size={20}
                      color={paused ? 'white' : '#1d995F'}
                      style={{opacity: 0.9, paddingTop: 0}}
                    />
                  </View>
                </View>
              </Pressable>
              <Pressable onPress={() => handleMedia('repeat')}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: repeat ? 'whitesmoke' : 'green',
                      borderRadius: 30,
                      padding: 2,
                    }}>
                    <MaterialIcons
                      name={repeat ? 'navigate-next' : 'replay'}
                      size={20}
                      color={repeat ? '#1d995F' : 'white'}
                      style={{opacity: 0.9, paddingTop: 0}}
                    />
                  </View>
                </View>
              </Pressable>
              <Pressable onPress={() => handleMedia('mute')}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: muted ? 'green' : 'whitesmoke',
                      borderRadius: 30,
                      padding: 2,
                    }}>
                    <MaterialIcons
                      name={muted ? 'volume-off' : 'volume-up'}
                      size={20}
                      color={muted ? 'white' : '#1d995F'}
                      style={{
                        opacity: 0.9,
                        paddingTop: 0,
                      }}
                    />
                  </View>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      )}
      <MediaPlayer
        ref={ref}
        playInBackground={true}
        source={source}
        audioOnly={true}
        paused={paused}
        muted={muted}
        controls={false}
        ignoreSilentSwitch="ignore"
        repeat={repeat}
        onProgress={progressData => setProgress(progressData)}
      />
    </>
  );
};
