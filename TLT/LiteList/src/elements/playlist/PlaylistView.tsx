import React, {useState} from 'react';
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
  ImageBackground,
} from 'react-native';
import {TrendingCard} from '../trending-card/TrendingCard';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import {VHeader, Body, TrakstarSelect} from '..';
import {APIKeys, api, useAPI} from '../../api';
import {useEffectAsync} from '../../app';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {stripAccentsAndApostrophes} from '../../app/hooks/strip-word/stripWord';

export const PlaylistViewElement = ({
  handleNavigateTRAK,
  handleTRAK,
  handleGenius,
  route,
  handleNavTrak,
  handleLike,
  handleSave,
  handleSavePlaylist,
}: any) => {
  const playlist = route.params.playlist;
  console.log('🚀 ~ file: Seed.tsx ~ line 22 ~ searchResult', playlist);
  const {width, height} = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const {players} = useSelector((state: any) => state.player);
  const [media, setMedia] = useState<any>(null);

  const {useGET} = useAPI();

  useEffectAsync(async () => {
    const hits = await Promise.all(
      playlist.tracks.map(async (item: any) => {
        console.log(
          '🚀 ~ file: Playlist.tsx:41 ~ playlist.tracks.map ~ item:',
          item,
        );
        const route = api.genius({
          method: 'search',
          payload: {query: `${item.artists[0].name} ${item.name}`},
        });

        const accessToken = APIKeys.genius.accessToken;
        const response: any = await useGET({route, token: accessToken});
        console.log(
          '🚀 ~ file: useTRAKTab.ts ~ line 24 ~ handleSearch ~ response',
          response,
        );

        const filteredResults = response.data.response.hits.filter(
          (itemG: any) => {
            console.log(
              '🚀 ~ file: useTRAKTab.ts:101 ~ filteredResults ~ item:',
              itemG,
            );
            // Use regex to check if the item's content includes 'youtube' in its URL
            const trxRegex = new RegExp(
              `^(?!(Genius|Spotify|Apple Music|OVO Sound Radio|Highest To Lowest)).*$`,
              'i',
            );

            const mainTitleRegex = /\(.*?\)|ft\..*$/i;

            const removeZWSP = word => word.replace(/\u200B/g, '');

            const mainTitle = stripAccentsAndApostrophes(
              item.name.replace(mainTitleRegex, '').trim(),
            );

            const zwspRemoved = removeZWSP(mainTitle);

            const referenceWords = zwspRemoved.split(/\s+/);
            const hitWords = itemG.result.title
              .split(/\s+/)
              .map(word => stripAccentsAndApostrophes(word));

            const allWordsPresent = referenceWords.every(word => {
              const isWordPresent = hitWords.includes(word);
              if (!isWordPresent) {
                console.log(
                  `Mismatch: reference word "${word}" not found in hitWords`,
                  hitWords,
                );
              }
              return isWordPresent;
            });

            // Return true if the regex test passes AND all reference words are present in hit title
            return trxRegex.test(itemG.result.artist_names) && allWordsPresent;
          },
        );

        const hit = filteredResults[0];
        console.log(
          '🚀 ~ file: Tape.tsx:41 ~ album.tracks.items.map ~ hit:',
          hit,
        );

        if (!hit) return {};

        const token = APIKeys.genius.accessToken;
        const geniusId = hit.result.id;
        const route1 = api.genius({method: 'songs', payload: {geniusId}});

        const response1 = await Promise.resolve(
          useGET({route: route1, token}).then((res: any) => {
            return {spotifyId: item.id, ...res.data.response.song};
          }),
        );
        console.log(
          '🚀 ~ file: Tape.tsx:49 ~ response1 ~ response1:',
          response1,
        );

        return await response1;
      }),
    );

    console.log('🚀 ~ file: Playlist.tsx:100 ~ useEffectAsync ~ hits:', hits);
    const result = hits.filter((item: any) => item.provider !== 'youtube');

    console.log(
      '🚀 ~ file: Tape.tsx:67 ~ album.tracks.items.map ~ result:',
      result,
    );
    console.log('🚀 ~ file: Tape.tsx:44 ~ hits ~ hits:', hits);

    console.log('🚀 ~ file: Tape.tsx:fefe76 ~ useEffectAsync ~ hits:', hits);
    setMedia(result);
  }, []);

  console.log(
    '🚀 ~ file: Playlist.tsx:180 ~ playlist.tracks:',
    playlist.tracks,
  );

  return (
    <ParallaxScrollView
      backgroundColor="#1a1a1a"
      // contentBackgroundColor={colors ? colors.primary : '#fff'}
      contentBackgroundColor={'#1a1a1a'}
      parallaxHeaderHeight={300}
      stickyHeaderHeight={100}
      renderBackground={() => (
        <ImageBackground
          source={{uri: playlist.images}}
          style={{
            height: 300,
            padding: 6,
            paddingBottom: 80,
            backgroundColor: '#1A1A1A',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}></ImageBackground>
      )}
      // renderForeground={() => (

      // )}
    >
      <FlatList
        data={playlist.tracks}
        style={{height: '100%'}}
        renderItem={({item, index}: any) => {
          console.log('🚀 ~ file: Profile.tsx ~ line 305 ~ item', item);
          // const isTrak = item.track.id;
          const trak = media?.find((item1: any) => item1.spotifyId === item.id);

          switch (!!trak) {
            case true:
              return (
                <TrakstarSelect
                  // rank={++index}
                  artwork={trak.song_art_image_url}
                  artist={trak.artist_names}
                  title={trak.title}
                  isDynamic
                  colors={{
                    background:
                      players.youtube.title === trak.title ? '#1db954' : '#fff',
                  }}
                  status={'same'}
                  handleGenius={() => handleGenius({result: trak})}
                  height={50}
                  onPress={() => handleTRAK(trak, media, index)}
                  isProfile
                  isTrack
                  isTRX={false}
                />
              );
            default:
              return (
                <TrakstarSelect
                  artwork={item.album.images[0].url}
                  title={item.name}
                  artist={item.artists[0].name}
                  isDynamic
                  colors={{
                    background:
                      players.youtube.title === item.title ? '#1db954' : '#fff',
                  }}
                  isTrack
                  status={'same'}
                  handleGenius={() => handleGenius({result: item})}
                  height={50}
                  onPress={() =>
                    handleNavigateTRAK({
                      ...item,
                      cover_art: playlist.images[0].url,
                    })
                  }
                  isProfile
                  isTRX
                />
              );
          }
        }}
        keyExtractor={(item, index) => '' + index}
      />
    </ParallaxScrollView>
  );
};
