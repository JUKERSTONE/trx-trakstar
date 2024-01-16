import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import {VHeader, BHeader, Body} from '../typography';
import LinearGradient from 'react-native-linear-gradient';

const light = [
  {
    name: 'JAY10',
    image:
      'https://pbs.twimg.com/profile_images/1366738096000229381/gXKWqDS3.jpg',
  },
  {
    name: 'Drake',
    image:
      'data:image/jpeg;base64,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',
  },
  {
    name: 'San Bravura',
    image:
      'https://images-pw.pixieset.com/elementfield/25912193/SanBravura-Leeds-22.6.20-9594-5f6b0d5e.jpg',
  },
  {
    name: 'Eli Sostre',
    image:
      'https://2dopeboyz.com/wp-content/uploads/2020/02/eli-sostre-new-level.png',
  },
  {
    name: 'Drake',
    image:
      'data:image/jpeg;base64,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',
  },
];

export const LandingQuote = () => {
  return (
    // Within your render function
    <View style={{marginLeft: 15, height: 120, justifyContent: 'center'}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 5,
        }}>
        <View style={{marginRight: 30}}>
          <VHeader type="five" color="white" text={'QUOTABLE OF THE DAY'} />
        </View>
        <View
          style={{
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
            width: '100%',
          }}>
          <BHeader
            type="four"
            color="#cecece"
            text={'"This just the intro, let me not get ahead of myself..."'}
          />
        </View>
      </View>
    </View>
  );
};
