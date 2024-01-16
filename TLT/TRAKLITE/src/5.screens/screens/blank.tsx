import React from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
//@ts-ignore
import Onboarding from 'react-native-onboarding-swiper';

export const Blank = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height,
      }}>
      <Onboarding
        pages={[
          {
            backgroundColor: '#1a1a1a',
            image: (
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/Asset%207.png?alt=media',
                }}
              />
            ),
            title: 'welcome to YOUR home of music discovery',
            subtitle: 'find new music, meet new people',
          },
          {
            backgroundColor: '#1a1a1a',
            image: (
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/Asset%207.png?alt=media',
                }}
              />
            ),
            title: 'Authenticate',
            subtitle: 'find new music, meet new people',
          },
          {
            backgroundColor: '#1a1a1a',
            image: (
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/Asset%207.png?alt=media',
                }}
              />
            ),
            title: 'your top artists',
            subtitle: 'find new music, meet new people',
          },
          {
            backgroundColor: '#1a1a1a',
            image: (
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/Asset%207.png?alt=media',
                }}
              />
            ),
            title: 'your top tracks',
            subtitle: 'find new music, meet new people',
          },
        ]}
      />
    </View>
  );
};
