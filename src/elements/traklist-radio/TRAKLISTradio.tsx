import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  useWindowDimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import MediaPlayer from 'react-native-video';
import {
  handleGetTRX00,
  handleLikeTRAK,
  useEffectAsync,
  useLITELISTState,
} from '../../app';
import {useSelector} from 'react-redux';
import {VHeader, Body, Caption} from '..';
import {
  PlayerContext,
  setYoutubeOff,
  setYotubeTogglePause,
  store,
  setTraklistNext,
  setYoutubeId,
  handleMediaPlayerAction,
  appendLike,
  handleQueueControlsAction,
  setYoutubeLoop,
  appendTraklist,
  useAsyncStorage,
  asyncStorageIndex,
} from '../../stores';
import Toast from 'react-native-toast-message';
import YoutubePlayer from 'react-native-youtube-iframe';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ProgressBar, Colors} from 'react-native-paper';
import {APIKeys, api, useAPI} from '../../api';
import axios from 'axios';
import {handleAddTRX04} from '../../app/firebase/hooks/addTRX04';
import {handleStream} from '../../app/firebase/hooks/stream';
import {MenuView} from '@react-native-menu/menu';
import {AppState} from 'react-native';
import {useAppState} from '@react-native-community/hooks';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import FastImage from 'react-native-fast-image';
import {TRXPictureInPictureContainer} from '../../containers/trx-picture-in-picture';
import {useTRX} from '../../app/hooks/useTRX';
import {useOrderLiveActivity} from '../../app/hooks/live-activity/useLiveActivity';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {handleTRX00SpotifyDependancies} from '../../app/handlers/trx00SpotifyDependencies';

export const TRAKLISTradioElement = (...props) => {
  const {handleGetState} = useLITELISTState();
  const {usePOST} = useAPI();
  const {handleClear, handleStore} = useAsyncStorage();

  const [liked, setLiked] = useState(false);
  // const [elapsed, setElapsed] = useState(0);
  const [hasStreamed, setHasStreamed] = useState(false);
  const [backgroundOverride, setBackgroundOverride] = useState<any>(null);

  const {userData, setUserData} = useContext(PlayerContext);
  const currentAppState = useAppState();

  const keys = handleGetState({index: 'keys'});
  const profile = handleGetState({index: 'profile'});

  const spotify = keys.spotify;
  const accessToken = spotify.accessToken;
  const appToken = spotify.appToken;

  const playerRef = userData.playerRef;
  const youtubePlayerRef = userData.youtubePlayerRef;
  const navigationRef = userData.navigationRef;
  const currentTime = userData.currentTime;
  const playableDuration = userData.playableDuration;

  // const {mode, paused, muted, repeat, source, image, title, artist} =
  //   handleGetState({index: 'player'});

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
    youtubeLoop,
    radio,
  } = useSelector((state: any) => state.player);
  console.log(
    '🚀 ~ file: TRAKLISTradio.tsx:101 ~ TRAKLISTradioElement ~ image:',
    image,
  );

  const {TRX} = useSelector((state: any) => state.profile);

  const {handleLikeTRX, handleRequestTRX} = useTRX(props);

  // console.log(
  //   '🚀 ~ file: TRAKLISTradio.tsx ~ line 25 ~ TRAKLISTradioElement ~ player',
  //   player,
  // );
  const [miniYoutube, setMiniYoutube] = useState(youtubeMinimize);

  const handleAppStateChange = (nextAppState: any) => {
    if (nextAppState === 'active') {
      setBackgroundOverride(null);
    } else if (nextAppState === 'background') {
      setBackgroundOverride(false);
      setTimeout(() => {
        setBackgroundOverride(true);
      }, 100);
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (youtubeMinimize === true) {
      setMiniYoutube(false);
    }
  }, [youtubeMinimize]);

  const {requestLiveActivity, updateActivity} = useOrderLiveActivity();

  useEffectAsync(async () => {
    if (!artist) {
      const apnToken = await requestLiveActivity('dvc', {
        playerImage: image.uri,
        playerTitle: title,
        playerArtist: artist,
        merchandiseImage: 'ee',
        merchandiseTitle: 'ee',
        merchandisePromotion: 'efe', // The order ID will be provided later by APNS push updates.
        isPlaying: false, // The order ID will be provided later by APNS push updates.
        auctionId: 'efe',
      });

      console.log(
        '🚀 ~ file: TRAKLISTradio.tsx:175 ~ useEffect ~ apnToken:',
        apnToken,
      );

      await firestore()
        .doc(`users/${profile.TRX.id}`)
        .update({apnToken: apnToken});

      // perpetual notification live activity trigger

      const url = api.bernie({method: 'apn'});
      const data = await usePOST({
        route: url,
        payload: {
          contentState: {
            playerImage: 'player',
            playerTitle: 'player',
            playerArtist: 'playert',
            merchandiseImage: 'ee',
            merchandiseTitle: 'ee',
            merchandisePromotion: 'ewe',
            isPlaying: false,
            auctionId: 'efe',
          },
          token: apnToken,
        },
      });

      // console.log(
      //   '🚀 ~ file: TRAKLISTradio.tsx:191 ~ useEffectAsync ~ data:',
      //   data,
      // );

      // publish to apn server
    } else
      updateActivity({
        playerImage: image.uri,
        playerTitle: title,
        playerArtist: artist,
        merchandiseImage: 'ee',
        merchandiseTitle: 'ee',
        merchandisePromotion: 'efe', // The order ID will be provided later by APNS push updates.
        isPlaying: true, // The order ID will be provided later by APNS push updates.
      });
  }, [title, image.uri, artist]);

  useEffect(() => {
    console.log('🚀 ~ :TRX.likes?.some ~ TRX.likes:', youtubeId, TRX);
    const likeExists = false
      ? TRX.likes?.some(
          (like: any) => like.NFTFileName === /*trak*/ like.NFTFileName,
        )
      : TRX.likes?.some((like: any) => {
          console.log('🚀 ~ :TRX.likes?.some ~ like:', like);
          return youtubeId
            ? like.trxUri?.split(':')[2] === youtubeId?.split('=')[1]
            : like.isrc === isrc;
        });

    setLiked(likeExists ?? false);
    // setElapsed(0);
    // setHasStreamed(false);
  }, [title, players, youtubeId, isrc, TRX]);

  const upcomingTRAK = queue[index + 1];
  const currentTRAK = queue[index];

  const youtubePlayer = players.youtube;

  const handleGenius = async (geniusId: any) => {
    console.log(
      '🚀 ~ file: TRAKLISTradio.tsx:90 ~ handleGenius ~ geniusId:',
      geniusId,
    );
    const route = api.genius({method: 'songs', payload: {geniusId}});
    const token = APIKeys.genius.accessToken;
    const response = await useGET({route, token});
    console.log(
      '🚀 ~ file: TRAKLISTradio.tsx:93 ~ handleGenius ~ response:',
      response,
    );

    const trak = await Promise.resolve(response).then((res: any) => {
      const song = res.data.response.song;
      console.log('🚀 ~ file: useTRAKTab.ts ~ line 46 ~ trak ~ song', song);

      const meta = {
        genius_url: song.url,
        release_date: song.release_date,
        description: song.description,
        custom_performances: song.custom_performances, // use
        recording_location: song.recording_location,
        writer_artists: song.writer_artists,
        featured_artists: song.featured_artists,
        producer_artists: song.producer_artists,
        song_relationships: song.song_relationships,
        // artist : get from genius FOR socials
      };

      let centralized: any = [];
      let providers: any[] = [
        'apple_music',
        'soundcloud',
        'spotify',
        'youtube',
      ];

      const media = song.media;
      const hasAppleMusic = song.apple_music_id;
      const apple_music = hasAppleMusic ? {id: song.apple_music_id} : null;

      if (hasAppleMusic) {
        centralized.push('apple_music');
      }

      let trak: any = {
        artist: song.artist_names,
        title: song.title,
        thumbnail: song.song_art_image_thumbnail_url,
        apple_music,
        genius: {id: JSON.stringify(geniusId)},
        soundcloud: null,
        spotify: null,
        youtube: null,
      };

      media.map((media: any) => {
        switch (media.provider) {
          case 'soundcloud':
            centralized.push('soundcloud');
            trak[media.provider] = {url: media.url};
            break;
          case 'spotify':
            centralized.push('spotify');
            trak[media.provider] = {id: media.native_uri.split(':')[2]};
            break;
          case 'youtube':
            centralized.push('youtube');
            trak[media.provider] = {url: media.url};
            break;
          default:
            trak[media.provider] = {url: media.url};
            break;
        }
      });

      let missingProviders: any = [];

      providers.map((provider: string) => {
        const hasProvider = centralized.includes(provider);
        if (!hasProvider) {
          missingProviders.push(provider);
        }
      });

      //

      const trakCandidate = {
        trak,
        meta,
        missingProviders,
        comments: [],
        likes: [],
      };
      console.log(
        '🚀 ~ file: useTRAKTab.ts ~ line 116 ~ Promise.resolve ~ trawwk',
        trakCandidate,
      );
      return trakCandidate;
    });
    console.log(
      '🚀 ~ file: useTRAKTab.ts ~ line 134 ~ handleTRAK ~ trak',
      trak.trak.youtube,
    );

    // play youtube

    console.log('🚀 ~ file: useTRAKTab.ts:230 ~ handleTRAK ~ trak:', trak);

    navigationRef.current.navigate('MODAL', {
      type: 'trak',
      exchange: {
        active: true,
        item: trak,
      },
    });
  };

  return (
    <>
      <MediaPlayer
        ref={playerRef}
        onEnd={() => {
          if (players.local.path) {
            // end local or play next
          } else !repeat ? userData.swiperRef.current.swipeTop() : null;
        }}
        playInBackground={true}
        playWhenInactive={true}
        pictureInPicture={true}
        // source={{uri: players.local.path}}
        // audioOnly={true}
        // paused={false}
        source={players.local.path ? {uri: players.local.path} : source}
        audioOnly={true}
        paused={
          youtubeId ? true : players.local.path ? players.local.paused : paused
        }
        muted={muted}
        controls={false}
        ignoreSilentSwitch="ignore"
        repeat={repeat}
        onProgress={progressData => {
          console.log(
            '🚀 ~ file: TRAKLISTradio.tsx ~ line 48 ~ TRAKLISTradioElement ~ progressData',
            progressData,
          );
          if (progressData.currentTime > 15 && progressData.currentTime < 17) {
            if (!repeat) {
              Toast.show({
                type: 'success',
                text1: 'Coming up on TRAKLIST...',
                text2: upcomingTRAK?.artist + ' - ' + upcomingTRAK?.title,
              });
            } else {
              Toast.show({
                type: 'success',
                text1: 'Looping...',
                text2: artist + ' - ' + title,
              });
            }
          }
          setUserData({...userData, ...progressData});
        }}
        onError={error => {
          alert('err');
          console.error('Error playing video:', error);
        }}
      />
      <View style={{backgroundColor: '#000'}}>
        <View style={{backgroundColor: '#fff'}}>
          <ProgressBar
            progress={
              !youtubeId ? currentTime / playableDuration : userData.trxProgress
            }
            color={!youtubeId ? '#1DA1F2' : '#1db954'}
            style={{
              backgroundColor: '#fff',
              height: 5,
              borderRadius: 10,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (youtubeId) {
              setMiniYoutube(!miniYoutube);
            } else {
              if (
                navigationRef.current?.getCurrentRoute().name ===
                'LIST_DASHBOARD'
              ) {
                navigationRef.current.navigate('SWIPE.');
              } else {
                navigationRef.current.navigate('TRX');
              }
              Toast.show({
                type: 'success',
                text1: 'BROWSE TRAKSTAR™ - FIND MUSIC',
                text2:
                  'You can start by pressing the releases in "New this week!"',
              });
            }
          }}>
          <View
            style={{
              height: 70,
              width: '100%',
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'space-between',
              // paddingHorizontal: 40,
              // flexDirection: 'row',
              paddingRight: 55,
            }}>
            {/* <ProgressBar progress={0.5} color={Colors.amber100} /> */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FastImage
                source={{
                  uri: youtubeId
                    ? players?.youtube?.cover_art
                    : players.local.path
                    ? players.local.cover_art
                    : image.uri,
                  priority: FastImage.priority.high,
                }}
                style={{
                  height: 70,
                  width: 140,
                  backgroundColor: '#cecece',
                }}
              />

              <Pressable
                onPress={() => {
                  const action = setYotubeTogglePause({});
                  store.dispatch(action);
                }}>
                <View style={{alignItems: 'center', marginLeft: 5}}>
                  <MaterialCommunityIcons
                    name={
                      youtubeId
                        ? players.youtube.paused
                          ? 'play'
                          : 'pause'
                        : players.local.path
                        ? players.local.paused
                          ? 'play'
                          : 'pause'
                        : !source.uri
                        ? 'exclamation'
                        : paused
                        ? 'play'
                        : 'pause'
                    }
                    size={25}
                    color="#1db954"
                  />
                </View>
              </Pressable>
              <Pressable
                onPress={async () => {
                  if (youtubeId) {
                    // if next branch doesn't exist, create it
                    if (traklistIndex === traklist.length - 1) {
                      const traklist = await Promise.all(
                        radio.default.value.map(async (isrc: string) => {
                          return await handleGetTRX00({
                            trakURI: `trx:00:${isrc}`,
                          });
                        }),
                      );

                      const playerService = traklist.map((item: any) => {
                        const trak = JSON.parse(item.serialized_trak).TRAK;
                        console.log(
                          '🚀 ~ file: radio.ts:27 ~ trx ~ trak:',
                          trak,
                        );
                        return {
                          player: {
                            title: trak.trak.title,
                            artist: trak.trak.artist,
                            cover_art: trak.trak.thumbnail,
                            geniusId: trak.trak.genius.id,
                          },
                          service: {
                            provider: 'youtube',
                            url: trak.trak.youtube.url,
                          },
                          id: item.id,
                        };
                      });

                      const action1 = handleMediaPlayerAction({
                        playbackState: 'pause:force',
                      });

                      store.dispatch(action1);
                      const action = appendTraklist({
                        traklist: playerService,
                        radio: radio.default,
                      });

                      store.dispatch(action);

                      await handleStore({
                        key: asyncStorageIndex.radio,
                        value: {
                          trx: radio.default,
                          traklist: playerService,
                          index: 0,
                        },
                      });
                    } else {
                      await handleStore({
                        key: asyncStorageIndex.radio,
                        value: {
                          trx: radio,
                          traklist,
                          index: traklistIndex + 1,
                        },
                      });
                    }

                    const action = setTraklistNext({});
                    store.dispatch(action);
                  } else {
                    userData.swiperRef.current.swipeTop();
                  }
                }}>
                <View style={{alignItems: 'center', marginRight: 10}}>
                  <MaterialCommunityIcons
                    name={'fast-forward'}
                    size={25}
                    color="#1db954"
                  />
                </View>
              </Pressable>

              <View
                style={{
                  width: '40%',
                  alignItems: 'center',
                }}>
                {youtubeId ? (
                  <>
                    <VHeader
                      numberOfLines={2}
                      type="six"
                      color={'#1a1a1a'}
                      text={
                        youtubePlayer &&
                        youtubePlayer.title &&
                        youtubePlayer?.title?.trim() !== ''
                          ? `${youtubeId ? 'PLAYING' : 'LAST PLAYED'}, ${
                              youtubePlayer?.artist
                            } - ${youtubePlayer?.title} `
                          : !youtubeId
                          ? 'BROWSE TRAKSTAR™ - FIND MUSIC'
                          : miniYoutube
                          ? 'MINIMIZE'
                          : 'TRAKSTAR VIDEO'
                      }
                    />
                  </>
                ) : players.local.path ? (
                  <>
                    <VHeader
                      numberOfLines={2}
                      type="six"
                      color={'#1a1a1a'}
                      text={`${players.local.artist} - ${players.local.title}`}
                    />
                    <Caption
                      numberOfLines={1}
                      type="two"
                      color={'#232323'}
                      text={'TRAKSTAR™ PREMIUM'}
                    />
                  </>
                ) : (
                  <>
                    <VHeader
                      numberOfLines={2}
                      type="six"
                      color={'#1a1a1a'}
                      text={`${
                        source.uri ? 'PREVIEW :' : 'RESTRICTED!'
                      } ${artist} - ${title}`}
                    />
                    {!youtubeId && (
                      <Caption
                        numberOfLines={1}
                        type="two"
                        color={'#232323'}
                        text={
                          youtubePlayer &&
                          youtubePlayer.title &&
                          youtubePlayer?.title?.trim() !== ''
                            ? `${youtubeId ? 'PLAYING' : 'LAST PLAYED'}, ${
                                youtubePlayer?.artist
                              } - ${youtubePlayer?.title} `
                            : !youtubeId
                            ? 'BROWSE TRAKSTAR™ - FIND MUSIC'
                            : miniYoutube
                            ? 'MINIMIZE'
                            : 'TRAKSTAR VIDEO'
                        }
                      />
                    )}
                  </>
                )}
              </View>

              <View
                style={{
                  alignItems: 'center',
                  marginLeft: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 60,
                }}>
                {players.local.path ? (
                  <MaterialCommunityIcons
                    name={'download'}
                    size={27}
                    color={'#1db954'}
                  />
                ) : (
                  <Pressable
                    onPress={
                      youtubeId
                        ? async () =>
                            await handleLikeTRX({
                              geniusId: players.youtube.geniusId,
                            })
                        : async () => {
                            const extraData =
                              await handleTRX00SpotifyDependancies({
                                id,
                                accessToken: appToken,
                              });

                            await handleRequestTRX({
                              trak: {
                                title,
                                artist,
                                cover_art: image.uri,
                                isPreview: true,
                                isrc: isrc,
                                preview: source.uri,
                                spotifyId: id,
                                genres: extraData.genres,
                                audioFeatures: extraData.audioFeatures,
                              },
                              request: 'preview',
                            }).then(() => {
                              const action = appendLike({
                                title,
                                artist: artist,
                                cover_art: image.uri,
                                isPreview: true,
                                isrc: isrc,
                                preview: source.uri,
                              });
                              store.dispatch(action);
                            });
                          }
                    }>
                    <MaterialCommunityIcons
                      name={liked ? 'cards-heart' : 'cards-heart-outline'}
                      size={25}
                      color={youtubeId ? '#1db954' : '#1DA1F2'}
                    />
                  </Pressable>
                )}
                <View>
                  <MenuView
                    title="TRAKSTAR OPTIONS"
                    onPressAction={async ({nativeEvent}) => {
                      console.log(
                        '🚀 ~ file: TRAKLISTradio.tsx:800 ~ TRAKLISTradioElement ~ nativeEvent:',
                        nativeEvent,
                      );
                      console.warn(JSON.stringify(nativeEvent));

                      switch (nativeEvent.event) {
                        case 'restart':
                          !youtubeId
                            ? playerRef.current.seek(0)
                            : // : youtubePlayerRef.current.seekTo(0);
                            isPrimaryPlayer
                            ? userData.PiP1Ref.current.injectJavaScript(`
                             if (!window.trakStarVideo) {
                              window.trakStarVideo = document.getElementsByTagName('video')[0];
                            }
                            window.trakStarVideo.currentTime = ${0};
                            true;  
                          `)
                            : userData.PiP2Ref.current.injectJavaScript(`
                            if (!window.trakStarVideo) {
                              window.trakStarVideo = document.getElementsByTagName('video')[0];
                            }
                            window.trakStarVideo.currentTime = ${0};
                            true;  
                          `);
                          break;
                        case 'back':
                          // has not youtube ? : state dispatch
                          const action = handleQueueControlsAction({
                            playbackState: 'back',
                          });
                          store.dispatch(action);
                          break;
                        case 'repeat':
                          const action1 = setYoutubeLoop({});
                          store.dispatch(action1);
                          break;
                        case 'PiP':
                          if (isPrimaryPlayer) {
                            userData.PiP1Ref.current.injectJavaScript(`
                          if (!window.trakStarVideo) {
                            window.trakStarVideo = document.getElementsByTagName('video')[0];
                          }
                          
                          if (window.trakStarVideo) {
                            window.trakStarVideo.requestPictureInPicture().then(() => {
                              const message = {
                                eventType: 'enablePiP',
                                data: 'PiP initiated successfully.'
                              };
                              window.ReactNativeWebView.postMessage(JSON.stringify(message));
                            }).catch(error => {
                              const message = {
                                eventType: 'enablePiP',
                                data: 'PiP initiation failed: ' + error.message
                              };
                              window.ReactNativeWebView.postMessage(JSON.stringify(message));
                            });
                          } else {
                            const message = {
                              eventType: 'enablePiP',
                              data: 'No video element found.'
                            };
                            window.ReactNativeWebView.postMessage(JSON.stringify(message));
                          }
                          true;  
                        `);
                          } else {
                            userData.PiP2Ref.current.injectJavaScript(`
                          if (!window.trakStarVideo) {
                            window.trakStarVideo = document.getElementsByTagName('video')[0];
                          }
                          
                          if (window.trakStarVideo) {
                            window.trakStarVideo.requestPictureInPicture().then(() => {
                              const message = {
                                eventType: 'enablePiP',
                                data: 'PiP initiated successfully.'
                              };
                              window.ReactNativeWebView.postMessage(JSON.stringify(message));
                            }).catch(error => {
                              const message = {
                                eventType: 'enablePiP',
                                data: 'PiP initiation failed: ' + error.message
                              };
                              window.ReactNativeWebView.postMessage(JSON.stringify(message));
                            });
                          } else {
                            const message = {
                              eventType: 'enablePiP',
                              data: 'No video element found.'
                            };
                            window.ReactNativeWebView.postMessage(JSON.stringify(message));
                          }
                          true;  
                        `);
                          }
                          break;
                        case 'explore':
                          if (navigationRef.current.isReady()) {
                            navigationRef.current.navigate('MODAL', {
                              type: 'match-trak',
                              exchange: {
                                active: true,
                                item: {
                                  title: title,
                                  artist: artist,
                                },
                              },
                            });
                          }
                          break;
                        case 'info':
                          handleGenius(players.youtube.geniusId);
                          break;
                        case 'block_artist':
                          Toast.show({
                            type: 'info',
                            text1:
                              'Blocked: "' +
                              (!youtubeId ? artist : players.youtube.artist) +
                              '"',
                            text2: `We'll keep this in mind`,
                          });
                          break;
                        case 'block_song':
                          Toast.show({
                            type: 'info',
                            text1:
                              'Blocked: "' +
                              (!youtubeId ? title : players.youtube.title) +
                              '"',
                            text2: `You won't hear this again`,
                          });
                          break;
                        case 'share':
                          // ON DEVICE
                          const imageBase64 = await RNFetchBlob.config({
                            fileCache: true,
                          })
                            .fetch(
                              'GET',
                              !youtubeId
                                ? image.uri
                                : players.youtube.cover_art,
                            )
                            // the image is now dowloaded to device's storage
                            .then(resp => {
                              return resp.readFile('base64');
                            })
                            .catch(err => {
                              console.log(
                                '🚀 ~ file: PostHOC.js ~ line 150 ~ PostHOC ~ err',
                                err,
                              );
                            });

                          const options: any = {
                            title: 'TRAKLITE',
                            message:
                              "TRAKLIST | Have you heard '" + !youtubeId
                                ? title
                                : players.youtube.title + "' by " + !youtubeId
                                ? title
                                : players.youtube.artist +
                                  '?\n Discover this and much more on TRAKSTAR.\n',
                            urls: [
                              `data:image/png;base64,${imageBase64}`,
                              'https://apps.apple.com/gb/app/trakstar/id1636470089',
                            ],
                          };
                          Share.open(options)
                            .then(res => {
                              console.log(res);
                            })
                            .catch(err => {
                              err && console.log(err);
                            });
                          break;
                        default:
                          break;
                      }
                    }}
                    actions={[
                      {
                        id: 'PiP',
                        title: 'Picture in Picture',
                        titleColor: '#46F289',
                        subtitle: 'Share action on SNS',
                        image: Platform.select({
                          ios: 'pip.swap',
                          android: 'ic_menu_share',
                        }),
                        imageColor: '#1a1a1a',
                        // state: 'on',
                      },
                      {
                        id: 'share',
                        title: 'Share',
                        titleColor: '#46F289',
                        subtitle: 'Share action on SNS',
                        image: Platform.select({
                          ios: 'square.and.arrow.up',
                          android: 'ic_menu_share',
                        }),
                        imageColor: '#db7e29',
                        // state: 'on',
                      },
                      {
                        id: !youtubeId ? 'explore' : 'info',
                        title: !youtubeId ? 'Explore' : 'Community Notes',
                        image: Platform.select({
                          ios: 'cursor.rays',
                          android: 'ic_menu_delete',
                        }),
                        imageColor: '#fff',
                      },
                      {
                        title: 'Playback',
                        id: 'add',
                        titleColor: '#2367A2',
                        image: Platform.select({
                          ios: 'play',
                          android: 'ic_menu_add',
                        }),
                        imageColor: '#2367A2',
                        subactions: [
                          {
                            id: 'repeat',
                            title: 'Loop',

                            image: Platform.select({
                              ios: 'repeat.1',
                              android: 'ic_menu_delete',
                            }),
                            imageColor: '#2367A2',
                          },
                          {
                            id: 'back',
                            title: 'Step back',
                            image: Platform.select({
                              ios: 'backward.end.alt',
                              android: 'ic_menu_delete',
                            }),
                            imageColor: '#2367A2',
                          },
                          {
                            id: 'restart',
                            title: 'Restart',

                            image: Platform.select({
                              ios: 'arrow.counterclockwise',
                              android: 'ic_menu_delete',
                            }),
                            imageColor: '#2367A2',
                          },
                        ],
                      },
                      {
                        id: 'destructive',
                        title: 'Block',
                        attributes: {
                          destructive: true,
                        },
                        titleColor: 'red',
                        image: Platform.select({
                          ios: 'waveform.path.badge.minus',
                          android: 'ic_menu_delete',
                        }),
                        imageColor: 'red',
                        subactions: [
                          {
                            id: 'block_artist',
                            title: 'Artist',
                            titleColor: 'rgba(250,180,100,0.5)',
                            subtitle: 'State is mixed',
                            image: Platform.select({
                              ios: 'trash',
                              android: 'ic_menu_today',
                            }),
                            attributes: {
                              destructive: true,
                            },
                            state: 'mixed',
                          },
                          {
                            id: 'block_song',
                            title: 'Song',
                            attributes: {
                              destructive: true,
                            },
                            image: Platform.select({
                              ios: 'trash',
                              android: 'ic_menu_delete',
                            }),
                            state: 'mixed',
                          },
                        ],
                      },
                    ]}
                    // shouldOpenOnLongPress={true}
                  >
                    <View>
                      <MaterialCommunityIcons
                        name={
                          (youtubeLoop && youtubeId) || repeat
                            ? 'repeat-once'
                            : 'dots-horizontal-circle'
                        }
                        size={27}
                        color={'#1db954'}
                      />
                    </View>
                  </MenuView>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {youtubeId && <TRXPictureInPictureContainer isTraklist={isTraklist} />}
      </View>
    </>
  );
};
