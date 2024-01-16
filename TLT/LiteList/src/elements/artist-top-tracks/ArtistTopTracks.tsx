import React, {FC} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {VHeader, BHeader, Body, Caption} from '../typography';
import {TrendingCard} from '../trending-card/TrendingCard';
import {Image} from 'react-native-animatable';
import {TrakstarSelect} from '../trakstar-select';
import {useSelector} from 'react-redux';

interface IAristTopTracks {
  topTracks: any;
  colors: any;
  handleTRAKNavigation: any;
  media: any;
  handleTRAK: any;
  handleGenius: any;
}

export const ArtistTopTracks: FC<IAristTopTracks> = ({
  topTracks,
  colors,
  handleTRAKNavigation,
  media,
  handleTRAK,
  handleGenius,
}) => {
  console.log(
    '🚀 ~ file: ArtistTopTracks.tsx ~ line 14 ~ topTracks',
    topTracks,
  );

  const {
    mode,
    paused,
    muted,
    players,
    repeat,
    source,
    image,
    cover_art,
    uri,
    title,
    artist,
    queue,
    index,
    youtubeId,
    youtubeMinimize,
    isTraklist,
    traklistIndex,
    traklist,
    id,
    isrc,
    hidden,
  } = useSelector((state: any) => state.player);

  if (media) {
    return (
      <View style={{flex: 1}}>
        <FlatList
          // horizontal
          data={media}
          style={{height: 250}}
          // numColumns={3}

          renderItem={({item, index}: any) => {
            console.log('🚀 ~ file: Profile.tsx ~ line 305 ~ item', item);
            return (
              <TrakstarSelect
                // rank={++index}
                artwork={item.song_art_image_url}
                title={item.artist_names}
                artist={item.title}
                isDynamic
                colors={{
                  background:
                    players.youtube.title === item.title ? '#1db954' : '#fff',
                }}
                onPress={() => handleTRAK(item, media, index)}
                status={'same'}
                handleGenius={() => handleGenius({result: item})}
                height={50}
              />
            );
          }}
          keyExtractor={(item, index) => '' + index}
        />
      </View>
    );
  }

  return (
    <View style={{marginBottom: 10}}>
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
          text={'TOP TRACKS.'}
        />
      </View>
      {/*  */}
      <FlatList
        listKey="Trending"
        data={topTracks}
        renderItem={({index, item}) => {
          return (
            <TouchableOpacity onPress={() => handleTRAKNavigation(item)}>
              <TrendingCard
                rank={++index}
                artwork={item.album.images[0].url}
                title={item.name}
                artist={item.artists[0].name}
                isDynamic
                colors={colors ? colors : '#fff'}
                status={'rising'}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => '' + index}
      />
      {/*  */}
      <TouchableOpacity onPress={() => alert('coming soon')}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 8,
            width: '50%',
          }}>
          <VHeader
            type="six"
            color={colors ? colors.detail : '#fff'}
            text={'SEE MORE'}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
