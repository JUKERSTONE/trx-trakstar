import React from 'react';
import {View, Button, Dimensions} from 'react-native';

import {SignInView} from '../../6.containers';

export interface RegisterProps {
  navigation: any;
}

export const SignIn: React.FC<RegisterProps> = ({navigation}) => {
  const windowHeight = Dimensions.get('window').height;
  return (
    <View style={{backgroundColor: '#000', minHeight: windowHeight}}>
      <SignInView navigation={navigation} />
    </View>
  );
};
