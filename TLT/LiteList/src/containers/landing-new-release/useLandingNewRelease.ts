import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {api, useAPI} from '../../api';
import {useLITELISTState} from '../../app';
import {Alert} from 'react-native';
import {store, handleMediaPlayerAction} from '../../stores';

export const useLandingNewRelease = ({navigation}: any) => {
  const [releases, setReleases] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      handleGetNewReleases();
    }, 800);
  }, []);

  const {handleGetState} = useLITELISTState();
  const keys = handleGetState({index: 'keys'});
  const spotify = keys.spotify;
  const appToken = spotify.appToken;
  console.log(
    '🚀 ~ file: useLandingNewRelease.ts:20 ~ useLandingNewRelease ~ appToken:',
    appToken,
  );

  const handleGetNewReleases = () => {
    const route: any = api.spotify({method: 'new_releases'});

    axios
      .get(route, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + appToken,
        },
      })
      .then(response => {
        console.log(
          '🚀 ~ file: useLandingNewRelease.ts:46 ~ handleGetNewReleases ~ response:',
          response,
        );
        setReleases(response.data.albums.items);
      })
      .catch(err => {
        console.log(
          '🚀 ~ file: useLandingNewRelease.ts ~ line 33 ~ handleGetNewReleases ~ err',
          err,
        );
        console.log('lemme knoiw');
      });
  };

  const handleTRAKNavigation = (item: any) => {
    console.log(
      '🚀 ~ file: useLandingNewRelease.ts ~ line 37 ~ handleTRAKNavigation ~ item',
      item,
    );

    const albumId = item.id;
    const artistId = item.artists[0].id;

    const route: any = api.spotify({
      method: 'get-artist',
      payload: {artistId},
    });
    const route1: any = api.spotify({
      method: 'get-album',
      payload: {albumId},
    });

    axios
      .get(route, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + appToken,
        },
      })
      .then(response1 => {
        axios
          .get(route1, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + appToken,
            },
          })
          .then(response => {
            console.log(
              '🚀 ~ file: useLandingNewRelease.ts ~ line 64 ~ handleTRAKNavigation ~ response',
              response,
            );
            const albumData = response.data;
            const isTape = albumData.tracks.items.length > 1;
            switch (isTape) {
              case true:
                navigation.navigate('MODAL', {
                  type: 'tape',
                  exchange: {
                    active: true,
                    item: albumData,
                  },
                });
                break;
              case false:
                Alert.alert(
                  `${item.artists[0].name} - ${item.name}`,
                  `What would you like to do?`,
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Preview',
                      onPress: async () => {
                        const trak = response.data.tracks.items[0];
                        console.log(
                          '🚀 ~ file: useLandingNewRelease.ts ~ line 101 ~ onPress: ~ trak',
                          trak,
                        );
                        if (trak.preview_url) {
                          const action = handleMediaPlayerAction({
                            playbackState: 'source',
                            uri: trak.preview_url,
                            url: response1.data.images[0].url,
                            artist: trak.artists[0].name,
                            title: trak.name,
                            id: {
                              spotify: trak.id,
                              apple_music: '',
                            },
                            isrc: item.external_ids.isrc,
                          });
                          store.dispatch(action);
                        } else
                          alert(
                            `Sorry. ${trak.artists[0].name} didn't upload a preview for '${trak.name}'`,
                          );
                      },
                    },
                    {
                      text: 'Find',
                      onPress: async () => {
                        navigation.navigate('MODAL', {
                          type: 'match-trak',
                          exchange: {
                            active: true,
                            item: {
                              title: item.name,
                              artist: item.artists[0].name,
                            },
                          },
                        });
                      },
                    },
                  ],
                );

                break;
            }
          });
      });
  };

  return {
    releases,
    handleTRAKNavigation,
  };
};
