import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useArtistTopTracks} from './useArtistTopTracks';
import {ArtistTopTracks} from '../../elements';
import {useEffectAsync} from '../../app';
import {APIKeys, api, useAPI} from '../../api';

export const ArtistTopTracksContainer = ({
  navigation,
  route,
  topTracks,
  ...props
}: any) => {
  console.log('🚀 ~ file: ArtistTopTracks.tsx:14 ~ topTracks:', topTracks);
  const {...useArtistTopTracksProps} = useArtistTopTracks({
    navigation,
    route,
  });

  const [media, setMedia] = useState<any>(null);
  const {useGET} = useAPI();

  useEffectAsync(async () => {
    const hits = await Promise.all(
      topTracks.map(async (item: any) => {
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
    setMedia(result);
  }, [topTracks]);

  return (
    <ArtistTopTracks
      media={media}
      topTracks={topTracks}
      {...useArtistTopTracksProps}
      {...props}
    />
  );
};
