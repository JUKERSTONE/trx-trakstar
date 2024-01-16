import React from "react";
import {
  View,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { VHeader, BHeader, Body, Caption } from "../../7.elements/typography";
import LinearGradient from "react-native-linear-gradient";
import { NewsCard } from "../news-card/NewsCard";

interface LandingNewsProps {
  news: any[];
  share: (title: string, url: string) => void;
}

export const LandingNews: React.FC<LandingNewsProps> = ({ news, share }) => {
  console.log("🚀 ~ file: LandingNews.tsx ~ line 19 ~ news", news);
  const renderItem = ({ item, index }: any) => {
    console.log(
      "🚀 ~ file: LandingNews.tsx ~ line 21 ~ renderItem ~ item",
      item
    );
    return (
      <Pressable onPress={() => share(item.header, item.url)}>
        <NewsCard
          rank={item.rank}
          artwork={item.image}
          title={item.header}
          artist={item.subHeader}
        />
      </Pressable>
    );
  };
  return (
    <LinearGradient colors={["#1B3926", "#1a1a1a", "#1a1a1a"]}>
      <View>
        <View
          style={{
            marginRight: 25,
            marginBottom: 10,
            alignItems: "flex-end",
            backgroundColor: "#fff",
            alignSelf: "flex-end",
            padding: 5,
            borderRadius: 3,
            opacity: 0.9,
          }}
        >
          <Caption type="one" color="#1a1a1a" text={"MUSIC NEWS THIS WEEK."} />
        </View>
        <FlatList
          data={news}
          renderItem={renderItem}
          // horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => "" + index}
          listKey="News"
        />
      </View>
    </LinearGradient>
  );
};
