import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Pressable,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { TraklistPlayerContainer } from "../traklist-player/TraklistPlayer";
import { useProvider } from "../../../3.stores";
import { TraklistModal } from "../../../7.elements/modals/traklist/TraklistModal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { VHeader, BHeader, Body } from "../../../7.elements/typography";
import { store } from "../../../3.stores";
import * as actions from "../../../3.stores";

interface TTraklistApp {
  navigation: any;
  hasPost?: boolean;
  hasPlayer?: boolean;
  handlePost?: () => void;
  hasSwipeActions?: boolean;
}

export const TraklistApp: React.FC<TTraklistApp> = ({
  navigation,
  children,
  hasPost,
  handlePost,
  hasPlayer = true,
  hasSwipeActions = false,
  ...props
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState("");
  const { state } = useContext(useProvider);

  // const type = state.modals.type

  useEffect(() => {
    console.log(
      "🚀 ~ file: TraklistApp.tsx ~ line 52 ~ state.modal",
      state.modal
    );
  }, [state.modal]);

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "#1A1A1A",
      }}
    >
      <View style={{ flex: 1 }}>{children}</View>
      <TraklistModal
        {...props}
        handleRequestClose={() => {
          let modal;
          if (state.modal?.type === "fullscreen") {
            modal = {
              type: "",
              full_screen: {
                active: false,
              },
            };
          } else if (state.modal?.type === "track_screen") {
            modal = {
              type: "",
              track_screen: {
                active: false,
              },
            };
          } else if (state.modal?.type === "artist_screen") {
            modal = {
              type: "",
              artist_screen: {
                active: false,
              },
            };
          } else if (state.modal?.type === "profile") {
            modal = {
              type: "",
              profile: {
                active: false,
              },
            };
          }

          // Alert.alert('Modal has been closed.');
          // setModalVisible(!modalVisible);
          store.dispatch(
            actions.TOGGLE_FULL_SCREEN("toggle full screen.", modal)
          );
        }}
        type={state.modal?.type}
        state={state}
        modalVisible={
          state.modal?.full_screen.active ||
          state.modal?.track_screen.active ||
          state.modal?.artist_screen.active ||
          state.modal?.profile.active
        }
        setModalVisible={setModalVisible}
      />
    </View>
  );
};
