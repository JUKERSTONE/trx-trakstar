import React from 'react';
import {View, Text, Dimensions, ImageBackground} from 'react-native';
import {VHeader, BHeader, Body} from '../typography';

interface TShowcase {
  tape: any;
}

export const Showcase: React.FC<TShowcase> = ({tape, children}) => {
  return (
    <View
      style={{
        height: Dimensions.get('window').height,
        backgroundColor: '#1a1a1a',
      }}>
      <ImageBackground source={tape.images} style={{height: 250}}>
        <VHeader type="five" color="00101F" text={tape.title} />
        <Body type="two" color="#000" text={tape.artist} />
        <Body type="two" color="#000" text={tape.noOfSongs} />
        <Body type="two" color="#000" text={tape.duration} />
      </ImageBackground>
      <View style={{flex: 1}}>{children}</View>
    </View>
  );
};
