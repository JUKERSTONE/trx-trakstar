import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  Button,
  Keyboard,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect, useRef, useContext} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MediaPlayer from 'react-native-video';
import {
  store,
  PlayerContext,
  handleQueueControlsAction,
  setPlayers,
  handleMediaPlayerAction,
  setYoutubeOff,
} from '../../stores';
import Toast from 'react-native-toast-message';
import YoutubePlayer from 'react-native-youtube-iframe';
import {VHeader, Body, Caption} from '../typography';
import {useLITELISTState} from '../../app';
import {RemoteElement} from '../../elements';
import {useSelector} from 'react-redux';
import {RemoteComponent} from '../../components';
import * as Animatable from 'react-native-animatable';
import {api, useAPI} from '../../api';
import DeviceInfo from 'react-native-device-info';
import {getDeviceName, getManufacturer} from 'react-native-device-info';
export const TRXPlayer = ({
  ref,
  handleMedia,
  handleGENIUS,
  handleControls,
  mode,
  navigation,
  handlePlayOnTRAKLIST,
  nowPlaying,
  handleThrowSpotify,
  handleAddTRAK,
  handlePost,
  ...props
}: any) => {
  const {
    userData: {currentTime, playableDuration, swiperRef, playerRef},
    setUserData,
  } = useContext(PlayerContext);

  const {usePOST, useGET} = useAPI();

  // console.log(
  //   '🚀 ~ file: TRXPlayer.tsx ~ line 45 ~ currentTime, playableDuration',
  //   currentTime,
  //   playableDuration,
  // );
  // console.log('🚀 ~ file: TRXPlayer.tsx ~ line 45 ~ swiperRef', swiperRef);

  const playback = useSelector((state: any) => state.player);

  const {handleGetState} = useLITELISTState();
  const player = useSelector((state: any) => state.player);
  const keys = handleGetState({index: 'keys'});
  const spotifyKey = keys.spotify.accessToken;

  const hasPlayer = Object.keys(player.source).length !== 0;

  const {
    paused,
    muted,
    repeat,
    source,
    image: {uri},
    title,
    artist,
    hidden,
    chatURI,
    id,
    isFeed,
    isMMS,
    youtubeId,
    players: {spotify: spotifyPlayer, apple_music},
  } = player;
  // console.log('🚀 ~ file: TRXPlayer.tsx:94 ~ player:', player);
  // console.log(
  //   '🚀 ~ file: TRXPlayer.tsx ~ line 87 ~ spotifyPlayer',
  //   spotifyPlayer,
  // );

  const hidePlayer = isFeed;

  useEffect(() => {
    handleGetSpotifyPlayer();
  }, [player]);

  const handleGetSpotifyPlayer = async () => {
    const route = api.spotify({method: 'get-playback'});

    const response = await useGET({route, token: keys.spotify.accessToken});

    const action = setPlayers({spotify: response.data, apple_music: null});
    store.dispatch(action);
  };
  // const available = title && source.uri;
  const isUnavailable = title && !source.uri;

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    Toast.show({
      type: 'error',
      text1: "TRAKLIST couldn't find a preview",
      text2: artist + ' - ' + title,
    });

    setInterval(() => handleGetSpotifyPlayer(), 30000);

    if (!spotifyPlayer?.is_playing) {
      const action = handleMediaPlayerAction({
        playbackState: 'pause:force:off',
      });
      store.dispatch(action);

      Toast.show({
        type: 'success',
        text1: 'Welcome back to the TRX Metaverse!',
        text2: "Let's get your TRAKLIST started",
      });
    }

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        behavior="position"
        style={{
          flex: mode === 'chat' && isKeyboardVisible === true ? 1 : 0,
          // paddingBottom: 30,
        }}>
        <Animatable.View animation={'bounceIn'}>
          {hasPlayer && !hidePlayer && (
            <View
              style={{
                width: '100%',
                padding: 10,
                flexDirection: 'column',
                backgroundColor: '#1a1a1a',
              }}>
              <TouchableOpacity onPress={() => handleMedia('toggle-view')}>
                <View
                  style={{
                    backgroundColor: !hidden ? '#1db954' : '#00000F',
                    width: '100%',
                    height: 30,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 12,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialIcons
                      name={'touch-app'}
                      size={18}
                      color={isMMS ? 'green' : '#fff'}
                      style={{
                        // paddingTop: 1,
                        // alignSelf: 'flex-end',
                        marginRight: 5,
                        // backgroundColor: 'red',
                      }}
                    />
                    <VHeader
                      type="five"
                      color={'#fff'}
                      text={
                        mode !== 'chat'
                          ? hidden
                            ? !apple_music
                              ? 'TRAKLIST RADIO [TAP FOR SPOTIFY]'
                              : 'TRAKLIST RADIO [APPLE MUSIC EXPERIENCE]'
                            : mode === 'default' && !hidden && isFeed
                            ? 'FEED'
                            : spotifyPlayer
                            ? `PLAYING SPOTIFY FROM '${spotifyPlayer.device.name}'`
                            : 'PLAY ON SPOTIFY'
                          : !hidden
                          ? 'CHAT'
                          : 'CHAT'
                      }
                      numberOfLines={1}
                    />
                  </View>
                  {isMMS && (
                    <VHeader
                      type="six"
                      color={isMMS ? 'green' : '#fff'}
                      text={'  [ ATTACHMENTS ]'}
                      numberOfLines={1}
                    />
                  )}
                  <MaterialIcons
                    name={hidden ? 'toggle-off' : 'toggle-on'}
                    size={30}
                    color={isMMS ? 'green' : '#fff'}
                    style={{
                      paddingTop: 1,
                      marginLeft: 10,
                      alignSelf: 'flex-end',
                      // backgroundColor: 'red',
                    }}
                  />
                </View>
              </TouchableOpacity>
              <ImageBackground
                source={
                  spotifyPlayer && !hidden
                    ? spotifyPlayer?.item?.album?.images
                    : {uri}
                }
                style={{
                  height: 140,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                imageStyle={{
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  borderWidth: 3,
                  borderColor: 'whitesmoke',
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingRight: 10,
                    backgroundColor: '#1a1a1a',
                    padding: 15,
                    opacity: 0.85,
                    width: '100%',
                    height: '100%',
                  }}>
                  {((mode === 'chat' && hidden) ||
                    (mode === 'default' && !isFeed) ||
                    (mode == 'default' && isFeed && hidden)) && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        marginTop: 4,
                      }}>
                      {/*  */}
                      {/*  */}
                      {/*  */}
                      <>
                        <View style={{paddingRight: 20}}>
                          <TouchableOpacity
                            onPress={
                              spotifyPlayer && !hidden
                                ? () => handleThrowSpotify(spotifyKey)
                                : () => handleMedia('mute')
                            }>
                            <View
                              style={{
                                borderRadius: 10,
                                padding: 3,
                              }}>
                              <MaterialIcons
                                name={
                                  spotifyPlayer && !hidden
                                    ? 'speaker-group'
                                    : muted
                                    ? 'volume-mute'
                                    : 'volume-up'
                                }
                                size={22}
                                color={
                                  spotifyPlayer && !hidden
                                    ? '#1db954'
                                    : repeat
                                    ? '#fff'
                                    : muted
                                    ? 'grey'
                                    : '#fff'
                                }
                                style={{paddingTop: 1}}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>

                        <View style={{paddingRight: 20}}>
                          <TouchableOpacity
                            onPress={
                              spotifyPlayer && !hidden
                                ? () =>
                                    handlePlayOnTRAKLIST({
                                      id: player.queue[
                                        player.index - 1 !== -1
                                          ? player.index - 1
                                          : player.index
                                      ].web.spotify.id,
                                      type: 'back',
                                    })
                                : source
                                ? () => {
                                    if (currentTime > 2) {
                                      playerRef.current.seek(0);
                                    } else {
                                      Promise.resolve(
                                        swiperRef.current.goBackFromBottom(),
                                      )
                                        .then(() => {
                                          const action =
                                            handleQueueControlsAction({
                                              playbackState: 'back',
                                            });
                                          store.dispatch(action);
                                        })
                                        .catch(() => {
                                          alert('err');
                                        });
                                    }
                                  }
                                : null
                            }>
                            <View
                              style={{
                                borderRadius: 10,
                                padding: 8,
                              }}>
                              <FontAwesome5
                                name={'backward'}
                                size={18}
                                color={
                                  spotifyPlayer && !hidden
                                    ? '#1db954'
                                    : repeat
                                    ? '#fff'
                                    : '#cecece'
                                }
                                style={{paddingTop: 1, paddingRight: 2}}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>

                        <View
                          style={{
                            paddingHorizontal: 10,
                            borderRightWidth: 2,
                            borderLeftWidth: 2,
                            borderColor: 'grey',
                            flexDirection: 'row',
                          }}>
                          <TouchableOpacity
                            onPress={
                              spotifyPlayer && !hidden
                                ? spotifyPlayer.is_playing
                                  ? () => {
                                      const action = setYoutubeOff({});
                                      store.dispatch(action);

                                      handlePlayOnTRAKLIST({
                                        type: 'pause',
                                        id: 'pause',
                                      });
                                    }
                                  : () => {
                                      const action = setYoutubeOff({});
                                      store.dispatch(action);

                                      handlePlayOnTRAKLIST({
                                        id: spotifyPlayer.item.id,
                                        type: 'resume',
                                      });
                                    }
                                : !spotifyPlayer && !hidden
                                ? () => {
                                    const action = setYoutubeOff({});
                                    store.dispatch(action);

                                    handlePlayOnTRAKLIST({
                                      id: player.id,
                                      type: 'play',
                                    });
                                  }
                                : () => {
                                    const action = setYoutubeOff({});
                                    store.dispatch(action);
                                    handleMedia('pause');
                                  }
                            }
                            style={{paddingHorizontal: 15}}>
                            {(!isUnavailable || !hidden) && (
                              <View
                                style={{
                                  backgroundColor:
                                    spotifyPlayer && !hidden
                                      ? '#1db954'
                                      : repeat
                                      ? '#fff'
                                      : '#fff',
                                  borderRadius: 10,
                                  borderWidth: 3,
                                  borderColor:
                                    spotifyPlayer && !hidden
                                      ? '#1db954'
                                      : repeat
                                      ? '#fff'
                                      : '#fff',
                                }}>
                                <MaterialCommunityIcons
                                  name={
                                    spotifyPlayer && !hidden
                                      ? spotifyPlayer.is_playing
                                        ? 'pause'
                                        : 'play'
                                      : !spotifyPlayer && !hidden
                                      ? 'play'
                                      : paused
                                      ? 'play'
                                      : 'pause'
                                  }
                                  size={30}
                                  color={
                                    spotifyPlayer && !hidden
                                      ? '#fff'
                                      : repeat
                                      ? 'grey'
                                      : !spotifyPlayer && !hidden
                                      ? '#1db954'
                                      : paused
                                      ? '#1a1a1a'
                                      : '#1a1a1a'
                                  }
                                  style={{paddingTop: 0}}
                                />
                              </View>
                            )}
                            {isUnavailable && hidden && (
                              <View
                                style={{
                                  backgroundColor: '#fff',
                                  paddingVertical: 3,
                                  paddingHorizontal: 5,
                                  borderWidth: 4,
                                  borderColor: '#fff',
                                  borderRadius: 5,
                                }}>
                                <VHeader
                                  type="six"
                                  color="#1a1a1a"
                                  text="RESTRICTED !"
                                  numberOfLines={1}
                                />
                              </View>
                            )}
                          </TouchableOpacity>
                        </View>

                        <View style={{paddingLeft: 20}}>
                          <TouchableOpacity
                            onPress={
                              spotifyPlayer && !hidden
                                ? () =>
                                    handlePlayOnTRAKLIST({
                                      id: player.queue[
                                        player.index + 1 !== player.queue.length
                                          ? player.index + 1
                                          : player.index
                                      ].web.spotify.id,
                                      type: 'forward',
                                    })
                                : source
                                ? () => {
                                    Promise.resolve(
                                      swiperRef.current.swipeRight(),
                                    )
                                      .then(() => {
                                        // const action = handleQueueControlsAction({
                                        //   playbackState: 'next',
                                        // });
                                        // store.dispatch(action);
                                      })
                                      .catch(() => {
                                        alert('err');
                                      });
                                    //
                                  }
                                : null
                            }>
                            <View
                              style={{
                                borderRadius: 10,
                                padding: 8,
                              }}>
                              <FontAwesome5
                                name={'forward'}
                                size={18}
                                color={
                                  spotifyPlayer && !hidden
                                    ? '#1db954'
                                    : repeat
                                    ? '#fff'
                                    : '#cecece'
                                }
                                style={{paddingTop: 1, paddingRight: 2}}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      </>

                      <View style={{paddingLeft: 20}}>
                        {hidden && (
                          <View
                            style={{
                              backgroundColor:
                                spotifyPlayer && !hidden
                                  ? '#1db954'
                                  : repeat
                                  ? '#fff'
                                  : '#1a1a1a',
                              borderRadius: 8,
                              padding: 3,
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                isMMS
                                  ? alert(
                                      'You have an attachment pending. \nSend a message to unloop this preview',
                                    )
                                  : handleMedia('repeat');
                              }}>
                              {repeat ? (
                                <MaterialCommunityIcons
                                  name={'repeat-once'}
                                  size={22}
                                  color={
                                    spotifyPlayer && !hidden
                                      ? '#fff'
                                      : repeat
                                      ? '#1a1a1a'
                                      : '#1db954'
                                  }
                                />
                              ) : (
                                <MaterialCommunityIcons
                                  name={'repeat-off'}
                                  size={22}
                                  color={
                                    spotifyPlayer && !hidden
                                      ? '#fff'
                                      : repeat
                                      ? '#fff'
                                      : '#fff'
                                  }
                                />
                              )}
                            </TouchableOpacity>
                          </View>
                        )}
                        {!hidden && (
                          <View
                            style={{
                              backgroundColor:
                                spotifyPlayer && !hidden
                                  ? '#1db954'
                                  : repeat
                                  ? '#fff'
                                  : '#1a1a1a',
                              borderRadius: 10,
                              padding: 3,
                            }}>
                            <TouchableOpacity>
                              <MaterialCommunityIcons
                                name={'spotify'}
                                size={22}
                                color={
                                  spotifyPlayer && !hidden
                                    ? '#fff'
                                    : repeat
                                    ? '#1a1a1a'
                                    : '#1db954'
                                }
                              />
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    </View>
                  )}

                  {/* REMOTE */}
                  <RemoteComponent
                    mode={mode}
                    isFeed={isFeed}
                    hidden={hidden}
                    title={title}
                    artist={artist}
                    chatURI={chatURI}
                    currentTime={currentTime}
                    playableDuration={playableDuration}
                    isMMS={isMMS}
                    player={isMMS ? player : null}
                    spotifyPlayer={spotifyPlayer}
                    handlePost={handlePost}
                    handleAddTRAK={() => handleAddTRAK({navigation})}
                  />
                </View>
              </ImageBackground>
            </View>
          )}
        </Animatable.View>
      </KeyboardAvoidingView>
    </>
  );
};
