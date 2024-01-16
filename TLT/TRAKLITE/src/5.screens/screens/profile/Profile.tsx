import React, { useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  ImageBackground,
  FlatList,
} from "react-native";
import {
  ProfileHeaderView,
  ProfileView,
  SearchFriendsView,
} from "../../../6.containers";
// @ts-ignore
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { TraklistApp } from "../../../6.containers/hooks/traklist-app/TraklistApp";
import { useProvider } from "../../../3.stores";
interface TProfile {
  navigation: any;
  route: any;
}

export const Profile: React.FC<TProfile> = ({ navigation, route }) => {
  const { state } = useContext(useProvider);
  let tab;
  // const
  return (
    <TraklistApp navigation={navigation}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#1a1a1a" }}>
        <ParallaxScrollView
          backgroundColor={"#1a1a1a"}
          // contentBackgroundColor="pink"
          parallaxHeaderHeight={0}
        >
          {state.options.hasSearch ? (
            <SearchFriendsView />
          ) : (
            <View>
              <ProfileHeaderView />
              <ProfileView navigation={navigation} />
            </View>
          )}
        </ParallaxScrollView>
      </SafeAreaView>
    </TraklistApp>
  );
};
