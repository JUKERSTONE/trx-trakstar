import React, {useState} from 'react';
import {Button, SafeAreaView, ImageBackground, FlatList} from 'react-native';
// @ts-ignore
import {TrendingCard} from '../trending-card/TrendingCard';
import {View, Text, Image, TouchableOpacity} from 'react-native';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// @ts-ignore
import {getColorFromURL} from 'rn-dominant-color';
import {VHeader, BHeader, Body, Caption} from '../typography';
import {ArtistHeader} from '../artist-header';
import {ArtistTopTracks} from '../artist-top-tracks';
import {ArtistAlbums} from '../artist-albums';
import {ArtistRelated} from '../artist-related';
import {handleGetColor} from '../../app';
import {ArtistTopTracksContainer} from '../../containers';
import {ArtistAlbumsContainer} from '../../containers/artist-albums';
import {ArtistRelatedContainer} from '../../containers/artist-related';

export const ArtistView = ({colors, artistData, ...props}: any) => {
  console.log('🚀 ~ file: Artist.tsx ~ line 26 ~ colors', colors);
  console.log(
    '🚀 ~ file: Artist.tsx ~ line 19 ~ ArtistView ~ artist',
    artistData,
  );
  // const [colors, setColors] = useState<any>();

  const {
    artist = [],
    artist_albums = [],
    artist_top_tracks = [],
    artist_related = [],
  } = artistData;

  console.log('🚀 ~ file: Artist.tsx ~ line 33 ~ ArtistView ~ colors', colors);

  if (!colors) return <View />;

  return (
    <ParallaxScrollView
      backgroundColor="#1a1a1a"
      contentBackgroundColor={colors ? colors.primary : '#fff'}
      parallaxHeaderHeight={300}
      stickyHeaderHeight={100}
      renderBackground={() => (
        <ImageBackground
          source={artist.images}
          style={{
            height: 300,
            padding: 6,
            paddingBottom: 80,
            backgroundColor: '#1A1A1A',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}></ImageBackground>
      )}
      renderForeground={() => (
        <ArtistHeader
          colors={colors}
          artist={artist.name}
          artwork={artist.images[0].url}
          title=""
        />
      )}>
      <View
        style={{
          paddingBottom: 300,
          backgroundColor: colors ? colors.primary : '#fff',
        }}>
        <View style={{paddingRight: 15, paddingTop: 15}}>
          <VHeader
            textAlign="right"
            type="three"
            color={colors ? colors.background : '#fff'}
            text={artist.name}
          />
        </View>
        <ArtistTopTracksContainer
          {...props}
          topTracks={artist_top_tracks}
          colors={colors}
        />
        <ArtistAlbumsContainer
          artistAlbums={artist_albums}
          colors={colors}
          {...props}
        />
        <ArtistRelatedContainer
          artistRelated={artist_related}
          colors={colors}
          {...props}
        />
      </View>
    </ParallaxScrollView>
  );
};
