import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  View,
  Text,
  Button,
  useWindowDimensions,
  FlatList,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Modal,
  SafeAreaView,
  Alert,
  StyleSheet,
  TextInput,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {ProgressBar, Colors} from 'react-native-paper';
import {
  PlayerContext,
  handleQueueControlsAction,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import {VHeader, Body, Caption} from '..';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {TabView, TabBar} from 'react-native-tab-view';
import {colors} from '../../core';
import {SwipeCard} from '../swipe-card';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import * as Animatable from 'react-native-animatable';

export const SwipeElement = ({
  // recommendations,
  handleSetPlayer,
  handleGenerateItems,
  handleLoadRecommendations,
  handleSwipedRight,
  isModalVisible,
  progress,
  handleTRAKInteraction,
  handleNavigationPaywall,
  handleSub,
  setCancelLoading,
  cancelLoading,
  isUnavailable,
  handleQueue,
  setQuery,
  handleReGen,
  query,
}: any) => {
  const player = useSelector((state: any) => state.player);
  const recommendations = player.queue;
  const isAvailable = player.title && player.source.uri;
  console.log(
    '🚀 ~ file: Swipe.tsx ~ line 54 ~  player.title',
    player.title,
    player.source.uri,
    player,
  );
  const {userData, setUserData} = useContext(PlayerContext);
  console.log('🚀 ~ file: Swipe.tsx ~ line 44 ~ userData', userData);
  const swiperRef = userData.swiperRef;
  console.log('🚀 ~ file: Swipe.tsx ~ line 49 ~ swiperRef', swiperRef);

  console.log(
    '🚀 ~ file: Swipe.tsx ~ line 34 ~ recommendations',
    recommendations,
  );
  if (recommendations.length === 0) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1a1a1a',
        }}>
        <LottieView
          source={require('../../core/57276-astronaut-and-music.json')}
          autoPlay
          loop
        />

        <View style={{position: 'absolute', top: 100}}>
          <VHeader
            numberOfLines={1}
            type="four"
            color={'#fff'}
            text={'TAKING TOO LONG?'}
          />
          <TouchableOpacity
            onPress={handleLoadRecommendations}
            style={{marginTop: 5}}>
            <Body
              numberOfLines={1}
              type="one"
              color={'blue'}
              text={'RELOAD'}
              textAlign="center"
            />
          </TouchableOpacity>

          <ProgressBar
            progress={progress}
            color={'#cecece'}
            style={{
              marginTop: 3,
              backgroundColor: 'grey',
              height: 10,
              borderRadius: 10,
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <LinearGradient
      colors={['#232323', '#1A1A1A', '#1a1a1a', '#232323', '#1a1a1a']}
      style={{flex: 1}}>
      <View style={{flex: 4}}>
        <CardStack
          ref={swiperRef}
          secondCardZoom={1.03}
          onSwipedRight={
            () => handleQueue(player.queue[player.index].web.spotify.id)
            // handleTRAKInteraction({type: 'save', player})
          }
          onSwiped={() => {
            const action = handleQueueControlsAction({
              playbackState: 'next',
            });
            store.dispatch(action);
          }}
          renderNoMoreCards={() => (
            <SafeAreaView
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LottieView
                source={require('../../core/57276-astronaut-and-music.json')}
                autoPlay
                loop
              />

              <View
                style={{
                  position: 'absolute',
                  top: 100,
                  backgroundColor: '#fff',
                  padding: 15,
                  borderRadius: 8,
                  opacity: 0.8,
                }}>
                <VHeader
                  numberOfLines={1}
                  type="four"
                  color={'green'}
                  text={'HAVING FUN?'}
                />
                <TouchableOpacity
                  onPress={handleLoadRecommendations}
                  style={{marginTop: 5}}>
                  <Body
                    numberOfLines={1}
                    type="one"
                    color={'blue'}
                    text={'RELOAD'}
                    textAlign="center"
                  />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          )}
          style={{
            height: '100%',
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}>
          {recommendations.map((recommendation: any, index: any) => {
            return (
              <Card
                style={{
                  width: Dimensions.get('window').width,
                }}>
                <SwipeCard
                  handleNavigateTrack={() => alert(1)}
                  recommendation={recommendation}
                  recommendations={recommendations}
                  index={index}
                  handleSetPlayer={handleSetPlayer}
                  size={recommendations.length - 1}
                  handleLoadRecommendations={handleLoadRecommendations}
                  handleNavigationPaywall={handleNavigationPaywall}
                />
              </Card>
            );
          })}
        </CardStack>
      </View>
      <View
        style={{
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'flex-end',
          height: 50,
        }}>
        <TouchableOpacity
          disabled={cancelLoading || !isAvailable}
          onPress={async () => {
            if (isAvailable) {
              await setCancelLoading(true);
              setTimeout(
                async () => await handleTRAKInteraction({type: 'cancel'}),
                1000,
              );
            }
          }}>
          <View
            style={{
              height: 35,
              width: 35,
              backgroundColor: 'red',
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome name="close" size={20} color={'#fff'} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTRAKInteraction({type: 'renew'})}>
          <View
            style={{
              height: 35,
              width: 35,
              backgroundColor: '#fff',
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MaterialIcons name={'autorenew'} size={20} color={'#1a1a1a'} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleTRAKInteraction({type: 'save', player});
          }}>
          <View
            style={{
              height: 35,
              width: 35,
              backgroundColor: '#1db954',
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons name={'heart'} size={20} color={'#fff'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const action = handleMediaPlayerAction({
              playbackState: 'repeat:force',
            });
            store.dispatch(action);

            Alert.alert(`Share or sendd 👻`, `Share to social media or DMs?`, [
              {
                text: 'Cancel',
                onPress: () => {
                  const action = handleMediaPlayerAction({
                    playbackState: 'repeat:force:off',
                  });
                  store.dispatch(action);
                  console.log('Cancel Pressed');
                },
                style: 'cancel',
              },
              {
                text: 'SEND',
                onPress: async () => {
                  handleTRAKInteraction({type: 'send'});
                },
              },
              {
                text: 'SHARE',
                onPress: async () => {
                  const imageBase64 = await RNFetchBlob.config({
                    fileCache: true,
                  })
                    .fetch('GET', player.image.uri)
                    // the image is now dowloaded to device's storage
                    .then(resp => {
                      return resp.readFile('base64');
                    })
                    .catch(err => {
                      console.log(
                        '🚀 ~ file: PostHOC.js ~ line 150 ~ PostHOC ~ err',
                        err,
                      );
                    });
                  const action = handleMediaPlayerAction({
                    playbackState: 'share',
                    imageBase64,
                  });
                  store.dispatch(action);

                  console.log(
                    '🚀 ~ file: Swipe.tsx:300 ~ onPress: ~ imageBase64',
                    imageBase64,
                  );
                },
              },
            ]);
          }}>
          <View
            style={{
              height: 35,
              width: 35,
              backgroundColor: '#a2c',
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MaterialIcons name={'share'} size={18} color={'#fff'} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTRAKInteraction({type: 'fanclub', player})}>
          <View
            style={{
              height: 44,
              width: 44,
              backgroundColor: '#1db954',
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2.5,
              borderColor: '#1a1a1a',
            }}>
            <Image
              // resizeMode="contain"
              resizeMethod="scale"
              source={require('../../core/icon_circle_green.png')}
              style={{
                borderRadius: 8,
                height: 32,
                width: 32,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View
          style={{
            backgroundColor: '#1A1A1A',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: 200,
            height: 100,
            borderRadius: 20,
            top: Dimensions.get('window').height / 2 - 50,
            right: Dimensions.get('window').width / 2 - 100,
            opacity: 0.9,
            flexDirection: 'row',
          }}>
          <VHeader type="four" text="saved to " color="whitesmoke" />
          <MaterialCommunityIcons
            name="spotify"
            size={22}
            color={'whitesmoke'}
          />
        </View>
      </Modal>
    </LinearGradient>
  );
};
