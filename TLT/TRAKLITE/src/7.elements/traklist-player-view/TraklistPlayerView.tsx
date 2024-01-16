import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  Button,
  Pressable,
  Text,
  Image,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  VHeader,
  Body,
  Paragraph,
  BHeader,
  Caption,
} from "../../7.elements/typography";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { ProgressBar, Colors } from "react-native-paper";

interface TTraklistPlayerView {
  state: any;
  handleTogglePlay: any;
  handlePost: () => void;
  hasPost?: boolean;
  handleLock: () => void;
  handleFullScreenModal: () => void;
  handleMute: () => void;
  // handleInfo: (id: any) => void;
  hasInfo?: boolean;
  handleGoBack?: () => void;
  hasShazam?: boolean;
  hasGoBack?: boolean;
  handleOptions: () => void;
  hasHistory?: boolean;
  handleShazam?: () => void;
  isSaved?: boolean;
  hasMenu: boolean;
  handleMenu?: () => void;
  hasPlayer: boolean;
  hasShare: boolean;
  handleTrackNavigation: any;
  hasInbox: any;
  hasSearch: any;
  hasOptions: any;
  isNewTrak: any;
  handleReplay: any;
  handleSearch: any;
  handleInbox: any;
  handleShareTrack: any;
}

export const TraklistPlayerView: React.FC<TTraklistPlayerView> = ({
  state,
  handleTogglePlay,
  handlePost,
  handleMenu,
  hasPost,
  handleLock,
  handleFullScreenModal,
  handleMute,
  handleTrackNavigation,
  handleGoBack,
  handleOptions,
  handleShazam,
  hasGoBack = true,
  hasShazam = false,
  hasHistory = false,
  hasMenu = false,
  hasPlayer = true,
  hasShare = false,
  isSaved,
  hasInbox,
  hasSearch,
  hasOptions,
  isNewTrak,
  handleReplay,
  handleSearch,
  handleInbox,
  handleShareTrack,
}) => {
  const title = state.player?.title || "tap on an artwork to preview";
  const artist = state.player?.artist || "tap on an artwork to preview a track";
  const preview = state.player?.preview_url;
  const isPaused = state.player?.isPaused;
  const isLocked = state.player?.isLocked;
  const hasReplay = state.player?.hasReplay;
  const isMuted = state.player?.isMuted;
  const id = state.player?.id ?? null;
  const available = title && preview;

  const [tick, setTick] = useState(0.05);

  // setTimeout(() => {
  //   setTimer(timer + 0.05);
  // }, 1500);

  useEffect(() => {
    setTick(0.05);
    const id = setInterval(() => {
      setTick((tick) => tick + 0.05); // No dependency anymore
    }, 1500);

    setTimeout(() => {
      clearInterval(id);
    }, 30000);

    return () => clearInterval(id);
  }, [isNewTrak]);

  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "#1a1a1a",
        // height: 100,
        width: Dimensions.get("window").width,
        padding: 5,
        borderBottomWidth: 1.8,
        borderBottomColor: "grey",
        borderRadius: 20,
      }}
    >
      <View style={{ width: "100%", padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {hasGoBack && (
              <Pressable onPress={handleGoBack}>
                <MaterialIcons
                  name={"arrow-back-ios"}
                  size={23}
                  color={"whitesmoke"}
                  style={{ opacity: 0.9, paddingTop: 0 }}
                />
              </Pressable>
            )}
            {hasMenu && (
              <Pressable
                style={{
                  backgroundColor: "whitesmoke",
                  borderRadius: 10,
                  padding: 5,
                  marginRight: 10,
                }}
                onPress={handleMenu}
              >
                <Entypo
                  name={"menu"}
                  size={23}
                  color={"#1a1a1a"}
                  style={{ opacity: 0.9, paddingTop: 0 }}
                />
              </Pressable>
            )}
            {hasShare && (
              <Pressable
                style={{
                  backgroundColor: "whitesmoke",
                  borderRadius: 10,
                  padding: 5,
                }}
                onPress={() =>
                  handleShareTrack({
                    artist: state.player?.artist,
                    title: state.player?.title,
                    cover_art: state.player?.uri,
                    audio_preview: state.player?.preview_url,
                  })
                }
              >
                <Ionicons
                  name={"eye"}
                  size={20}
                  color="#1a1a1a"
                  style={{ paddingTop: 1, paddingHorizontal: 3 }}
                />
              </Pressable>
            )}
          </View>
          <Image
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/poster_black.png?alt=media",
            }}
            style={{
              height: 50,
              width: "50%",
              padding: 6,
              backgroundColor: "#1A1A1A",
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: 15,
            }}
          />
          <View style={{ flexDirection: "row" }}>
            {hasPost && (
              <Pressable
                onPress={
                  state.loggedIn
                    ? handlePost
                    : () => alert("Please authenticate to make a post")
                }
              >
                <MaterialIcons
                  name={"add-circle"}
                  size={25}
                  color="whitesmoke"
                  style={{ opacity: 0.9, paddingTop: 1 }}
                />
              </Pressable>
            )}
            {hasShazam && (
              <Pressable onPress={handleShazam}>
                <MaterialCommunityIcons
                  name={"waveform"}
                  size={30}
                  color="whitesmoke"
                  style={{ opacity: 0.9, paddingTop: 1 }}
                />
              </Pressable>
            )}

            {hasHistory && (
              <Pressable onPress={handleOptions}>
                <MaterialIcons
                  name={"history"}
                  size={28}
                  color={"whitesmoke"}
                  style={{ opacity: 0.9, paddingTop: 0 }}
                />
              </Pressable>
            )}
            {hasSearch && (
              <Pressable
                onPress={handleSearch}
                style={{
                  backgroundColor: "whitesmoke",
                  borderRadius: 10,
                  padding: 7,
                }}
              >
                <FontAwesome5
                  name={state.options.hasSearch ? "user-alt" : "search"}
                  size={18}
                  color={"#1a1a1a"}
                  style={{ opacity: 0.9, paddingTop: 0 }}
                />
              </Pressable>
            )}
            {hasShare && (
              <Pressable
                style={{
                  backgroundColor: "whitesmoke",
                  borderRadius: 10,
                  padding: 5,
                }}
                onPress={() =>
                  handleShareTrack({
                    artist: state.player?.artist,
                    title: state.player?.title,
                    cover_art: state.player?.uri,
                    audio_preview: state.player?.preview_url,
                  })
                }
              >
                <Ionicons
                  name={"share"}
                  size={20}
                  color="#1a1a1a"
                  style={{ paddingTop: 1, paddingHorizontal: 3 }}
                />
              </Pressable>
            )}
            {hasOptions && (
              <Pressable
                style={{
                  backgroundColor: "whitesmoke",
                  borderRadius: 10,
                  padding: 5,
                  marginLeft: 10,
                }}
                onPress={() =>
                  handleTrackNavigation({
                    id: id.track,
                    artists: [{ id: state.player.id.artist }],
                  })
                }
              >
                <MaterialIcons
                  name={"read-more"}
                  size={25}
                  color="#1a1a1a"
                  style={{ paddingTop: 1 }}
                />
              </Pressable>
            )}
          </View>
          {/*  */}
        </View>

        {state.player?.title && hasPlayer && (
          <ImageBackground
            source={{ uri: state.player?.uri }}
            style={{
              height: 140,
              alignItems: "center",
              justifyContent: "center",
            }}
            imageStyle={{
              borderRadius: 8,
              borderWidth: 3,
              borderColor: "whitesmoke",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingRight: 10,
                backgroundColor: "#1a1a1a",
                borderRadius: 8,
                padding: 15,
                // margin: 8,
                opacity: 0.85,
                width: "100%",
                height: "100%",
              }}
            >
              <View
                style={{
                  padding: 4,
                  borderRadius: 3,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    maxWidth: "100%",
                  }}
                >
                  <View>
                    <VHeader
                      type="four"
                      color="#fff"
                      text={artist}
                      numberOfLines={1}
                    />
                  </View>
                  <View>
                    <VHeader
                      type="five"
                      color="#cecece"
                      text={title}
                      numberOfLines={1}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  // backgroundColor: 'blue',
                  width: "100%",
                  marginVertical: 2,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <View style={{ flex: 5, padding: 10 }}>
                  <ProgressBar
                    progress={tick}
                    color={"#cecece"}
                    style={{ backgroundColor: "#1B3926" }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  // backgroundColor: 'red',
                  // width: 150,
                  justifyContent: "space-around",
                  marginTop: 4,
                }}
              >
                <View style={{ paddingRight: 20 }}>
                  <Pressable onPress={handleFullScreenModal}>
                    <View
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        padding: 3,
                      }}
                    >
                      <MaterialIcons
                        name={"fullscreen"}
                        size={22}
                        color="#1B3926"
                        style={{ paddingTop: 1 }}
                      />
                    </View>
                  </Pressable>
                </View>

                <View style={{ paddingRight: 20 }}>
                  <Pressable onPress={handleLock}>
                    <View
                      style={{
                        backgroundColor: isLocked ? "#fff" : "#1B3926",
                        borderRadius: 10,
                        padding: 3,
                      }}
                    >
                      <MaterialIcons
                        name={state.player.isLocked ? "lock" : "lock-open"}
                        size={22}
                        color={state.player.isLocked ? "#1B3926" : "whitesmoke"}
                        style={{ paddingTop: 1 }}
                      />
                    </View>
                  </Pressable>
                </View>

                <View
                  style={{
                    paddingHorizontal: 10,
                    borderRightWidth: 2,
                    borderLeftWidth: 2,
                    borderColor: "grey",
                    flexDirection: "row",
                  }}
                >
                  <Pressable
                    onPress={preview ? handleTogglePlay : null}
                    style={{ paddingHorizontal: 15 }}
                  >
                    {available && (
                      <View
                        style={{
                          backgroundColor: isPaused ? "#fff" : "#1B3926",
                          borderRadius: 10,
                          borderWidth: 3,
                          borderColor: "#fff",
                        }}
                      >
                        <MaterialCommunityIcons
                          name={isPaused ? "play" : "pause"}
                          size={30}
                          color={isPaused ? "#1B3926" : "#fff"}
                          style={{ paddingTop: 0 }}
                        />
                      </View>
                    )}
                    {!available && (
                      <View
                        style={{
                          backgroundColor: "#fff",
                          paddingVertical: 3,
                          paddingHorizontal: 5,
                          borderWidth: 4,
                          borderColor: "#fff",
                          borderRadius: 5,
                        }}
                      >
                        <VHeader
                          type="six"
                          color="#1B3926"
                          text="NOT AVAILABLE."
                          numberOfLines={1}
                        />
                      </View>
                    )}
                  </Pressable>
                </View>
                <View style={{ paddingLeft: 20 }}>
                  <Pressable onPress={handleReplay}>
                    <View
                      style={{
                        backgroundColor: hasReplay ? "#1B3926" : "#fff",
                        borderRadius: 10,
                        padding: 3,
                      }}
                    >
                      <MaterialIcons
                        name={hasReplay ? "replay" : "shuffle"}
                        size={22}
                        color={hasReplay ? "#fff" : "#1B3926"}
                        style={{ paddingTop: 1 }}
                      />
                    </View>
                  </Pressable>
                </View>
                <View style={{ paddingLeft: 20 }}>
                  <Pressable onPress={handleMute}>
                    <View
                      style={{
                        backgroundColor: isMuted ? "#fff" : "#1B3926",
                        borderRadius: 10,
                        padding: 3,
                      }}
                    >
                      <MaterialIcons
                        name={isMuted ? "volume-mute" : "volume-up"}
                        size={22}
                        color={isMuted ? "grey" : "#fff"}
                        style={{ paddingTop: 1 }}
                      />
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </ImageBackground>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // centeredView: {
  //   flex: 1,
  //   // justifyContent: 'center',
  //   alignItems: 'flex-end',
  //   marginTop: 90,
  // },
  modalView: {
    position: "absolute",
    top: 100,
    right: 0,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
