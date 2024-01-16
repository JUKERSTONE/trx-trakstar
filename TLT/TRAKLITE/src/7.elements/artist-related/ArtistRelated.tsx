import React from 'react';
import {
  View,
  FlatList,
  Button,
  ImageBackground,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {VHeader, Caption} from '../typography';
import LinearGradient from 'react-native-linear-gradient';

interface IArtistRelated {
  artistRelated: any;
}

export const ArtistRelated: React.FC<IArtistRelated> = ({artistRelated}) => {
  const renderItem = ({item}: any) => {
    return (
      <Pressable>
        <View style={{justifyContent: 'space-between', margin: 5}}>
          <Image
            source={item.images}
            style={{
              backgroundColor: '#fff',
              borderRadius: 8,
              height: 180,
              width: '100%',
              justifyContent: 'flex-end',
            }}
          />
          <View style={{marginLeft: 5, marginTop: 2}}>
            <VHeader
              type="five"
              color="whitesmoke"
              text={item.name}
              numberOfLines={1}
            />
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    // Within your render function
    <LinearGradient colors={['#1A1A1A', '#1B3926']}>
      <View style={{marginLeft: 15, marginVertical: 10}}>
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
            <Caption type="two" color="white" text={'RELATED ARTISTS...'} />
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
    </LinearGradient>
  );
};
