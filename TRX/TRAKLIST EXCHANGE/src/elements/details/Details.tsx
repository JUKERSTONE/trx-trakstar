import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {VHeader, BHeader, Body, Caption} from '../../elements';
import {Picker} from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const DetailsElement = ({
  handleDetailsChange,
  handleNavigateNext,
  selectedValue,
  setSelectedValue,
  details,
  isValidTrakName,
  isValidTrakSymbol,
  seePassword,
  handleSeePassword,
  isValidPassword,
  isValidConfirmEmail,
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
          <VHeader type="three" color="#cecece" text={'PROFILE ESSENTIALS.'} />
          <Caption
            type="one"
            color="#cecece"
            text={'Lets begin building your profile.'}
          />
        </View>
        <View
          style={{
            backgroundColor: '#1a1a1a',
            height: '100%',
            padding: 10,
            paddingBottom: 100,
          }}>
          <View style={[{flexDirection: 'row'}, styles.inputContainer]}>
            <View style={{flex: 1, marginRight: 15}}>
              <TextInput
                onChangeText={text => handleDetailsChange(text, 'trak_name')}
                style={styles.input}
                placeholder="TRAK NAME"
                value={details['trak_name']}
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
          <View style={[styles.inputContainer, {flexDirection: 'row'}]}>
            <View style={{flex: 1}}>
              <TextInput
                onChangeText={text => handleDetailsChange(text, 'trak_symbol')}
                style={styles.input}
                placeholder="TRAK SYMBOL (e.g : BTC, ETH, TSB, etc.)"
                value={details['trak_symbol']}
              />
              <Caption
                type="two"
                color={'yellow'}
                text={
                  'a 3 or 4 letter ticker symbol (e.g : JHN, TRK, BMB, etc) '
                }
                textAlign="center"
              />
            </View>
            {isValidTrakSymbol && (
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
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: 'whitesmoke',
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
                type="four"
                color={'#1a1a1a'}
                text={`@`}
                textAlign="center"
              />
            </View>
            <VHeader
              type="three"
              color={'#1a1a1a'}
              text={`${details.trak_name}.${selectedValue}`}
              textAlign="center"
            />
            <Caption
              type="one"
              color={'#1a1a1a'}
              text={`   [${details.trak_symbol}]`}
              textAlign="center"
            />
          </View>
          <View style={[styles.inputContainer, {flexDirection: 'row'}]}>
            <View style={{flex: 1}}>
              <TextInput
                style={styles.input}
                onChangeText={text => handleDetailsChange(text, 'phone_number')}
                placeholder="PHONE NUMBER"
                value={details['phone_number']}
                keyboardType="phone-pad"
              />
            </View>
          </View>
          <View style={[styles.inputContainer, {flexDirection: 'row'}]}>
            <View style={{flex: 1}}>
              <TextInput
                style={styles.input}
                onChangeText={text =>
                  handleDetailsChange(text, 'email_address')
                }
                placeholder="EMAIL ADDRESS"
                value={details['email_address']}
                keyboardType="email-address"
              />
            </View>
            <View style={{marginLeft: 5}}>
              <MaterialCommunityIcons
                name={'check'}
                size={28}
                color={'whitesmoke'}
                style={{opacity: 0.9, paddingTop: 0}}
              />
            </View>
          </View>
          <View style={[styles.inputContainer, {flexDirection: 'row'}]}>
            <View style={{flex: 1}}>
              <TextInput
                style={styles.input}
                onChangeText={text =>
                  handleDetailsChange(text, 'confirm_email_address')
                }
                placeholder="CONFIRM EMAIL ADDRESS"
                value={details['confirm_email_address']}
                keyboardType="email-address"
              />
            </View>
            {isValidConfirmEmail && (
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
          <View style={[styles.inputContainer, {flexDirection: 'row'}]}>
            <View style={{flex: 1}}>
              <TextInput
                style={styles.input}
                onChangeText={text => handleDetailsChange(text, 'password')}
                placeholder="PASSWORD"
                value={details['password']}
                secureTextEntry={seePassword ? false : true}
              />
              <Caption
                // numberOfLines={1}
                type="two"
                color={'orange'}
                text={'some text about password strength'}
              />
            </View>
            <Pressable onPress={handleSeePassword}>
              <View style={{marginLeft: 5}}>
                <MaterialCommunityIcons
                  name={seePassword ? 'eye-off' : 'eye'}
                  size={28}
                  color={'whitesmoke'}
                  style={{opacity: 0.9, paddingTop: 0}}
                />
              </View>
            </Pressable>
            {isValidPassword && (
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
