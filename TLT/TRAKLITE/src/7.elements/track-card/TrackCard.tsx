import React from "react";
import {
  View,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { VHeader, Body } from "../typography";
import { TrendingCard } from "../trending-card/TrendingCard";

interface TTrack {
  track: any;
  index: number;
  images: any;
  colors: any;
  handleTrackNavigation: any;
  // handleTrackPress: (track: any, images: any) => void;
}

function millisToMinutesAndSeconds(millis: number) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (parseInt(seconds) < 10 ? "0" : "") + seconds;
}

export const TrackCard: React.FC<TTrack> = ({
  track,
  index,
  images,
  colors,
  handleTrackNavigation,
}) => {
  console.log("🚀 ~ fr", track);
  return (
    <TouchableOpacity onPress={() => handleTrackNavigation(track, false)}>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 8,
          backgroundColor: colors ? colors.background : "transparent",
          marginHorizontal: 25,
          borderRadius: 10,
          // opacity: 0.85,
          // borderWidth: 4,
          justifyContent: "center",
          borderColor: colors.detail,
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            style={{
              height: 70,
              width: "100%",
              borderRadius: 10,
            }}
            source={images}
          />
        </View>
        <View
          style={{
            flex: 3,
            flexDirection: "row",
            paddingRight: 20,
            // borderLeftWidth: 1,
            borderColor: colors.detail,
          }}
        >
          {/* <View
            style={{justifyContent: 'center', alignItems: 'center', width: 50}}>

          </View> */}
          <View style={{ marginLeft: 10, justifyContent: "center" }}>
            <View
              style={{
                backgroundColor: colors?.detail,
                marginBottom: 3,
                paddingHorizontal: 5,
                paddingVertical: 3,
                borderRadius: 5,
              }}
            >
              <VHeader
                type="five"
                color={colors ? colors.background : "#cecece"}
                text={track.name}
                numberOfLines={1}
              />
            </View>
            <VHeader
              type="six"
              color={colors ? colors.detail : "#cecece"}
              text={track.artists[0].name}
              numberOfLines={1}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderLeftWidth: 1,
            borderColor: colors.detail,
          }}
        >
          <VHeader
            type="five"
            color={colors ? colors.detail : "#cecece"}
            text={"" + track.track_number}
          />
          <View
            style={{
              backgroundColor: colors ? colors.detail : "transparent",
              height: 25,
              minWidth: 25,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 5,
              marginTop: 3,
            }}
          >
            <VHeader
              type="six"
              color={colors ? colors.background : "#cecece"}
              text={"" + millisToMinutesAndSeconds(track.duration_ms)}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
