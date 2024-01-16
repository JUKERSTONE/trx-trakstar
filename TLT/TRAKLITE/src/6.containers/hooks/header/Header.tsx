import React, { useContext, useState } from "react";
import { SafeAreaView, Text, Image } from "react-native";
import { useProvider } from "../../../3.stores";
import { TraklistPlayerContainer } from "../traklist-player/TraklistPlayer";
import { TraklistModal } from "../../../7.elements/modals/traklist/TraklistModal";

interface THeader {
  hasMenu?: boolean;
  hasPlayer?: boolean;
  hasShare?: boolean;
  navigation: any;
  hasShazam?: boolean;
  hasHistory?: boolean;
  hasPost?: boolean;
  hasGoBack?: boolean;
  handlePost?: () => void;
  hasInbox?: boolean;
  hasOptions?: boolean;
}

export const Header: React.FC<THeader> = ({ ...props }) => {
  const { state } = useContext(useProvider);
  const { title, isHidden } = state.player;
  const { hasPlayer } = props;
  return (
    <>
      {title && isHidden && (
        <SafeAreaView
          style={{
            backgroundColor: "#1a1a1a",
          }}
        >
          <TraklistPlayerContainer hasPlayer={hasPlayer} {...props} />
        </SafeAreaView>
      )}
    </>
  );
};
