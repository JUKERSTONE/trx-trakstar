import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {VHeader, BHeader, Body, Caption} from '../../elements';
import {Picker} from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const SignInElement = ({handleSignInChange, handleSignInEvent}: any) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ParallaxScrollView
        backgroundColor={'#1a1a1a'}
        parallaxHeaderHeight={200}
        stickyHeaderHeight={150}
        renderBackground={() => (
          <LinearGradient colors={['#1a1a1a', '#000']}>
            <View
              style={{
                height: 200,
                alignItems: 'center',
                justifyContent: 'space-around',
                borderBottomWidth: 1.8,
                // borderColor: '#fff',
              }}>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  marginTop: 3,
                  borderRadius: 8,
                }}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/euphoric_man%402x.png?alt=media&token=f591e9f0-9739-4b15-ab81-e3bb17444b2e',
                }}
              />

              {/*  */}
            </View>
          </LinearGradient>
        )}>
        <KeyboardAvoidingView
          behavior="position"
          style={{
            height: '100%',
            backgroundColor: '#1a1a1a',
          }}>
          <View style={{padding: 15, backgroundColor: '#1a1a1a'}}>
            <VHeader
              type="three"
              color="#cecece"
              text={'WELCOME BACK, FRENN'}
            />
            <Caption
              type="one"
              color="#cecece"
              text={'Lets sign you back in!'}
            />
          </View>
          <SafeAreaView style={{margin: 20}}>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={text => handleSignInChange({text, type: 'email'})}
                style={styles.input}
                placeholder="EMAIL"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={text =>
                  handleSignInChange({text, type: 'password'})
                }
                style={styles.input}
                placeholder="PASSWORD"
              />
            </View>

            <TouchableOpacity onPress={handleSignInEvent}>
              <View
                style={{
                  backgroundColor: 'green',
                  margin: 5,
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 15,
                }}>
                <Caption
                  type="one"
                  color="#fff"
                  text={'SIGN ME BACK IN!'}
                  textAlign="right"
                />
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ParallaxScrollView>
    </SafeAreaView>
  );
};

const styles = {
  input: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  inputContainer: {
    margin: 5,
  },
};
