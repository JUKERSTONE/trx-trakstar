import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  ImageBackground,
} from 'react-native';
import {UserProfileHeaderView, UserProfileView} from '../../../6.containers';
import {Input} from '../../../7.elements/input';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {TraklistApp} from '../../../6.containers/hooks/traklist-app/TraklistApp';

interface TProfile {
  navigation: any;
  route: any;
}

export const UserProfile: React.FC<TProfile> = ({navigation, route}) => {
  return (
    <TraklistApp navigation={navigation}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#1a1a1a'}}>
        <ParallaxScrollView
          backgroundColor={'#1a1a1a'}
          // contentBackgroundColor="pink"
          parallaxHeaderHeight={130}
          renderBackground={() => (
            <ImageBackground
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/poster_black.png?alt=media',
              }}
              style={{
                height: 120,
                padding: 6,
                backgroundColor: '#1A1A1A',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}></ImageBackground>
          )}>
          <View>
            <UserProfileHeaderView />
            <UserProfileView />
          </View>
        </ParallaxScrollView>
      </SafeAreaView>
    </TraklistApp>
  );
};
