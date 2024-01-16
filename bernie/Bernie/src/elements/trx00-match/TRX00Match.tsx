import React, {useCallback} from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Button,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
// import {VHeader, Body} from '../../elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const TRX00MatchElement = ({
  previews,
  handleMatch,
  handleRemoveRequest,
  onRefresh,
  refreshing,
  errorLoad,
  ...props
}: any) => {
  return (
    <FlatList
      data={previews}
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
            onPress={() => handleMatch({reference: item})}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <Image
                  source={{uri: item.cover_art}}
                  style={{height: 100, width: 100, marginRight: 20}}
                />
              </View>
              <View style={{maxWidth: '63%'}}>
                <Text>{item.title}</Text>
                <Text>{item.artist}</Text>
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
