import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';
import {registrationFormContent} from './fields';
import {FormSection} from '../form_section';
import {SubmitButton} from '../buttons/submit';
import {VHeader, BHeader, Body} from '../typography';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {KeyboardAvoiding} from '../keyboard-avoiding';
export interface RegistrationProps {
  handleRegistrationChange: any;
  handleRegistrationSubmit: any;
  handleSpotifyAuthentication: any;
  handleImageUpload: any;
  handleAuthNavigation: any;
  isLoading: boolean;
  isLoadingSpotify: boolean;
  isLoadingAvatar: boolean;
  hasAuthenticatedSpotify: boolean;
  hasLoadedAvatar: boolean;
}

export const Registration: React.FC<RegistrationProps> = ({
  handleImageUpload,
  handleRegistrationChange,
  handleRegistrationSubmit,
  handleSpotifyAuthentication,
  handleAuthNavigation,
  isLoading,
  isLoadingSpotify,
  isLoadingAvatar,
  hasAuthenticatedSpotify,
  hasLoadedAvatar,
}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#1a1a1a'}}>
      <ParallaxScrollView
        backgroundColor={'#1a1a1a'}
        parallaxHeaderHeight={200}
        stickyHeaderHeight={150}
        renderBackground={() => (
          <LinearGradient colors={['#1a1a1a', '#000']}>
            <View
              style={{
                height: 150,
                alignItems: 'center',
                justifyContent: 'space-around',
                borderBottomWidth: 1.8,
                borderColor: 'yellow',
              }}>
              <Image
                style={{
                  height: 200,
                  width: 300,
                  marginTop: 3,
                  borderRadius: 8,
                }}
                resizeMode="contain"
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/fun.png?alt=media',
                }}
              />
            </View>
          </LinearGradient>
        )}>
        <KeyboardAvoiding>
          <View
            style={{
              backgroundColor: '#1a1a1a',
              height: '100%',
            }}>
            <View style={styles.registration_form}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <VHeader type="five" color="white" text={'STEP 1.'} />
                {!hasAuthenticatedSpotify && !isLoadingSpotify && (
                  <Button
                    title="authenticate with spotify"
                    onPress={handleSpotifyAuthentication}
                  />
                )}
                {isLoadingSpotify && (
                  <ActivityIndicator size="large" color="#00ff00" />
                )}
                {hasAuthenticatedSpotify && (
                  <MaterialCommunityIcons
                    name="sticker-check"
                    size={30}
                    color="#cecece"
                  />
                )}
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <VHeader type="five" color="white" text={'STEP 2.'} />
                {!hasLoadedAvatar && !isLoadingAvatar && (
                  <Button
                    title="upload your avatar"
                    onPress={handleImageUpload}
                  />
                )}
                {isLoadingAvatar && (
                  <ActivityIndicator size="large" color="#00ff00" />
                )}
                {hasLoadedAvatar && (
                  <MaterialCommunityIcons
                    name="sticker-check"
                    size={30}
                    color="#cecece"
                  />
                )}
              </View>
              <View style={styles.action}>
                <View style={{marginBottom: 8}}>
                  <VHeader type="five" color="white" text={'STEP 3.'} />
                </View>

                {registrationFormContent.map((section, key) => (
                  <View style={styles.section} key={key}>
                    <FormSection
                      key={section.name}
                      formType="register"
                      handleRegistrationChange={handleRegistrationChange}
                      {...section}
                    />
                  </View>
                ))}
              </View>
              <View style={styles.action}>
                <SubmitButton
                  isLoading={isLoading}
                  formType="register"
                  handleRegistrationSubmit={handleRegistrationSubmit}>
                  <Text>LET'S BEGIN</Text>
                </SubmitButton>
                <Button
                  title="got an account? sign in instead"
                  onPress={handleAuthNavigation}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoiding>
      </ParallaxScrollView>
    </View>
  );
};

export default Registration;
