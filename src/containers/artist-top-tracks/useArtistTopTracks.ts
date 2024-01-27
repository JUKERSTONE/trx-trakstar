import React, {useEffect, useState, useContext} from 'react';
import {APIKeys, api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
  setTraklist,
} from '../../stores';
import {
  useGenerate,
  useFirebase,
  useLITELISTState,
  useEffectAsync,
} from '../../app';
import {Alert} from 'react-native';
import {useTRX} from '../../app/hooks/useTRX';

export const useArtistTopTracks = ({navigation, route}: any) => {
  console.log(
    '🚀 ~ file: useArtistTopTracks.ts ~ line 12 ~ useArtistTopTracks ~ navigation',
    navigation,
  );

  const {useGET} = useAPI();

  const {handlePlayTRX} = useTRX();
  const {handleGetState} = useLITELISTState();

  const keys = handleGetState({index: 'keys'});
  const accessToken = keys.spotify.accessToken;
  const appToken = keys.spotify.appToken;

  // const {handleGetState} = useLITELISTState();
  // const profile = handleGetState({index: 'profile'});
  // const TRXProfile = profile.TRX;
  // const userId = TRXProfile.id;
  // const trakName = TRXProfile.trak_name;

  // console.log('🚀 ~ file: useChat.ts ~ line 11 ~ useChat ~ route', route);
  // const {handleRetrieveChat, handleSubmitChat, handleRetrieveUser} =
  //   useFirebase();
  // const [chat, setChat] = useState<any>();
  // const [chatHistory, setChatHistory] = useState<any>();

  useEffectAsync(async () => {
    const hits = await Promise.all(
      album.tracks.items.map(async (item: any) => {
        const route = api.genius({
          method: 'search',
          payload: {query: `${item.name} ${item.artists[0].name}`},
        });

        const accessToken = APIKeys.genius.accessToken;
        const response: any = await useGET({route, token: accessToken});
        console.log(
          '🚀 ~ file: useTRAKTab.ts ~ line 24 ~ handleSearch ~ response',
          response,
        );

        // filter response.data.response.hits

        const filteredResults = response.data.response.hits.filter(
          (itemG: any) => {
            console.log(
              '🚀 ~ file: useTRAKTab.ts:101 ~ filteredResults ~ item:',
              itemG,
            );
            // Use regex to check if the item's content includes 'youtube' in its URL
            const trxRegex = new RegExp(
              `^(?!(Genius|${!item.artists[0].name}|Spotify|Apple Music)).*$`,
              'i',
            );
            return trxRegex.test(itemG.result.artist_names);
          },
        );

        const hit = filteredResults[0];
        console.log(
          '🚀 ~ file: Tape.tsx:41 ~ album.tracks.items.map ~ hit:',
          hit,
        );

        const token = APIKeys.genius.accessToken;
        const geniusId = hit.result.id;
        const route1 = api.genius({method: 'songs', payload: {geniusId}});

        const response1 = await Promise.resolve(
          useGET({route: route1, token}).then((res: any) => {
            return res.data.response.song;
          }),
        );
        console.log(
          '🚀 ~ file: Tape.tsx:49 ~ response1 ~ response1:',
          response1,
        );

        return await response1;
      }),
    );

    const result = hits.filter((item: any) => item.provider !== 'youtube');

    console.log(
      '🚀 ~ file: Tape.tsx:67 ~ album.tracks.items.map ~ result:',
      result,
    );
    console.log('🚀 ~ file: Tape.tsx:44 ~ hits ~ hits:', hits);

    console.log('🚀 ~ file: Tape.tsx:76 ~ useEffectAsync ~ hits:', hits);
    // setMedia(result);
  }, []);

  const handleTRAKNavigation = (item: any) => {
    console.log(
      '🚀 ~ file: useLandingRecommendations.ts ~ line 72 ~ handleTRAKNavigation ~ item',
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
            } else
              alert(
                `Sorry. ${item.artists[0].name} didn't upload a preview for '${item.name}'`,
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
  };

  const handleTapeNavigation = (albumData: any) => {
    navigation.navigate('MODAL', {
      type: 'tape',
      exchange: {
        active: true,
        item: albumData,
      },
    });
  };

  const handleTRAK = async (result: any, media: any, index: number) => {
    const token = APIKeys.genius.accessToken;
    const geniusId = result.id;
    const route = api.genius({method: 'songs', payload: {geniusId}});

    const response = useGET({route, token});

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

    if (trak.trak.youtube) {
      console.log(
        '🚀 ~ file: useArtistTopTracks.ts:288 ~ handleTRAK ~ media:',
        media,
      );
      await handlePlayTRX({
        navigation,
        trx: trak,
        spotifyAccessToken: keys.spotify.accessToken,
        media,
      });
    } else {
      navigation.navigate('MODAL', {
        type: 'trak',
        exchange: {
          active: true,
          item: trak,
        },
      });
    }
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

  return {
    handleTRAKNavigation,
    handleTapeNavigation,
    handleTRAK,
    handleGenius,
  };
};
