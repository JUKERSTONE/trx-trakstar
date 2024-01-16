import React from "react";
import { View, Pressable, FlatList } from "react-native";
import { PostView } from "../../6.containers";
import Card from "../cards/last-played";
import { VHeader } from "../typography";
import LinearGradient from "react-native-linear-gradient";

interface UserProfileTabProps {
  tab: any;
  handleTabChange: any;
  userProfile: any;
}

export const UserProfileTabView: React.FC<UserProfileTabProps> = ({
  tab = "playlists",
  handleTabChange,
  userProfile,
}) => {
  let data;
  console.log("🚀 ~ file: index.tsx ~ line 13 ~ userProfile", userProfile);

  // const {topTracks, topArtists, playlists} = userProfile;
  const topTracks = userProfile?.topTracks ?? null;
  const topArtists = userProfile?.topArtists ?? null;
  const playlists = userProfile?.playlist ?? null;

  switch (tab) {
    case "tracks":
      data = JSON.parse(topTracks);
      break;
    case "artists":
      data = JSON.parse(topArtists);
      break;
    case "playlists":
      data = JSON.parse(playlists);
      break;
    // case 'posts':
    //   data = posts ? posts : null;
    //   break;
    default:
      data = null;
  }

  const renderItem = ({ item }: any) => {
    return (
      <>
        {/* {tab === 'posts' && (
          <View>
            <PostView
              username={item.username}
              createdAt={item.createdAt}
              caption={item.post.caption}
              title={item.music.title}
              artist={item.music.artist}
              uri={item.music.artwork}
              preview_url={item.music.preview ? item.music.preview : null}
              likeCount={item.post.count.likes}
              commentCount={item.post.count.comments}
            />
          </View>
        )} */}
        {tab === "tracks" && (
          <Card
            color="#fff"
            title={item.name}
            artist={item.artists[0].name}
            artwork={item.album.images[0].url}
          />
        )}
        {tab === "artists" && (
          <Card
            color="#fff"
            title={item.name}
            popularity={item.popularity}
            followers={item.followers.total}
            artwork={item.images[0] ? item.images[0].url : null}
          />
        )}
        {tab === "playlists" && (
          <Card
            color="#fff"
            title={item.name}
            artist={item.owner.display_name}
            artwork={item.images[0] ? item.images[0].url : null}
          />
        )}
      </>
    );
  };

  return (
    <View style={{ backgroundColor: "#1a1a1a" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#cecece",
          opacity: 0.9,
          padding: 5,
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderRadius: 5,
          marginHorizontal: 20,
          borderColor: "#FFF",
        }}
      >
        {/* <Pressable
          onPress={() => handleTabChange('posts')}
          style={{
            backgroundColor: tab === 'posts' ? '#292929' : 'transparent',
            padding: 8,
            borderRadius: 5,
          }}>
          <VHeader
            type="five"
            color={tab === 'posts' ? '#cecece' : '#fff'}
            text={'Posts'}
          />
        </Pressable> */}
        <Pressable
          onPress={() => handleTabChange("playlists")}
          style={{
            padding: 8,
            borderRadius: 5,
          }}
        >
          <VHeader
            type="five"
            color={tab === "playlists" ? "#1B4F26" : "grey"}
            text={"Playlists"}
          />
        </Pressable>
        <Pressable
          onPress={() => handleTabChange("artists")}
          style={{
            padding: 8,
            borderRadius: 5,
          }}
        >
          <VHeader
            type="five"
            color={tab === "artists" ? "#1B4F26" : "grey"}
            text={"Top Artists"}
          />
        </Pressable>
        <Pressable
          onPress={() => handleTabChange("tracks")}
          style={{
            padding: 8,
            borderRadius: 5,
          }}
        >
          <VHeader
            type="five"
            color={tab === "tracks" ? "#1B4F26" : "grey"}
            text={"Top Tracks"}
          />
        </Pressable>
      </View>
      <View>
        {/*  */}
        <LinearGradient
          colors={["#1A1A1A", "#1B4F26", "#1a1a1a"]}
          style={{
            paddingBottom: 350,
            width: "100%",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <FlatList
            style={{ width: "70%" }}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id}
          />
        </LinearGradient>
      </View>
    </View>
  );
};
