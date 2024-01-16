import React from 'react';
import {View, Text, Image} from 'react-native';
import {VHeader, Body} from '../typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
        marginLeft: 15,
      }}>
      <View
        style={{
          justifyContent: 'space-around',
          alignItems: 'center',
          margin: 5,
        }}>
        {rank && <VHeader type="three" color="white" text={'' + rank} />}
        <View>
          {status === 'rising' && (
            <MaterialIcons name="arrow-drop-up" size={30} color={'#1db954'} />
          )}
          {status === 'falling' && (
            <MaterialIcons name="arrow-drop-down" size={30} color={'red'} />
          )}
          {status === 'same' && (
            <MaterialIcons name="minimize" size={30} color={'grey'} />
          )}
        </View>
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
              type="five"
              color="white"
              text={artist}
              textAlign="right"
            />
            <Body type="two" color="#cecece" text={title} textAlign="right" />
          </View>
          <Image
            style={{
              height: 80,
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
