import React from 'react';
import {View, Modal, Pressable} from 'react-native';
import styles from './styles';
import {VHeader} from '../../typography';

interface ModalProps {
  modalVisible: any;
  setModalVisible: any;
  commentStatus: any;
}

export const CommentModal: React.FC<ModalProps> = ({
  modalVisible,
  setModalVisible,
  commentStatus,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(true)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable
            onPress={() => {
              setModalVisible(!modalVisible);
              commentStatus('anyone can comment ');
            }}
            style={{
              backgroundColor: '#00101F',
              flex: 1,
              marginBottom: 10,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <VHeader type="five" color="#1db954" text={'anyone can comment'} />
          </Pressable>
          <Pressable
            onPress={() => {
              setModalVisible(!modalVisible);
              commentStatus('only mutuals can comment ');
            }}
            style={{
              backgroundColor: '#00101F',
              flex: 1,
              marginBottom: 10,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <VHeader
              type="five"
              color="#1db954"
              text={'only mutuals can comment'}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              setModalVisible(!modalVisible);
              commentStatus('nobody can comment ');
            }}
            style={{
              backgroundColor: '#00101F',
              flex: 1,
              marginBottom: 10,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <VHeader type="five" color="#1db954" text={'nobody can comment'} />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CommentModal;
