import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Loading } from "../loading";
import { SwipeAdvert } from "../swipe-advert";

interface TSwipeCard {
  card: any;
  index: number;
  handleNavigateTrack: any;
}

export const SwipeCard: React.FC<TSwipeCard> = ({
  card,
  index,
  handleNavigateTrack,
}) => {
  const [cardIndex, setCardIndex] = useState(0);
  if (card) {
    const cardData = [
      {
        id: 0,
        image: card.track.artwork,
      },
      {
        id: 1,
        image: card.artist.image,
      },
      card.track,
      card.artist,
    ];
    // console.log(card, 'vvbedrji');
    return (
      <>
        <Animatable.View animation={"bounceIn"}>
          <ImageBackground
            source={{ uri: cardData[cardIndex].image }}
            style={[styles.card, { position: "absolute", top: 0 }]}
            imageStyle={{
              borderRadius: 25,
            }}
          >
            {/*  */}
            {/*  */}
            <View style={{ padding: 20 }}>
              <View
                style={{
                  width: 40,
                  height: 15,
                  borderRadius: 5,
                  marginBottom: 10,
                  backgroundColor: cardIndex === 0 ? "#fff" : "#292929",
                  borderColor: "green",
                  borderWidth: 2,
                }}
              ></View>
              <View
                style={{
                  width: 40,
                  height: 15,
                  borderRadius: 5,
                  marginBottom: 10,
                  backgroundColor: cardIndex !== 0 ? "#fff" : "#292929",
                  borderColor: "green",
                  borderWidth: 2,
                }}
              ></View>
            </View>
          </ImageBackground>
          <View
            style={[
              styles.card,
              {
                backgroundColor: "transparent",
                flexDirection: "row",
              },
            ]}
          >
            <Pressable
              onPress={() => {
                const ids = {
                  track: card.track.id,
                  artist: card.artist.id,
                };
                console.log("🚀 ~ file: index.tsx ~ line 72 ~ ids", ids);
                // handleNavigateTrack(ids);
                cardIndex > 0 ? setCardIndex(cardIndex - 1) : null;
              }}
              style={{ flex: 1, backgroundColor: "transparent" }}
            >
              <View></View>
            </Pressable>

            <Pressable
              onPress={() =>
                cardIndex < 1 ? setCardIndex(cardIndex + 1) : null
              }
              style={{ flex: 1, backgroundColor: "transparent" }}
            >
              <View></View>
            </Pressable>
          </View>
        </Animatable.View>
      </>
    );
    // } else if (!(index % 2)) {
    //   // most frequently
    //   return <SwipeAdvert mode={'google'} />;
    // } else if (index % 3) {
    //   // second most frequently
    //   return <SwipeAdvert mode={'traklist'} />;
  } else return <Loading />;
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
  },
  card: {
    // flex: 0.85,
    alignSelf: "center",
    height: 400,
    width: "100%",
    borderRadius: 25,
    marginTop: 20,
  },
});
