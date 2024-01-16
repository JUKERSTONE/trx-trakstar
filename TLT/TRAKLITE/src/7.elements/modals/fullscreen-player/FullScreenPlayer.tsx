import React from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Button,
} from 'react-native';
import {VHeader, Body, BHeader} from '../../typography';

interface TFullScreenPlayer {
  player: any;
}

export const FullScreenPlayer: React.FC<TFullScreenPlayer> = ({player}) => {
  return (
    <ImageBackground
      source={{
        uri:
          player?.uri ??
          'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/euphoric_man.png?alt=media',
      }}
      imageStyle={{borderRadius: 20}}
      style={styles.modalView}></ImageBackground>
  );
};

const styles = StyleSheet.create({
  modalView: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
