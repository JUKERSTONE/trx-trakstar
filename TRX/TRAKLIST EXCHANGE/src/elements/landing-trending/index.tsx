import React from 'react';
import {View, Image, FlatList, Pressable} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {VHeader, Body, BHeader, Paragraph, Caption} from '../typography';
import {TrendingCard} from '../trending-card/TrendingCard';

interface TLandingTrending {
  data: any;
}

export const LandingTrending: React.FC<TLandingTrending> = ({
  data,
  trending,
}: any) => {
  console.log('🚀 ~ file: index.tsx ~ line 15 ~ trending', trending);
  return (
    <View style={{marginTop: 10}}>
      {/* <View
        style={{
          alignSelf: 'flex-end',
          justifyContent: 'center',
          marginBottom: 7,
          backgroundColor: 'yellow',
          padding: 10,
          paddingVertical: 15,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{marginRight: 10}}>
          <MaterialIcons name="trending-up" size={30} color={'#1db954'} />
        </View>
        <Caption type="one" color="#1a1a1a" text={'TRENDING ON TRAKLITE.'} />
      </View> */}
      <View
        style={{
          alignSelf: 'flex-end',

          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 8,
          marginBottom: 10,
          // width: '50%',
          backgroundColor: 'yellow',
          padding: 10,
          paddingVertical: 15,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          flexDirection: 'row',
        }}>
        <View
          style={{
            marginRight: 10,
            backgroundColor: '#1a1a1a',
            borderRadius: 20,
            padding: 4,
          }}>
          <MaterialIcons name="trending-up" size={20} color={'#fff'} />
        </View>
        <VHeader type="four" color="#1a1a1a" text={'TRENDING ON TRX.'} />
      </View>
      {/*  */}
      {/* <FlatList
        listKey="Trending"
        data={Object.values(trending)}
        renderItem={({ item }: any) => {
          console.log("🚀 ~ file: index.tsx ~ line 43 ~ item", item); */}
      {/* return ( */}
      <TrendingCard
        rank={trending?.one?.rank}
        artwork={trending?.one?.image}
        title={trending?.one?.title}
        artist={trending?.one?.artist}
        status={trending?.one?.status}
      />
      <TrendingCard
        rank={trending?.two?.rank}
        artwork={trending?.two?.image}
        title={trending?.two?.title}
        artist={trending?.two?.artist}
        status={trending?.two?.status}
      />
      <TrendingCard
        rank={trending?.three?.rank}
        artwork={trending?.three?.image}
        title={trending?.three?.title}
        artist={trending?.three?.artist}
        status={trending?.three?.status}
      />
      {/* ); */}
      {/* }}
        keyExtractor={(item, index) => "" + index}
      /> */}
      {/*  */}

      <View style={{alignItems: 'flex-end', margin: 10}}>
        <VHeader type="five" color="#fff" text={'SEE MORE.'} />
      </View>
    </View>
  );
};
