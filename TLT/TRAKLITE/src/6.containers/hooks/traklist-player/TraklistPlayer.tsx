import { boolean } from "@storybook/addon-knobs";
import React from "react";
import { View, Text } from "react-native";
import { TraklistPlayerView } from "../../../7.elements/traklist-player-view/TraklistPlayerView";
import { useTraklistPlayer } from "./useTraklistPlayer";
import { useInvestment } from "../../../0.app";

interface TTraklistPlayerContainer {
  navigation: any;
  hasPost?: boolean;
  hasInfo?: any;
  hasInbox?: any;
  hasShare?: any;
  // handleFullScreenModal?: any;
  hasShazam?: boolean;
  hasGoBack?: boolean;
  hasMenu?: boolean;
  hasHistory?: boolean;
  hasPlayer?: boolean;
}

export const TraklistPlayerContainer: React.FC<TTraklistPlayerContainer> = (
  props: any
) => {
  const { ...useProps } = useTraklistPlayer(props);
  const { ...useInvestmentProps } = useInvestment(props);
  return (
    <TraklistPlayerView {...props} {...useProps} {...useInvestmentProps} />
  );
};
