import {useLITELISTState} from '../../../useLITELISTState';
import {api, useAPI} from '../../../../api';

export const getSeedArray = ({tracks, indicies, state, userCategory}: any) => {
  const {handleGetState} = useLITELISTState();
  const {useGET} = useAPI();

  console.log(
    '🚀 ~ file: getSeedArray.ts ~ line 2 ~ getSeedArray ~ userCategory',
    userCategory,
  );
  console.log(
    '🚀 ~ file: getSeedArray.ts ~ line 2 ~ getSeedArray ~ tracks',
    tracks,
  );
  const feeder: any = [];
  indicies.map(async (number: any, key: any) => {
    if (state) {
      let id;
      switch (userCategory) {
        case 'primary':
          id = tracks[number].web.spotify.id;
          break;
        case 'spotify':
          id = tracks[number].web.spotify.id;
          break;
        case 'apple_music':
          const item = tracks[number];

          if (!item.web.spotify) {
            const keys = handleGetState({index: 'keys'});
            const accessToken = keys.spotify.appToken;

            const apple_music = item.web.apple_music;
            const isrc = apple_music.attributes.isrc;
            const appleMusicMeta = {
              isrc: apple_music.attributes.isrc,
              id: apple_music.attributes.playParams.id,
              preview: apple_music.attributes.previews[0].url,
              artist: apple_music.attributes.artistName,
              title: apple_music.attributes.name,
              cover_art: apple_music.attributes.artwork.url,
            };
            console.log(
              '🚀 ~ file: getSeedArray.ts ~ line 45 ~ indicies.map ~ appleMusicMeta',
              appleMusicMeta,
            );

            const route = api.spotify({method: 'song_isrc', payload: {isrc}});
            const test = await useGET({route, token: accessToken})
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
                console.log(
                  '🚀 ~ file: getSeedArray.ts ~ line 63 ~ indicies.map ~ spotifyMeta',
                  spotifyMeta,
                );

                if (!spotifyResponse)
                  return {
                    player: 'secondary',
                    service: 'apple_music',
                  };
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
                  ...appleMusicMeta,
                };
              });
            console.log(
              '🚀 ~ file: getSeedArray.ts ~ line 46 ~ indicies.map ~ test',
              test,
            );
          } else {
            id = tracks[number].web.spotify.id;
          }
        // const purgeAppleMusic1 =  Promise.all(
      }

      // const id = tracks[number].web.spotify.id
      //   ? tracks[number].web.spotify.id
      //   : tracks[number].apple_music.id;
      feeder.push(id);
      console.log(
        '🚀 ~ file: getSeedArray.ts ~ line 10 ~ indicies.map ~ id',
        id,
      );
    } else feeder.push(tracks[number]);
  });
  return feeder;
};
