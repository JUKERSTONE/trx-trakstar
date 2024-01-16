import React, { useState, useEffect } from "react";

import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore

import {
  GET_STATE,
  PERSISTED_KEYS,
  PERSISTED_ISONBOARDED,
  PERSISTED_OFFLINE,
} from "./constants";
import axios from "axios";
import { Base64 } from "../8.core";
import * as actions from "../3.stores";
import { SPOTIFY_ACCOUNTS } from "../1.api";
import { requestUserPermission } from "./handlers";
import { TraklistAppStack } from "../4.stacks";
import {
  getUserData,
  signInWithSpotify,
  SPOTIFY_ACCOUNTS_KEY,
} from "../2.auth";
import { store, initialState, useProvider as GlobalState } from "../3.stores";
import { Loading } from "../7.elements/loading";
import { TraklistSignBackIn } from "../5.screens";
import { handleInitAppleMusic } from "./hooks";

export const App = () => {
  console.log("start");

  const [hasToken, setHasToken] = useState(false);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    console.log("🚀 ~ file: app.tsx ~ line 33 ~ App ~ state", state);
  }, [state]);

  const Drawer = createDrawerNavigator();

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  store.subscribe(async () => {
    setState(GET_STATE(store));
    console.log(GET_STATE(store));

    const persisted = {
      keys: PERSISTED_KEYS(store),
      offline: PERSISTED_ISONBOARDED(store) ? PERSISTED_OFFLINE(store) : null,
    };

    try {
      await AsyncStorage.setItem("traklist_state", JSON.stringify(persisted));
    } catch (error) {
      // Error saving data
    }
  });

  useEffect(() => {
    (async () => {
      await requestUserPermission();
    })();
    // handleClearAsync();
  }, []);

  const handleClearAsync = async () => {
    AsyncStorage.clear();
  };

  useEffect(() => {
    handleInitAppleMusic();

    axios
      .post(SPOTIFY_ACCOUNTS, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + Base64.btoa(SPOTIFY_ACCOUNTS_KEY),
        },
      })
      .then((response) => {
        const clientCredentials = response.data.access_token;
        store.dispatch(
          actions.SPOTIFY_CLIENT_TOKEN(
            "spotify client credentials.",
            clientCredentials
          )
        );
      })
      .catch((err) => alert(err));
  }, []);

  // console.log = function () {};

  return (
    <GlobalState.Provider value={{ state, setState }}>
      <TraklistAppStack />
    </GlobalState.Provider>
  );
};
