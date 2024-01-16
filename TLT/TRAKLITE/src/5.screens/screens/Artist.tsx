import React, { FC, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Pressable,
  FlatList,
} from "react-native";
// @ts-ignore
import ParallaxScrollView from "react-native-parallax-scroll-view";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// @ts-ignore
import { getColorFromURL } from "rn-dominant-color";
import { VHeader, BHeader, Body, Caption } from "../../7.elements/typography";
import { TrendingCard } from "../../7.elements/trending-card/TrendingCard";
import { ArtistHeader } from "../../7.elements/artist-header";
import { ArtistTopTracks } from "../../7.elements/artist-top-tracks";
import { ArtistAlbums } from "../../7.elements/artist-albums";
import { ArtistRelated } from "../../7.elements/artist-related";

interface TArtist {
  navigation: any;
  route: any;
  artist: any;
}

export const Artist: FC<TArtist> = ({ navigation, route, artist }) => {
  const [colors, setColors] = useState<any>();
  // console.log(route.params.artistData, 'vrwri0j');
  const artistData = artist;
  console.log("🚀 ~ file: Artist.tsx ~ line 33 ~ artistData", artistData);

  getColorFromURL(artistData.artist.images[0].url)
    .then((colors: any) => {
      setColors(colors);
    })
    .catch((err: any) => {
      console.log(err);
    });

  return (
    <ParallaxScrollView
      backgroundColor="#1a1a1a"
      contentBackgroundColor="#1a1a1a"
      parallaxHeaderHeight={300}
      stickyHeaderHeight={100}
      renderBackground={() => (
        <ImageBackground
          source={artistData.artist.images}
          style={{
            height: 300,
            padding: 6,
            paddingBottom: 80,
            backgroundColor: "#1A1A1A",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        ></ImageBackground>
      )}
      renderForeground={() => (
        <ArtistHeader
          colors={colors}
          artist={artistData.artist.name}
          artwork={artistData.artist.images[0].url}
        />
      )}
    >
      <View
        style={{
          paddingBottom: 300,
          backgroundColor: "transparent",
        }}
      >
        <View style={{ paddingRight: 15, paddingTop: 15 }}>
          <VHeader
            textAlign="right"
            type="three"
            color={colors ? colors.primary : null}
            text={artistData.artist.name}
          />
        </View>
        <ArtistTopTracks topTracks={artistData.artist_top_tracks} />
        <ArtistAlbums artistAlbums={artistData.artist_albums} />
        <ArtistRelated artistRelated={artistData.artist_related} />
      </View>
    </ParallaxScrollView>
  );
};
