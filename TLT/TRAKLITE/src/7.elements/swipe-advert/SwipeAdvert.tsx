import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

interface TSwipeAdvert {
  card?: any;
  mode: "snapchat" | "traklist" | "google";
}

export const SwipeAdvert: React.FC<TSwipeAdvert> = ({ card, mode }) => {
  return (
    <Animatable.View animation={"bounceIn"}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: "grey",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Text style={{ color: "whitesmoke", fontWeight: "bold" }}>
          BILLBOARD
        </Text>
        {/* <Text style={{ color: "whitesmoke" }}>{mode}</Text> */}
        <Text style={{ color: "whitesmoke" }}>
          Email App support for Enquiries.
        </Text>
        <Text style={{ color: "whitesmoke", marginTop: 5 }}>
          info@tsb.media
        </Text>
      </View>
    </Animatable.View>
  );
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
