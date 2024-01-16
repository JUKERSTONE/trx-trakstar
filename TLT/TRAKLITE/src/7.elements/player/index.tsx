import React from 'react';
import Video from 'react-native-video';
import styles from './styles';

export const MusicPlayer: React.FC<any> = ({uri, isPaused = true}) => {
  return (
    <Video
      source={{uri}}
      style={styles.backgroundVideo}
      audioOnly={true}
      paused={isPaused}
      controls={true}
    />
  );
};

export default MusicPlayer;
