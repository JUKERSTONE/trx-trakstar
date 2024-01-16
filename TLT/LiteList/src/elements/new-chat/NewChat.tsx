import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  useWindowDimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TRAKCard} from '../trak-card/TRAKCard';

import LottieView from 'lottie-react-native';
import {VHeader, Body, LandingHeader} from '..';

export const NewChatElement = ({
  item,
  handleUserNavigation,
  users,
  handleAddUser,
  handleCreateChat,
  chat,
  loading,
  handleChangeText,
  usersHits,
}: any) => {
  console.log('🚀 ~ file: NewChat.tsx:32 ~ usersHits:', usersHits);
  console.log('🚀 ~ file: NewChat.tsx ~ line 25 ~ users', users);
  return (
    <View style={{alignItems: 'center', flex: 1, backgroundColor: '#1a1a1a'}}>
      <View
        style={{
          borderWidth: 3,
          borderColor: 'transparent',
          borderRadius: 11,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 50,
            width: 327,
            borderRadius: 8,
            borderWidth: 1,
            // borderColor: props.borders.inner,
            backgroundColor: 'whitesmoke',
          }}>
          <View style={{flex: 1}}>
            <View
              style={{
                // color: props.labelColor,
                paddingLeft: 16,
                // marginBottom: 8,
                paddingTop: 15,
                marginTop: 10,
              }}>
              <VHeader type="five" color={'grey'} text={'search'} />
            </View>
            <TextInput
              style={{
                // color: props.color,
                fontSize: 14,
                fontWeight: '500',
                paddingLeft: 16,
                paddingBottom: 20,
              }}
              onChangeText={handleChangeText}
              // value={text}
            />
          </View>
        </View>
      </View>

      {!loading ? (
        <TouchableOpacity onPress={() => handleCreateChat(item)}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: '#fff',
              padding: 5,
              borderRadius: 8,
              marginTop: 5,
            }}>
            <MaterialIcons
              name="chat"
              size={25}
              color={'#1a1a1a'}
              style={{marginRight: 10, paddingTop: 5}}
            />
            <VHeader type="five" color="#1a1a1a" text={'create chat'} />
          </View>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator
          color="#cecece"
          size="large"
          style={{marginVertical: 3}}
        />
      )}

      {usersHits.length !== 0 ? (
        <FlatList
          data={usersHits}
          style={{width: '100%', padding: 10}}
          renderItem={({item, index}) => {
            console.log(
              '🚀 ~ file: TRAKTab.tsx ~ line 37 ~ TRAKTabElement ~ item',
              item,
            );
            console.log('vrwerfq', users.includes(item.id));
            return (
              <TouchableOpacity onPress={() => handleAddUser(item.id)}>
                <TRAKCard
                  rank={index + 1}
                  artwork={item.avatarURL}
                  artist={item.title}
                  title={item.trak_name + ' • ' + [item.trak_symbol]}
                  status={'rising'}
                  backgroundColor={
                    chat.includes(item.id) === true ? 'green' : '#333333'
                  }
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
        />
      ) : (
        <FlatList
          data={users}
          style={{width: '100%', padding: 10}}
          renderItem={({item, index}) => {
            console.log(
              '🚀 ~ fileg: TRAKTab.tsx ~ line 37 ~ TRAKTabElement ~ itemb',
              item,
            );
            console.log('vrwerfq', users.includes(item.id));
            return (
              <TouchableOpacity onPress={() => handleAddUser(item.id)}>
                <TRAKCard
                  rank={index + 1}
                  artwork={item.avatarURL}
                  artist={item.title}
                  title={item.trak_name + ' • ' + [item.trak_symbol]}
                  status={'rising'}
                  backgroundColor={
                    chat.includes(item.id) === true ? 'green' : '#333333'
                  }
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};
