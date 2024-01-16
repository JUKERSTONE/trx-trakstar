import React, { useContext } from "react";

import { View, Text, SafeAreaView, ImageBackground } from "react-native";
// @ts-ignore
import ParallaxScrollView from "react-native-parallax-scroll-view";
import {
  LandingNewReleaseView,
  LandingRecommendationsView,
  LandingTrendingView,
  LandingFeaturesView,
  LandingHeaderView,
  LandingNewsView,
  ContentSearchView,
} from "../../6.containers";
import { LandingHeader } from "../../7.elements/landing-header";
import { useProvider } from "../../3.stores";
import style from "../../../storybook/stories/0.CenterView/style";

export const Discover = ({ handleSearchQuery, ...props }: any) => {
  const { state } = useContext(useProvider);

  return (
    <SafeAreaView style={{ backgroundColor: "#1a1a1a", flex: 1 }}>
      <ParallaxScrollView
        backgroundColor="#1a1a1a"
        contentBackgroundColor="#1a1a1a"
        parallaxHeaderHeight={200}
        stickyHeaderHeight={100}
        renderBackground={() => (
          <ImageBackground
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/poster_mark_black.png?alt=media",
            }}
            style={{
              height: 200,
              padding: 6,
              paddingBottom: 80,
              backgroundColor: "#1A1A1A",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            // imageStyle = {{borderBottomWidth : 2, borderTopColor : 'yellow'}}
          ></ImageBackground>
        )}
        renderForeground={() => (
          <LandingHeaderView handleSearchQuery={handleSearchQuery} {...props} />
        )}
      >
        {props.isSearching ? (
          <ContentSearchView
            navigation={props.navigation}
            route={props.route}
            type={"track"}
            modeProp={"discover"}
            isNavigation={false}
            discoverContent={props.content}
            isDiscover
          />
        ) : (
          <View style={{ paddingBottom: 300 }}>
            <LandingTrendingView />
            <LandingFeaturesView {...props} />
            {state.loggedIn && (
              <LandingRecommendationsView navigation={props.navigation} />
            )}
            <LandingNewReleaseView navigation={props.navigation} />
            <LandingNewsView />
          </View>
        )}
        {/* <LandingChartsView /> */}
      </ParallaxScrollView>
    </SafeAreaView>
  );
};
