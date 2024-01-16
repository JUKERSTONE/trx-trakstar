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

export const SponsoredSearchElement = ({
  handleNavigateNext,
  tracks,
  setSearchTerm,
  handleMatchSearchTerm,
  searchTermForm,
  ...props
}: any) => {
  console.log('🚀 ~ file: SponsoredSearch.tsx:23 ~ tracks:', tracks);
  console.log(
    '🚀 ~ file: SponsoredTracks.tsx:17 ~ SponsoredTracksElement ~ props:',
    props,
  );
  return (
    <SafeAreaView>
      <FlatList
        data={tracks}
        style={{height: '60%'}}
        renderItem={({item}: any) => {
          const searchTerms = searchTermForm?.[item.pendingTrackId] || [];
          return (
            <>
              <View style={{flexDirection: 'row', margin: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Image
                    source={{uri: item.result.header_image_thumbnail_url}}
                    style={{height: 35, width: 35, marginRight: 10}}
                  />
                  <View style={{maxWidth: '70%'}}>
                    <Text numberOfLines={2}>{item.result.full_title}</Text>
                  </View>
                </View>

                <View style={{flex: 1}}>
                  <TextInput
                    onChangeText={setSearchTerm}
                    style={{borderWidth: 1, padding: 8, borderRadius: 7}}
                  />
                </View>

                <Button
                  title="ADD"
                  onPress={() => handleMatchSearchTerm(item.pendingTrackId)}
                />
              </View>
              <View>
                {searchTerms.map((item: any) => (
                  <Text>{item}</Text>
                ))}
              </View>
            </>
          );
        }}
      />
      <View style={{height: '25%', borderTopWidth: 2}}>
        {/* <FlatList
          data={selectedTrack}
          renderItem={({item}: any) => (
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
          )}
        /> */}
      </View>
      <Button onPress={handleNavigateNext} title="Next" />
    </SafeAreaView>
  );
};
