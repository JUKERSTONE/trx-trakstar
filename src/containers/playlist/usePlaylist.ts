import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';

import {APIKeys, api, useAPI} from '../../api';
import {store, handleMediaPlayerAction, setTraklist} from '../../stores';
import {useTRX} from '../../app/hooks/useTRX';
import {useLITELISTState} from '../../app';

export const usePlaylist = ({navigation}: any) => {
  const [TRAK, setTRAK] = useState();
  const {useGET} = useAPI();

  const {handlePlayTRX} = useTRX();

  const {handleGetState} = useLITELISTState();

  const keys = handleGetState({index: 'keys'});
  const appToken = keys.spotify.appToken;

  const handleNavTrak = (item: any) => {
    console.log(
      '🚀 ~ file: useTape.ts ~ line 16 ~ handleNavigateTRAK ~ item',
      item,
    );
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
            if (item.preview_url) {
              const action = handleMediaPlayerAction({
                playbackState: 'source',
                uri: item.preview_url,
                url: item.album.images[0].url,
                artist: item.artists[0].name,
                title: item.name,
                id: {
                  spotify: item.id,
                  apple_music: '',
                },
                isrc: item.external_ids.isrc,
              });
              store.dispatch(action);
            } else {
              alert(
                `Sorry. ${item.artists[0].name} didn't upload a preview for '${item.name}'`,
              );
            }
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
  };

  const handleNavigateTRAK = (item: any) => {
    console.log(
      '🚀 ~ file: useTape.ts ~ line 16 ~ handleNavigateTRAK ~ item',
      item,
    );
    Alert.alert(
      `${item.track.artists[0].name} - ${item.track.name}`,
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
            if (item.track.preview_url) {
              const action = handleMediaPlayerAction({
                playbackState: 'source',
                uri: item.track.preview_url,
                url: item.track.album.images[0].url,
                artist: item.track.artists[0].name,
                title: item.track.name,
                id: {
                  spotify: item.track.id,
                  apple_music: '',
                },
                isrc: item.external_ids.isrc,
              });
              store.dispatch(action);
            } else {
              alert(
                `Sorry. ${item.track.artists[0].name} didn't upload a preview for '${item.track.name}'`,
              );
            }
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
                  title: item.track.name,
                  artist: item.track.artists[0].name,
                },
              },
            });
          },
        },
      ],
    );
  };

  const handleTRAK = async (result: any) => {
    console.log('🚀 ~ handleTRAK ~ result:', result);

    handlePlayTRX({
      navigation: navigation,
      geniusId: result.id,
      spotifyAccessToken: appToken,
    });
  };

  const handleGenius = async ({result}: any) => {
    const isLocal =
      typeof result.protocol === 'string' || result.protocol instanceof String
        ? true
        : false;

    if (isLocal) {
      navigation.navigate('MODAL', {
        type: 'trak',
        exchange: {
          active: true,
          item: {...result.TRAK, isrc: result?.isrc},
        },
      });
    } else {
      console.log(
        '🚀 ~ file: useTRAKTab.ts:266 ~ handleGenius ~ result:',
        result,
      );
      const token = APIKeys.genius.accessToken;
      const geniusId = result.id;
      const route = api.genius({method: 'songs', payload: {geniusId}});

      const response = useGET({route, token});
      console.log(
        '🚀 ~ file: useTRAKTab.ts:285 ~ handleGenius ~ response:',
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
      console.log('🚀 ~ file: useTRAKTab.ts:374 ~ trak ~ trak:', trak);
      console.log(
        '🚀 ~ file: useTRAKTab.ts ~ line 134 ~ handleTRAK ~ trak',
        trak.trak.youtube,
      );

      navigation.navigate('MODAL', {
        type: 'trak',
        exchange: {
          active: true,
          item: trak,
        },
      });
    }
  };

  const handleSave = ({type}: any) => {
    switch (type) {
      case 'save-playlist':
        alert(type);
        // handleSaveTRX({type: 'playlist', });
        break;
      case 'save-album':
        alert(type);
        // handleSaveTRX({type: 'album'});
        break;
      default:
        break;
    }
  };

  const handleSavePlaylist = ({playlist}: any) => {
    console.log(
      '🚀 ~ file: usePlaylist.ts:532 ~ handleSavePlaylist ~ playlist:',
      playlist,
    );
  };

  return {
    handleNavigateTRAK,
    handleGenius,
    handleTRAK,
    handleNavTrak,
    handleSave,
    handleSavePlaylist,
  };
};
