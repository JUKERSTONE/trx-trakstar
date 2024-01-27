import React from 'react';
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  ActivityIndicator,
  Dimensions,
  Button,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import moment from 'moment';
import {Rating, AirbnbRating} from 'react-native-ratings';

export const BeRealElement = ({
  recentlyPlayed,
  currentlyPlaying,
  emotion,
  handleAppend,
  handleSelectEmotion,
  setTRAK,
  TRAKOption,
}: any) => {
  console.log(
    '🚀 ~ file: BeReal.tsx ~ line 28 ~ currentlyPlaying',
    currentlyPlaying,
  );
  console.log('🚀 ~ file: BeReal.tsx ~ line 27 ~ TRAKOption', TRAKOption);
  const _renderItem = ({item, index}: any) => {
    // console.log('🚀 ~ file: BeReal.tsx ~ line 24 ~ BeRealElement ~ item', item);
    return (
      <View style={{height: 150}}>
        <Image
          source={item.track.album.images}
          style={{flex: 1, borderRadius: 20}}
        />
        <View>
          <Text>{item.track.name}</Text>
          <Text>{moment(item.played_at).fromNow()}</Text>
        </View>
      </View>
    );
  };

  if (!TRAKOption) return <View />;

  if (!TRAKOption.isSingle)
    return (
      <SafeAreaView
        style={{
          backgroundColor: '#333333',
          flex: 1,
          alignItems: 'center',
        }}>
        {/* <Text>BE REAL</Text> */}
        <View
          style={{height: 350, marginTop: 30, justifyContent: 'space-between'}}>
          <Carousel
            // ref={c => {
            //   this._carousel = c;
            // }}
            data={recentlyPlayed}
            renderItem={_renderItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={180}
          />

          {/* <Rating
        type="custom"
        // ratingImage={WATER_IMAGE}
        ratingColor="#3498db"
        ratingBackgroundColor="#c8c7c8"
        ratingCount={5}
        imageSize={30}
        onFinishRating={() => null}
      /> */}
          <AirbnbRating
            count={6}
            reviews={['Terrible', 'Bad', 'Meh', 'OK', 'Good', 'Unbelievable']}
            defaultRating={4}
            size={20}
          />

          {/* FLATLISTS */}
          <FlatList
            listKey="TRAK"
            numColumns={2}
            data={emotion}
            style={{alignSelf: 'center'}}
            renderItem={({item, index}) => {
              // const {meta, trak} = item;
              return (
                <TouchableOpacity onPress={() => handleSelectEmotion(item)}>
                  <View
                    style={{
                      margin: 10,
                      backgroundColor: '#fff',
                      padding: 8,
                      borderRadius: 10,
                    }}>
                    <Text style={{color: '#1a1a1a'}}>{item}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => '' + index}
          />
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: '#fff',
              borderRadius: 8,
              paddingHorizontal: 10,
            }}>
            <Button title="submit" onPress={handleAppend} />
          </View>
        </View>
      </SafeAreaView>
    );

  return (
    <View style={{height: 150}}>
      <Image
        source={currentlyPlaying.item.album.images}
        style={{flex: 1, borderRadius: 20}}
      />
      <View>
        <Text>{currentlyPlaying.item.track.name}</Text>
        <Text>{moment(currentlyPlaying.item.played_at).fromNow()}</Text>
      </View>
    </View>
  );
};
