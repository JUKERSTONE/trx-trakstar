import React, {useState} from 'react';
import {View, Pressable, Keyboard, KeyboardAvoidingView} from 'react-native';
import ProfileCard from '../profile-card';
import Preview from '../caption-preview';
import CaptionInput from '../caption-input';
import CommentModal from '../modals/comment-status';
import {VHeader} from '../typography';
import preview from '@storybook/react-native/dist/preview';

interface CaptionProps {
  id: string;
  profile_picture: string;
  username: string;
  setModalVisible: any;
  modalVisible: any;
  navigation: any;
  handleInputChange: any;
  handlePost: any;
  artwork: string;
  title: string;
  artist: string;
  preview: string;
  isRecent: boolean;
  service: string;
  handlePreview: any;
  status: any;
  setStatus: any;
  toggleProfile: any;
  setToggleProfile: any;
}

export const CaptionSet: React.FC<CaptionProps> = ({
  id,
  profile_picture,
  username,
  setModalVisible,
  modalVisible,
  handleInputChange,
  handlePost,
  handlePreview,
  artwork,
  title,
  artist,
  preview,
  isRecent,
  service,
  status,
  setStatus,
  toggleProfile,
  setToggleProfile,
}) => {
  return (
    <KeyboardAvoidingView behavior={'height'} style={{flex: 1}}>
      <View
        style={{
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
        }}>
        <ProfileCard
          profile_picture={profile_picture}
          username={username}
          setModalVisible={setModalVisible}
          commentStatus={status}
        />
      </View>

      <View
        style={{
          justifyContent: 'space-around',
          padding: 10,
        }}>
        <CaptionInput
          handleInputChange={handleInputChange}
          onFocus={() => setToggleProfile(!toggleProfile)}
        />
      </View>
      <View
        style={{
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Preview
          artwork={artwork}
          title={title}
          artist={artist}
          preview={preview}
          handlePreview={handlePreview}
          handlePost={() =>
            handlePost(
              'track',
              title,
              artist,
              artwork,
              id,
              preview,
              isRecent,
              service,
            )
          }
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}></View>
      <CommentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        commentStatus={(status: any) => setStatus(status)}
      />
    </KeyboardAvoidingView>
  );
};

export default CaptionSet;
