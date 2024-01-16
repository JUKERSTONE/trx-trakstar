import React from "react";
import { View, Text, Image, Button, Dimensions } from "react-native";

import Fontisto from "react-native-vector-icons/Fontisto";

import styles from "./styles";
import { signInFormContent } from "./fields";
import { FormSection } from "../form_section";
import { SubmitButton } from "../buttons/submit";
import { VHeader } from "../typography";
import LinearGradient from "react-native-linear-gradient";
// @ts-ignore
import ParallaxScrollView from "react-native-parallax-scroll-view";

export interface SignInProps {
  handleSignInChange: any;
  // handleSignInWithTraklist: any;
  handleSignInWithSpotify: any;
  handleSignInWithApple: any;
  handleAuthNavigation: () => void;
  isLoadingTraklist: boolean;
  isLoadingSpotify: boolean;
  isLoadingApple: boolean;
}

export const SignIn: React.FC<SignInProps> = ({
  handleSignInChange,
  // handleSignInWithTraklist,
  handleSignInWithSpotify,
  handleSignInWithApple,
  handleAuthNavigation,
  isLoadingTraklist,
  isLoadingSpotify,
  isLoadingApple,
}) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#1a1a1a" }}>
      <ParallaxScrollView
        backgroundColor={"#1a1a1a"}
        parallaxHeaderHeight={200}
        stickyHeaderHeight={150}
        renderBackground={() => (
          <LinearGradient colors={["#1a1a1a", "#000"]}>
            <View
              style={{
                height: 200,
                alignItems: "center",
                justifyContent: "space-around",
                borderBottomWidth: 1.8,
                borderColor: "yellow",
              }}
            >
              <Image
                style={{
                  height: 200,
                  width: 300,
                  marginTop: 3,
                  borderRadius: 8,
                }}
                resizeMode="contain"
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/fun.png?alt=media",
                }}
              />
            </View>
          </LinearGradient>
        )}
      >
        <View
          style={{
            backgroundColor: "#1a1a1a",
            height: Dimensions.get("window").height,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
              paddingHorizontal: 40,
              // paddingVertical: 20,
            }}
          >
            <View style={styles.registration_form}>
              <View style={[styles.action, styles.section]}>
                <SubmitButton
                  isLoading={isLoadingSpotify}
                  backgroundColor="#1DB954"
                  formType="sign in"
                  handleSignInSubmit={handleSignInWithSpotify}
                >
                  <Text>sign in with </Text>{" "}
                  <Fontisto name="spotify" size={15} />
                </SubmitButton>
              </View>
              <View style={[styles.action, styles.section]}>
                <SubmitButton
                  isLoading={isLoadingApple}
                  backgroundColor="#FC3C44"
                  formType="sign in"
                  handleSignInSubmit={handleSignInWithApple}
                >
                  <Text>sign in with </Text>{" "}
                  <Fontisto name="applemusic" size={15} />
                </SubmitButton>
              </View>
              {/* <Button
                title="no account? register now!"
                onPress={handleAuthNavigation}
              /> */}
            </View>
          </View>
        </View>
      </ParallaxScrollView>
    </View>
  );
};

export default SignIn;
