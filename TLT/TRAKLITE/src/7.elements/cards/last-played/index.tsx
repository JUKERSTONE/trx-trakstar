import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { VHeader, Body, Paragraph } from "../../typography";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

interface CardProps {
  id?: any;
  title: string;
  type?: string;
  artwork: string;
  artist?: string;
  popularity?: number;
  followers?: number;
  color?: string;
  played_at?: string;
  isDefault?: boolean;
  handleView?: () => void;
}

export const LastPlayed: React.FC<CardProps> = ({
  id,
  title,
  artist = "",
  artwork,
  color = "#000",
  played_at,
  isDefault,
  handleView,
  type,
}) => {
  dayjs.extend(relativeTime);
  return (
    <Pressable onPress={handleView}>
      <View
        style={{
          flex: 10,
          marginBottom: 8,
          // backgroundColor: 'red',
          // alignItems: 'center',
        }}
      >
        <View
          style={{
            height: 120,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              justifyContent: "flex-end",
              marginRight: 20,
              // backgroundColor: 'blue',
              flex: 1,
            }}
          >
            <Image
              source={{ uri: artwork || undefined }}
              style={{
                backgroundColor: "#1B4F26",
                height: "100%",
                width: "100%",
                // borderRadius: 10,
                borderBottomRightRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
          </View>
          <View
            style={{
              marginRight: 25,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "flex-end",
              maxWidth: "60%",
            }}
          >
            <VHeader numberOfLines={1} type="four" color={color} text={title} />
            <Body
              numberOfLines={1}
              type="two"
              color={color}
              text={artist}
              textAlign="right"
            />
          </View>
          {isDefault && (
            <View
              style={{
                backgroundColor: "transparent",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <VHeader
                type="six"
                color={"grey"}
                text={dayjs(played_at).fromNow()}
              />
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default LastPlayed;
