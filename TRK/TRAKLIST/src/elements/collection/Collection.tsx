import React from 'react';
import {
  View,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import {VHeader, BHeader, Body, Caption} from '..';
import LinearGradient from 'react-native-linear-gradient';
import {NewsCard} from '../news-card';
import {SafeAreaView} from 'react-native-safe-area-context';

export const CollectionElement = ({handlePlayPiP, route, ...props}: any) => {
  const collection = route.params.collection;

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={collection.items}
        style={{height: 200}}
        // numColumns={3}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={onRefresh}
        //     tintColor={errorLoad ? 'red' : '#fff'}
        //   />
        // }
        renderItem={({item, index}: any) => {
          console.log('🚀 ~ file: Profile.tsx ~ line 251 ~ item', item);
          const type = item.info;
          return (
            <TouchableOpacity
              style={{margin: 5, backgroundColor: '#fff'}}
              onPress={() => handlePlayPiP(item)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <Image
                    source={{uri: item.cover_art}}
                    style={{height: 100, width: 100, marginRight: 20}}
                  />
                </View>
                <View style={{maxWidth: '63%'}}>
                  <Text>{item.title}</Text>
                  <Text>{item.artist}</Text>
                </View>
                {/* <View
                style={{
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <TouchableOpacity onPress={() => handleRemoveRequest(item)}>
                  <MaterialIcons name="close" size={25} color={'red'} />
                </TouchableOpacity>
              </View> */}
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => '' + index}
      />
    </SafeAreaView>
  );
};
