import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {VHeader, BHeader, Body} from '../../../7.elements/typography';

export const Welcome = ({navigation}: any) => {
  return (
    <View style={{flex: 1, backgroundColor: '#1a1a1a'}}>
      <ParallaxScrollView
        backgroundColor={'#fff'}
        parallaxHeaderHeight={300}
        stickyHeaderHeight={150}
        renderBackground={() => (
          // <ImageBackground source={track.album.images} style={{height: 300}}>
          <LinearGradient colors={['#1a1a1a', '#000']}>
            <View
              style={{
                height: 300,
                alignItems: 'center',
                justifyContent: 'space-around',
                borderBottomWidth: 1.8,
                borderColor: '#fff',
              }}>
              <Image
                style={{height: 200, width: 300, marginTop: 3, borderRadius: 8}}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/euphoric_man.png?alt=media',
                }}
              />
            </View>
          </LinearGradient>
        )}>
        <View
          style={{
            backgroundColor: '#1a1a1a',
            height: Dimensions.get('window').height,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
              paddingHorizontal: 40,
              paddingVertical: 20,
            }}>
            <View
              style={{
                marginBottom: 25,
                backgroundColor: '#fff',
                opacity: 0.85,
                padding: 10,
                borderRadius: 12,
                width: '100%',
                borderWidth: 2,
                borderColor: '#fff',
              }}>
              <VHeader
                type="three"
                color="#1db954"
                text={'WELCOME TO TRAKLIST.'}
                textAlign="center"
              />
              <Image
                style={{
                  height: 200,
                  width: '100%',
                  marginTop: 8,
                  borderRadius: 15,
                }}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/poster_black.png?alt=media',
                }}
              />
              <View
                style={{
                  marginTop: 8,
                  marginBottom: 13,
                  backgroundColor: '#1db954',
                  padding: 10,
                  borderRadius: 10,
                  width: '100%',
                  borderWidth: 2,
                  borderColor: '#fff',
                }}>
                <VHeader
                  type="four"
                  color="#FFF"
                  text={'1. this app has two purposes'}
                />
              </View>
              <View
                style={{
                  marginBottom: 7,
                  backgroundColor: '#1db954',
                  padding: 10,
                  borderRadius: 10,
                  width: '100%',
                  borderWidth: 2,
                  borderColor: '#fff',
                }}>
                <VHeader
                  type="five"
                  color="#FFF"
                  text={'2. first... to help you find new music'}
                />
              </View>
              <View
                style={{
                  marginBottom: 12,
                  backgroundColor: '#1db954',
                  padding: 10,
                  borderRadius: 10,
                  width: '100%',
                  borderWidth: 2,
                  borderColor: '#fff',
                }}>
                <VHeader
                  type="four"
                  color="#FFF"
                  text={
                    '3. secondly... to help you meet new people via your mutual music interests'
                  }
                />
              </View>
              <View
                style={{
                  marginBottom: 20,
                  backgroundColor: '#1db954',
                  padding: 10,
                  borderRadius: 10,
                  width: '100%',
                  borderWidth: 2,
                  borderColor: '#fff',
                }}>
                <VHeader
                  type="three"
                  color="#FFF"
                  text={
                    '4. to maximize the utility of this app, explore the discover page to save & like tracks that preview well...'
                  }
                />
              </View>
            </View>
            {/* <View style={{borderTopWidth: 3, bor}} /> */}
          </View>
        </View>
      </ParallaxScrollView>
    </View>
  );
};
