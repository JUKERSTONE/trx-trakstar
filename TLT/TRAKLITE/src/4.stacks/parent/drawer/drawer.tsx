import React, { useContext } from "react";
import { SafeAreaView, Dimensions, Pressable } from "react-native";

import { Drawer } from "react-native-paper";

import { signOut } from "../../../2.auth";
import { useProvider } from "../../../3.stores";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { TraklistPlayer } from "../../../7.elements/traklist-player/TraklistPlayer";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import { VHeader, BHeader, Body } from "../../../7.elements/typography";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export interface DrawerProps {
  navigation: any;
}

export const DrawerContent: React.FC<DrawerProps> = ({
  navigation,
  ...props
}) => {
  const { state, setState } = useContext(useProvider);
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        flex: 1,
        borderRightWidth: 2,
        borderRightColor: "#fff",
      }}
    >
      <Drawer.Section title="OPTIONS.">
        <Drawer.Item
          style={{ backgroundColor: "#fff" }}
          icon={({ color }) => (
            <MaterialIcons name="swipe" color={color} size={20} />
          )}
          label="discover"
          onPress={() => {
            navigation.navigate("MainTab", { screen: "SWIPE" });
          }}
        />
        <Drawer.Item
          style={{ backgroundColor: "#fff" }}
          icon="music"
          label="for you"
          onPress={() => {
            navigation.navigate("MainTab", { screen: "MUSIC" });
          }}
        />
        <Drawer.Item
          style={{ backgroundColor: "#fff" }}
          icon="account"
          label="profile"
          onPress={() => {
            navigation.navigate("MainTab", { screen: "PROFILE" });
          }}
        />
        <Drawer.Item
          style={{ backgroundColor: "#cecece" }}
          icon={({ color }) => (
            <MaterialIcons name="settings" color={color} size={20} />
          )}
          label="settings"
        />
      </Drawer.Section>
      <Drawer.Section title="FEATURES.">
        <Drawer.Item
          style={{ backgroundColor: "#cecece" }}
          icon="cup"
          label="parties"
          onPress={() => {
            // navigation.navigate('Parties');
            alert("Coming Soon...");
          }}
        />
        <Drawer.Item
          style={{ backgroundColor: "#cecece" }}
          icon="library"
          label="catalog"
        />
        <Drawer.Item
          style={{ backgroundColor: "#cecece" }}
          icon="ticket"
          label="tickets"
        />
      </Drawer.Section>
      {/* <Drawer.Section title="ALERTS.">
        <Drawer.Item
          style={{backgroundColor: '#fff'}}
          icon={({color}) => (
            <MaterialIcons name="swipe" color={color} size={20} />
          )}
          label="swipe"
        />
        <Drawer.Item
          style={{backgroundColor: '#fff'}}
          icon="music"
          label="for you"
        />
        <Drawer.Item
          style={{backgroundColor: '#fff'}}
          icon="account"
          label="profile"
        />
      </Drawer.Section> */}
      <Drawer.Section title="MISC.">
        {state.loggedIn ? (
          <Drawer.Item
            style={{ backgroundColor: "#fff" }}
            icon={({ color }) => (
              <MaterialIcons name="logout" color={color} size={20} />
            )}
            label="sign out"
            onPress={() => {
              const data = {
                feed: state.feed,
                modals: {
                  modal: {
                    type: "",
                    full_screen: {
                      active: false,
                      image: "",
                    },
                    track_screen: {
                      active: false,
                      track: "",
                    },
                    artist_screen: {
                      active: false,
                      artist: "",
                    },
                    profile: {
                      active: false,
                      data: "",
                    },
                    post: {
                      active: false,
                    },
                  },
                },
                keys: {
                  spotify: {
                    s_client_token: state.keys.spotify.s_client_token,
                  },
                },
                player: state.player,
              };
              signOut(data);
              navigation.navigate("MainTab");
            }}
          />
        ) : (
          <Drawer.Item
            style={{ backgroundColor: "#fff" }}
            icon={({ color }) => (
              <MaterialIcons name="login" color={color} size={20} />
            )}
            label="sign in"
            onPress={() => {
              navigation.navigate("MainTab", { screen: "START" });
            }}
          />
        )}
      </Drawer.Section>
      <SafeAreaView style={{ backgroundColor: "#1a1a1a" }}>
        <TraklistPlayer />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default DrawerContent;
