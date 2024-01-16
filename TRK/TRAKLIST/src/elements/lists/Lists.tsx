import React from 'react';
import {View, Text, Button, SafeAreaView, ImageBackground} from 'react-native';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {
  LandingNewReleaseView,
  LandingTrendingView,
  LandingFeaturesView,
  LandingHeaderView,
  LandingNewsView,
  // ContentSearchView,
} from '../../containers';

export const ListsElement = ({...props}: any) => {
  return (
    <View style={{backgroundColor: '#1a1a1a', flex: 1}}>
      <ParallaxScrollView
        backgroundColor="#1a1a1a"
        contentBackgroundColor="#1a1a1a"
        parallaxHeaderHeight={200}
        stickyHeaderHeight={100}
        renderBackground={() => (
          <ImageBackground
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/poster_mark_black.png?alt=media',
            }}
            style={{
              height: 200,
              padding: 6,
              paddingBottom: 80,
              backgroundColor: '#1A1A1A',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
            // imageStyle = {{borderBottomWidth : 2, borderTopColor : 'yellow'}}
          ></ImageBackground>
        )}
        renderForeground={() => <LandingHeaderView {...props} />}>
        <View>
          <LandingTrendingView {...props} />
          <LandingFeaturesView {...props} />
          <LandingNewReleaseView navigation={props.navigation} />
          <LandingNewsView />
        </View>
      </ParallaxScrollView>
    </View>
  );
};
