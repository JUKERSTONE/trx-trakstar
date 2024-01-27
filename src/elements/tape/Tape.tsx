import React, {useEffect, useState} from 'react';
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

import {VHeader, Body, TrakstarSelect} from '..';
import {APIKeys, api, useAPI} from '../../api';
import {useEffectAsync} from '../../app';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';

export const TapeElement = ({
  item: album,
  handleNavigateTRAK,
  handleTRAK,
  handleGenius,
}: any) => {
  const {width, height} = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [media, setMedia] = useState<any>(null);
  const {useGET} = useAPI();
  const {players} = useSelector((state: any) => state.player);

  useEffectAsync(async () => {
    const hits = await Promise.all(
      album.tracks.items.map(async (item: any) => {
        const route = api.genius({
          method: 'search',
          payload: {query: `${item.name} ${item.artists[0].name}`},
        });

        const accessToken = APIKeys.genius.accessToken;
        const response: any = await useGET({route, token: accessToken});

        // filter response.data.response.hits

        const filteredResults = response.data.response.hits.filter(
          (itemG: any) => {
            // Use regex to check if the item's content includes 'youtube' in its URL
            const trxRegex = new RegExp(
              `^(?!(Genius|${!item.artists[0].name}|Spotify|Apple Music)).*$`,
              'i',
            );
            return trxRegex.test(itemG.result.artist_names);
          },
        );

        const hit = filteredResults[0];

        const token = APIKeys.genius.accessToken;
        const geniusId = hit.result.id;
        const route1 = api.genius({method: 'songs', payload: {geniusId}});

        const response1 = await Promise.resolve(
          useGET({route: route1, token}).then((res: any) => {
            return res.data.response.song;
          }),
        );

        return await response1;
      }),
    );

    const result = hits.filter((item: any) => item.provider !== 'youtube');

    setMedia(result);
  }, []);

  if (media) {
    return (
      <View style={{flex: 1}}>
        <FlatList
          // horizontal
          data={media}
          style={{height: 250}}
          // numColumns={3}
          ListHeaderComponent={() => (
            <Image
              source={album.images}
              style={{
                flex: 1,
                height: 250,
                backgroundColor: '#1db954',
              }}
            />
          )}
          renderItem={({item, index}: any) => {
            console.log('🚀 ~ file: Profile.tsx ~ line 305 ~ item', item);
            return (
              <TrakstarSelect
                // rank={++index}
                artwork={item.song_art_image_url}
                title={item.artist_names}
                artist={item.title}
                isDynamic
                colors={{
                  background:
                    players.youtube.title === item.title ? '#1db954' : '#fff',
                }}
                height={60}
                status={'same'}
                handleGenius={() => handleGenius({result: item})}
                onPress={() => handleTRAK(item, media, index)}
              />
            );
          }}
          keyExtractor={(item, index) => '' + index}
        />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        // horizontal
        data={album.tracks.items}
        style={{height: 250}}
        // numColumns={3}
        ListHeaderComponent={() => (
          <ImageBackground
            source={album.images}
            style={{
              flex: 1,
              height: 250,
              backgroundColor: '#1db954',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              padding: 10,
            }}>
            {!media && <ActivityIndicator color="#1db954" size="large" />}
          </ImageBackground>
        )}
        renderItem={({item, index}: any) => {
          console.log('🚀 ~ file: Profile.tsx ~ line 305 ~ item', item);
          return (
            <TouchableOpacity
              onPress={() =>
                handleNavigateTRAK({...item, cover_art: album.images[0].url})
              }>
              <TrendingCard
                rank={index + 1}
                artwork={album.images[0].url}
                artist={item.name}
                title={item.artists[0].name}
                status={'same'}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => '' + index}
      />
    </View>
  );
};
