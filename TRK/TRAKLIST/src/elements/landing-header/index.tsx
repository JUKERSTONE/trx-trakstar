import React, {FC, useContext} from 'react';
import {
  View,
  ImageBackground,
  TouchableHighlight,
  FlatList,
  Pressable,
  Image,
  Dimensions,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
// import {Input} from '../input';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {VHeader} from '../typography';

export const LandingHeader = ({
  handleSearchQuery,
  handleDeposit,
  isLoggedIn,
  handleAuthentication,
  ...props
}: any) => {
  console.log('🚀 ~ file: index.tsx ~ line 31 ~ isLoggedIn', isLoggedIn);
  return (
    <View
      style={{
        height: 200,
        padding: 6,
        paddingBottom: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: Dimensions.get('window').width,
          height: 80,
          justifyContent: 'space-between',
          paddingHorizontal: 25,
          alignItems: 'center',
          flexDirection: 'row',
          paddingTop: 30,
        }}>
        <Pressable onPress={() => alert('toggle menu')}>
          <MaterialCommunityIcons
            name={'microsoft-xbox-controller-menu'}
            size={28}
            color={'whitesmoke'}
            style={{opacity: 0.9, paddingTop: 0}}
          />
        </Pressable>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', marginRight: 15}}>
            <Pressable onPress={handleDeposit}>
              <MaterialCommunityIcons
                name={'cash-usd'}
                size={30}
                color={'whitesmoke'}
                style={{opacity: 0.9, paddingTop: 0}}
              />
            </Pressable>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Pressable onPress={handleAuthentication}>
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
      <SafeAreaView>
        <View style={styles.outerContainer}>
          <View style={styles.innerContainer}>
            <View style={{flex: 1}}>
              <View style={styles.label}>
                <VHeader type="five" color={'grey'} text={'search'} />
              </View>
              <TextInput
                style={styles.input}
                // onChangeText={onChangeText}
                // value={text}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export const styles = StyleSheet.create({
  outerContainer: {
    borderWidth: 3,
    borderColor: 'transparent',
    borderRadius: 11,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: 327,
    borderRadius: 8,
    borderWidth: 1,
    // borderColor: props.borders.inner,
    backgroundColor: 'whitesmoke',
  },
  label: {
    // color: props.labelColor,
    fontSize: 12,
    fontWeight: '500',
    paddingLeft: 16,
    // marginBottom: 8,
    paddingTop: 15,
    marginTop: 10,
  },
  input: {
    // color: props.color,
    fontSize: 14,
    fontWeight: '500',
    paddingLeft: 16,
    paddingBottom: 20,
  },
  error: {
    // color: themes.input.shared.validationErrorColor,
    textAlign: 'right',
    marginTop: 12,
  },
  icon: {
    paddingRight: 16,
  },
});
