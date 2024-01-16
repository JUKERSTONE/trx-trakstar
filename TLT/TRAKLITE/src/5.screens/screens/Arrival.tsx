import React, { useEffect, useState, useContext } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  store,
  initialState,
  useProvider as GlobalState,
} from "../../3.stores";
import {
  getUserData,
  signInWithSpotify,
  SPOTIFY_ACCOUNTS_KEY,
} from "../../2.auth";
import * as actions from "../../3.stores";
import { useProvider } from "../../3.stores";
import { VHeader } from "../../7.elements/typography";

export const ArrivalScreen = ({ ...props }) => {
  const [hasToken, setHasToken] = useState(false);
  const { state } = useContext(useProvider);

  useEffect(() => {
    if (!state.loggedIn) {
      setTimeout(async () => {
        const newUserData = await signInWithSpotify();
        console.log(
          "🚀 ~ file: Arrival.tsx ~ line 30 ~ setTimeout ~ newUserData.data",
          newUserData.data
        );
        console.log(
          "🚀 ~ file: Arrival.tsx ~ line 25 ~ setTimeout ~ newUserData.data",
          newUserData.data
        );
        if (newUserData.success) {
          // setIsLoadingSpotify(false);
          store.dispatch(
            actions.USER_LOGGED_IN("log user in.", newUserData.data)
          );
          setHasToken(false);
        } else {
          // setIsLoadingSpotify(false);
          alert(
            newUserData.data == undefined
              ? "Welcome to TRAKLITE"
              : newUserData.data
          );
          store.dispatch(actions.FAILED_INITIAL_AUTH("initial auth."));
          // props.navigation.navigate('SWIPE');
          setHasToken(false);
        }
      }, 600);
    }
  }, []);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#1a1a1a",
      }}
    >
      <View style={{ marginBottom: 10 }}>
        <VHeader
          type="four"
          text="TRAKLITE : FIND NEW SPOTIFY MUSIC"
          color="#cecece"
        />
      </View>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};
