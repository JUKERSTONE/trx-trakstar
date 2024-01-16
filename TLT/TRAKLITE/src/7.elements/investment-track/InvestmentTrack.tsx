import React from "react";
import { View, Text, Dimensions } from "react-native";
import { TrackView } from "../../6.containers";

export const InvestmentTrack = ({ ...props }: any) => {
  const { track } = props;
  console.log(
    "🚀 ~ file: InvestmentTrack.tsx ~ line 7 ~ InvestmentTrack ~ track",
    track
  );
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <TrackView {...props} />
    </View>
  );
};
