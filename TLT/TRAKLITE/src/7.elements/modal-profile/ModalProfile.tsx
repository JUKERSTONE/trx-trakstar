import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  ImageBackground,
} from 'react-native';
import {UserProfileHeaderView, UserProfileView} from '../../6.containers';
import {Input} from '../../7.elements/input';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {TraklistApp} from '../../6.containers/hooks/traklist-app/TraklistApp';
import axios from 'axios';
import {USER_DETAIL} from '../../1.api';

interface TProfile {
  navigation: any;
  route: any;
}
export const ModalProfile = ({...props}) => {
  const [userProfile, setUserProfile] = useState();
  useEffect(() => {
    console.log(
      '🚀 ~ file: useUserProfile.ts ~ line 5 ~ useUserProfile ~ profile',
      props.profile,
    );
    const {username} = props.profile;

    axios.get(USER_DETAIL(username)).then(response => {
      console.log(
        '🚀 ~ file: useUserProfile.ts ~ line 24 ~ axios.get ~ response',
        response.data,
      );

      setUserProfile(response.data);
    });

    // USER_DETAIL
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#1a1a1a', width: '100%'}}>
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
          <UserProfileHeaderView {...props} />
          <UserProfileView userProfile={userProfile} {...props} />
        </View>
      </ParallaxScrollView>
    </SafeAreaView>
  );
};
