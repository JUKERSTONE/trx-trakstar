import React from "react";
import { View, Text, Dimensions } from "react-native";

import { SwipeStackView } from "../../6.containers";
import Action from "../../7.elements/buttons/swipe-action";
import { TraklistApp } from "../../6.containers/hooks/traklist-app/TraklistApp";
import { TraklistAppHOCContainer } from "../../6.containers";

const Swipe: React.FC = (navigation: any) => {
  const windowHeight = Dimensions.get("window").height;
  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SwipeStackView navigation={navigation} />
    </View>
  );
};

export const SwipeScreen = TraklistAppHOCContainer({
  InnerComponent: Swipe,
  options: null,
});
