import {SafeAreaView, Text, Image, View, Pressable} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const HeaderElement = ({
  handleDeposit,
  hasBackButton = false,
  handleGoBack,
  handleAuthentication,
  isLoggedIn,
  isModal,
  handleProfile,
  handleCloseModal,
  navigation,
}: any) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#1a1a1a',
        height: 100,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <View
        style={{
          paddingHorizontal: 5,
          flexDirection: 'row',
        }}>
        {hasBackButton ? (
          <Pressable onPress={handleGoBack}>
            <MaterialCommunityIcons
              name={'backspace'}
              size={28}
              color={'whitesmoke'}
              style={{opacity: 0.9, paddingTop: 0}}
            />
          </Pressable>
        ) : (
          <Pressable onPress={handleProfile}>
            <FontAwesome
              name={'user'}
              size={24}
              color={'whitesmoke'}
              style={{opacity: 0.9, paddingTop: 0}}
            />
          </Pressable>
        )}

        <View style={{height: '100%', width: '65%', paddingLeft: 35}}>
          <Image
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/poster_black.png?alt=media',
            }}
            style={{
              flex: 1,
              backgroundColor: '#1A1A1A',
              paddingLeft: 0,
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Pressable onPress={handleDeposit} style={{marginRight: 10}}>
            <MaterialCommunityIcons
              name={'cash-usd'}
              size={30}
              color={'whitesmoke'}
              style={{opacity: 0.9, paddingTop: 0}}
            />
          </Pressable>
          <View style={{flexDirection: 'row'}}>
            <Pressable onPress={() => handleAuthentication(isModal)}>
              <FontAwesome
                name={isLoggedIn ? 'sign-out' : 'sign-in'}
                size={25}
                color={'#fff'}
                style={{opacity: 0.9, paddingTop: 2}}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
