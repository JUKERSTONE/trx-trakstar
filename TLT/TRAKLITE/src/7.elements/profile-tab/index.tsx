import React from "react";
import { View, Pressable, FlatList, Dimensions } from "react-native";
import { PostView } from "../../6.containers";
import Card from "../cards/last-played";
import { VHeader } from "../typography";
import LinearGradient from "react-native-linear-gradient";
import { ProgressChart } from "react-native-chart-kit";

interface ProfileTabProps {
  tab: any;
  handleTabChange: any;
  posts: any;
  tracks: any;
  artists: any;
  playlists: any;
  // audioFeatures: any;
  handleView: (select: any, type: string) => void;
  handleArtistNavigation: any;
  handleTrackNavigation: any;
}

export const ProfileTabView: React.FC<ProfileTabProps> = ({
  tab = "playlists",
  handleTabChange,
  posts,
  tracks,
  artists,
  playlists,
  // audioFeatures,
  handleView,
  handleArtistNavigation,
  handleTrackNavigation,
}) => {
  // const {
  //   acousticness,
  //   energy,
  //   instrumentalness,
  //   liveness,
  //   loudness,
  //   speechiness,
  // } = audioFeatures;
  // console.log('🚀 ~ file: index.tsx ~ line 38 ~ audioFeatures', audioFeatures);
  // console.log(params == true, 'chhe');

  // const data1 = {
  //   labels: ['acoustic.', 'energy', 'instrum.', 'liveness', 'loud.', 'speech.'], // optional
  //   data: [
  //     acousticness * 1 ?? 0,
  //     energy * 1 ?? 0,
  //     instrumentalness * 1 ?? 0,
  //     liveness * 1,
  //     loudness * -0.1 ?? 0,
  //     speechiness * 1 ?? 0,
  //   ],
  // };

  let data;

  switch (tab) {
    case "tracks":
      data = tracks;
      break;
    case "artists":
      data = artists;
      break;
    case "playlists":
      data = playlists;
      break;
    case "posts":
      data = posts ? posts : null;
      break;
    default:
      data = tracks ? tracks : null;
  }

  const renderItem = ({ item }: any) => {
    console.log("🚀 ~ file: index.tsx ~ line 79 ~ renderItem ~ item", item);
    let select: any;

    switch (tab) {
      case "tracks":
        select = {
          id: {
            artist: item.artists[0].id,
            track: item.id,
          },
        };
        break;
      case "artists":
        select = {
          id: {
            artist: item.id,
          },
        };
        break;
      case "playlists":
        select = {
          id: {
            playlist: item.id,
          },
          images: item.images,
        };
        break;
      default:
        select = {};
    }

    return (
      <View
        style={{
          // paddingBottom: 20,
          marginBottom: 3,
          // borderBottomWidth: 1,
          // borderBottomColor: '#cecece',
        }}
      >
        {tab === "tracks" && (
          <Card
            id={select.id}
            type={tab}
            color="#fff"
            title={item.name}
            artist={item.artists[0].name}
            artwork={item.album.images[0].url}
            handleView={() => handleTrackNavigation(item)}
          />
        )}
        {tab === "artists" && (
          <Card
            id={select.id}
            type={tab}
            color="#fff"
            title={item.name}
            popularity={item.popularity}
            followers={item.followers.total}
            artwork={item.images[0] ? item.images[0].url : null}
            handleView={() => handleArtistNavigation(item)}
          />
        )}
        {tab === "playlists" && item.images[0] && (
          <Card
            id={select.id}
            type={tab}
            color="#fff"
            title={item.name}
            artist={item.owner.display_name}
            artwork={item.images[0] ? item.images[0].url : null}
            handleView={() => handleView(select, tab)}
          />
        )}
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: "#1a1a1a" }}>
      {/* <View
        style={{
          minHeight: 60,
          marginBottom: 25,
          alignItems: 'center',
        }}>
        <ProgressChart
          data={data1}
          width={Dimensions.get('window').width}
          height={270}
          strokeWidth={10}
          radius={20}
          chartConfig={{
            backgroundColor: '#1A1A1A',
            backgroundGradientFrom: '#1B3926',
            backgroundGradientTo: '#1a1a1a',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          hideLegend={false}
        />
      </View> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#1a1a1a",
          opacity: 0.8,
          padding: 5,
          // borderWidth: 3,
          borderRadius: 10,
          borderBottomWidth: 0,
          marginHorizontal: 25,
          // borderColor: "grey",
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
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
            borderBottomWidth: tab === "playlists" ? 2 : 0,
            borderBottomColor: "#fff",
          }}
        >
          <VHeader
            type="five"
            color={tab === "playlists" ? "#fff" : "#1B4F26"}
            text={"PLAYLISTS"}
          />
        </Pressable>
        <Pressable
          onPress={() => handleTabChange("artists")}
          style={{
            padding: 8,
            borderRadius: 5,
            borderBottomWidth: tab === "artists" ? 2 : 0,
            borderBottomColor: "#fff",
          }}
        >
          <VHeader
            type="five"
            color={tab === "artists" ? "#fff" : "#1B4F26"}
            text={"TOP ARTISTS"}
          />
        </Pressable>
        <Pressable
          onPress={() => handleTabChange("tracks")}
          style={{
            padding: 8,
            borderRadius: 5,
            borderBottomWidth: tab === "tracks" ? 2 : 0,
            borderBottomColor: "#fff",
          }}
        >
          <VHeader
            type="five"
            color={tab === "tracks" ? "#fff" : "#1B4F26"}
            text={"TOP TRAKS"}
          />
        </Pressable>
      </View>
      <View>
        {/*  */}
        <LinearGradient
          colors={["#1A1A1A", "#1B4F26", "#1a1a1a"]}
          style={{ paddingBottom: 20 }}
        >
          <FlatList
            style={{
              backgroundColor: "#1a1a1a",
              // opacity: 0.9,
              // marginHorizontal: 10,
              marginVertical: 3,
              borderRadius: 10,
              borderTopWidth: 0,
              // borderWidth: 3,
              // borderColor: "green",
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
              paddingVertical: 3,
              opacity: 0.7,
            }}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id}
          />
        </LinearGradient>
      </View>
    </View>
  );
};
