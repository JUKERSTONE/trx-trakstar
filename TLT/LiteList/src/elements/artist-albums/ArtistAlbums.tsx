import React, {FC} from 'react';
import {View, TouchableOpacity, FlatList, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {VHeader, BHeader, Body, Caption} from '../typography';
import {TrendingCard} from '../trending-card/TrendingCard';

interface IArtistAlbum {
  artistAlbums: any;
  colors: any;
  handleTapeNavigation: any;
}

export const ArtistAlbums: FC<IArtistAlbum> = ({
  artistAlbums,
  colors,
  handleTapeNavigation,
  ...props
}) => {
  console.log('🚀 ~ file: ArtistAlbums.tsx ~ line 14 ~ colors', colors);
  console.log(
    '🚀 ~ file: ArtistAlbums.tsx ~ line 13 ~ artistAlbums',
    artistAlbums,
  );
  return (
    <View
      style={{
        marginVertical: 10,
      }}>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingRight: 15,
          marginBottom: 5,
        }}>
        <Caption
          type="one"
          color={colors ? colors.background : '#fff'}
          text={'ALBUMS.'}
        />
      </View>
      <FlatList
        listKey="ArtistAlbums"
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
        numColumns={2}
        data={artistAlbums}
        renderItem={({item}) => {
          console.log('🚀 ~ file: ArtistAlbums.tsx:50 ~ item:', item);
          console.log('🚀 ~ file: ArtistAlbums.tsx ~ line 65 ~ item', item);

          return (
            <TouchableOpacity onPress={() => handleTapeNavigation(item)}>
              <View
                style={{
                  width: 170,
                  margin: 10,
                }}>
                <Image
                  style={{height: 170, width: 170, borderRadius: 8}}
                  source={{uri: item.images[0].url}}
                />
                <View style={{marginTop: 8, alignSelf: 'center'}}>
                  <VHeader
                    type="four"
                    color={colors ? colors.background : '#fff'}
                    text={item.artists[0].name}
                    textAlign="center"
                    numberOfLines={1}
                  />
                  <VHeader
                    type="five"
                    color={colors ? colors.background : '#fff'}
                    text={item.name}
                    textAlign="center"
                    numberOfLines={1}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => '' + index}
      />
    </View>
  );
};
