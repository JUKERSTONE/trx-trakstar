import React, {FC, useContext} from 'react';
import {View, TouchableOpacity, FlatList, Button} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {VHeader, BHeader, Body, Caption} from '../typography';
import {TrendingCard} from '../trending-card/TrendingCard';
import {Image} from 'react-native-animatable';
import {TrakstarSelect} from '../trakstar-select';
import {useSelector} from 'react-redux';
import {PlayerContext} from '../../stores';
import {Text} from 'react-native-paper';

export const OnboardIslandElement = ({
  handleStartTRX,
}: {
  handleStartTRX: any;
}) => {
  const {userData, setUserData} = useContext(PlayerContext);
  console.log(
    '🚀 ~ file: OnboardIsland.tsx:14 ~ OnboardIslandElement ~ userData:',
    userData,
  );

  // const trx = useSelector((state: any) => state.profile.trakland.trx);
  // console.log(
  //   '🚀 ~ file: OnboardIsland.tsx:20 ~ OnboardIslandElement ~ trx:',
  //   trx,
  // );

  const trx = useSelector((state: any) => state.profile.trakland.trx);

  if (!trx) return null;

  return (
    <View
      style={{
        height: 75,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#232323',
      }}>
      {trx.map((item: any) => (
        <Image
          style={{
            height: 40,
            width: 40,
            margin: 5,
            borderRadius: 10,
            backgroundColor: '#2323cc',
            borderWidth: 1.5,
            borderColor: '#1db94a',
          }}
          source={{uri: item.trak.cover_art}}
        />
      ))}
      {trx.length - 4 > -1 ? (
        <View style={{flex: 1, marginLeft: 10}}>
          <VHeader
            type="five"
            color={'#fff'}
            text={'TRX Radio seeds selected'}
          />
          <Caption type="two" color={'grey'} text={'Select GO in header!'} />
        </View>
      ) : (
        <View style={{flex: 1, marginLeft: 10}}>
          <VHeader
            type="five"
            color={'#fff'}
            text={`${4 - trx.length} more to TrakList`}
          />
        </View>
      )}
    </View>
  );
};
