import React from 'react';
import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import {VHeader, Body, BHeader, Caption} from '../typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {number} from '@storybook/addon-knobs';
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
  likes?: any;
  handleLike?: any;
}

export const TRAKCard: React.FC<TrendingCardProps> = ({
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
  likes,
  handleLike,
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
          justifyContent: 'space-around',
          alignItems: 'center',
          margin: 5,
          flexDirection: 'row',
        }}>
        <View style={{marginRight: 5, alignItems: 'center'}}>
          {status === 'rising' && (
            <MaterialIcons name="arrow-drop-up" size={40} color={'#1db954'} />
          )}
          {status === 'falling' && (
            <MaterialIcons name="arrow-drop-down" size={40} color={'red'} />
          )}
          {status === 'same' && (
            <MaterialIcons name="minimize" size={40} color={'grey'} />
          )}
        </View>
        {rank && (
          <BHeader
            type="four"
            color={isDynamic ? colors.background : '#fff'}
            text={'' + rank}
          />
        )}
      </View>
      {/* <View style={{flexDirection: 'column', backgroundColor: 'red'}}> */}
      <View style={{flexDirection: 'row', flex: 1}}>
        <View
          style={{
            margin: 15,
            justifyContent: 'center',
            width: '65%',
          }}>
          <VHeader
            type="four"
            color={isDynamic ? colors.background : '#fff'}
            text={artist}
            textAlign="right"
            numberOfLines={nolArtist}
          />
          <Caption
            textAlign="right"
            type="one"
            color={isDynamic ? colors.background : '#cecece'}
            text={title}
            numberOfLines={nolTitle}
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
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            {detail1 && (
              <TouchableOpacity onPress={handleDetail1}>
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
                    color="#fc3c44"
                    text={detail1!}
                    textAlign="right"
                    numberOfLines={1}
                  />
                </View>
              </TouchableOpacity>
            )}
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
        <Image
          style={{
            height,
            width,
            borderRadius: 10,
            backgroundColor: '#fff',
          }}
          source={{
            uri: artwork,
          }}
        />
      </View>

      {/* </View> */}
    </View>
  );
};
