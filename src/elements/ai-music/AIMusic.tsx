import React from 'react';
import {
  Button,
  SafeAreaView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
// @ts-ignore
import {TrendingCard} from '../trending-card/TrendingCard';
import {View, Text, Image} from 'react-native';
import {VHeader, Body} from '../typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {TRAKCard} from '../trak-card/TRAKCard';

export const AIMusicElement = ({
  trak,
  metaTRAK,
  handleTRAK,
  modal,
  results,
  item = null,
  TRXProfile,
  originals,
  ...props
}: any) => {
  console.log('🚀 ~ file: TRAKTab.tsx ~ line 24 ~ modal', modal);
  console.log('🚀 ~ file: TRAKTab.tsx ~ line 24 ~ results', results);
  console.log('🚀 ~ file: TRAKTab.tsx ~ line 23 ~ metaTRAK', metaTRAK);
  console.log('🚀 ~ file: TRAKTab.tsx ~ line 14 ~ TRAKTabElement ~ trak', trak);

  const hasTRX = true;

  const artist = modal ? item.artist : null;
  const title = modal ? item.title : null;

  if (trak && metaTRAK) return <View />;

  return (
    <LinearGradient colors={['#1a1a1a', '#000']}>
      <FlatList
        style={{backgroundColor: '#1a1a1a'}}
        scrollEnabled={false}
        data={originals}
        renderItem={({item, index}) => {
          console.log(
            '🚀 ~ file: TRAKTab.tsx ~ line 37 ~ TRAKTabElement ~ item',
            item,
          );

          return (
            <TouchableOpacity
              onPress={() =>
                handleTRAK({
                  trak: {
                    title: item.title,
                    artist: item.bots.artist,
                    trakAUDIO: item.audioUrl,
                    cover_art: item.coverArtUrl,
                    NFTFileName: item.id,
                  },
                })
              }>
              <View style={{flex: 3, flexDirection: 'column'}}>
                <TRAKCard
                  rank={++index}
                  artwork={item.coverArtUrl}
                  title={item.bots.artist}
                  artist={item.title}
                  isDynamic
                  colors={{background: '#fff'}}
                  status={'rising'}
                />
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
      />
    </LinearGradient>
  );
};
