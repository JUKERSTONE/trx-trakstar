import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Image,
  Pressable,
  TouchableOpacity,
  Button,
  Dimensions,
} from "react-native";
import { Showcase } from "../showcase/Showcase";
import { TrackCardView } from "../../6.containers";
import Video from "react-native-video";
import { useProvider } from "../../3.stores";
// @ts-ignore
import ParallaxScrollView from "react-native-parallax-scroll-view";
// @ts-ignore
import { getColorFromURL } from "rn-dominant-color";
import { VHeader, BHeader, Body, Paragraph } from "../typography";
import LinearGradient from "react-native-linear-gradient";
import { CustomScrollView } from "../../7.elements/custom-scroll-view/CustomScrollView";
import { TraklistPlayerContainer } from "../../6.containers";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { FullScreenPlayerView } from "../../6.containers/hooks/";
import { Loading } from "../loading";
interface TTrack {
  navigation: any;
  track: any;
  handlePreviewTrack: any;
  handleSave: (id: string) => void;
  handleLike: (id: string) => void;
  isLiked: boolean;
  isSaved: boolean;
}

export const Track: React.FC<TTrack> = ({
  track,
  handlePreviewTrack,
  handleSave,
  handleLike,
  isLiked,
  isSaved,
}) => {
  const { spotifyData, lyrics } = track;
  console.log("🚀 ~ file: Track.tsx ~ line 48 ~ spotifyData", spotifyData);
  console.log("🚀 ~ file: Track.tsx ~ line 44 ~ track", track);
  const [colors, setColors] = useState<any>();
  const { state } = useContext(useProvider);
  const preview_url = spotifyData.preview_url;

  const info = {
    ...state.player,
    title: spotifyData.name,
    artist: spotifyData.artists[0].name,
    images: spotifyData.album.images,
    uri: spotifyData.album.images[0].url,
    preview_url: spotifyData.preview_url,
    isPaused: spotifyData.preview_url ? false : true,
    id: {
      track: spotifyData.id,
      artist: spotifyData.artists[0].id,
    },
  };

  getColorFromURL(spotifyData.album.images[0].url)
    .then((colors: any) => {
      setColors(colors);
    })
    .catch((err: any) => {
      console.log(err);
    });

  return colors ? (
    <View
      style={{
        flex: 1,
        backgroundColor: colors ? colors.primary : "#fff",
        // paddingBottom: 200,
      }}
    >
      <ParallaxScrollView
        backgroundColor={colors?.background}
        parallaxHeaderHeight={300}
        stickyHeaderHeight={150}
        renderBackground={() => (
          <LinearGradient
            colors={
              colors ? ["#1a1a1a", colors.background] : ["#1a1a1a", "#000"]
            }
          >
            <View
              style={{
                height: 300,
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Image
                style={{
                  height: 200,
                  width: 200,
                  marginTop: 3,
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: colors.primary,
                }}
                source={spotifyData.album.images}
              />
            </View>
          </LinearGradient>
        )}
        renderForeground={() => (
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              height: 300,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                backgroundColor: colors?.primary,
                padding: 4,
                borderRadius: 8,
                width: 100,
                justifyContent: "space-around",
                // borderWidth: 3,
                // borderColor: colors.backgroundColor,
              }}
            >
              {preview_url && (
                <Pressable onPress={() => handlePreviewTrack(info)}>
                  <MaterialIcons
                    name="preview"
                    size={22}
                    color={colors?.background}
                  />
                </Pressable>
              )}
              <Pressable onPress={() => handleLike(info.id.track)}>
                <MaterialCommunityIcons
                  name="heart"
                  size={22}
                  color={isLiked ? "#1db954" : colors?.background}
                />
              </Pressable>
              <TouchableOpacity onPress={() => handleSave(info.id.track)}>
                <MaterialCommunityIcons
                  name="content-save"
                  size={22}
                  color={isSaved ? "#1db954" : colors?.background}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      >
        <View
          style={{
            height: Dimensions.get("window").height,
            backgroundColor: colors ? colors.primary : "#1a1a1a",
          }}
        >
          <LinearGradient
            colors={
              colors ? [colors.background, colors.primary] : ["#1a1a1a", "#000"]
            }
            style={{ paddingHorizontal: 30, paddingBottom: 200 }}
          >
            <View
              style={{
                marginVertical: 30,
                flexDirection: "column",
                alignItems: "flex-start",
                borderBottomWidth: 2,
                borderTopWidth: 2,
                borderBottomColor: colors?.detail,
                paddingVertical: 15,
              }}
            >
              <VHeader
                textAlign="left"
                type="three"
                color={colors ? colors.detail : null}
                text={spotifyData.name}
              />
              <VHeader
                type="four"
                color={colors ? colors.primary : null}
                text={spotifyData.artists[0].name}
              />
            </View>

            {/* <View style={{ paddingBottom: 200 }}>
              <View
                style={{
                  paddingVertical: 4,
                  paddingHorizontal: 5,
                  marginBottom: 20,
                  // paddingBottom: 5,
                  // borderBottomWidth: 2,
                  // borderBottomColor: colors?.primary,
                  alignSelf: "flex-start",
                  backgroundColor: colors?.detail,
                  borderRadius: 7,
                  // borderWidth: 2,
                  // borderColor: colors.backgroundColor,
                }}
              >
                <Body
                  type="two"
                  color={colors ? colors.background : null}
                  text="LYRICS"
                />
              </View>
              <View
                style={{
                  backgroundColor: colors ? colors.background : "transparent",
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  opacity: 0.8,
                  borderRadius: 10,
                }}
              >
                <Paragraph
                  type="one"
                  color={colors ? colors.detail : null}
                  text={
                    track.lyrics ? "no lyrics available" : "no lyrics available"
                  }
                />
              </View>
            </View> */}
          </LinearGradient>
        </View>
      </ParallaxScrollView>
    </View>
  ) : (
    <Loading />
  );
};
