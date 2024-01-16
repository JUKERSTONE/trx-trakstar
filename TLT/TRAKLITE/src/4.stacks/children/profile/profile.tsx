import React, { useContext } from "react";
import { Image, SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useProvider, store } from "../../../3.stores";

import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Profile, Tape, Track, Artist } from "../../../5.screens";
import { Caption } from "../../../5.screens";
import { Timeline } from "../../../5.screens";
import { UserProfile } from "../../../5.screens";
import { Header } from "../../../6.containers";
import {
  TraklistPlayerContainer,
  FullScreenPlayerView,
} from "../../../6.containers";

export const ProfileStack: React.FC<any> = ({ ...props }) => {
  const { navigation } = props;
  const Stack = createStackNavigator();
  const { state } = useContext(useProvider);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1a1a1a",
        },
        headerTintColor: "#1a1a1a",
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: () => {
            if (state.player.title && state.player.isHidden) {
              return (
                <Header
                  hasGoBack={false}
                  hasShare
                  hasInbox
                  hasMenu
                  {...props}
                />
              );
            }
          },
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          title: "",
          headerLeft: () => (
            <Entypo.Button
              name="menu"
              size={25}
              backgroundColor="transparent"
              color="yellow"
              onPress={() => navigation.openDrawer()}
              style={{ paddingLeft: 16 }}
            ></Entypo.Button>
          ),
          headerRight: () => (
            <MaterialCommunityIcons.Button
              name="waveform"
              size={30}
              backgroundColor="transparent"
              color="yellow"
              onPress={() => alert("Shazam feature coming soon...")}
              style={{ paddingLeft: 16 }}
            ></MaterialCommunityIcons.Button>
          ),
        }}
      />
      <Stack.Screen
        name="TrackView"
        component={Track}
        options={{
          header: () => {
            if (state.player.title && state.player.isHidden) {
              return <Header hasShazam {...props} />;
            }
          },
        }}
      />
      <Stack.Screen
        name="ArtistView"
        component={Artist}
        options={{
          header: () => {
            if (state.player.title && state.player.isHidden) {
              return <Header hasShazam {...props} />;
            }
          },
        }}
      />
    </Stack.Navigator>
  );
};
