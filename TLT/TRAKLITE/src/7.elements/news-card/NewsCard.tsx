import React from 'react';
import {View, Text, Image, ImageBackground, Dimensions} from 'react-native';
import {VHeader, Body, Paragraph} from '../typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {number} from '@storybook/addon-knobs';

interface NewsCardProps {
  rank: number;
  artwork: string;
  title: string;
  artist: string;
  status?: 'same' | 'rising' | 'falling';
}

export const NewsCard: React.FC<NewsCardProps> = ({
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
      }}>
      <View
        style={{
          flex: 3,
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ImageBackground
            style={{
              height: 200,
              width: Dimensions.get('window').width * 0.9,
              borderRadius: 10,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            imageStyle={{borderRadius: 10}}
            source={{
              uri: artwork,
            }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                // marginLeft: 10,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1a1a1a',
                opacity: 0.75,
              }}>
              <View style={{marginBottom: 10}}>
                <VHeader
                  type="four"
                  color="#ffff64"
                  text={artist}
                  textAlign="center"
                />
              </View>
              <Paragraph
                type="one"
                color="#cecece"
                text={title}
                numberOfLines={3}
                textAlign="center"
              />
            </View>
          </ImageBackground>
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
  );
};
