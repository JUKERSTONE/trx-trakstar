import React, {FC} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {VHeader, BHeader, Body, Caption} from '../typography';
import {TrendingCard} from '../trending-card/TrendingCard';
import {TouchableHighlight} from 'react-native-gesture-handler';

export const RSSFeedElement = ({handleSourceNavigation}: any) => {
  const categories = [
    {
      source: 'bilboard',
      image:
        'https://yt3.googleusercontent.com/ytc/AGIKgqNSqY3oLb1jdTpvXeMMRe6ALs9CO95ehG0rPMPjjO4=s900-c-k-c0x00ffffff-no-rj',
    },
    {
      source: 'complex',
      image:
        'https://yt3.googleusercontent.com/ytc/AGIKgqM7WDSH9ePxNtFf5MKPjWGdQsBxxJpL--Y020LbTg=s900-c-k-c0x00ffffff-no-rj',
    },
    {
      source: 'pitchfork',
      image:
        'https://yt3.googleusercontent.com/ytc/AGIKgqMopRpwcMg6APXmBC5Ejyt6qhfSPXsU7x6oYMoN9w=s900-c-k-c0x00ffffff-no-rj',
    },
    {
      source: 'hotnewhiphop',
      image:
        'https://yt3.googleusercontent.com/ytc/AGIKgqNAP-7ffrAvbVNVOb-SJ1LAg-1PjF39iMLM3EyH8Kw=s900-c-k-c0x00ffffff-no-rj',
    },
    {
      source: 'officialcharts',
      image:
        'https://yt3.googleusercontent.com/ytc/AGIKgqMpDxN4wpXzHIt-ivnSaLurs7FJIC7aaU7meKXFYA=s900-c-k-c0x00ffffff-no-rj',
    },
    {
      source: 'hypebeast',
      image:
        'https://yt3.googleusercontent.com/ytc/AGIKgqPS3iVfjJqkcLw3fWvlWr5zkaIAHPKOze5Vqwd24Sg=s900-c-k-c0x00ffffff-no-rj',
    },
  ];
  return (
    <View style={{flex: 1}}>
      <FlatList
        numColumns={2}
        data={categories}
        style={{
          flex: 1,
        }}
        scrollEnabled
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
        // numColumns={3}
        renderItem={({item, index}: any) => {
          console.log('🚀 ~ file: Profile.tsx ~ line 251 ~ item', item);
          const type = item.info;
          return (
            <TouchableHighlight
              onPress={() => handleSourceNavigation(item.source)}>
              <Image
                source={{uri: item.image}}
                style={{
                  height: 130,
                  width: 170,
                  backgroundColor: 'red',
                  // margin: 20,
                }}
              />
            </TouchableHighlight>
          );
        }}
        keyExtractor={(item, index) => '' + index}
      />
    </View>
  );
};
