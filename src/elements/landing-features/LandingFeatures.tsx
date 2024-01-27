import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {VHeader, Body, Paragraph} from '../typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const LandingFeatures = ({features}: any) => {
  const renderItem = ({item}: any) => {
    console.log(
      '🚀 ~ file: LandingRecommendations.tsx ~ line 34 ~ renderItem ~ item',
      item,
    );
    // const spotifyData = item.track.spotifyData;

    return (
      <TouchableOpacity onPress={() => item.navigation()}>
        <View
          style={{
            justifyContent: 'space-around',
            marginTop: 15,
            marginRight: 10,
            width: 250,
            // height: '100%',
          }}>
          <ImageBackground
            source={{uri: item.image}}
            style={{
              backgroundColor: '#fff',
              borderRadius: 15,
              height: 170,
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
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <TouchableOpacity onPress={() => alert('coming soon')}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 8,
            width: '50%',
            backgroundColor: '#1db954',
            padding: 10,
            paddingVertical: 15,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            flexDirection: 'row',
          }}>
          <View
            style={{
              marginRight: 10,
              backgroundColor: '#fff',
              borderRadius: 20,
              padding: 4,
            }}>
            <MaterialIcons name="trending-up" size={20} color={'#1db954'} />
          </View>
          <VHeader type="four" color="#fff" text={'FEATURES.'} />
        </View>
      </TouchableOpacity>
      <FlatList
        data={features}
        style={{marginLeft: 20}}
        renderItem={renderItem}
        horizontal={true}
        // showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => '' + index}
        listKey="Recomendations"
      />
    </View>
  );
};
