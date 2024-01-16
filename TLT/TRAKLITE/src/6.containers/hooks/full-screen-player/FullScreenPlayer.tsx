import React from 'react';
import {View, Text} from 'react-native';
import {FullScreenPlayer} from '../../../7.elements/modals/fullscreen-player/FullScreenPlayer';
import {useFullScreenPlayer} from './useFullScreenPlayer';

interface TFullScreenPlayer {
  fullScreenModalVisible: any;
  setFullScreenModalVisible: any;
  setModalVisibleWithNavigation: any;
}

export const FullScreenPlayerView: React.FC<TFullScreenPlayer> = ({
  fullScreenModalVisible,
  setFullScreenModalVisible,
  setModalVisibleWithNavigation,
}) => {
  const {player} = useFullScreenPlayer();
  return (
    <FullScreenPlayer
      modalVisible={fullScreenModalVisible}
      setModalVisible={setFullScreenModalVisible}
      setModalVisibleWithNavigation={setModalVisibleWithNavigation}
      player={player}
    />
  );
};
