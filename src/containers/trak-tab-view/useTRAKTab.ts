import {
  toggleExchangeView,
  store,
  setYoutubeId,
  handleMediaPlayerAction,
  appendLike,
  setTrakland,
} from '../../stores';
import {handleLikeTRAK, useLITELISTState} from '../../app';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {
  api,
  useAPI,
  APIKeys,
  SPOTIFY_GET_ARTIST,
  SPOTIFY_GET_ARTIST_TOP_TRACKS,
  SPOTIFY_GET_ARTIST_ALBUMS,
  SPOTIFY_GET_ARTIST_RELATED_ARTISTS,
  SPOTIFY_PLAYLIST_ITEMS,
} from '../../api';
import algoliasearch from 'algoliasearch';
import {ALGOLIA_APP_ID, ALGOLIA_API_KEY} from '../../auth';
import axios from 'axios';
import {handleAddTRX04} from '../../app/firebase/hooks/addTRX04';
import Toast from 'react-native-toast-message';
import {handleSaveTRX} from '../../app/firebase/hooks/saveCatalog';
import {handleRequestTrak} from '../../app/firebase/hooks/requestTrak';
import {useTRX} from '../../app/hooks/useTRX';
import {handleTRX00SpotifyDependancies} from '../../app/handlers/trx00SpotifyDependencies';

export const useTRAKTab = ({query, navigation, ...props}: any) => {
  console.log('🚀 ~ file: useTRAKTab.ts ~ line 8 ~ useTRAKTab ~ query', query);
  const {useGET} = useAPI();
  const [trak, setTRAK] = useState<any>([]);
  const [artists, setArtists] = useState<any>([]);
  const [albums, setAlbums] = useState<any>([]);
  const [sectionList, setSectionList] = useState<any>([]);
  const [results, setResults] = useState<any>([]);
  console.log(
    '🚀 ~ file: useTRAKTab.ts ~ line 15 ~ useTRAKTab ~ results',
    results,
  );

  const [likes, setLikes] = useState<any>([]);

  const {handleGetState} = useLITELISTState();

  const {handlePlayTRX, handleRequestTRX} = useTRX({...navigation, ...props});

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;

  const keys = handleGetState({index: 'keys'});
  const spotifyAccessToken = keys.spotify.appToken;

  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
  const index = client.initIndex('trx');
  console.log('🚀 ~ file: useTRAKTab.ts ~ line 16 ~ useTRAKTab ~ index', index);

  const player = handleGetState({index: 'player'});
  const players = player.players;

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  const handleSearch = async (query: any) => {
    console.log(
      '🚀 ~ file: useTRAKTab.ts ~ line 29 ~ handleSearch ~ query',
      query,
    );

    const accessToken = APIKeys.genius.accessToken;

    const responses = await axios
      .all([
        axios.get(
          api.spotify({
            method: 'search',
            payload: {query, type: 'artist'},
          }),
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + spotifyAccessToken,
            },
          },
        ),
        axios.get(
          api.spotify({
            method: 'search',
            payload: {query, type: 'album'},
          }),
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + spotifyAccessToken,
            },
          },
        ),
        axios.get(api.genius({method: 'search', payload: {query}}), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }),
        axios.get(
          api.spotify({method: 'search', payload: {query, type: 'playlist'}}),
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + spotifyAccessToken,
            },
          },
        ),
        axios.get(
          api.spotify({method: 'search', payload: {query, type: 'track'}}),
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + spotifyAccessToken,
            },
          },
        ),
      ])
      .then(
        axios.spread((data1, data2, data3, data4, data5) => {
          console.log(
            '🚀 ~ file: useTRAKTab.ts:110 ~ axios.spread ~ data4:',
            data4,
          );
          console.log(
            '🚀 ~ file: useTRAKTab.ts:140 ~ axios.spread ~ data3:',
            data3,
          );
          const artistResult = data1.data;
          const albumResult = data2.data;
          const tracksResult = data3;
          const playlistResult = data4.data;
          const spotifyTracks = data5.data;

          const hits = tracksResult.data.response.hits;
          console.log(
            '🚀 ~ file: useTRAKTab.ts:85 ~ handleSearch ~ hits:',
            hits,
          );

          // TRX METAVERSE HITS

          // TRAKLIST HITS

          const trakHits = hits.map((item: any) => {
            console.log('🚀 ~ file: useTRAKTab.ts:97 ~ trakHits ~ item:', item);
            return {...item, type: 'TRK'};
          });

          const filteredResults = trakHits.filter((item: any) => {
            // Use regex to check if the item's content includes 'youtube' in its URL
            const trxRegex = new RegExp(
              `^(?!(Genius|${!query.split('-')[0]}|Spotify|Apple Music)).*$`,
              'i',
            );
            return trxRegex.test(item.result.artist_names);
          });

          return {
            artistResult: artistResult.artists.items,
            albumResult: albumResult.albums.items,
            tracksResult: filteredResults,
            playlistResult: playlistResult.playlists.items,
            spotifyTracks: spotifyTracks.tracks.items,
          };
        }),
      );
    console.log(
      '🚀 ~ file: useTRAKTab.ts:179 ~ handleSearch ~ responses:',
      responses,
    );

    const track = !profile.TRX.userCategory
      ? {
          title: 'TRX',
          data: responses.spotifyTracks.splice(0, 4),
        }
      : {
          title: 'Songs',
          data: responses.tracksResult.splice(0, 4),
        };

    setSectionList([
      track,
      {
        title: 'Playlists',
        data: responses.playlistResult.splice(0, 4),
      },
      {
        title: 'Artists',
        data: responses.artistResult.splice(0, 3),
      },
      {
        title: 'Albums',
        data: responses.albumResult.splice(0, 5),
      },
    ]);
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

  const handleArtist = ({item}: any) => {
    const appToken = keys.spotify.appToken;

    console.log(
      '🚀 ~ file: useProfile.ts ~ line 241 ~ handleArtistNavigation ~ item',
      item,
    );

    return axios
      .all([
        axios.get(SPOTIFY_GET_ARTIST(item.id), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + appToken,
          },
        }),
        axios.get(SPOTIFY_GET_ARTIST_TOP_TRACKS(item.id), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + appToken,
          },
        }),
        axios.get(SPOTIFY_GET_ARTIST_ALBUMS(item.id), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + appToken,
          },
        }),
        axios.get(SPOTIFY_GET_ARTIST_RELATED_ARTISTS(item.id), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + appToken,
          },
        }),
      ])
      .then(
        axios.spread((data1, data2, data3, data4) => {
          const artist = data1.data;
          const artistTopTracks = data2.data.tracks;
          const artistAlbums = data3.data.items;
          const artistRelated = data4.data.artists;

          const artistData = {
            artist: {
              id: artist.id,
              name: artist.name,
              followers: artist.followers,
              genres: artist.genres,
              images: artist.images,
              popularity: artist.popularity,
            },
            artist_top_tracks: artistTopTracks,
            artist_albums: artistAlbums,
            artist_related: artistRelated,
          };

          // navigation.navigate('ArtistView', {artistData});

          console.log(
            '🚀 ~ file: useProfile.ts ~ line 126 ~ axios.spread ~ artistData',
            artistData,
          );

          setTimeout(() => {
            // setLoadingArtist(false);
            navigation.navigate('MODAL', {
              type: 'artist-view',
              exchange: {
                active: true,
                item: {
                  artist: artistData,
                },
              },
            });
          }, 800);
        }),
      )
      .catch(error => {
        alert('errors');
        // return {
        //   success: false,
        //   data: error,
        // };
      });
  };

  const handleAlbum = async ({item}: any) => {
    console.log('🚀 ~ file: useTRAKTab.ts:583 ~ handleAlbum ~ item:', item);
    const route = api.spotify({
      method: 'get-album',
      payload: {albumId: item.id},
    });
    const response: any = await useGET({route, token: spotifyAccessToken});
    console.log(
      '🚀 ~ file: useArtistAlbums.ts:103 ~ handleTapeNavigation ~ response:',
      response,
    );
    navigation.navigate('MODAL', {
      type: 'tape',
      exchange: {
        active: true,
        item: response.data,
      },
    });
  };

  const handleTRAK = (trak: any) => {
    console.log('🚀 ~ file: useTRAKTab.ts:433 ~ handleTRAK ~ trak:', trak);
    setLikes([...likes, trak.trak]);
    handlePlayTRX({navigation, geniusId: trak.id, spotifyAccessToken});
  };

  const handleLike = async (geniusId: string) => {
    const route = api.genius({method: 'songs', payload: {geniusId}});
    const token = APIKeys.genius.accessToken;
    const response = await useGET({route, token});
    console.log(
      '🚀 ~ file: TRAKLISTradio.tsx:93 ~ handleGenius ~ response:',
      response,
    );

    const trak = await Promise.resolve(response).then(async (res: any) => {
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

    await handleAddTRX04({trak}).then(async trakURI => {
      await handleLikeTRAK({
        trak: {
          title: players.youtube.title,
          artist: players.youtube.artist,
          cover_art: players.youtube.cover_art,
          isPreview: false,
          trx04: trakURI,
          geniusId: players.youtube.geniusId,
        },
      }).then(() => {
        console.log(
          '🚀 ~ file: useSwipe.ts:213 ~ handleTRAKInteraction ~ action:',
        );

        const action = appendLike({
          title: players.youtube.title,
          artist: players.youtube.artist,
          cover_art: players.youtube.cover_art,
          isPreview: false,
          trx04: trakURI,
          preview: null,
          geniusId: players.youtube.geniusId,
        });
        store.dispatch(action);
      });
      Toast.show({
        type: 'success',
        text1: 'GLAD YOU LIKE IT!',
        text2: 'We added this song to your TRAKLIST™️.',
      });

      // setLiked(true);
    });
  };

  const handlePlaylist = ({playlistId, images}: any) => {
    console.log(
      '🚀 ~ file: useTRAKTab.ts:701 ~ handlePlaylist ~ playlistId:',
      playlistId,
    );
    // axios
    //   .get(
    //     api.spotify({
    //       method: 'playlist-tracks',
    //       payload: {playlistId},
    //     }),
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: 'Bearer ' + spotifyAccessToken,
    //       },
    //     },
    //   )
    //   .then(res => {
    //     console.log(
    //       '🚀 ~ file: useTRAKTab.ts:715 ~ handlePlaylist ~ res:',
    //       res,
    //     );
    //     //
    //     //
    //   });

    axios
      .get(SPOTIFY_PLAYLIST_ITEMS(playlistId), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + spotifyAccessToken,
        },
      })
      .then(response => {
        console.log(response.data, 'oiuy');
        const playlistItems = response.data.items.map((item: any) => ({
          ...item.track,
          images,
        }));
        console.log(
          '🚀 ~ file: useTRAKTab.ts:758 ~ handlePlaylist ~ playlistItems:',
          playlistItems,
        );

        // navigation.navigate('MODAL', {
        //   type: 'playlist',
        //   exchange: {
        //     active: true,
        //     item: {
        //       album: {
        //         tracks: {
        //           items: playlistItems,
        //         },
        //       },
        //     },
        //   },
        // })

        const items = {
          tracks: playlistItems,
          images: images[0].url,
        };
        console.log(
          '🚀 ~ file: useProfile.ts ~ line 89 ~ handleView ~ items',
          items,
        );
        // navigation.navigate('TapeView', {tape: items});
        navigation.navigate('PlaylistsView', {
          playlist: {
            tracks: playlistItems,
            images: images[0].url,
          },
        });
      });
  };

  const handleSave = ({type}: any) => {
    switch (type) {
      case 'save-playlist':
        alert(type);
        handleSaveTRX({type: 'playlist'});
        break;
      case 'save-album':
        alert(type);
        handleSaveTRX({type: 'album'});
        break;
      default:
        break;
    }
  };

  const handleTRX = async (item: any) => {
    console.log('🚀 ~ file: useTRAKTab.ts:677 ~ handleTRX ~ item:', item);

    const extraData = await handleTRX00SpotifyDependancies({
      id: item.id!,
      accessToken: keys.spotify.appToken,
    });

    const like = {
      trak: {
        title: item.name,
        artist: item.artists[0].name,
        cover_art: item.album.images[0].url,
        isPreview: true,
        isrc: item.external_ids.isrc,
        preview: item.preview_url,
        spotifyId: item.id,
        genres: extraData.genres,
        audioFeatures: extraData.audioFeatures,
      },
      request: 'preview',
    };

    const action = setTrakland(like);
    store.dispatch(action);
  };

  return {
    trak,
    handleTRAK,
    results,
    TRXProfile,
    handleGenius,
    artists,
    albums,
    sectionList,
    handleArtist,
    handleAlbum,
    handleLike,
    handlePlaylist,
    handleSave,
    handleTRX,
  };
};
