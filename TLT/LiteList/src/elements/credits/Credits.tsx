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

export const CreditsElement = ({
  item,
  writer_artists,
  producer_artists,
  custom_performances,
  handleGenius,
  ...props
}: any) => {
  console.log('🚀 ~ file: Credits.tsx ~ line 10 ~ CreditsElement ~ item', item);

  return (
    <View style={{flex: 1}}>
      <FlatList
        scrollEnabled={false}
        listKey="TRAK98"
        style={{backgroundColor: '#1a1a1a'}}
        data={item}
        ListHeaderComponent={() => (
          <View style={{padding: 10, marginTop: 10}}>
            {writer_artists.length !== 0 && (
              <View
                style={{
                  // borderBottomWidth: 1,
                  borderBottomColor: 'white',
                  padding: 5,
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  marginBottom: 5,
                }}>
                <Body
                  numberOfLines={1}
                  type="two"
                  color={'#1a1a1a'}
                  text={'WRITER(S)'}
                />
              </View>
            )}
            <FlatList
              scrollEnabled={false}
              horizontal
              listKey="TRAK5"
              style={{marginTop: 5}}
              data={writer_artists}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity onPress={() => handleGenius(item)}>
                    <View
                      style={{
                        marginRight: 10,
                        // maxWidth: 400,
                        // alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          height: 60,
                          width: '100%',
                          borderRadius: 10,
                        }}
                        source={{uri: item.image_url}}
                      />
                      <View
                        style={{
                          // borderBottomWidth: 1,
                          borderBottomColor: 'white',
                          padding: 3,
                          alignItems: 'center',
                          backgroundColor: '#fff',
                          borderRadius: 5,
                          marginVertical: 6,
                          paddingHorizontal: 8,
                        }}>
                        <Body
                          numberOfLines={1}
                          type="two"
                          color={'#1a1a1a'}
                          text={item.name}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => '' + index}
            />
            <View style={{marginTop: 10}}>
              {producer_artists.length !== 0 && (
                <View
                  style={{
                    // borderBottomWidth: 1,
                    borderBottomColor: 'white',
                    padding: 5,
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    marginBottom: 5,
                  }}>
                  <Body
                    numberOfLines={1}
                    type="two"
                    color={'#1A1A1A'}
                    text={'PRODUCER(S)'}
                  />
                </View>
              )}
              <FlatList
                scrollEnabled={false}
                horizontal
                listKey="TRAK5"
                style={{marginTop: 5}}
                data={producer_artists}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity onPress={() => handleGenius(item)}>
                      <View
                        style={{
                          marginRight: 10,
                          // maxWidth: 400,
                          // alignItems: 'center',
                        }}>
                        <Image
                          style={{
                            height: 60,
                            width: '100%',
                            borderRadius: 10,
                          }}
                          source={{uri: item.image_url}}
                        />
                        <View
                          style={{
                            // borderBottomWidth: 1,
                            borderBottomColor: 'white',
                            padding: 3,
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            marginVertical: 5,
                            paddingHorizontal: 8,
                          }}>
                          <Body
                            numberOfLines={1}
                            type="two"
                            color={'#1a1a1a'}
                            text={item.name}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => '' + index}
              />
            </View>
          </View>
        )}
        renderItem={({item, index}) => {
          console.log(
            '🚀 ~ file: Credits.tsx ~ line 18 ~ CreditsElement ~ item',
            item,
          );
          if (item.songs.length == 0) {
            return <View />;
          }
          return (
            <View
              style={{
                // borderBottomWidth: 2,
                padding: 10,
              }}>
              <View
                style={{
                  // borderBottomWidth: 1,
                  borderBottomColor: 'white',
                  padding: 5,
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderRadius: 8,
                }}>
                <Body
                  numberOfLines={1}
                  type="one"
                  color={'#1a1a1a'}
                  text={item.relationship_type}
                />
              </View>

              <FlatList
                listKey="TRAK3"
                horizontal
                data={item.songs}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity onPress={() => handleGenius(item)}>
                      <View
                        style={{
                          margin: 10,
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
                        <Body
                          type="two"
                          color={'#fff'}
                          text={item.full_title}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => '' + index}
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => '' + index}
      />
    </View>
  );
};
