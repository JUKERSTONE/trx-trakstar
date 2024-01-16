import React, { useState, useContext, useEffect } from "react";
import { Image } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { TraklistApp } from "../../../6.containers/hooks/traklist-app/TraklistApp";
import { store } from "../../../3.stores";
import { useProvider } from "../../../3.stores";

import { Profile, SwipeScreen, ArrivalScreen } from "../../../5.screens";
import {
  AuthStack,
  FeedStack,
  DiscoverStack,
  SwipeStack,
  ProfileStack,
  OnboardingStack,
} from "../../children";

const Tab = createMaterialBottomTabNavigator();

export const MainTab = ({ ...props }) => {
  const { state } = useContext(useProvider);
  console.log("start2");

  // useEffect(() => {
  //   if (!state.loggedIn) {
  //     props.navigation.navigate('START');
  //   }
  // }, []);
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      barStyle={{
        backgroundColor: "#1a1a1a",
        borderTopColor: "#fff",
        borderTopWidth: 3,
      }}
      activeColor="#1db954"
      inactiveColor="whitesmoke"
      style={{ backgroundColor: "transparent" }}
      {...props}
    >
      {state.loggedIn || state.isFailedInitialAuth ? (
        <Tab.Screen
          name="SWIPE"
          component={
            state.offline?.isOnboarded || state.loggedIn
              ? SwipeStack
              : OnboardingStack
          }
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name="swipe"
                color={color}
                size={24}
                style={{ paddingTop: 1 }}
              />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="ARRIVAL"
          component={ArrivalScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name="home"
                color={color}
                size={24}
                style={{ paddingTop: 1 }}
              />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="MUSIC"
        component={DiscoverStack}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => (
            <Image
              style={{
                height: 30,
                width: 30,
                marginTop: 5,
                backgroundColor: focused ? "#fff" : "whitesmoke",
                borderRadius: 15,
                borderWidth: 3,
                borderColor: focused ? "green" : "#fff",
                opacity: focused ? 1 : 0.8,
              }}
              source={{
                uri: focused
                  ? "https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/Asset%207.png?alt=media"
                  : "https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/TRAKLIST.png?alt=media",
              }}
            />
          ),
        }}
      />
      {state.loggedIn ? (
        <Tab.Screen
          name="PROFILE"
          component={ProfileStack}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome5
                name="users"
                color={color}
                size={20}
                style={{ paddingTop: 5 }}
              />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="START"
          component={AuthStack}
          options={{
            tabBarLabel: "",
            tabBarColor: "#1a1a1a",
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name="login"
                color={color}
                style={{ paddingTop: 2 }}
                size={25}
              />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};
