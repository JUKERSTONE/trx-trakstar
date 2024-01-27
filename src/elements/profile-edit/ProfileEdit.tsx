import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {VHeader, BHeader, Body, Caption} from '../../elements';

export const ProfileEditElement = ({
  handleProfileEditChange,
  hasRequiredDetails,
  handleNavigateNext,
  handleUploadAvatar,
  uploadLoading,
  details,
}: any) => {
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
      <View
        style={{
          backgroundColor: '#1a1a1a',
          height: Dimensions.get('window').height * 0.7,
          padding: 10,
        }}>
        <TouchableOpacity onPress={handleUploadAvatar}>
          <View
            style={{
              backgroundColor: details.avatarURL ? 'green' : '#cecece',
              alignSelf: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 7,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}>
            {uploadLoading && (
              <ActivityIndicator
                color="#333333"
                size="small"
                style={{marginRight: 10}}
              />
            )}
            {details.avatarURL && (
              <Image
                source={{uri: details.avatarURL}}
                style={{
                  backgroundColor: '#1B4F26',
                  height: 30,
                  width: 30,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              />
            )}
            <VHeader
              type="four"
              color={details.avatarURL ? '#fff' : '#1a1a1a'}
              text={details.avatarURL ? 'uploaded ' : 'upload avatar'}
            />

            {/* <Button title="upload avatar" onPress={handleUploadAvatar} /> */}
          </View>
        </TouchableOpacity>

        {/* <View style={styles.inputContainer}>
          <TextInput
            onChangeText={text => handleProfileEditChange(text, 'bio')}
            style={styles.input}
            placeholder="BIO"
          />
        </View> */}
        {/* <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={text => handleProfileEditChange(text, 'quotable')}
            placeholder="QUOTABLE"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={text => handleProfileEditChange(text, 'location')}
            placeholder="LOCATION"
          />
        </View> */}

        <Button
          disabled={!details.avatarURL}
          title="next"
          onPress={handleNavigateNext}
        />
      </View>
    </ParallaxScrollView>
  );
};
