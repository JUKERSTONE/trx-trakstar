import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {ContentSearchView} from '../../../6.containers';

interface IPartyContent {
  navigation: any;
  route: any;
}

export const PartyContent: FC<IPartyContent> = ({navigation, route}) => {
  return (
    <View style={{flex: 1, paddingHorizontal: 30, backgroundColor: '#1a1a1a'}}>
      <ContentSearchView navigation={navigation} route={route} />
    </View>
  );
};
