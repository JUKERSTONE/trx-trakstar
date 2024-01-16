import React, {FC} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {VHeader, BHeader, Body, Caption} from '../typography';
import {TrendingCard} from '../trending-card/TrendingCard';

interface IAristTopTracks {
  topTracks: any;
  colors: any;
  handleTRAKNavigation: any;
}

export const ArtistTopTracks: FC<IAristTopTracks> = ({
  topTracks,
  colors,
  handleTRAKNavigation,
}) => {
  console.log(
    '🚀 ~ file: ArtistTopTracks.tsx ~ line 14 ~ topTracks',
    topTracks,
  );
  return (
    <View style={{marginBottom: 10}}>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginRight: 15,
          marginBottom: 5,
        }}>
        <Caption
          type="one"
          color={colors ? colors.background : '#fff'}
          text={'TOP TRACKS.'}
        />
      </View>
      {/*  */}
      <FlatList
        listKey="Trending"
        data={topTracks}
        renderItem={({index, item}) => {
          return (
            <TouchableOpacity onPress={() => handleTRAKNavigation(item)}>
              <TrendingCard
                rank={++index}
                artwork={item.album.images[0].url}
                title={item.name}
                artist={item.artists[0].name}
                isDynamic
                colors={colors ? colors : '#fff'}
                status={'rising'}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => '' + index}
      />
      {/*  */}
      <TouchableOpacity onPress={() => alert('coming soon')}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 8,
            width: '50%',
          }}>
          <VHeader
            type="six"
            color={colors ? colors.detail : '#fff'}
            text={'SEE MORE'}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
