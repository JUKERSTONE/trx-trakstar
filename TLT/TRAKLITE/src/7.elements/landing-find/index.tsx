import React from 'react';
import {View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {VHeader} from '../typography';

export const LandingFind = () => {
  return (
    <LinearGradient
      colors={['#1A1A1A', '#1B3926', '#1A1A1A']}
      style={{height: 150, marginVertical: 10}}>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'center',
          margin: 8,
          marginRight: 30,
        }}>
        <VHeader type="five" color="white" text={'FRIENDS ACTIVITY.'} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginHorizontal: 20,
        }}>
        <View style={{width: 150, height: 110}}>
          <Image
            style={{
              flex: 1,
              borderRadius: 8,
              opacity: 0.7,
              backgroundColor: '#1B3926',
            }}
            source={{
              uri: '',
            }}
          />
          <View style={{marginTop: 5, alignItems: 'center'}}>
            <VHeader type="five" color="white" text={'FEED'} />
          </View>
        </View>

        <View style={{width: 150, height: 110}}>
          <Image
            style={{
              flex: 1,
              borderRadius: 8,
              opacity: 0.6,
              backgroundColor: '#1B3926',
            }}
            source={{
              uri: '',
            }}
          />
          <View style={{marginTop: 5, alignItems: 'center'}}>
            <VHeader type="five" color="white" text={'SWIPE'} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};
