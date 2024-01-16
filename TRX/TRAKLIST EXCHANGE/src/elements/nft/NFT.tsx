import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  useWindowDimensions,
  FlatList,
  Image,
  ScrollView,
  ImageBackground,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {VHeader, Body, Caption, ProductView} from '..';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TabView, TabBar} from 'react-native-tab-view';
import {colors} from '../../core';
import moment from 'moment';

export const NFTElement = ({
  NFT,
  handlePlayNFT,
  handleNavigateBlankDisc,
  handleSeeMoreMeta,
}: any) => {
  console.log('🚀 ~ file: NFT.tsx ~ line 28 ~ NFT', NFT);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'MARKET HISTORY'},
    {key: 'second', title: 'PRODUCT'},
  ]);
  const layout = useWindowDimensions();

  if (NFT == null)
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: layout.height,
        }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );

  return (
    <ParallaxScrollView
      backgroundColor="#cecece"
      contentBackgroundColor="transparent"
      parallaxHeaderHeight={150}
      stickyHeaderHeight={100}
      renderBackground={() => (
        <ImageBackground
          source={{uri: NFT?.nft.trakIMAGE}}
          style={{
            height: 300,
            opacity: 0.4,
            padding: 6,
            paddingBottom: 80,
            backgroundColor: '#1A1A1A',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}></ImageBackground>
      )}
      renderForeground={() => (
        <View
          style={{
            backgroundColor: 'transparent',
            justifyContent: 'center',
            flex: 1,
            padding: 15,
          }}>
          <View
            style={{
              height: 80,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              marginBottom: 10,
            }}>
            <View
              style={{
                justifyContent: 'flex-end',
                marginRight: 20,
                flex: 1,
              }}>
              <Image
                source={{uri: NFT?.nft.trakIMAGE}}
                style={{
                  backgroundColor: '#1B4F26',
                  height: '100%',
                  width: '100%',
                  borderRadius: 10,
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'flex-end',
                maxWidth: '60%',
              }}>
              <VHeader
                numberOfLines={1}
                type="four"
                color={'#1a1a1a'}
                text={NFT?.nft.trakTITLE}
              />
              <Body
                numberOfLines={1}
                type="one"
                color={'#1a1a1a'}
                text={NFT?.nft.trakARTIST}
                textAlign="right"
              />
              <Caption
                numberOfLines={1}
                type="one"
                color={'#1a1a1a'}
                text={NFT?.nft.trakIPO}
                textAlign="right"
              />
              <Caption
                numberOfLines={1}
                type="one"
                color={'#1a1a1a'}
                text={'purchased ' + moment(NFT?.purchasedAt).fromNow()}
                textAlign="right"
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                backgroundColor: '#1a1a1a',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                borderRadius: 5,
                width: '50%',
                paddingHorizontal: 10,
              }}>
              <FontAwesome5
                name={'compact-disc'}
                size={18}
                color={'whitesmoke'}
              />
              <Body
                numberOfLines={1}
                type="two"
                color={'#fff'}
                text={'BECOME A FAN!'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                borderRadius: 5,
                width: 150,
              }}>
              <Pressable
                style={{
                  backgroundColor: '#1a1a1a',
                  padding: 8,
                  borderRadius: 10,
                  marginRight: 10,
                }}>
                <Fontisto name={'spotify'} size={18} color={'whitesmoke'} />
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: '#1a1a1a',
                  padding: 8,
                  borderRadius: 10,
                }}>
                <Fontisto name={'applemusic'} size={18} color={'whitesmoke'} />
              </Pressable>
              <Pressable
                onPress={() =>
                  handlePlayNFT({
                    type: 'source',
                    uri: NFT?.nft.trakAUDIO,
                    url: NFT?.nft.trakIMAGE,
                    artist: NFT?.nft.trakARTIST,
                    title: NFT?.nft.trakTITLE,
                  })
                }
                style={{
                  backgroundColor: '#1a1a1a',
                  padding: 8,
                  borderRadius: 10,
                  marginLeft: 10,
                }}>
                <Body
                  numberOfLines={1}
                  type="two"
                  color={'#fff'}
                  text={'PLAY'}
                />
              </Pressable>
            </View>
          </View>
        </View>
      )}>
      <TabView
        navigationState={{index, routes}}
        style={{backgroundColor: '#1d995F', height: layout.height}}
        renderScene={({route}) => {
          switch (route.key) {
            case 'first':
              return <View style={{backgroundColor: 'red', flex: 1}}></View>;
            case 'second':
              return <ProductView products={NFT?.nft.trakPRODUCTS} />;
            default:
              return <View />;
          }
        }}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={{backgroundColor: '#1a1a1a'}}
            renderLabel={({route, focused, color}) => (
              <Text style={{color, fontSize: 15, fontWeight: 'bold'}}>
                {route.title}
              </Text>
            )}
            indicatorStyle={{backgroundColor: '#fff'}}
          />
        )}
      />
    </ParallaxScrollView>
  );
};
