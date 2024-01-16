import React from 'react';
import {View, TextInput, Text, ScrollView, Button} from 'react-native';
import {styles} from '../screen-wrapper/styles';
import {TokencyPicker, TokencyText} from './internal';
import auth from '@react-native-firebase/auth';
import {useAsyncStorage} from '../../stores';

export const TokencyElement = ({navigation, ...props}: any) => {
  const {handleClear} = useAsyncStorage();

  return (
    <View
      style={{
        backgroundColor: '#1a1a1a',
        justifyContent: 'space-around',
        flex: 1,
      }}>
      <Button
        title="mine + mint"
        onPress={() => navigation.navigate('MINE_TOKEN')}
      />
      <Button
        title="query + edit"
        onPress={() => navigation.navigate('SET_TOKEN')}
      />
      <Button
        onPress={() => {
          auth()
            .signOut()
            .then(() => {
              handleClear();
            });
        }}
        title="Sign out"
      />
    </View>
  );
};
