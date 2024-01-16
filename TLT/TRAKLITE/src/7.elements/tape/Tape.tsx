import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { TrackCardView } from "../../6.containers";
// @ts-ignore
import ParallaxScrollView from "react-native-parallax-scroll-view";
// @ts-ignore
import { getColorFromURL } from "rn-dominant-color";
import { VHeader, BHeader, Body } from "../typography";
import LinearGradient from "react-native-linear-gradient";
import { CustomScrollView } from "../../7.elements/custom-scroll-view/CustomScrollView";
import { Loading } from "../loading";
interface TTape {
  navigation: any;
  tape: any;
}

export const Tape: React.FC<TTape> = ({ navigation, tape }) => {
  const [colors, setColors] = useState<any>();

  getColorFromURL(tape.images[0].url)
    .then((colors: any) => {
      setColors(colors);
    })
    .catch((err: any) => {
      console.log(err);
    });

  return colors ? (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors ? colors.primary : "#fff" }}
    >
      <ParallaxScrollView
        backgroundColor="#1a1a1a"
        // contentBackgroundColor="pink"
        parallaxHeaderHeight={300}
        fadeOutForeground
        renderBackground={() => (
          <LinearGradient
            colors={colors ? ["#1a1a1a", colors.primary] : ["#1a1a1a", "#000"]}
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
                  // borderWidth: 5,
                  borderColor: colors.detail,
                }}
                source={tape.images}
              />
              {tape.tracks?.items && (
                <View style={{ alignItems: "center" }}>
                  <VHeader type="five" color="#fff" text={tape.name} />
                  {/* <View
                    style={{
                      backgroundColor: '#fff',
                      marginTop: 3,
                      paddingHorizontal: 3,
                      borderRadius: 4,
                    }}> */}
                  <Body
                    type="two"
                    color="whitesmoke"
                    text={tape.artists[0].name}
                  />
                  {/* </View> */}
                  <View
                    style={{
                      backgroundColor: "#fff",
                      marginTop: 5,
                      paddingHorizontal: 3,
                      paddingVertical: 1,
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: "#1a1a1a",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      {tape.total_tracks + " TRACKS"}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </LinearGradient>
        )}
      >
        <LinearGradient
          colors={
            colors ? [colors.primary, colors.background] : ["#1a1a1a", "#000"]
          }
        >
          <View
            style={{ marginTop: 0, height: Dimensions.get("window").height }}
          >
            <FlatList
              listKey="Tapddre"
              data={tape.tracks?.items ? tape.tracks?.items : tape.tracks}
              renderItem={({ item, index }) => {
                return (
                  <TrackCardView
                    colors={colors ?? null}
                    navigation={navigation}
                    index={index}
                    key={index}
                    track={tape.tracks?.items ? item : item.track}
                    images={tape.images}
                  />
                );
              }}
              keyExtractor={(item, index) => "" + index}
            />
          </View>
        </LinearGradient>
      </ParallaxScrollView>
    </SafeAreaView>
  ) : (
    <Loading />
  );
};
