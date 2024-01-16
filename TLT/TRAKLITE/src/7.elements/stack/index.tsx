import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  Text,
  Dimensions,
  Pressable,
  Button,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import Player from "../player";
import { VHeader, Body, BHeader } from "../typography";
import { TraklistPlayer } from "../../7.elements/traklist-player/TraklistPlayer";
import { useProvider, store } from "../../3.stores";
import * as actions from "../../3.stores";
import { TraklistPlayerView } from "../traklist-player-view/TraklistPlayerView";
import {
  TraklistPlayerContainer,
  FullScreenPlayerView,
} from "../../6.containers";
import { Loading } from "../loading";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";
import { SwipeCard } from "../swipe-card";
import { SwipeAdvert } from "../swipe-advert";

export interface StackProps {
  recommendations: any;
  handleRightSwipe: any;
  generateItems: (index: number) => void;
  isUnavailable: boolean;
  handleReload: () => void;
  visible: boolean;
  setVisible: (state: boolean) => void;
  state: any;
  popModal: () => void;
  handleNavigateTrack?: (id: any) => void;
  handleSetPlayer: (index: number) => void;
}
export const Stack: React.FC<StackProps> = ({
  recommendations,
  handleRightSwipe,
  generateItems,
  isUnavailable,
  handleReload,
  visible,
  setVisible,
  state,
  popModal,
  handleSetPlayer,
  handleNavigateTrack,
}) => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* { */}
      <Swiper
        backgroundColor="#1a1a1a"
        cards={recommendations}
        renderCard={(card: any, index) => {
          handleSetPlayer(index);

          return (
            <SwipeCard
              handleNavigateTrack={handleNavigateTrack}
              card={card}
              index={index}
            />
          );
        }}
        // onTapCard={({cardIndex, card}: any) => {
        //   const ids = {
        //     track: card.track.id,
        //     artist: card.artist.id,
        //   };
        //   console.log('🚀 ~ file: index.tsx ~ line 72 ~ ids', ids);
        //   handleNavigateTrack(ids);
        // }}
        onSwiped={(cardIndex) => generateItems(cardIndex)}
        onSwipedAll={() => {
          console.log("onSwipedAll");
        }}
        cardIndex={0}
        stackSize={10}
        stackSeparation={22}
        onSwipedRight={(index) => {
          handleRightSwipe(recommendations[index].track.id);
          popModal();
        }}
      />

      <Modal animationType="slide" transparent={true} visible={visible}>
        <View
          style={{
            backgroundColor: "#1A1A1A",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            width: 200,
            height: 100,
            borderRadius: 20,
            top: Dimensions.get("window").height / 2 - 50,
            right: Dimensions.get("window").width / 2 - 100,
            opacity: 0.9,
            flexDirection: "row",
          }}
        >
          <VHeader type="four" text="saved to " color="whitesmoke" />
          <MaterialCommunityIcons
            name="spotify"
            size={22}
            color={"whitesmoke"}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Stack;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
  },
  card: {
    // flex: 0.85,
    // alignSelf: "center",
    // height: 300,
    // width: 300,
    // borderRadius: 25,
    // marginTop: 20,
  },
  artist: {
    margin: 15,
    alignItems: "flex-end",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
  musicInfo: {
    margin: 10,
    flex: 1,
    opacity: 0.9,
  },
  songTexts: {
    backgroundColor: "black",
    opacity: 0.93,
    paddingVertical: 10,
    paddingLeft: 20,
    alignItems: "flex-start",
  },
  previewContainer: {
    height: 45,
    backgroundColor: "black",
    opacity: 0.93,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  preview: {
    flex: 1,
    opacity: 0.9,
  },
});
