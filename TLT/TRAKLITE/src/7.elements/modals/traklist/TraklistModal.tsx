import React from 'react';
import {View, Text, Modal, Pressable, SafeAreaView, Alert} from 'react-native';
import {styles} from './styles';
import {FullScreenPlayer} from '../fullscreen-player/FullScreenPlayer';
import {Track} from '../../../5.screens';
import player from '../../player';
import {store} from '../../../3.stores';
import * as actions from '../../../3.stores';
import {InvestmentTrack} from '../../investment-track';
import {InvestmentArtist} from '../../investment-artist';
import {
  VHeader,
  Body,
  Paragraph,
  BHeader,
  Caption,
} from '../../../7.elements/typography';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ModalProfile} from '../../../7.elements/modal-profile';

interface TTraklistModal {
  modalVisible: any;
  setModalVisible: any;
  state: any;
  type: string;
  handleRequestClose: () => void;
}

export const TraklistModal: React.FC<TTraklistModal> = ({
  modalVisible,
  setModalVisible,
  handleRequestClose,
  state,
  type,
  ...props
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleRequestClose}>
      {/*  */}
      <SafeAreaView style={styles.modalView}>
        <View
          style={{
            marginVertical: 10,
            alignSelf: 'flex-end',
          }}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handleRequestClose}>
            {/* <Text style={styles.textStyle}>X</Text> */}
            {/* <VHeader type="fice" color="#fff" text={'X'} numberOfLines={1} /> */}
            <MaterialCommunityIcons
              name="close-circle"
              size={22}
              color="#fff"
              // style={{paddingTop: 1}}
            />
          </Pressable>
        </View>
        {type === 'fullscreen' && <FullScreenPlayer player={state.player} />}
        {type === 'track_screen' && (
          <InvestmentTrack track={state.modal.track_screen.track} {...props} />
        )}
        {type === 'artist_screen' && (
          <InvestmentArtist
            artist={state.modal.artist_screen.artist}
            {...props}
          />
        )}
        {type === 'profile' && (
          <ModalProfile profile={state.modal.profile.data} {...props} />
        )}
      </SafeAreaView>
      {/*  */}
    </Modal>
  );
};
