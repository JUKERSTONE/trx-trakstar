import React from 'react';
import {View, Text, SafeAreaView, TextInput, Button} from 'react-native';

export const SignInElement = ({handleSignInChange, handleSignInEvent}: any) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Sign In</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={text => handleSignInChange({text, type: 'email'})}
          style={styles.input}
          placeholder="USERNAME"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={text => handleSignInChange({text, type: 'password'})}
          style={styles.input}
          placeholder="PASSWORD"
        />
      </View>
      <View style={styles.inputContainer}>
        <Button title="sign in" onPress={handleSignInEvent} />
      </View>
    </SafeAreaView>
  );
};

const styles = {
  input: {
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    margin: 5,
  },
};
