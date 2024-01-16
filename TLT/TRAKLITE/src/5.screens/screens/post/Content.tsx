import React, {useContext} from 'react';
import {View, Text} from 'react-native';

import {useProvider} from '../../../3.stores';
import {ContentSearchView} from '../../../6.containers';
import {TraklistApp} from '../../../6.containers/hooks/traklist-app/TraklistApp';

interface PostProps {
  navigation: any;
  route: any;
}

export const Content: React.FC<PostProps> = ({navigation, route}) => {
  const {state} = useContext(useProvider);

  return (
    <TraklistApp navigation={navigation} hasPlayer={false}>
      <View
        style={{flex: 1, paddingHorizontal: 30, backgroundColor: '#1a1a1a'}}>
        <ContentSearchView navigation={navigation} route={route} />
      </View>
    </TraklistApp>
  );
};
