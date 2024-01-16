import React from "react";
import {
  View,
  Text,
  Dimensions,
  Pressable,
  SafeAreaView,
  Image,
} from "react-native";
import { TapeView } from "../../6.containers";
import { TraklistApp } from "../../6.containers/hooks/traklist-app/TraklistApp";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Share from "react-native-share";
import RNFetchBlob from "rn-fetch-blob";

interface TTape {
  navigation: any;
  route: any;
}
export const Tape: React.FC<TTape> = ({ ...props }) => {
  console.log("🚀 ~ file: Tape.tsx ~ line 22 ~ props", props);
  return (
    <TraklistApp {...props} hasPlayer={false}>
      <SafeAreaView
        style={{
          // position: 'absolute',
          // top: 0,
          // left: 0,
          width: "100%",
          height: 80,
          justifyContent: "space-around",
          // paddingHorizontal: 30,
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "#1a1a1a",
          marginBottom: 10,
        }}
      >
        <Pressable onPress={() => props.navigation.goBack()}>
          <MaterialIcons
            name={"arrow-back-ios"}
            size={23}
            color={"whitesmoke"}
            style={{ opacity: 0.9, paddingLeft: 20 }}
          />
        </Pressable>
        <Image
          style={{
            height: 200,
            width: 200,
            marginTop: 8,
            borderRadius: 15,
          }}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/poster_black.png?alt=media",
          }}
        />
        <Pressable
          onPress={async () => {
            const artwork = props.route.params.tape.images[0].url;
            const title = props.route.params.tape.name;
            const artist = props.route.params.tape.artists[0].name;
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
              message: `TRAKLITE | Have you heard ${artist}'s tape, '${title}'??! \n\nGet an endless stream of new music previews, tailored to your listening habits, on TRAKLITE.\n\nhttps://apps.apple.com/gb/app/traklite/id1575800144 `,
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
          <Ionicons
            name={"share"}
            size={23}
            color="#fff"
            style={{ paddingTop: 1, paddingHorizontal: 3 }}
          />
        </Pressable>
      </SafeAreaView>
      <TapeView {...props} />
    </TraklistApp>
  );
};
