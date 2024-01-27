import React from 'react';
import {
  View,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Dimensions,
} from 'react-native';
import {VHeader, Caption, BHeader, Paragraph} from '../typography';
import LinearGradient from 'react-native-linear-gradient';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-snap-carousel';
import {useSelector} from 'react-redux';

export const LandingPlaylists = ({handleTRAKNavigation}: any) => {
  const {TRX} = useSelector((state: any) => state.profile);
  const serializedPlaylists = TRX.playlists;

  const playlists = serializedPlaylists
    ? JSON.parse(serializedPlaylists).filter((item: any) => item.images.length)
    : [];
  console.log(
    '🚀 ~ file: index.tsx:25 ~ LandingPlaylists ~ playlists:',
    playlists,
  );

  dayjs.extend(relativeTime);

  const renderItem = ({item, index}: any) => {
    switch (item.info) {
      case 'playlists:spotify':
        return (
          <View style={{marginRight: 10, flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => handleTRAKNavigation(item)}>
              <View
                style={{
                  flexDirection: 'column',
                  maxWidth: 120,
                }}>
                <Image
                  source={{uri: item.images[0]?.url}}
                  style={{
                    height: 100,
                    minWidth: 100,
                    maxWidth: 120,
                    borderRadius: 10,
                    backgroundColor: '#cecece',
                  }}
                />
                <View
                  style={{
                    marginTop: 5,
                    paddingHorizontal: 7,
                  }}>
                  <VHeader
                    numberOfLines={1}
                    type="six"
                    color={'#fff'}
                    text={item.name}
                  />
                  <VHeader
                    numberOfLines={1}
                    type="six"
                    color={'#fff'}
                    text={TRX.trak_name ?? item.owner.display_name}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      case 'playlists:apple_music':
        console.log(item, 'vrewhe');
        return (
          <View style={{marginRight: 10, flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => handleTRAKNavigation(item)}>
              <View
                style={{
                  flexDirection: 'column',
                  maxWidth: 120,
                }}>
                <Image
                  source={{uri: item.attributes.artwork?.url}}
                  style={{
                    height: 100,
                    minWidth: 100,
                    maxWidth: 120,
                    borderRadius: 10,
                    backgroundColor: '#cecece',
                  }}
                />
                <View
                  style={{
                    marginTop: 5,
                    paddingHorizontal: 7,
                  }}>
                  <VHeader
                    numberOfLines={1}
                    type="six"
                    color={'#fff'}
                    text={item.attributes.name}
                  />
                  {/* <VHeader
                numberOfLines={1}
                type="six"
                color={'#fff'}
                text={item.name}
              /> */}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      default:
        return (
          <View
            style={{
              backgroundColor: '#ff7700',
              margin: 10,
              width: 150,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* <Text>fe</Text> */}
          </View>
        );
    }
  };
  return (
    // Within your render function
    // <LinearGradient colors={['#1A1A1A', '#1B3926']}>
    <View style={{marginLeft: 20, marginTop: 10}}>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignSelf: 'flex-start',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 8,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            flexDirection: 'row',
          }}>
          <View
            style={{
              marginRight: 10,
              // backgroundColor: '#1db954',
              borderRadius: 20,
              padding: 4,
            }}>
            <MaterialIcons name="playlist-add" size={18} color={'#FFF'} />
          </View>
          <VHeader type="five" color="#FFF" text={'YOUR TRAKLISTS.'} />
        </View>

        {playlists ? (
          <Carousel
            data={playlists}
            renderItem={renderItem}
            sliderWidth={Dimensions.get('screen').width * 1.6}
            itemWidth={150}
          />
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 20,
            }}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )}
      </View>
    </View>
    // </LinearGradient>
  );
};
