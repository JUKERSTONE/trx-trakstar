import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {VHeader, Body, BHeader, Caption} from '../typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {number} from '@storybook/addon-knobs';

interface TrendingCardProps {
  rank?: number;
  artwork: string;
  title: string;
  artist: string;
  detail1?: string;
  status?: 'same' | 'rising' | 'falling';
  handleDetail1?: any;
  isDynamic?: any;
  colors?: any;
  hasLiked?: any;
  trak?: any;
}

export const TrendingCard: React.FC<TrendingCardProps> = ({
  rank,
  artwork,
  title,
  artist,
  status,
  detail1,
  handleDetail1,
  isDynamic,
  colors,
  hasLiked,
  trak,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginVertical: 5,
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
      <View style={{flex: 3, flexDirection: 'column'}}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              margin: 15,
              justifyContent: 'center',
              alignItems: 'flex-end',
              maxWidth: '40%',
            }}>
            <VHeader
              type="four"
              color={isDynamic ? colors.background : '#fff'}
              text={artist}
              textAlign="right"
              numberOfLines={2}
            />
            <Caption
              textAlign="right"
              type="one"
              color={isDynamic ? colors.background : '#cecece'}
              text={title}
              numberOfLines={2}
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
            {detail1 && (
              <TouchableOpacity onPress={handleDetail1}>
                <View
                  style={{
                    backgroundColor: detail1 === 'FAILED' ? '#333' : '#fff',
                    padding: 5,
                    borderRadius: 5,
                    marginTop: 3,
                  }}>
                  <Body
                    type="two"
                    color="green"
                    text={detail1!}
                    textAlign="right"
                    numberOfLines={1}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
          <Image
            style={{
              height: 100,
              width: '100%',
              borderRadius: 10,
              backgroundColor: '#fff',
            }}
            source={{
              uri: artwork,
            }}
          />
        </View>
      </View>
    </View>
  );
};
