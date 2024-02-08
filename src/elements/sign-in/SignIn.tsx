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
  ActivityIndicator,
} from 'react-native';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {VHeader, BHeader, Body, Caption} from '../../elements';
import {Picker} from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PhoneInput from 'react-native-international-phone-number';

export const SignInElement = ({
  handleSignInChange,
  handleSignInEvent,
  isValidPhoneNumber,
  selectedPhoneCode,
  setSelectedPhoneCode,
  handleConfirmPhone,
  handleDetailsChange,
  details,
  uploadLoading,
  isValidOTP,
  handleConfirmOTP,
}: any) => {
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
