import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {styles} from './styles';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TrakMetaView, ArtistView} from '..';

import {
  ProfileContainer,
  TRAKContainer,
  StoriesContainer,
  NewChatContainer,
  TapeContainer,
  TRAKTabContainer,
  NFTContainer,
  NFTStatusContainer,
  ArtistContainer,
  PlaylistContainer,
} from '../../containers';

export const TRXModalElement = ({
  modalVisible = false,
  setModalVisible,
  handleRequestClose,
  state,
  type,
  ...props
}: any) => {
  return (
    <SafeAreaView style={styles.modalView}>
      <View style={styles.body}>
        {type === 'profile' && <ProfileContainer isOwner {...props} />}
        {type === 'user-profile' && <ProfileContainer {...props} />}
        {type === 'trak' && <TRAKContainer {...props} />}
        {type === 'story-view' && <StoriesContainer {...props} />}
        {type === 'chat' && <NewChatContainer {...props} />}
        {type === 'trak-relationships' && (
          <TrakMetaView state={state} {...props} />
        )}
        {type === 'tape' && <TapeContainer {...props} />}
        {type === 'match-trak' && <TRAKTabContainer modal {...props} />}
        {type === 'nft-view' && <NFTContainer {...props} />}
        {type === 'nft-status' && <NFTStatusContainer {...props} />}
        {type === 'artist-view' && <ArtistContainer {...props} />}
        {type === 'playlist-view' && <PlaylistContainer {...props} />}
      </View>
    </SafeAreaView>
  );
};
