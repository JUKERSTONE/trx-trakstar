import React from 'react';
import {View, Text, FlatList, Pressable, ImageBackground} from 'react-native';
import {VHeader, Body, Paragraph} from '../typography';

export const LandingFeatures = ({features}: any) => {
  const renderItem = ({item}: any) => {
    console.log(
      '🚀 ~ file: LandingRecommendations.tsx ~ line 34 ~ renderItem ~ item',
      item,
    );
    // const spotifyData = item.track.spotifyData;

    return (
      <Pressable onPress={() => item.navigation()}>
        <View
          style={{
            justifyContent: 'space-around',
            marginTop: 15,
            marginRight: 10,
            width: 200,
            // height: '100%',
          }}>
          <ImageBackground
            source={{uri: item.image}}
            style={{
              backgroundColor: '#fff',
              borderRadius: 15,
              height: 130,
              // width: '100%',
              justifyContent: 'space-around',
            }}
            imageStyle={{borderRadius: 15}}>
            <View
              style={{
                // marginLeft: 5,
                backgroundColor: '#1a1a1a',
                paddingBottom: 5,
                height: '100%',
                width: '100%',
                opacity: 0.4,
                borderRadius: 15,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <VHeader
                type="four"
                color="#fff"
                text={item.title}
                numberOfLines={3}
                textAlign="center"
              />
            </View>
          </ImageBackground>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={{marginLeft: 20}}>
      <FlatList
        data={features}
        renderItem={renderItem}
        horizontal={true}
        // showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => '' + index}
        listKey="Recomendations"
      />
    </View>
  );
};
