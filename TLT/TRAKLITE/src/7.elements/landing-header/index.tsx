import React, { FC, useContext } from "react";
import {
  View,
  ImageBackground,
  TouchableHighlight,
  FlatList,
  Pressable,
  Image,
  Dimensions,
  Text,
} from "react-native";
import { Input } from "../input";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useProvider } from "../../3.stores";

interface ILandingHeader {
  handleSearchQuery: any;
  navigation: any;
}

export const LandingHeader: FC<ILandingHeader> = ({
  handleSearchQuery,
  ...props
}) => {
  const { state } = useContext(useProvider);
  return (
    <View
      style={{
        height: 200,
        padding: 6,
        paddingBottom: 10,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: Dimensions.get("window").width,
          height: 80,
          justifyContent: "space-between",
          paddingHorizontal: 30,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Pressable
          style={{
            backgroundColor: "whitesmoke",
            borderRadius: 10,
            padding: 7,
          }}
          onPress={() =>
            state.loggedIn
              ? props.navigation.openDrawer()
              : props.navigation.navigate("MainTab", { screen: "START" })
          }
        >
          <MaterialIcons
            name={state.loggedIn ? "menu" : "login"}
            size={23}
            color={"#1a1a1a"}
            style={{ opacity: 0.9, paddingTop: 0 }}
          />
        </Pressable>
        {/* <Pressable
          style={{
            backgroundColor: "whitesmoke",
            borderRadius: 10,
            padding: 7,
          }}
          onPress={() => alert("toggle discover settings")}
        >
          <SimpleLineIcons
            name={"options-vertical"}
            size={23}
            color={"#1a1a1a"}
            style={{ opacity: 0.9, paddingTop: 0 }}
          />
        </Pressable> */}
      </View>
      <Input
        option="default"
        label="SEARCH A TRAK..."
        inputHeight={50}
        onChangeText={(text: string) => handleSearchQuery(text)}
        backgroundColor="#fff"
        opacity={0.9}
      />
    </View>
  );
};
