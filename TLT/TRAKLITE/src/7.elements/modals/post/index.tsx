import React from 'react';
import {View, Text, Modal, Pressable} from 'react-native';
import styles from './styles';
import {VHeader} from '../../typography';

export const PostModal: React.FC<any> = ({
  modalVisible,
  setModalVisible,
  setModalVisibleWithNavigation,
}) => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={setModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              onPress={() => setModalVisibleWithNavigation('song')}
              style={{
                backgroundColor: '#cecece',
                flex: 1,
                marginBottom: 10,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <VHeader type="five" color="#1a1a1a" text={'TRACK'} />
              <Text
                style={{color: 'grey', fontStyle: 'italic', fontWeight: '500'}}>
                post a song
              </Text>
            </Pressable>
            <View
              // onPress={setModalVisibleWithNavigation}
              style={{
                backgroundColor: 'grey',
                flex: 1,
                marginBottom: 10,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <VHeader type="five" color="#1a1a1a" text={'TAPE'} />
              <Text
                style={{
                  color: 'whitesmoke',
                  fontStyle: 'italic',
                  fontWeight: '500',
                }}>
                {/* post an album, mixtape or EP */}
                coming soon
              </Text>
            </View>
            <View
              // onPress={setModalVisibleWithNavigation}
              style={{
                backgroundColor: 'grey',
                flex: 1,
                marginBottom: 10,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <VHeader type="five" color="#1a1a1a" text={'PLAYLIST'} />
              <Text
                style={{
                  color: 'whitesmoke',
                  fontStyle: 'italic',
                  fontWeight: '500',
                }}>
                {/* post one of your playlists */}
                coming soon
              </Text>
            </View>
            <View
              // onPress={setModalVisibleWithNavigation}
              style={{
                backgroundColor: 'grey',
                flex: 1,
                marginBottom: 10,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <VHeader type="five" color="#1a1a1a" text={'LYRICS'} />
              <Text
                style={{
                  color: 'whitesmoke',
                  fontStyle: 'italic',
                  fontWeight: '500',
                }}>
                {/* post the lyrics */}
                coming soon
              </Text>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose, {marginBottom: 10}]}
              onPress={setModalVisible}>
              <Text style={styles.textStyle}>cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default PostModal;
