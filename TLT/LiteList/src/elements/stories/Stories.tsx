import React from 'react';
import {
  Button,
  SafeAreaView,
  ImageBackground,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
// @ts-ignore
import {TrendingCard} from '../trending-card/TrendingCard';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {VHeader, Body} from '../typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// @ts-ignore
import {CubeNavigationVertical} from 'react-native-3dcube-navigation';
import Video from 'react-native-video';

export const StoriesElement = ({item, ...props}: any) => {
  console.log(
    '🚀 ~ file: Stories.tsx ~ line 18 ~ StoriesElement ~ owner',
    item,
  );
  return (
    <CubeNavigationVertical>
      {/* map stories */}
      {item.map((story: any) => {
        console.log(
          '🚀 ~ file: Stories.tsx ~ line 26 ~ {item.map ~ story',
          story,
        );
        return (
          <View style={{backgroundColor: '#1a1a1a'}}>
            <Video
              source={{uri: story.storyURL}} // Can be a URL or a local file.
              //  ref={(ref) => {
              //    this.player = ref
              //  }}                                      // Store reference
              //  onBuffer={this.onBuffer}                // Callback when remote video is buffering
              //  onError={this.videoError}               // Callback when video cannot be loaded
              style={{
                width: '100%',
                height: Dimensions.get('window').height * 0.82,
              }}
            />
          </View>
        );
      })}
    </CubeNavigationVertical>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
  },
});
