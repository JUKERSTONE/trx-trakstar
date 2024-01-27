import React, {FC, useContext} from 'react';
import {
  View,
  ImageBackground,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  SafeAreaView,
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
  handleChangeText,
  handleProfile,
  handleClearText,
  query,
  isSearching,
  TRXProfile,
  ...props
}: any) => {
  console.log('🚀 ~ file: index.tsx ~ line 31 ~ isLoggedIn', isLoggedIn);
  return (
    <View
      style={{
        height: '100%',
        paddingBottom: 0,
        justifyContent: 'flex-end',
      }}>
      {/* <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: Dimensions.get('window').width,
          height: 80,
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          alignItems: 'center',
          flexDirection: 'row',
          paddingTop: 30,
        }}></View> */}
      <SafeAreaView>
        <View style={styles.outerContainer}>
          <View style={styles.innerContainer}>
            <View style={{flex: 1}}>
              <View style={styles.label}>
                <VHeader type="five" color={'#1a1a1a'} text={'search'} />
              </View>
              <TextInput
                keyboardAppearance="dark"
                style={styles.input}
                onChangeText={handleChangeText}
                autoCorrect={false}
                // value={query}
              />
            </View>
          </View>
          {isSearching && (
            <TouchableOpacity
              onPress={handleClearText}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 10,
                alignSelf: 'center',
                width: '15%',
                padding: 5,
                borderRadius: 5,
                backgroundColor: 'green',
              }}>
              <VHeader type="five" color={'white'} text={'RETURN'} />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export const styles = StyleSheet.create({
  outerContainer: {
    borderWidth: 4,
    borderColor: '#0000',
    borderRadius: 11,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: '80%',
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
