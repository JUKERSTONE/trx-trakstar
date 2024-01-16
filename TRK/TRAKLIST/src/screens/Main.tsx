import {SafeAreaView, Text, Button} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

export const Main = () => {
  return (
    <SafeAreaView>
      <Text>Main</Text>
      <Button
        onPress={() => {
          auth()
            .signOut()
            .then(() => {
              // handleClear();
            });
        }}
        title="Sign out"
      />
    </SafeAreaView>
  );
};
