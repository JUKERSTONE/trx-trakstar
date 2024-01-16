import React from 'react';
import {
  View,
  FlatList,
  Button,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {VHeader, Caption} from '../typography';
import LinearGradient from 'react-native-linear-gradient';

interface IArtistRelated {
  artistRelated: any;
  colors: any;
  handleArtistNavigation: any;
}

export const ArtistRelated: React.FC<IArtistRelated> = ({
  artistRelated,
  colors,
  handleArtistNavigation,
}) => {
  // console.log('🚀 ~ file: ArtistRelated.tsx ~ line 23 ~ colors', colors);
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity onPress={() => handleArtistNavigation(item)}>
        <View style={{justifyContent: 'space-between', margin: 5}}>
          <Image
            source={item.images}
            style={{
              backgroundColor: '#fff',
              borderRadius: 8,
              height: 250,
              width: '100%',
              minWidth: 170,
              justifyContent: 'flex-end',
            }}
          />
          <View style={{marginLeft: 5, marginTop: 2}}>
            <VHeader
              type="four"
              color={colors ? colors.background : '#fff'}
              text={item.name}
              numberOfLines={1}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    // Within your render function
    // <LinearGradient colors={[colors.background, colors.background]}>
    <View
      style={{
        marginLeft: 15,
        marginVertical: 10,
        backgroundColor: colors ? colors.primary : '#fff',
      }}>
      <View
        style={{
          justifyContent: 'center',
          marginTop: 5,
        }}>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginRight: 15,
            marginBottom: 5,
          }}>
          <Caption
            type="one"
            color={colors ? colors.background : '#fff'}
            text={'RELATED ARTISTS...'}
          />
        </View>
        <FlatList
          data={artistRelated}
          renderItem={renderItem}
          horizontal={true}
          // showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => '' + index}
          listKey="Recomendations"
        />
      </View>
    </View>
    // </LinearGradient>
  );
};
