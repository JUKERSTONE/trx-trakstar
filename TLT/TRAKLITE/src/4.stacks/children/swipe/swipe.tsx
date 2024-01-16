import React, { useContext } from "react";
import { Image, SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { SearchLanding } from "../../../5.screens";
import { SearchResults } from "../../../5.screens";
import { SwipeScreen, Track } from "../../../5.screens";
import { store, useProvider } from "../../../3.stores";
import * as actions from "../../../3.stores";
import { TraklistPlayerContainer } from "../../../6.containers/hooks/traklist-player/TraklistPlayer";
import { Header } from "../../../6.containers/hooks/header";

export const SwipeStack: React.FC<any> = ({ navigation }) => {
  const { state } = useContext(useProvider);
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1a1a1a",
        },
        headerTintColor: "#cecece",
      }}
    >
      <Stack.Screen
        name="SWIPE."
        component={SwipeScreen}
        options={{
          title: "",
          header: (props) => {
            if (state.player.title && state.player.isHidden) {
              return (
                <Header
                  {...props}
                  hasOptions
                  hasShare
                  hasMenu
                  hasGoBack={false}
                />
              );
            }
          },
        }}
      />
      <Stack.Screen
        name="TrackView"
        component={Track}
        options={{
          title: "DISCOVER",
          header: (props) => {
            if (state.player.title && state.player.isHidden) {
              return <Header {...props} hasShazam />;
            }
          },
        }}
      />
    </Stack.Navigator>
  );
};
