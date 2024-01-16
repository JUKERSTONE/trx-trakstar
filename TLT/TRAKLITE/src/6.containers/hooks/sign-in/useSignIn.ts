import { useState } from "react";

import { SignInState } from "./types";
import { store } from "../../../3.stores";
import * as actions from "../../../3.stores";
import { updateSignInState, signInState } from "./handlers";
import {
  signIn,
  signInWithSpotify,
  signInWithAppleMusic,
} from "../../../2.auth";
import axios from "axios";
// @ts-ignore
import AppleMusic from "@bouncyapp/react-native-apple-music";

export const useSignIn = (navigation: any) => {
  const [signInForm, setSignInForm] = useState<SignInState>(signInState);
  const [isLoadingTraklist, setIsLoadingTraklist] = useState(false);
  const [isLoadingSpotify, setIsLoadingSpotify] = useState(false);
  const [isLoadingApple, setIsLoadingApple] = useState(false);

  const handleSignInChange = (text: any, field: any) =>
    updateSignInState(text, field, signInForm, setSignInForm);

  // const handleSignInWithTraklist = async () => {
  //   setIsLoadingTraklist(true);
  //   const newData = await signIn(signInForm);

  //   if (newData.success) {
  //     setIsLoadingTraklist(false);
  //     store.dispatch(actions.USER_LOGGED_IN("log user in.", newData));
  //   } else {
  //     setIsLoadingTraklist(false);
  //     alert("User details not found. Try again");
  //   }
  // };

  const handleSignInWithSpotify = async () => {
    setIsLoadingSpotify(true);
    const newData = await signInWithSpotify();

    if (newData.success) {
      setIsLoadingSpotify(false);
      store.dispatch(actions.USER_LOGGED_IN("log user in.", newData.data));
    } else {
      setIsLoadingSpotify(false);
      alert(newData.data);
    }
  };

  const handleSignInWithApple = async () => {
    const isLoggedIn = await AppleMusic.login();
    if (isLoggedIn === true) {
      const newData = await signInWithAppleMusic();

      if (newData.success) {
        setIsLoadingSpotify(false);
        store.dispatch(
          actions.USER_LOGGED_IN_SPOTIFY("log user in.", newData.data)
        );
        alert(JSON.stringify(newData));
      } else {
        setIsLoadingSpotify(false);
        alert(newData.data);
      }

      // alert(JSON.stringify(profile));
    } else {
      alert(isLoggedIn);
    }

    // await AppleMusic.getUserMusicToken();
  };

  const handleAuthNavigation = () => {
    navigation.navigate("REGISTER.");
  };

  return {
    handleSignInChange,
    // handleSignInWithTraklist,
    handleSignInWithSpotify,
    handleSignInWithApple,
    handleAuthNavigation,
    isLoadingTraklist,
    isLoadingSpotify,
    isLoadingApple,
  };
};

export default useSignIn;
