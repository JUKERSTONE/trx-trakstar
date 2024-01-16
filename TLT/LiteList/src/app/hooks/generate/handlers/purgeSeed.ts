// @ts-ignore
import AppleMusic from '@bouncyapp/react-native-apple-music';
import {useAPI, api} from '../../../../api';
import {useLITELISTState} from '../../../useLITELISTState';

import {generate} from '../handlers';
export const handlePurgeSeed = async ({seed, userCategory}: any) => {
  const {SPOT: topTracks, AM: recommendation} = seed;
  console.log(
    '🚀 ~ file: purgeSeed.ts ~ line 9 ~ handlePurgeSeed ~ topTracks',
    topTracks,
  );
  const {useGET} = useAPI();
  const {handleGetState} = useLITELISTState();

  console.log(
    '🚀 ~ file: purgeSeed.ts ~ line 60 ~ handlePurgeSeed ~ userCategory',
    userCategory,
  );
  switch (userCategory) {
    case 'primary':
      const filteredRecs = recommendation.filter((item: any) => {
        return !item.attributes.resourceTypes.includes('stations');
      });
      console.log(
        '🚀 ~ file: purgeSeed.ts ~ line 25 ~ filteredRecs ~ filteredRecs',
        filteredRecs,
      );

      const magicNumbers = generate(filteredRecs);
      console.log(
        '🚀 ~ file: purgeSeed.ts ~ line 31 ~ handlePurgeSeed ~ magicNumbers',
        magicNumbers,
      );

      const magicNumber = magicNumbers[1];
      console.log(
        '🚀 ~ file: purgeSeed.ts ~ line 34 ~ handlePurgeSeed ~ magicNumber',
        magicNumber,
      );

      const magicSeed = filteredRecs[magicNumber];
      console.log(
        '🚀 ~ file: purgeSeed.ts ~ line 37 ~ handlePurgeSeed ~ magicSeed',
        magicSeed,
      );

      const appleMusicSeed = magicSeed.relationships.contents.data;
      console.log(
        '🚀 ~ file: purgeSeed.ts ~ line 37 ~ handlePurgeSeed ~ appleMusicSeed',
        appleMusicSeed,
      );

      const recommendationItems = await Promise.all(
        appleMusicSeed.map(async (item: any) => {
          console.log(
            '🚀 ~ file: purgeSeed.ts ~ line 56 ~ appleMusicSeed.map ~ item',
            item,
          );
          const id = item.id;
          const type = item.type;

          switch (type) {
            case 'albums':
              const album = await AppleMusic.getAlbum(id);
              console.log(
                '🚀 ~ file: purgeSeed.ts ~ line 66 ~ appleMusicSeed.map ~ album',
                album,
              );

              if (album) {
                return album[0];
              }

            // return album[0];
            case 'playlists':
              const serializedPlaylist = await AppleMusic.getPlaylist(id);
              const playlist = JSON.parse(serializedPlaylist).data[0];
              console.log(
                '🚀 ~ file: purgeSeed.ts ~ line 72 ~ appleMusicSeed.map ~ playlist',
                playlist,
              );
              if (playlist) {
                return playlist[0];
              }
            default:
              break;
          }
        }),
      );
      console.log(
        '🚀 ~ file: purgeSeed.ts ~ line 61 ~ handlePurgeSeed ~ recommendationItems',
        recommendationItems,
      );

      const luckyNumbers = generate(recommendationItems);
      console.log(
        '🚀 ~ file: purgeSeed.ts ~ line 63 ~ handlePurgeSeed ~ luckyNumbers',
        luckyNumbers,
      );

      const luckyNumber1 = luckyNumbers[0];
      console.log(
        '🚀 ~ file: purgeSeed.ts ~ line 73 ~ handlePurgeSeed ~ luckyNumber1',
        luckyNumber1,
      );
      const luckyNumber2 = luckyNumbers[2];
      console.log(
        '🚀 ~ file: purgeSeed.ts ~ line 75 ~ handlePurgeSeed ~ luckyNumber2',
        luckyNumber2,
      );

      const recommendationsSlot = [
        recommendationItems[luckyNumber1],
        recommendationItems[luckyNumber2],
      ];

      //  may have to check for corecely false statements of recommendationsSlot
      console.log(
        '🚀 ~ file: purgeSeed.ts ~ line 81 ~ handlePurgeSeed ~ recommendationsSlot',
        recommendationsSlot,
      );

      const recommendationsSeed = [
        ...recommendationsSlot[0].relationships.tracks.data,
        ...recommendationsSlot[1].relationships.tracks.data,
      ];
      console.log(
        '🚀 ~ file: purgeSeed.ts ~ line 83 ~ handlePurgeSeed ~ recommendationsSeed',
        recommendationsSeed,
      );

      const purgeAppleMusic = await Promise.all(
        recommendationsSeed.map(async (item: any) => {
          const keys = handleGetState({index: 'keys'});
          const accessToken = keys.spotify.accessToken;

          const isrc = item.attributes.isrc;

          const appleMusicMeta = {
            isrc: item.attributes.isrc,
            id: item.attributes.playParams.id,
            preview: item.attributes.previews[0].url,
            artist: item.attributes.artistName,
            title: item.attributes.name,
            cover_art: item.attributes.artwork.url,
          };

          const route = api.spotify({method: 'song_isrc', payload: {isrc}});
          return await useGET({route, token: accessToken})
            .then(response => {
              const spotifyResponse = response.data.tracks.items[0];

              const spotifyMeta = {
                isrc: spotifyResponse.external_ids.isrc,
                id: spotifyResponse.id,
                preview: spotifyResponse.preview_url,
                artist: spotifyResponse.artists[0].name,
                title: spotifyResponse.name,
                cover_art: spotifyResponse.album.images[0].url,
              };

              if (!spotifyResponse) return;

              return {
                player: 'primary',
                artist: spotifyMeta.artist,
                title: spotifyMeta.title,
                cover_art: spotifyMeta.cover_art,
                isrc,
                web: {
                  spotify: spotifyMeta,
                  apple_music: appleMusicMeta,
                  genius: null,
                  youtube: null,
                  soundcloud: null,
                },
              };
            })
            .catch((err: any) => {
              return {
                player: 'apple_music',
                web: {
                  apple_music: appleMusicMeta,
                },
              };
            });
        }),
      );
      console.log(
        '🚀 ~ file: purgeSeed.ts ~ line 146 ~ handlePurgeSeed ~ purgeAppleMusic',
        purgeAppleMusic,
      );

      const purgeSpotify = await Promise.all(
        topTracks.map(async (item: any) => {
          const spotifyMeta = {
            isrc: item.external_ids.isrc,
            id: item.id,
            preview: item.preview_url,
            artist: item.artists[0].name,
            title: item.name,
            cover_art: item.album.images[0].url,
          };

          return await AppleMusic.getSongWithIsrc(spotifyMeta.isrc)
            .then((item: any) => {
              const serialisedISRC = item;
              const song = JSON.parse(serialisedISRC).data[0];

              const appleMusicMeta = {
                isrc: song.attributes.isrc,
                id: song.attributes.playParams.id,
                preview: song.attributes.previews[0].url,
                artist: song.attributes.artistName,
                title: song.attributes.name,
                cover_art: song.attributes.artwork.url,
              };

              return {
                player: 'primary',
                artist: spotifyMeta.artist,
                title: spotifyMeta.title,
                cover_art: spotifyMeta.cover_art,
                isrc: spotifyMeta.isrc,
                web: {
                  spotify: spotifyMeta,
                  apple_music: appleMusicMeta,
                  genius: null,
                  youtube: null,
                  soundcloud: null,
                },
              };
            })
            .catch((err: any) => {
              return {
                player: 'spotify',
                web: {
                  spotify: spotifyMeta,
                },
              };
            });
        }),
      );

      return [...purgeSpotify, ...purgeAppleMusic];
    case 'spotify':
      const purgeSpotify1 = await Promise.all(
        topTracks.map(async (item: any) => {
          console.log(
            '🚀 ~ file: purgeSeed.ts ~ line 179 ~ topTracks.map ~ item',
            item,
          );
          const spotifyMeta = {
            isrc: item.external_ids.isrc,
            id: item.id,
            preview: item.preview_url,
            artist: item.artists[0].name,
            title: item.name,
            cover_art: item.album.images[0].url,
          };

          return {
            player: 'spotify',
            web: {
              spotify: spotifyMeta,
            },
          };
        }),
      );
      return [...purgeSpotify1];
    case 'apple_music':
      const filteredRecs1 = recommendation.filter((item: any) => {
        return !item.attributes.resourceTypes.includes('stations');
      });

      const magicNumbers1 = generate(filteredRecs1);

      const magicNumber1 = magicNumbers1[1];

      const magicSeed1 = filteredRecs1[magicNumber1];

      const appleMusicSeed1 = magicSeed1.relationships.contents.data;

      const recommendationItems1 = await Promise.all(
        appleMusicSeed1.map(async (item: any) => {
          const id = item.id;
          const type = item.type;

          switch (type) {
            case 'albums':
              const album = await AppleMusic.getAlbum(id);

              return album[0];
            case 'playlists':
              const serializedPlaylist = await AppleMusic.getPlaylist(id);
              const playlist = JSON.parse(serializedPlaylist).data[0];
              return playlist;
            default:
              break;
          }
        }),
      );

      const luckyNumbers1 = generate(recommendationItems1);

      const luckyNumber1_1 = luckyNumbers1[0];
      const luckyNumber2_1 = luckyNumbers1[2];

      const recommendationsSlot1 = [
        recommendationItems1[luckyNumber1_1],
        recommendationItems1[luckyNumber2_1],
      ];

      const recommendationsSeed1 = [
        ...recommendationsSlot1[0].relationships.tracks.data,
        ...recommendationsSlot1[1].relationships.tracks.data,
      ];
      console.log(
        '🚀 ~ file: purgeSeed.ts ~ line 270 ~ recommendationsSeed.map ~ recommendationsSeed',
        recommendationsSeed1,
      );
      const purgeAppleMusic1 = await Promise.all(
        recommendationsSeed1.map(async (item: any) => {
          const keys = handleGetState({index: 'keys'});
          const accessToken = keys.spotify.appToken;
          console.log(
            '🚀 ~ file: purgeSeed.ts ~ line 203 ~ recommendationsSeed.map ~ accessToken',
            accessToken,
          );

          const isrc = item.attributes.isrc;
          const appleMusicMeta = {
            isrc: item.attributes.isrc,
            id: item.attributes.playParams.id,
            preview: item.attributes.previews[0].url,
            artist: item.attributes.artistName,
            title: item.attributes.name,
            cover_art: item.attributes.artwork.url,
          };

          const route = api.spotify({method: 'song_isrc', payload: {isrc}});
          return await useGET({route, token: accessToken})
            .then(response => {
              const spotifyResponse = response.data.tracks.items[0];

              const spotifyMeta = {
                isrc: spotifyResponse.external_ids.isrc,
                id: spotifyResponse.id,
                preview: spotifyResponse.preview_url,
                artist: spotifyResponse.artists[0].name,
                title: spotifyResponse.name,
                cover_art: spotifyResponse.album.images[0].url,
              };

              if (!spotifyResponse) return;
              return {
                player: 'apple_music',
                artist: spotifyMeta.artist,
                title: spotifyMeta.title,
                cover_art: spotifyMeta.cover_art,
                isrc,
                web: {
                  spotify: spotifyMeta,
                  apple_music: appleMusicMeta,
                  genius: null,
                  youtube: null,
                  soundcloud: null,
                },
              };
            })
            .catch((err: any) => {
              return {
                player: 'apple_music',
                web: {
                  apple_music: appleMusicMeta,
                },
              };
            });
        }),
      );
      console.log(
        '🚀 ~ file: purgeSeed.ts ~ line 256 ~ handlePurgeSeed ~ purgeAppleMusic1',
        purgeAppleMusic1,
      );

      return [...purgeAppleMusic1];
      break;
  }
};
