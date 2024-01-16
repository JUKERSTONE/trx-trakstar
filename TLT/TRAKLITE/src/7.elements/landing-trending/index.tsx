import React from "react";
import { View, Image, FlatList, Pressable } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { VHeader, Body, BHeader, Paragraph, Caption } from "../typography";
import { TrendingCard } from "../trending-card/TrendingCard";

interface TLandingTrending {
  data: any;
}

export const LandingTrending: React.FC<TLandingTrending> = ({
  data,
  trending,
}: any) => {
  console.log("🚀 ~ file: index.tsx ~ line 15 ~ trending", trending);
  return (
    <View style={{ marginVertical: 10 }}>
      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "center",
          marginRight: 15,
          marginBottom: 5,
        }}
      >
        <Caption type="one" color="yellow" text={"TRENDING ON TRAKLIST."} />
      </View>
      {/*  */}
      {/* <FlatList
        listKey="Trending"
        data={Object.values(trending)}
        renderItem={({ item }: any) => {
          console.log("🚀 ~ file: index.tsx ~ line 43 ~ item", item); */}
      {/* return ( */}
      <TrendingCard
        rank={trending?.one?.rank}
        artwork={trending?.one?.image}
        title={trending?.one?.title}
        artist={trending?.one?.artist}
        status={trending?.one?.status}
      />
      <TrendingCard
        rank={trending?.two?.rank}
        artwork={trending?.two?.image}
        title={trending?.two?.title}
        artist={trending?.two?.artist}
        status={trending?.two?.status}
      />
      <TrendingCard
        rank={trending?.three?.rank}
        artwork={trending?.three?.image}
        title={trending?.three?.title}
        artist={trending?.three?.artist}
        status={trending?.three?.status}
      />
      {/* ); */}
      {/* }}
        keyExtractor={(item, index) => "" + index}
      /> */}
      {/*  */}
      <Pressable onPress={() => alert("coming soon")}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 8,
            width: "50%",
          }}
        >
          <VHeader type="six" color="#1db954" text={"SEE MORE"} />
        </View>
      </Pressable>
    </View>
  );
};
