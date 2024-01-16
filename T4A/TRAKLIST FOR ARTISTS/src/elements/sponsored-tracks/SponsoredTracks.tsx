import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Pressable,
  ImageBackground,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';

export const SponsoredTracksElement = ({
  handleNavigateNext,
  query,
  setQuery,
  results,
  handlePickTrack,
  selectedTrack,
  genres,
  selectedGenre,
  setSelectedGenre,
  selectedTrackWithGenre,
  ...props
}: any) => {
  console.log(
    '🚀 ~ file: SponsoredTracks.tsx:30 ~ selectedTrackWithGenre:',
    selectedTrackWithGenre,
  );
  console.log('🚀 ~ file: SponsoredTracks.tsx:29 ~ genres:', genres);
  console.log(
    '🚀 ~ file: SponsoredTracks.tsx:17 ~ SponsoredTracksElement ~ props:',
    props,
  );
  return (
    <SafeAreaView>
      <TextInput
        style={{margin: 10, borderWidth: 2, borderRadius: 8, padding: 10}}
        placeholder="Search TRX"
        onChangeText={setQuery}
        value={query}
      />
      <View>
        <FlatList
          data={results}
          style={{height: '50%'}}
          renderItem={({item}: any) => (
            <Pressable onPress={() => handlePickTrack(item)}>
              <View
                style={{
                  flexDirection: 'row',
                  margin: 8,
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: item.result.header_image_thumbnail_url}}
                  style={{height: 35, width: 35, marginRight: 10}}
                />
                <View>
                  <Text>{item.result.full_title}</Text>
                </View>
              </View>
            </Pressable>
          )}
        />
        <View
          style={{
            height: '35%',
            borderTopWidth: 1,
            borderTopColor: 'gold',
            backgroundColor: '#232323',
          }}>
          <FlatList
            data={selectedTrack}
            renderItem={({item, index}: any) => (
              <View
                style={{
                  flexDirection: 'row',
                  margin: 10,
                  height: 50,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    margin: 8,
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Text style={{marginRight: 15, color: '#fff'}}>
                    {++index}
                  </Text>
                  <Image
                    source={{uri: item.result.header_image_thumbnail_url}}
                    style={{
                      height: 35,
                      width: 35,
                      marginRight: 10,
                      borderRadius: 5,
                    }}
                  />
                  <View style={{flex: 1}}>
                    <Text style={{color: '#fff'}} numberOfLines={2}>
                      {item.result.full_title}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      <Button onPress={handleNavigateNext} title="Next" />
    </SafeAreaView>
  );
};
