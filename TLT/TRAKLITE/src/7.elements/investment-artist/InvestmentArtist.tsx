import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Artist} from '../../5.screens';

export const InvestmentArtist = ({...props}: any) => {
  const {artist} = props;
  console.log(
    '🚀 ~ file: InvestmentTrack.tsx ~ line 7 ~ InvestmentTrack ~ track',
    artist,
  );
  return (
    <View style={{height: '100%', width: '100%'}}>
      <Artist {...props} />
    </View>
  );
};
