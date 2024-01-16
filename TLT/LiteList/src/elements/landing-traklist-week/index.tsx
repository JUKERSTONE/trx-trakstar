import React from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {VHeader, Body, BHeader, Paragraph, Caption} from '../typography';
import {TrendingCard} from '../trending-card/TrendingCard';
import {TRAKCard} from '../trak-card/TRAKCard';
import Carousel from 'react-native-snap-carousel';
import {ActivityIndicator} from 'react-native-paper';

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
      <View
        style={{
          alignItems: 'center',
          marginTop: 8,
          marginBottom: 10,
          // width: '50%',
          // padding: 10,
          paddingVertical: 8,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          flexDirection: 'row',
          marginLeft: 20,
        }}>
        <View
          style={{
            marginRight: 10,
            // backgroundColor: '#1db954',
            borderRadius: 20,
            padding: 4,
          }}>
          <MaterialIcons name="calendar-today" size={18} color={'#FFF'} />
        </View>
        <VHeader type="five" color="#FFF" text={'TRAKLIST OF THE WEEK'} />
      </View>

      {trending ? (
        <Carousel
          data={trending}
          firstItem={!trending.length ? 0 : 3}
          renderItem={({item, index}: any) => (
            <TouchableOpacity
              onPress={() => alert('available on the next release!')}>
              <View
                style={{
                  flexDirection: 'column',
                  marginHorizontal: 10,
                  maxWidth: 120,
                }}>
                <Image
                  source={{uri: item.image}}
                  style={{
                    height: 100,
                    minWidth: 100,
                    maxWidth: 120,
                    borderRadius: 10,
                    backgroundColor: '#cecece',
                  }}
                />
                <View
                  style={{
                    marginTop: 5,
                    paddingHorizontal: 7,
                  }}>
                  <VHeader
                    numberOfLines={1}
                    type="six"
                    color={'#fff'}
                    text={item.title}
                  />
                  <VHeader
                    numberOfLines={1}
                    type="six"
                    color={'#fff'}
                    text={item.artist}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
          sliderWidth={Dimensions.get('screen').width * 1.8}
          itemWidth={100}
        />
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
          }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}

      {/*  */}
      {/* <FlatList
        listKey="Trending"
        data={Object.values(trending)}
        renderItem={({ item }: any) => {
          console.log("🚀 ~ file: index.tsx ~ line 43 ~ item", item); */}
      {/* return (
      <TrendingCard
        rank={trending?.one?.rank}
        artwork={trending?.one?.image}
        title={trending?.one?.title}
        artist={trending?.one?.artist}
        status={trending?.one?.status}
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
