import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Pressable,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import {VHeader, Body} from '../typography';
import {BernieText} from '../../elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const RedeemElement = ({
  handleNavigateNext,
  handleUploadAudio,
  handleUploadImage,
  handleNFTCopiesInput,
  handleNavigateProduct,
  loadingAudio,
  audioComplete,
  loadingImage,
  imageComplete,
  nftCopies,
  hasBTC = false,
  hasSOL = false,
  hasADA = false,
  possible,
  handleNFTType,
  nftType,
  handleAssetName,
}: any) => {
  return (
    <ScrollView style={{backgroundColor: '#1a1a1a', flex: 1}}>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>NFT Copies</Text>
          </View>
          <View style={{marginVertical: 5}}>
            <View style={styles.header}>
              <Text style={styles.title}>TRAK NAME</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder={'asset name'}
                style={{color: 'whitesmoke', fontWeight: '600'}}
                onChangeText={text => handleAssetName(text)}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                flex: 1,
              }}>
              <Text style={{color: 'whitesmoke', fontWeight: 'bold'}}>
                classic{' '}
              </Text>
              <Pressable
                onPress={() =>
                  handleNFTType({
                    name: 'classic',
                  })
                }>
                <View
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 15,
                    backgroundColor: nftType == 'classic' ? 'green' : 'red',
                  }}></View>
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                flex: 1,
              }}>
              <Text style={{color: 'whitesmoke', fontWeight: 'bold'}}>
                trXclusive{' '}
              </Text>
              <Pressable
                onPress={() =>
                  handleNFTType({
                    name: 'exclusive',
                  })
                }>
                <View
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 15,
                    backgroundColor: nftType == 'exclusive' ? 'green' : 'red',
                  }}></View>
              </Pressable>
            </View>
          </View>

          <View>
            {(hasBTC || nftType == 'exclusive') && (
              <View style={{marginVertical: 5}}>
                <View style={styles.header}>
                  <Text style={styles.title}>BITCOIN (BTC)</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder={'number of copies'}
                    style={{color: 'whitesmoke', fontWeight: '600'}}
                    onChangeText={text =>
                      handleNFTCopiesInput({market: 'btc', text})
                    }
                    value={nftCopies['btc']}
                  />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}>
                  {possible['btc']} possible
                </Text>
              </View>
            )}
            {nftType != 'exclusive' && (
              <View style={{marginVertical: 5}}>
                <View style={styles.header}>
                  <Text style={styles.title}>STACKS (STX)</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder={'number of copies'}
                    style={{color: 'whitesmoke', fontWeight: '600'}}
                    onChangeText={text =>
                      handleNFTCopiesInput({market: 'stx', text})
                    }
                  />
                </View>
              </View>
            )}
            {hasSOL && (
              <View style={{marginVertical: 5}}>
                <View style={styles.header}>
                  <Text style={styles.title}>SOLANA (SOL)</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder={'number of copies'}
                    style={{color: 'whitesmoke', fontWeight: '600'}}
                    onChangeText={text =>
                      handleNFTCopiesInput({market: 'sol', text})
                    }
                    value={nftCopies['sol']}
                  />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}>
                  {possible['sol']} possible
                </Text>
              </View>
            )}
            {hasADA && (
              <View style={{marginVertical: 5}}>
                <View style={styles.header}>
                  <Text style={styles.title}>CARDANO (ADA)</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder={'number of copies'}
                    style={{color: 'whitesmoke', fontWeight: '600'}}
                    onChangeText={text =>
                      handleNFTCopiesInput({market: 'ada', text})
                    }
                    value={nftCopies['ada']}
                    keyboardType="numeric"
                  />
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}>
                  {possible['ada']} possible
                </Text>
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 20,
            paddingTop: 15,
            paddingBottom: 15,
            marginHorizontal: 20,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: 'grey',
          }}>
          {loadingAudio ? (
            <ActivityIndicator color="blue" size="small" />
          ) : (
            <View style={{flexDirection: 'row'}}>
              <Button title="upload audio" onPress={handleUploadAudio} />
              {audioComplete && (
                <MaterialCommunityIcons
                  name="sticker-check"
                  size={30}
                  color="#cecece"
                />
              )}
            </View>
          )}
          {loadingImage ? (
            <ActivityIndicator color="blue" size="small" />
          ) : (
            <View style={{flexDirection: 'row'}}>
              <Button title="upload image" onPress={handleUploadImage} />
              {imageComplete && (
                <MaterialCommunityIcons
                  name="sticker-check"
                  size={30}
                  color="#cecece"
                />
              )}
            </View>
          )}
        </View>
        <Button
          title="next"
          onPress={handleNavigateProduct}
          disabled={!imageComplete || !audioComplete || nftCopies == null}
        />
      </SafeAreaView>
    </ScrollView>
  );
};
