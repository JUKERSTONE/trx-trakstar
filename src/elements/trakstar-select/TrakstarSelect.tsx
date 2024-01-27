import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ImageBackground,
  Platform,
} from 'react-native';
import {VHeader, Body, BHeader, Caption, Paragraph} from '../typography';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
// import {number} from '@storybook/addon-knobs';
import * as Progress from 'react-native-progress';
import RNFetchBlob from 'rn-fetch-blob';
import {MenuView} from '@react-native-menu/menu';

interface TrendingCardProps {
  rank?: number;
  artwork: string;
  title: string;
  artist: string;
  detail1?: string;
  detail2?: string;
  status?: 'same' | 'rising' | 'falling';
  handleDetail1?: any;
  handleDetail2?: any;
  isDynamic?: any;
  colors?: any;
  hasLiked?: any;
  trak?: any;
  backgroundColor?: any;
  nolTitle?: any;
  nolArtist?: any;
  width?: any;
  height?: any;
  handleGenius?: any;
  handleLike?: any;
  likes?: any;
  isTRX?: any;
  isProfile?: boolean;
  hasDownload?: boolean;
  handleDownload?: any;
  isDownloading?: any;
  isDownloaded?: any;
  onPress?: any;
  isLiked?: boolean;
  isTrack?: boolean;
  isArtist?: boolean;
  isAlbum?: boolean;
  isPlaylist?: boolean;
  onSave?: any;
}

export const TrakstarSelect: React.FC<TrendingCardProps> = ({
  rank,
  artwork,
  title,
  artist,
  status,
  detail1,
  handleDetail1,
  handleDetail2,
  isDynamic,
  colors,
  hasLiked,
  backgroundColor,
  trak,
  nolTitle = 2,
  nolArtist = 2,
  width = 70,
  height = '100%',
  detail2,
  handleGenius,
  handleLike,
  likes,
  isTRX,
  isProfile,
  hasDownload,
  handleDownload,
  isDownloading,
  isDownloaded,
  onPress,
  isLiked,
  isTrack,
  isArtist,
  isAlbum,
  isPlaylist,
  onSave,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor,
        marginVertical: 5,
        borderRadius: 5,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 20,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: 40,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <MenuView
            title="TRAKSTAR OPTIONS"
            onPressAction={async ({nativeEvent}) => {
              console.log(
                '🚀 ~ file: TRAKLISTradio.tsx:800 ~ TRAKLISTradioElement ~ nativeEvent:',
                nativeEvent,
              );
              console.warn(JSON.stringify(nativeEvent));

              switch (nativeEvent.event) {
                case 'PiP':
                  onPress();
                  break;
                case 'info':
                  handleGenius();
                  break;
                case 'like':
                  handleLike();
                  break;
                case 'view':
                  onPress();
                  break;
                case 'save-playlist':
                  onSave({type: 'save-playlist'});
                  break;
                case 'save-album':
                  onSave({type: 'save-album'});
                  break;
                default:
                  break;
              }
            }}
            actions={
              isTrack
                ? [
                    {
                      id: 'PiP',
                      title: 'Play',
                      titleColor: '#46F289',
                      subtitle: 'Share action on SNS',
                      image: Platform.select({
                        ios: 'pip.swap',
                        android: 'ic_menu_share',
                      }),
                      imageColor: '#1a1a1a',
                      // state: 'on',
                    },
                    {
                      id: 'info',
                      title: 'Community Notes',
                      image: Platform.select({
                        ios: 'cursor.rays',
                        android: 'ic_menu_delete',
                      }),
                      imageColor: '#fff',
                    },
                    {
                      id: 'like',
                      title: 'Like',
                      image: Platform.select({
                        ios: 'heart',
                        android: 'ic_menu_delete',
                      }),
                      imageColor: '#1db94a',
                    },
                  ]
                : isAlbum
                ? [
                    {
                      id: 'view',
                      title: 'View',
                      titleColor: '#46F289',
                      subtitle: 'Share action on SNS',
                      image: Platform.select({
                        ios: 'eye',
                        android: 'ic_menu_share',
                      }),
                      imageColor: '#1a1a1a',
                      // state: 'on',
                    },
                    {
                      id: 'save-album',
                      title: 'Save',
                      titleColor: '#46F289',
                      subtitle: 'Save this album',
                      image: Platform.select({
                        ios: 'heart.fill',
                        android: 'ic_menu_share',
                      }),
                      imageColor: '#1db54a',
                      // state: 'on',
                    },
                  ]
                : isPlaylist
                ? [
                    {
                      id: 'view',
                      title: 'View',
                      titleColor: '#46F289',
                      subtitle: 'Share action on SNS',
                      image: Platform.select({
                        ios: 'eye',
                        android: 'ic_menu_share',
                      }),
                      imageColor: '#1a1a1a',
                      // state: 'on',
                    },
                    {
                      id: 'save-playlist',
                      title: 'Save',
                      titleColor: '#46F289',
                      subtitle: 'Save this playlist',
                      image: Platform.select({
                        ios: 'heart.fill',
                        android: 'ic_menu_share',
                      }),
                      imageColor: '#1db54a',
                      // state: 'on',
                    },
                  ]
                : [
                    {
                      id: 'view',
                      title: 'View',
                      titleColor: '#46F289',
                      subtitle: 'Share action on SNS',
                      image: Platform.select({
                        ios: 'eye',
                        android: 'ic_menu_share',
                      }),
                      imageColor: '#1a1a1a',
                      // state: 'on',
                    },
                  ]
            }>
            <MaterialCommunityIcons
              name={'dots-vertical'}
              size={23}
              color={'#1db954'}
            />
          </MenuView>
          {likes && (
            <Pressable onPress={handleLike} style={{marginLeft: 5}}>
              <MaterialCommunityIcons
                // name={'cards-heart'}
                name={isLiked ? 'cards-heart' : 'cards-heart-outline'}
                size={18}
                color={'#1db954'}
              />
            </Pressable>
          )}
          {/* {hasDownload && (
            <Pressable
              style={{
                marginLeft: 15,
              }}
              onPress={
                !isDownloaded
                  ? handleDownload
                  : () => alert('already downloaded.. just play this song')
              }>
              <View>
                {!isDownloading ? (
                  <Ionicons
                    name={
                      isDownloaded ? 'cloud-download' : 'cloud-download-outline'
                    }
                    size={19}
                    color={'#1db954'}
                  />
                ) : (
                  <Progress.Circle size={30} indeterminate={true} />
                )}
              </View>
            </Pressable>
          )} */}
        </View>

        {/* {!isProfile && (
          <TouchableOpacity onPress={handleGenius}>
            <Image
              style={{
                height: 20,
                width: 20,
                borderRadius: 8,
                marginHorizontal: 10,
                borderWidth: 1,
                borderColor: '#1a1a1a',
              }}
              source={{
                uri: 'https://p.kindpng.com/picc/s/41-415864_rap-genius-logo-png-transparent-png.png',
              }}
            />
          </TouchableOpacity>
        )} */}
      </View>

      <TouchableOpacity onPress={onPress}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View
            style={{
              justifyContent: 'center',
              width: '60%',
              marginRight: 15,
            }}>
            <VHeader
              type="five"
              color={isDynamic ? colors.background : '#fff'}
              text={title}
              textAlign="right"
              numberOfLines={nolTitle}
            />
            <Caption
              textAlign="right"
              type="two"
              color={isDynamic ? colors.background : '#cecece'}
              text={artist}
              numberOfLines={nolArtist}
            />
            {hasLiked && (
              <Caption
                textAlign="right"
                type="one"
                color={'#1db'}
                text={trak?.TRAK?.likes?.length + ' like(s)'}
                numberOfLines={2}
              />
            )}
            <View style={{}}>
              {detail2 && (
                <TouchableOpacity onPress={handleDetail2}>
                  <View
                    style={{
                      backgroundColor: '#2323',
                      padding: 4,
                      borderRadius: 3,
                      alignSelf: 'flex-end',
                      margin: 3,
                    }}>
                    <Caption
                      type="two"
                      color="green"
                      text={detail2!}
                      textAlign="right"
                      numberOfLines={1}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <ImageBackground
            style={{
              height,
              width,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
            imageStyle={{
              height,
              width,
              borderRadius: 10,
              backgroundColor: '#fff',
            }}
            source={{
              uri: artwork,
            }}>
            {isProfile && (
              <Image
                resizeMode="center"
                style={{
                  height: 25,
                  width: 25,
                  borderTopLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  resizeMode: 'cover',
                }}
                source={
                  !isTRX
                    ? {
                        uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/sonar.png?alt=media',
                      }
                    : require('../../core/icon_circle_green.png')
                }
              />
            )}
          </ImageBackground>
        </View>
      </TouchableOpacity>

      {/* </View> */}
    </View>
  );
};
