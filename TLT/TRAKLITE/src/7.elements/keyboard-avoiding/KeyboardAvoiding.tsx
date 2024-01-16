import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';

export const KeyboardAvoiding = ({children}: any) => {
  return (
    <KeyboardAvoidingView
      behavior={'position'}
      style={{
        height: Dimensions.get('window').height,
        backgroundColor: '#1a1a1a',
      }}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
