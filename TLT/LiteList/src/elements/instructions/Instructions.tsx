import React from 'react';
import {View, Text, Button} from 'react-native';

export const InstructionsElement = ({
  authorizeSpotify,
  authorizeGoogle,
  isAuthenticatedSpotify,
  handleNavigateNext,
  navigation,
}: any) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>Instructions</Text>
      <Button onPress={handleNavigateNext} title="next" />
    </View>
  );
};
