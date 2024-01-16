import React from 'react';
import {View, Text, Dimensions, Button} from 'react-native';

export const PartiesLanding = (props: any) => {
  return (
    <View
      style={{
        height: Dimensions.get('window').height,
        backgroundColor: '#1a1a1a',
        // justifyContent: 'space-around',
      }}>
      <Button
        onPress={() => props.navigation.navigate('MainTab')}
        title="back"
      />
      <Button
        onPress={() => props.navigation.navigate('PartyStart')}
        title="start a party"
      />
      <Button
        onPress={() => props.navigation.navigate('PartyJoin')}
        title="join a party"
      />
      {/*  */}
      {/*  */}
    </View>
  );
};
