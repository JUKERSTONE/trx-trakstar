import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ImageBackground,
  Pressable,
  FlatList,
} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const TLTNewsElement = ({
  news,
  status,
  handleSubmit,
  handleAddItem,
  handleTrending,
  handleUploadImage,
}: any) => {
  return (
    <>
      <FlatList
        listKey="News"
        data={news}
        renderItem={({item, index}: any) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'transparent',
                marginVertical: 5,
                marginLeft: 15,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 5,
                }}>
                <Text>{++index}</Text>
                <View>
                  {status === 'rising' && (
                    <MaterialIcons
                      name="arrow-drop-up"
                      size={30}
                      color={'#1db954'}
                    />
                  )}
                  {status === 'falling' && (
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={30}
                      color={'red'}
                    />
                  )}
                  {status === 'same' && (
                    <MaterialIcons name="minimize" size={30} color={'grey'} />
                  )}
                </View>
              </View>
              <View style={{flex: 3, flexDirection: 'column'}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      margin: 15,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      maxWidth: '70%',
                    }}>
                    <TextInput
                      // placeholder={item.artist ? item.artist : 'Artist'}
                      placeholder={'Source'}
                      style={{textAlign: 'right', width: '100%'}}
                      onChangeText={(text: string) =>
                        handleTrending({name: 'source', text, index: index - 1})
                      }
                    />
                    <TextInput
                      // placeholder={item.title ? item.title : 'Title'}
                      placeholder={'Thumbnail'}
                      style={{textAlign: 'right', width: '100%'}}
                      onChangeText={(text: string) =>
                        handleTrending({
                          name: 'thumbnail',
                          text,
                          index: index - 1,
                        })
                      }
                    />
                    <TextInput
                      // placeholder={item.status ? item.status : 'Status'}
                      placeholder={'Title'}
                      style={{textAlign: 'right', width: '100%'}}
                      onChangeText={(text: string) =>
                        handleTrending({name: 'title', text, index: index - 1})
                      }
                    />
                    <TextInput
                      placeholder={'URL'}
                      style={{textAlign: 'right', width: '100%'}}
                      onChangeText={(text: string) =>
                        handleTrending({name: 'url', text, index: index - 1})
                      }
                    />
                  </View>
                  <Pressable
                    onPress={() =>
                      handleUploadImage({
                        index: index - 1,
                      })
                    }
                    style={{flex: 1}}>
                    <ImageBackground
                      style={{
                        height: 80,
                        width: '100%',
                        borderRadius: 10,
                        backgroundColor: '#fff',
                      }}
                      resizeMode={item.thumbnail ? 'cover' : 'contain'}
                      source={{
                        uri: item.thumbnail
                          ? item.thumbnail
                          : 'https://www.lifewire.com/thmb/P856-0hi4lmA2xinYWyaEpRIckw=/1920x1326/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg',
                      }}></ImageBackground>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => '' + index}
      />

      <Button title="submit" onPress={handleSubmit} />
      <Button title="add" onPress={handleAddItem} />
    </>
  );
};
