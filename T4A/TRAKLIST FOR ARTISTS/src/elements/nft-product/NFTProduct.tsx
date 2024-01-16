import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Pressable,
  ImageBackground,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {VHeader} from '../typography';

export const NFTProductElement = ({
  handleAddItem,
  products,
  handleProduct,
  handleUploadImage,
  handleRemoveProduct,
  handleSubmitMerchandise,
  loadingImage,
  nftPayload,
  handleUploadBannerImage,
  banner,
}: any) => {
  console.log('🚀 ~ file: NFTProduct.tsx:26 ~ nftPayload:', nftPayload);
  console.log('🚀 ~ file: NFTProduct.tsx ~ line 25 ~ products', products);
  return (
    <SafeAreaView style={{backgroundColor: '#1a1a1a', flex: 1}}>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
        <Button title="Add Item" onPress={handleAddItem} />
        <Button title="Finalize" onPress={handleSubmitMerchandise} />
      </View>
      {nftPayload.settings['campaign-type'] === 'Banner' && (
        <>
          <View style={{margin: 10}}>
            <VHeader
              numberOfLines={1}
              type="four"
              color={'#cecece'}
              text={'Banner Artwork - (900 x 250) px'}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                margin: 15,
                justifyContent: 'center',
                alignItems: 'flex-end',
                maxWidth: '70%',
              }}>
              {loadingImage ? (
                <ActivityIndicator color="blue" size="small" />
              ) : (
                <Pressable
                  style={{
                    backgroundColor: 'green',
                    padding: 5,
                    borderRadius: 3,
                    marginTop: 5,
                  }}
                  onPress={handleUploadBannerImage}>
                  <View>
                    <Text style={{color: '#cecece', fontWeight: 'bold'}}>
                      upload image
                    </Text>
                  </View>
                </Pressable>
              )}
            </View>
            <ImageBackground
              style={{
                height: 80,
                width: '100%',
                borderRadius: 10,
                backgroundColor: '#fff',
              }}
              imageStyle={{borderRadius: 10}}
              resizeMode={'cover'}
              source={{
                uri:
                  banner ??
                  'https://www.lifewire.com/thmb/P856-0hi4lmA2xinYWyaEpRIckw=/1920x1326/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg',
              }}></ImageBackground>
          </View>
        </>
      )}
      <FlatList
        listKey="NFT_PRODUCTS"
        data={products}
        style={{marginTop: 10}}
        ListHeaderComponent={() => (
          <View style={{margin: 10}}>
            <VHeader
              numberOfLines={1}
              type="four"
              color={'#cecece'}
              text={'Trademark Artwork (xxx x xxx)'}
            />
          </View>
        )}
        renderItem={({item, index}: any) => {
          console.log('🚀 ~ file: NFTProduct.tsx ~ line 114 ~ item', item);
          return (
            <View
              style={{
                backgroundColor: 'transparent',
                marginVertical: 5,
                margin: 15,
                borderBottomWidth: 1,
              }}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <View style={{flex: 3, flexDirection: 'column'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginBottom: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        flex: 1,
                      }}>
                      <Text style={{color: 'whitesmoke', fontWeight: 'bold'}}>
                        media{' '}
                      </Text>
                      <Pressable
                        onPress={() =>
                          handleProduct({
                            name: 'media',
                            index,
                          })
                        }>
                        <View
                          style={{
                            height: 15,
                            width: 15,
                            borderRadius: 15,
                            backgroundColor:
                              item.type == 'media' ? 'green' : 'red',
                          }}></View>
                      </Pressable>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        flex: 1,
                      }}>
                      <Text style={{fontWeight: 'bold', color: 'whitesmoke'}}>
                        merchandise{' '}
                      </Text>
                      <Pressable
                        onPress={() =>
                          handleProduct({
                            name: 'merchandise',
                            index,
                          })
                        }>
                        <View
                          style={{
                            height: 15,
                            width: 15,
                            borderRadius: 15,
                            backgroundColor:
                              item.type == 'merchandise' ? 'green' : 'red',
                          }}></View>
                      </Pressable>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        margin: 15,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        maxWidth: '70%',
                      }}>
                      {/* <TextInput
                        placeholder={'TRADEMARK ' + ++index}
                        style={{
                          textAlign: 'right',
                          width: '100%',
                          color: 'whitesmoke',
                        }}
                        placeholderTextColor="#cecece"
                        onChangeText={(text: string) =>
                          handleProduct({
                            name: 'title',
                            text,
                            index,
                          })
                        }
                      /> */}

                      {loadingImage ? (
                        <ActivityIndicator color="blue" size="small" />
                      ) : (
                        <Pressable
                          style={{
                            backgroundColor: 'green',
                            padding: 5,
                            borderRadius: 3,
                            marginTop: 5,
                          }}
                          onPress={() =>
                            handleUploadImage({
                              index,
                            })
                          }>
                          <View>
                            <Text
                              style={{color: '#cecece', fontWeight: 'bold'}}>
                              upload image
                            </Text>
                          </View>
                        </Pressable>
                      )}
                    </View>
                    <ImageBackground
                      style={{
                        height: 80,
                        width: '100%',
                        borderRadius: 10,
                        backgroundColor: '#fff',
                      }}
                      resizeMode={item.image ? 'cover' : 'contain'}
                      source={{
                        uri: item.image
                          ? item.image
                          : 'https://www.lifewire.com/thmb/P856-0hi4lmA2xinYWyaEpRIckw=/1920x1326/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg',
                      }}></ImageBackground>
                  </View>
                </View>
              </View>
              <View>
                <Button
                  title="remove"
                  onPress={() => handleRemoveProduct({index})}
                />
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};
