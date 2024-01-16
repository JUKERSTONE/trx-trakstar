import React from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Button,
  FlatList,
  Pressable,
  Image,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
} from 'react-native';

import {styles} from '../screen-wrapper/styles';
import {TokencyPicker, TokencyText} from './internal';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const TRXRequestsElement = ({
  refreshing,
  onRefresh,
  errorLoad,
  requests,
  handleRemoveRequest,
  handleNavigateTrakFill,
  ...props
}: any) => {
  return (
    <FlatList
      data={requests}
      style={{height: 200}}
      // numColumns={3}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={errorLoad ? 'red' : '#fff'}
        />
      }
      renderItem={({item, index}: any) => {
        console.log('🚀 ~ file: Profile.tsx ~ line 251 ~ item', item);
        const type = item.info;
        return (
          <TouchableOpacity
            style={{margin: 5}}
            onPress={() => handleNavigateTrakFill({reference: item})}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <Image
                  source={{uri: item.trak.thumbnail}}
                  style={{height: 100, width: 100, marginRight: 20}}
                />
              </View>
              <View style={{maxWidth: '63%'}}>
                <Text>{item.trak.title}</Text>
                <Text>{item.trak.artist}</Text>
              </View>
              <View
                style={{
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <TouchableOpacity onPress={() => handleRemoveRequest(item)}>
                  <MaterialIcons name="close" size={25} color={'red'} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item, index) => '' + index}
    />
  );
};
