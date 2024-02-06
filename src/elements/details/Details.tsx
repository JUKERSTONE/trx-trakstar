import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {VHeader, BHeader, Body, Caption} from '../../elements';
import {Picker} from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PhoneInput from 'react-native-international-phone-number';

export const DetailsElement = ({
  handleDetailsChange,
  handleNavigateNext,
  selectedValue,
  setSelectedValue,
  details,
  isValidTrakName,
  isValidTrakSymbol,
  isValidAvatarURL,
  seePassword,
  handleSeePassword,
  isValidPassword,
  isValidConfirmEmail,
  handleUploadAvatar,
  uploadLoading,
  handleConfirmPhone,
  selectedPhoneCode,
  setSelectedPhoneCode,
  isValidPhoneNumber,
  isValidOTP,
  handleConfirmOTP,
}: any) => {
  const servers = ['btc', 'eth', 'nft', 'trx', 'stx', 'sol', 'tsb'];
  return (
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
        }}>
        <View style={{padding: 15, backgroundColor: '#1a1a1a'}}>
          <VHeader type="three" color="#cecece" text={'PROFILE.'} />
          <Caption type="one" color="#cecece" text={'Lets begin.'} />
        </View>

        <View
          style={{
            backgroundColor: '#1a1a1a',
            height: '100%',
            paddingHorizontal: 10,
          }}>
          <View style={[{flexDirection: 'row'}, styles.inputContainer]}>
            <View style={{flex: 1, marginRight: 15}}>
              <TextInput
                onChangeText={text => handleDetailsChange(text, 'trak_name')}
                style={styles.input}
                placeholder="TRAK NAME"
                value={details['trak_name']}
                placeholderTextColor="grey"
                maxLength={12}
                autoCapitalize="none"
              />
            </View>

            <View style={{flex: 1}}>
              <Picker
                itemStyle={{height: 37, fontSize: 10}}
                style={{backgroundColor: '#cecece', borderRadius: 5}}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }>
                {servers.map((item: any) => {
                  return <Picker.Item label={item.label} value={item.value} />;
                })}
                <Picker.Item label=".TRX" value="trx" />
                <Picker.Item label=".BTC" value="btc" />
                <Picker.Item label=".ETH" value="eth" />
                <Picker.Item label=".NFT" value="nft" />
                <Picker.Item label=".STX" value="stx" />
                <Picker.Item label=".SOL" value="sol" />
                <Picker.Item label=".TSB" value="tsb" />
              </Picker>
              <Caption
                // numberOfLines={1}
                type="two"
                color={'yellow'}
                text={'scroll to choose your server'}
                textAlign="center"
              />
            </View>
            {/*  */}
            {isValidTrakName && (
              <View style={{marginLeft: 5}}>
                <MaterialCommunityIcons
                  name={'check'}
                  size={28}
                  color={'whitesmoke'}
                  style={{opacity: 0.9, paddingTop: 0}}
                />
              </View>
            )}
          </View>

          {details.trak_name ? (
            <View
              style={[
                styles.inputContainer,
                {
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderRadius: 5,
                  alignSelf: 'center',
                  flexDirection: 'row',
                },
              ]}>
              <View style={{justifyContent: 'center'}}>
                <VHeader
                  // numberOfLines={1}
                  type="five"
                  color={'whitesmoke'}
                  text={`@`}
                  textAlign="center"
                />
              </View>
              <VHeader
                type="four"
                color={'whitesmoke'}
                text={`${details.trak_name}.${selectedValue}`}
                textAlign="center"
              />
            </View>
          ) : null}

          <View style={[styles.inputContainer]}>
            <View style={{flex: 1}}>
              {!isValidPhoneNumber ? (
                <PhoneInput
                  disabled={isValidPhoneNumber}
                  defaultCountry="GB"
                  value={details['phone_number']}
                  onChangePhoneNumber={text =>
                    handleDetailsChange(text, 'phone_number')
                  }
                  selectedCountry={selectedPhoneCode}
                  onChangeSelectedCountry={setSelectedPhoneCode}
                />
              ) : null}
              <View style={{flexDirection: 'row', flex: 1, marginTop: 10}}>
                <View>
                  <Text style={{color: '#fff'}}>
                    Country:{' '}
                    {`${selectedPhoneCode?.name?.en} (${selectedPhoneCode?.cca2})`}
                  </Text>
                  <Text style={{color: '#fff'}}>
                    Phone Number: {selectedPhoneCode?.callingCode}{' '}
                    {details['phone_number']}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    flex: 1,
                  }}>
                  <TouchableOpacity onPress={handleConfirmPhone}>
                    <View
                      style={{
                        backgroundColor: isValidPhoneNumber
                          ? 'green'
                          : '#cecece',
                        alignSelf: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingVertical: 7,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                        marginLeft: 20,
                      }}>
                      {!details.avatarURL && (
                        <MaterialIcons
                          name={isValidPhoneNumber ? 'cancel' : 'check'}
                          size={18}
                          color={'#1a1a1a'}
                          style={{opacity: 0.9, marginRight: 5}}
                        />
                      )}
                      {uploadLoading && (
                        <ActivityIndicator
                          color="#333333"
                          size="small"
                          style={{marginRight: 10}}
                        />
                      )}
                      <VHeader
                        type="five"
                        color={isValidPhoneNumber ? '#fff' : '#1a1a1a'}
                        text={isValidPhoneNumber ? 'change ' : 'confirm'}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {isValidPhoneNumber ? (
                <View style={{flexDirection: 'row', marginTop: 15}}>
                  <TextInput
                    editable={!isValidOTP}
                    onChangeText={text => handleDetailsChange(text, 'otp')}
                    style={{
                      flex: 1,
                      backgroundColor: 'whitesmoke',
                      borderRadius: 5,
                      padding: 10,
                    }}
                    placeholder="ONE TIME PASSWORD"
                    value={details['otp']}
                    placeholderTextColor="grey"
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={handleConfirmOTP}>
                    <View
                      style={{
                        backgroundColor: isValidOTP ? 'green' : '#cecece',
                        alignSelf: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingVertical: 7,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                        marginLeft: 20,
                      }}>
                      {!details.avatarURL && (
                        <MaterialIcons
                          name={isValidOTP ? 'cancel' : 'check'}
                          size={18}
                          color={'#1a1a1a'}
                          style={{opacity: 0.9, marginRight: 5}}
                        />
                      )}
                      <VHeader
                        type="five"
                        color={isValidOTP ? '#fff' : '#1a1a1a'}
                        text={isValidOTP ? 'change ' : 'confirm'}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>

          <TouchableOpacity onPress={handleNavigateNext}>
            <View
              style={{
                backgroundColor: '#fff',
                margin: 5,
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 15,
              }}>
              <Caption
                type="one"
                color="#1a1a1a"
                text={'NEXT'}
                textAlign="right"
              />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ParallaxScrollView>
  );
};
