import React from 'react';
import {View, Text, Image} from 'react-native';
import {VHeader, Body, BHeader, Caption} from '../typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {number} from '@storybook/addon-knobs';

interface TrendingCardProps {
  rank?: number;
  artwork: string;
  title: string;
  artist: string;
  status?: 'same' | 'rising' | 'falling';
}

export const TrendingCard: React.FC<TrendingCardProps> = ({
  rank,
  artwork,
  title,
  artist,
  status,
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
        {rank && <BHeader type="four" color="white" text={'' + rank} />}
      </View>
      <View style={{flex: 3, flexDirection: 'column'}}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              margin: 15,
              justifyContent: 'center',
              alignItems: 'flex-end',
              maxWidth: '70%',
            }}>
            <VHeader
              type="four"
              color="white"
              text={artist}
              textAlign="right"
            />
            {/* <Body
              type="one"
              title
              color="#cecece"
              text={title}
              textAlign="right"
            /> */}
            <Caption
              textAlign="right"
              type="one"
              color="#cecece"
              text={title}
              numberOfLines={2}
            />
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
