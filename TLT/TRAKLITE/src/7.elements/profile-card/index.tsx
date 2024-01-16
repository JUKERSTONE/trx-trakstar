import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {VHeader} from '../typography';

interface CardProps {
  profile_picture: any;
  setModalVisible: any;
  username: any;
  commentStatus: string;
}

export const Card: React.FC<CardProps> = ({
  profile_picture,
  setModalVisible,
  commentStatus,
  username,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'transparent',
      }}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={{uri: profile_picture || undefined}}
          style={{
            backgroundColor: 'red',
            height: 50,
            width: 50,
            borderRadius: 30,
          }}
        />
      </View>
      <View
        style={{
          flex: 5,
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          padding: 5,
        }}>
        <VHeader type="five" color="#1a1a1a" text={username} />
        <Pressable
          onPress={() => setModalVisible(true)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <VHeader type="six" color="#1DB954" text={commentStatus} />

          <Entypo name="triangle-down" color="grey" />
        </Pressable>
      </View>
    </View>
  );
};

export default Card;
