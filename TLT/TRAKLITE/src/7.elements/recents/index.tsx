import React from "react";
import { ScrollView, Pressable, Text, View } from "react-native";
import Card from "../cards/last-played";

interface RecentsProps {
  content: any;
  navigation: any;
  route: any;
  color?: string;
  modeProp?: string;
  type?: string;
  isNavigation?: boolean;
  handleInvestment: any;
  isDiscover: any;
}

export const Recents: React.FC<RecentsProps> = ({
  content,
  navigation,
  route,
  modeProp,
  type,
  isNavigation,
  color = "#000",
  handleInvestment,
  isDiscover,
}) => {
  const { recents, user, search_results, isDefault } = content();
  console.log(
    "🚀 ~ file: index.tsx ~ line 19 ~ {recents, user, search_results, isDefault}",
    { recents, user, search_results, isDefault }
  );
  // console.log(isDefault, 'mode');
  const mode = isDefault ? recents : search_results;
  const option = isNavigation ? route.params.type : type;
  const isParty = route.params?.mode;
  const subtitle =
    isDefault === true
      ? "Recently Played " + option + "s..."
      : "Search Results:";
  return (
    <>
      <View
        style={{
          backgroundColor: "transparent",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "#fff",
            marginBottom: 4,
            marginLeft: 20,
          }}
        >
          {subtitle}
        </Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{
          flex: 10,
        }}
      >
        {mode?.map((card: any, key: any) => {
          const content = {
            id: mode === recents ? card.track.id : card.id,
            artistId:
              mode === recents ? card.track.artists[0].id : card.artistId,
            played_at: recents ? card.played_at : null,
            isRecent: isDefault ? true : false,
            title: mode === recents ? card.track.name : card.title,
            artist: mode === recents ? card.track.artists[0].name : card.artist,
            artwork:
              mode === recents ? card.track.album.images[0].url : card.artwork,
            preview: mode === recents ? card.track.preview_url : card.preview,
            service: mode === recents ? "spotify" : card.service,
          };
          return (
            <View style={{ marginBottom: 10 }}>
              <Card
                type="post"
                {...content}
                color={color}
                isDefault={isDefault}
                handleView={() =>
                  isDiscover
                    ? handleInvestment(card.track)
                    : isParty
                    ? navigation.navigate("PartyUser", { content })
                    : navigation.navigate("PREVIEW.", { user, content })
                }
              />
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

export default Recents;
