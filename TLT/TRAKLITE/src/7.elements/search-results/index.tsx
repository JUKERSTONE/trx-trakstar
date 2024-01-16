import React from 'react';
import {View, Text, Pressable, FlatList} from 'react-native';
import Card from '../cards/last-played';

interface TResultsProps {
  handleTabChange: any;
  tab: string;
  searchResults: any;
}
export const SearchResults: React.FC<TResultsProps> = ({
  handleTabChange,
  tab,
  searchResults,
}) => {
  let data;

  switch (tab) {
    case 'tracks':
      data = searchResults ? searchResults.tracks : null;
      break;
    case 'albums':
      data = searchResults ? searchResults.albums : null;
      break;
    case 'artists':
      data = searchResults ? searchResults.artists : null;
      break;
    case 'lyrics':
      data = searchResults ? searchResults.lyrics : null;
      break;
    default:
      data = searchResults ? searchResults.tracks : null;
  }

  const renderItem = ({item}: any) => {
    return (
      <Pressable onPress={() => alert('hi')}>
        {tab === 'tracks' && (
          <Card
            title={item.name}
            artist={item.artists[0].name}
            artwork={item.album.images[0].url}
          />
        )}
        {tab === 'albums' && item.album_type != 'single' && (
          <Card
            title={item.name}
            artist={item.artists[0].name}
            artwork={item.images[0].url}
          />
        )}
        {tab === 'artists' && (
          <Card
            title={item.name}
            popularity={item.popularity}
            followers={item.followers.total}
            artwork={item.images[0] ? item.images[0].url : null}
          />
        )}
        {/* {tab === 'lyrics' && (
          <>
            <Text>{item.lyrics_body}</Text>
          </>
        )} */}
      </Pressable>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: '#cecece',
          padding: 10,
        }}>
        <Pressable
          onPress={() => handleTabChange('tracks')}
          style={{
            backgroundColor: tab === 'tracks' ? '#292929' : 'transparent',
            padding: 5,
          }}>
          <Text style={{color: tab === 'tracks' ? '#cecece' : 'black'}}>
            Tracks
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleTabChange('albums')}
          style={{
            backgroundColor: tab === 'albums' ? '#292929' : 'transparent',
            padding: 5,
          }}>
          <Text style={{color: tab === 'albums' ? '#cecece' : 'black'}}>
            Albums
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleTabChange('artists')}
          style={{
            backgroundColor: tab === 'artists' ? '#292929' : 'transparent',
            padding: 5,
          }}>
          <Text style={{color: tab === 'artists' ? '#cecece' : 'black'}}>
            Artists
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleTabChange('lyrics')}
          style={{
            backgroundColor: tab === 'lyrics' ? '#292929' : 'transparent',
            padding: 5,
          }}>
          <Text style={{color: tab === 'lyrics' ? '#cecece' : 'black'}}>
            Lyrics
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleTabChange('posts')}
          style={{
            backgroundColor: tab === 'posts' ? '#292929' : 'transparent',
            padding: 5,
          }}>
          <Text style={{color: tab === 'posts' ? '#cecece' : 'black'}}>
            Posts
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleTabChange('users')}
          style={{
            backgroundColor: tab === 'users' ? '#292929' : 'transparent',
            padding: 5,
          }}>
          <Text style={{color: tab === 'users' ? '#cecece' : 'black'}}>
            Users
          </Text>
        </Pressable>
      </View>
      <View style={{height: '100%'}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};
