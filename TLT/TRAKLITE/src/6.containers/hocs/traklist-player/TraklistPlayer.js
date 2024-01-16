import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Video from 'react-native-video';

export class TraklistPlayer extends Component {
  constructor(props) {
    super(props);

    const {preview, isPaused, isMuted} = this.props;
  }

  componentDidMount() {}

  render() {
    return (
      <Video
        playInBackground={true}
        source={{
          uri: preview,
        }}
        style={{
          flex: 1,
          opacity: 0.9,
          backgroundColor: 'black',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
        audioOnly={true}
        paused={state.player?.isPaused}
        muted={state.player?.isMuted}
        controls={false}
        ignoreSilentSwitch="ignore"
      />
    );
  }
}
