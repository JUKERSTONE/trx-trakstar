import {View, Image} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import {Body, VHeader} from '../typography';

export const TrakMetaView = ({active, item}: any) => {
  return (
    <FlatList
      listKey="TRAK98"
      style={{backgroundColor: '#1a1a1a'}}
      data={item}
      renderItem={({item, index}) => {
        if (item.songs.length == 0) {
          return <View />;
        }
        return (
          <View
            style={{
              borderBottomWidth: 2,
              padding: 10,
            }}>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'white',
                paddingBottom: 5,
                alignItems: 'center',
              }}>
              <Body
                numberOfLines={1}
                type="one"
                color={'#fff'}
                text={item.relationship_type}
              />
            </View>

            <FlatList
              listKey="TRAK3"
              data={item.songs}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      paddingBottom: 10,
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 10,
                        margin: 10,
                      }}
                      source={{uri: item.song_art_image_thumbnail_url}}
                    />
                    <Body type="two" color={'#fff'} text={item.full_title} />
                  </View>
                );
              }}
              keyExtractor={(item, index) => '' + index}
            />
          </View>
        );
      }}
      keyExtractor={(item, index) => '' + index}
    />
  );
};
