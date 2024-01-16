import React, {FC} from 'react';
import {View, Pressable, FlatList} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {VHeader, BHeader, Body, Caption} from '../../7.elements/typography';
import {TrendingCard} from '../../7.elements/trending-card/TrendingCard';

interface IAristTopTracks {
  topTracks: any;
}

export const ArtistTopTracks: FC<IAristTopTracks> = ({topTracks}) => {
  return (
    <View style={{marginVertical: 10}}>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginRight: 15,
          marginBottom: 5,
        }}>
        <Caption type="one" color="yellow" text={'TOP TRACKS.'} />
      </View>
      {/*  */}
      <FlatList
        listKey="Trending"
        data={topTracks}
        renderItem={({index, item}) => {
          return (
            <TrendingCard
              rank={++index}
              artwork={item.album.images[0].url}
              title={item.name}
              artist={item.artists[0].name}
              // status={item.status}
            />
          );
        }}
        keyExtractor={(item, index) => '' + index}
      />
      {/*  */}
      <Pressable onPress={() => alert('coming soon')}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 8,
            width: '50%',
          }}>
          <VHeader type="six" color="#1db954" text={'SEE MORE'} />
        </View>
      </Pressable>
    </View>
  );
};
