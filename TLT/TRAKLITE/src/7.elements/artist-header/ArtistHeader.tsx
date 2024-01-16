import React, { FC } from "react";
import { View, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Share from "react-native-share";
import RNFetchBlob from "rn-fetch-blob";

interface IArtistHeader {
  colors: any;
  artwork: any;
  title: any;
  artist: any;
}

export const ArtistHeader: FC<IArtistHeader> = ({
  colors,
  artwork,
  artist,
}) => {
  return (
    <View
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        height: 300,
      }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            backgroundColor: colors?.primary,
            padding: 4,
            borderRadius: 5,
            width: 100,
            justifyContent: "space-around",
          }}
        >
          <Pressable onPress={() => alert("subscriptions coming soon.")}>
            <MaterialCommunityIcons
              name="heart"
              size={22}
              color={false ? "#1db954" : colors?.background}
              style={{ paddingTop: 3 }}
            />
          </Pressable>
          <Pressable
            onPress={async () => {
              const imageBase64 = await RNFetchBlob.config({
                fileCache: true,
              })
                .fetch("GET", artwork)
                // the image is now dowloaded to device's storage
                .then((resp) => {
                  return resp.readFile("base64");
                })
                .catch((err) => {
                  console.log(
                    "🚀 ~ file: PostHOC.js ~ line 150 ~ PostHOC ~ err",
                    err
                  );
                });
              const options: any = {
                title: "TRAKLITE",
                message: `TRAKLITE | Check out the latest music from ${artist}'s discography!! \n\nGet an endless stream of new music previews, tailored to your listening habits, on TRAKLITE.\n\nhttps://apps.apple.com/gb/app/traklite/id1575800144 `,
                urls: [`data:image/png;base64,${imageBase64}`],
              };
              Share.open(options)
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  err && console.log(err);
                });
            }}
          >
            <Ionicons name={"share"} size={23} color="#1a1a1a" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
