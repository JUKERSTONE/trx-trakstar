import React, {Component} from 'react';
import {View, StatusBar, Alert} from 'react-native';
import axios from 'axios';
import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
  ApiScope,
} from 'react-native-spotify-remote';

import {useLITELISTState, handleNowPlaying} from '../app';
import {api} from '../api';
import {
  store,
  handleMediaPlayerAction,
  handleQueueControlsAction,
  setPlayers,
} from '../stores';
import {TRXPlayer} from '../elements';

export const LITELISTInterfaceHOC = (InnerComponent: any, mode: string) => {
  return class TRXInterfaceHOC extends Component {
    constructor(props: any) {
      super(props);
      const {handleGetState} = useLITELISTState();
      const player = handleGetState({index: 'player'});
      const keys = handleGetState({index: 'keys'});

      this.state = {
        mode: player.mode,
        paused: player.paused,
        muted: player.muted,
        repeat: player.repeat,
        source: player.source,
        image: player.image,
        title: player.title,
        artist: player.artist,
        typing: false,
        keys,
      };
    }

    handleMedia(type: string) {
      const action = handleMediaPlayerAction({playbackState: type});
      store.dispatch(action);
    }

    async handleControls({type, id, key, player, navigation}: any) {
      switch (type) {
        case 'save':
          const ids = id.spotify;
          const route = api.spotify({method: 'save-track', payload: {ids}});
          await axios.put(route, [ids], {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + key,
            },
          });
          break;
        case 'send':
          navigation.navigate('MMS');
          break;
        case 'fanclub':
          navigation.navigate('MODAL', {
            type: 'match-trak',
            exchange: {
              active: true,
              item: {
                title: player.title,
                artist: player.artist,
              },
            },
          });
          break;
        case 'next':
          const action = handleQueueControlsAction({
            playbackState: 'next',
          });
          store.dispatch(action);
        default:
          break;
      }
    }

    handlePlayOnTRAKLIST = async ({type, id}: any) => {
      if (!id) return;
      const config: any = {
        clientID: '29dec26a7f304507b4a9d9bcf0ef210b',
        redirectURL: 'com.trxklist://oauthredirect/',
        tokenRefreshURL:
          'https://europe-west1-trx-traklist.cloudfunctions.net/TRAKLIST/spotify/refresh',
        tokenSwapURL:
          'https://europe-west1-trx-traklist.cloudfunctions.net/TRAKLIST/spotify/swap',
        scopes: [ApiScope.AppRemoteControlScope, ApiScope.UserFollowReadScope],
      };

      switch (type) {
        case 'back':
          const action1 = handleQueueControlsAction({
            playbackState: 'index:down',
          });
          store.dispatch(action1);
          try {
            if (await SpotifyRemote.isConnectedAsync()) {
              const session = await SpotifyAuth.authorize(config);

              await SpotifyRemote.connect(session.accessToken);

              const action1 = handleMediaPlayerAction({
                playbackState: 'pause:force',
              });
              store.dispatch(action1);

              await SpotifyRemote.playUri(`spotify:track:${id}`).then(
                async () => {
                  setTimeout(async () => {
                    const nowPlaying = await handleNowPlaying();

                    const action = setPlayers({
                      spotify: nowPlaying,
                      apple_music: null,
                    });
                    store.dispatch(action);
                  }, 2000);
                },
              );
            } else {
              await SpotifyAuth.endSession();
              const session = await SpotifyAuth.authorize(config);

              await SpotifyRemote.connect(session.accessToken);

              const action1 = handleMediaPlayerAction({
                playbackState: 'pause:force',
              });
              store.dispatch(action1);

              await SpotifyRemote.playUri(`spotify:track:${id}`).then(
                async () => {
                  setTimeout(async () => {
                    const nowPlaying = await handleNowPlaying();

                    const action = setPlayers({
                      spotify: nowPlaying,
                      apple_music: null,
                    });
                    store.dispatch(action);
                  }, 2000);
                },
              );
            }
          } catch (err) {
            alert(err);
            console.error("Couldn't authorize with or connect to Spotify", err);
          }
          break;
        case 'pause':
          try {
            if (await SpotifyRemote.isConnectedAsync()) {
              const session = await SpotifyAuth.authorize(config);

              await SpotifyRemote.connect(session.accessToken);

              const action1 = handleMediaPlayerAction({
                playbackState: 'pause:force',
              });
              store.dispatch(action1);

              await SpotifyRemote.pause().then(async () => {
                setTimeout(async () => {
                  const nowPlaying = await handleNowPlaying();

                  const action = setPlayers({
                    spotify: nowPlaying,
                    apple_music: null,
                  });
                  store.dispatch(action);
                }, 2000);
              });
            } else {
              await SpotifyAuth.endSession();
              const session = await SpotifyAuth.authorize(config);

              const nowPlaying = await handleNowPlaying();
              const action = setPlayers({
                spotify: nowPlaying,
                apple_music: null,
              });
              store.dispatch(action);

              await SpotifyRemote.pause().then(async () => {
                setTimeout(async () => {
                  const nowPlaying = await handleNowPlaying();

                  const action = setPlayers({
                    spotify: nowPlaying,
                    apple_music: null,
                  });
                  store.dispatch(action);
                }, 2000);
              });

              await SpotifyRemote.connect(session.accessToken);

              const action1 = handleMediaPlayerAction({
                playbackState: 'pause:force',
              });

              store.dispatch(action1);

              if (nowPlaying) {
                await SpotifyRemote.pause().then(async () => {
                  setTimeout(async () => {
                    const nowPlaying = await handleNowPlaying();

                    const action = setPlayers({
                      spotify: nowPlaying,
                      apple_music: null,
                    });
                    store.dispatch(action);
                  }, 2000);
                });
              } else SpotifyRemote.resume();
            }
          } catch (err) {
            alert(err);

            console.error("Couldn't authorize with or connect to Spotify", err);
          }
          break;
        case 'resume':
          try {
            if (await SpotifyRemote.isConnectedAsync()) {
              const session = await SpotifyAuth.authorize(config);

              await SpotifyRemote.connect(session.accessToken);

              const action1 = handleMediaPlayerAction({
                playbackState: 'pause:force',
              });
              store.dispatch(action1);

              await SpotifyRemote.resume().then(async () => {
                setTimeout(async () => {
                  const nowPlaying = await handleNowPlaying();

                  const action = setPlayers({
                    spotify: nowPlaying,
                    apple_music: null,
                  });
                  store.dispatch(action);
                }, 2000);
              });
            } else {
              await SpotifyAuth.endSession();
              const session = await SpotifyAuth.authorize(config);

              await SpotifyRemote.connect(session.accessToken);

              const action1 = handleMediaPlayerAction({
                playbackState: 'pause:force',
              });

              store.dispatch(action1);
            }
          } catch (err) {
            alert(err);

            console.error("Couldn't authorize with or connect to Spotify", err);
          }
          break;
        case 'play':
          try {
            if (await SpotifyRemote.isConnectedAsync()) {
              const session = await SpotifyAuth.authorize(config);

              await SpotifyRemote.connect(session.accessToken);

              const action1 = handleMediaPlayerAction({
                playbackState: 'pause:force',
              });
              store.dispatch(action1);

              await SpotifyRemote.playUri(`spotify:track:${id}`).then(
                async () => {
                  setTimeout(async () => {
                    const nowPlaying = await handleNowPlaying();

                    const action = setPlayers({
                      spotify: nowPlaying,
                      apple_music: null,
                    });
                    store.dispatch(action);
                  }, 2000);
                },
              );
            } else {
              await SpotifyAuth.endSession();
              const session = await SpotifyAuth.authorize(config);

              await SpotifyRemote.connect(session.accessToken);

              const action1 = handleMediaPlayerAction({
                playbackState: 'pause:force',
              });

              store.dispatch(action1);
            }
          } catch (err) {
            alert(err);

            console.error("Couldn't authorize with or connect to Spotify", err);
          }
          break;
        case 'forward':
          const action2 = handleQueueControlsAction({
            playbackState: 'index:up',
          });
          store.dispatch(action2);
          try {
            if (await SpotifyRemote.isConnectedAsync()) {
              const session = await SpotifyAuth.authorize(config);

              await SpotifyRemote.connect(session.accessToken);

              const action1 = handleMediaPlayerAction({
                playbackState: 'pause:force',
              });
              store.dispatch(action1);

              await SpotifyRemote.playUri(`spotify:track:${id}`).then(
                async () => {
                  setTimeout(async () => {
                    const nowPlaying = await handleNowPlaying();

                    const action = setPlayers({
                      spotify: nowPlaying,
                      apple_music: null,
                    });
                    store.dispatch(action);
                  }, 2000);
                },
              );
            } else {
              await SpotifyAuth.endSession();
              const session = await SpotifyAuth.authorize(config);
              await SpotifyRemote.connect(session.accessToken);

              const action1 = handleMediaPlayerAction({
                playbackState: 'pause:force',
              });
              store.dispatch(action1);

              await SpotifyRemote.playUri(`spotify:track:${id}`).then(
                async () => {
                  setTimeout(async () => {
                    const nowPlaying = await handleNowPlaying();

                    const action = setPlayers({
                      spotify: nowPlaying,
                      apple_music: null,
                    });

                    store.dispatch(action);
                  }, 2000);
                },
              );
            }
          } catch (err) {
            alert(err);
            console.error("Couldn't authorize with or connect to Spotify", err);
          }
          break;
        default:
          break;
      }
    };

    handleAddTRAK({navigation}: any) {
      navigation.navigate('FeedAddTrack');
    }

    async handleThrowSpotify(token: any) {
      const route = api.spotify({method: 'get-devices'});

      const devices = await axios
        .get(route, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        })
        .then((response: any) => {
          return response.data.devices;
        })
        .catch(err => {
          console.log(
            '🚀 ~ file: LITELISTInterface.tsx ~ line 393 ~ TRXInterfaceHOC ~ handleThrowSpotify ~ err',
            err,
          );
        });

      const alert = devices.map((device: any) => {
        return {
          text: device.name,
          onPress: async () => {
            const route = api.spotify({method: 'get-playback'});

            return await axios
              .put(
                route,
                {device_ids: [device.id]},
                {
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                  },
                },
              )
              .then(async (response: any) => {
                const nowPlaying = await handleNowPlaying();
                const action = setPlayers({
                  spotify: nowPlaying,
                  apple_music: null,
                });
                store.dispatch(action);
              })
              .catch(err => {
                console.log(
                  '🚀 ~ file: LITELISTInterface.tsx ~ line 595 ~ TRXInterfaceHOC ~ onPress: ~ err',
                  err,
                );
              });
          },
        };
      });

      Alert.alert(`Throwing TRAKLIST to:`, ``, [
        ...alert,
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ]);
    }

    render() {
      return (
        <View style={[{flex: 1}]}>
          <StatusBar barStyle={'dark-content'} />
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <InnerComponent {...this.props} />
            </View>

            <TRXPlayer
              {...this.state}
              {...this.props}
              handleControls={this.handleControls}
              handlePlayOnTRAKLIST={this.handlePlayOnTRAKLIST}
              handleMedia={this.handleMedia}
              handleThrowSpotify={this.handleThrowSpotify}
              handleAddTRAK={this.handleAddTRAK}
              mode={mode}
            />
          </View>
        </View>
      );
    }
  };
};
