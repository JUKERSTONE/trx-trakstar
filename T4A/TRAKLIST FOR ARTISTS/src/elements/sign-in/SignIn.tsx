import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Pressable,
} from 'react-native';

export const SignInElement = ({handleSignInChange, handleSignInEvent}: any) => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width: '60%', marginBottom: 15}}>
        <TextInput
          onChangeText={text => handleSignInChange({text, type: 'email'})}
          style={styles.input}
          placeholder="USERNAME"
        />
      </View>
      <View style={{width: '60%', marginBottom: 15}}>
        <TextInput
          onChangeText={text => handleSignInChange({text, type: 'password'})}
          style={styles.input}
          placeholder="PASSWORD"
        />
      </View>
      <Pressable onPress={handleSignInEvent}>
        <View style={styles.inputContainer}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>SIGN IN</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = {
  input: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  inputContainer: {
    margin: 5,
    backgroundColor: 'green',
    borderRadius: 10,
    height: 35,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
};
