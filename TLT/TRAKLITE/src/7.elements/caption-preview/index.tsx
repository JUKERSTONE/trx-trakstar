import preview from '@storybook/react-native/dist/preview';
import React, {useState, useContext} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {VHeader, BHeader, Body} from '../typography';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useProvider} from '../../3.stores';

interface PreviewProps {
  artwork: string;
  title: string;
  artist: string;
  preview: string;
  handlePreview: (info: any) => void;
  handlePost: () => void;
}

export const Preview: React.FC<PreviewProps> = ({
  artwork,
  title,
  artist,
  preview,
  handlePreview,
  handlePost,
}) => {
  const {state} = useContext(useProvider);

  const info = {
    ...state.player,
    title,
    artist,
    uri: artwork,
    preview_url: preview,
    isPaused: preview ? false : true,
    isMuted: false,
    id: null,
  };
  return (
    <ImageBackground
      source={{uri: artwork}}
      style={{height: 200, width: 200, justifyContent: 'flex-end'}}>
      <View
        style={{
          backgroundColor: '#cecece',
          opacity: 0.7,
          padding: 10,
          justifyContent: 'space-around',
        }}>
        <VHeader type="five" color="00101F" text={title} textAlign="center" />
        <Body type="two" color="#000" text={artist} textAlign="center" />
        <View
          style={{
            marginTop: 8,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          {preview && (
            <TouchableOpacity onPress={() => handlePreview(info)}>
              <View
                style={{backgroundColor: '#fff', padding: 5, borderRadius: 10}}>
                <MaterialCommunityIcons
                  name="play-speed"
                  size={25}
                  color="#1a1a1a"
                />
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handlePost}>
            <View
              style={{backgroundColor: '#fff', padding: 5, borderRadius: 10}}>
              <MaterialIcons name="post-add" size={27} color="#1a1a1a" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Preview;
