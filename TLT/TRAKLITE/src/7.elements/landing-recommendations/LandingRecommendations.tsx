import React from "react";
import {
  View,
  FlatList,
  Button,
  ImageBackground,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { VHeader, Caption } from "../typography";
import LinearGradient from "react-native-linear-gradient";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

interface TLandingRecommendations {
  recommendations: any;
  handleReload: () => void;
  handleTrackNavigation: any;
}

export const LandingRecommendations: React.FC<TLandingRecommendations> = ({
  recommendations,
  handleReload,
  handleTrackNavigation,
}) => {
  console.log(
    "🚀 ~ file: LandingRecommendations.tsx ~ line 27 ~ recommendations",
    recommendations
  );
  dayjs.extend(relativeTime);

  const renderItem = ({ item }: any) => {
    console.log(
      "🚀 ~ file: LandingRecommendations.tsx ~ line 34 ~ renderItem ~ item",
      item
    );
    const spotifyData = item.track.spotifyData;

    return (
      <Pressable onPress={() => handleTrackNavigation(spotifyData)}>
        <View style={{ justifyContent: "space-between", margin: 5 }}>
          <Image
            source={{ uri: item?.track.artwork }}
            style={{
              backgroundColor: "#fff",
              borderRadius: 8,
              height: 180,
              width: "100%",
              justifyContent: "flex-end",
            }}
          />
          <View style={{ marginLeft: 5, marginTop: 2 }}>
            <VHeader
              type="five"
              color="whitesmoke"
              text={item?.track.name}
              numberOfLines={1}
            />
            <Caption
              type="one"
              color="#cececece"
              text={item?.track.artist}
              numberOfLines={1}
            />
            <Caption
              type="two"
              color="#cecece"
              text={dayjs(item?.track.release_date).fromNow()}
              numberOfLines={1}
            />
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    // Within your render function
    <LinearGradient colors={["#1A1A1A", "#1B3926", "#1A1A1A"]}>
      <View style={{ marginLeft: 15, marginVertical: 10 }}>
        <View
          style={{
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          <View
            style={{
              alignItems: "flex-end",
              justifyContent: "center",
              marginRight: 15,
              marginBottom: 5,
            }}
          >
            <Caption type="two" color="white" text={"RECOMMENDED FOR YOU..."} />
          </View>
          {recommendations ? (
            <FlatList
              data={recommendations}
              renderItem={renderItem}
              horizontal={true}
              // showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => "" + index}
              listKey="Recomendations"
            />
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 20,
              }}
            >
              <ActivityIndicator size="large" color="#00ff00" />
              <Button title="reload" onPress={handleReload} />
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};
