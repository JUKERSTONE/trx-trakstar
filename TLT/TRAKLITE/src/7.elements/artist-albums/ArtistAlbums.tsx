import React, { FC } from "react";
import { View, Pressable, FlatList, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { VHeader, BHeader, Body, Caption } from "../typography";
import { TrendingCard } from "../trending-card/TrendingCard";

interface IArtistAlbum {
  artistAlbums: any;
}

export const ArtistAlbums: FC<IArtistAlbum> = ({ artistAlbums }) => {
  console.log(
    "🚀 ~ file: ArtistAlbums.tsx ~ line 13 ~ artistAlbums",
    artistAlbums
  );
  return (
    <View
      style={{
        marginVertical: 10,
      }}
    >
      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "center",
          paddingLeft: 30,
          marginBottom: 5,
        }}
      >
        <Caption type="one" color="yellow" text={"ALBUMS."} />
      </View>
      <FlatList
        listKey="ArtistAlbums"
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "space-around",
        }}
        numColumns={2}
        data={artistAlbums}
        renderItem={({ item }) => {
          console.log("🚀 ~ file: ArtistAlbums.tsx ~ line 65 ~ item", item);

          return (
            <View
              style={{
                height: 200,
                width: 150,
                margin: 10,
              }}
            >
              <Image
                style={{ height: 150, width: 150, borderRadius: 8 }}
                source={{ uri: item.images[0].url }}
              />
              <View style={{ marginTop: 8 }}>
                <VHeader type="six" color="#1db954" text={item.name} />
                <VHeader
                  type="six"
                  color="#1db954"
                  text={item.artists[0].name}
                />
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => "" + index}
      />
    </View>
  );
};
