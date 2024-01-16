import React, {useState, useContext, useRef} from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {VHeader, Body, Caption} from '../typography';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

export const FeedElement = ({
  refreshing,
  errorLoad,
  handleRefresh,
  handlePlayNow,
}: any) => {
  const {timeline} = useSelector((state: any) => state.feed);
  return (
    <FlatList
      data={timeline}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={errorLoad ? 'red' : '#1db954'}
        />
      }
      renderItem={({item, index}: any) => {
        console.log('🚀 ~ file: Profile.tsx ~ line 251 ~ item', item);
        return (
          <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderColor: '#cecece',
              marginHorizontal: 20,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{marginRight: 20}}>
                <Image
                  style={{height: 50, width: 50, borderRadius: 15}}
                  source={{uri: item.avatar}}
                />
              </View>
              <View style={{width: '70%'}}>
                <View style={{flexDirection: 'row'}}>
                  <VHeader
                    numberOfLines={1}
                    type="five"
                    color={'#fff'}
                    text={item.trakName + ' '}
                  />
                  <VHeader
                    numberOfLines={1}
                    type="six"
                    color={'#fff'}
                    text={'• [ ' + item.trakSymbol + ' ] ± '}
                  />
                  <VHeader
                    numberOfLines={1}
                    type="six"
                    color={'#fff'}
                    text={moment(item.postedAt).fromNow()}
                  />
                </View>
                <View
                  style={{
                    marginTop: 10,
                    marginRight: 10,
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{height: 90, width: 90, borderRadius: 10}}
                    source={{uri: item.track.image}}
                  />
                  <View style={{justifyContent: 'center', marginLeft: 10}}>
                    <VHeader
                      numberOfLines={1}
                      type="six"
                      color={'#fff'}
                      text={item.track.title + ' • '}
                    />
                    <VHeader
                      numberOfLines={1}
                      type="six"
                      color={'#fff'}
                      text={item.track.artist}
                    />
                    <View>
                      {item.track.platform === 'spotify' ? (
                        <MaterialCommunityIcons
                          name="spotify"
                          size={20}
                          color={'#1db954'}
                        />
                      ) : item.track.platform === 'apple_music' ? (
                        <Fontisto
                          name="applemusic"
                          size={15}
                          color={'#fc3c44'}
                        />
                      ) : item.track.platform === 'soundcloud' ? (
                        <FontAwesome
                          name="soundcloud"
                          size={20}
                          color={'#ff7700'}
                        />
                      ) : (
                        <Image
                          style={{height: 18, width: 18, borderRadius: 40}}
                          source={{
                            uri: 'https://p.kindpng.com/picc/s/41-415864_rap-genius-logo-png-transparent-png.png',
                          }}
                        />
                      )}
                    </View>
                  </View>
                </View>
                <View style={{marginVertical: 5}}>
                  <Caption
                    type="two"
                    color={'#fff'}
                    text={'" ' + item.caption + ' "'}
                    textAlign="right"
                  />
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity onPress={() => alert('coming soon')}>
                    <FontAwesome name="comment" size={15} color={'#fff'} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handlePlayNow(item)}>
                    <MaterialIcons
                      name={'play-circle-fill'}
                      size={16.5}
                      color={'#fff'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => alert('coming soon')}>
                    <Ionicons name={'heart'} size={16} color={'#fff'} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => alert('coming soon')}>
                    <MaterialCommunityIcons
                      name={'send-circle'}
                      size={17}
                      color={'#fff'}
                    />
                  </TouchableOpacity>
                </View>
                {/* image, title \ artist */}
              </View>
            </View>
          </View>
        );
      }}
      keyExtractor={(item, index) => '' + index}
    />
  );
};
