import React, { useContext, useEffect, useState } from "react";
import { useProvider } from "../../../3.stores";
import { store } from "../../../3.stores";
import * as actions from "../../../3.stores";
import axios from "axios";
import {
  SPOTIFY_GET_TRACK,
  MUSIXMATCH_GET_LYRICS,
  SPOTIFY_TRACKS,
  SAVE_POST_ROUTE,
} from "../../../1.api";
import Share from "react-native-share";
import RNFetchBlob from "rn-fetch-blob";
import ImageMarker from "react-native-image-marker";
import { Platform } from "react-native";

export const useTraklistPlayer = ({ navigation }: any) => {
  const [isNewTrak, setIsNewTrack] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const { state } = useContext(useProvider);

  useEffect(() => {
    setIsNewTrack((prev) => prev + 1);
  }, [state.player.preview_url]);

  const handleTogglePlay = () => {
    store.dispatch(actions.TOGGLE_PLAYER("toggle player."));
  };

  const handleLock = () => {
    store.dispatch(
      actions.LOCK_PLAYER("lock player.", !state.player.isLocked ?? true)
    );
  };

  const handleFullScreen = () => {
    // navigation.navigate('FullScreenPreview');
  };

  const handleMute = () => {
    store.dispatch(
      actions.TOGGLE_MUTE("mute player.", !state.player.isMuted ?? true)
    );
  };

  const handleOptions = () => {
    // setModalVisible(!modal Visible);
  };

  const handleShazam = () => {
    alert("shazam feature coming soon");
  };

  const handleFullScreenModal = () => {
    // dispath to modal objects

    const modal = {
      type: "fullscreen",
      full_screen: {
        active: true,
        image: state.player.uri,
      },
    };

    store.dispatch(actions.TOGGLE_FULL_SCREEN("toggle full screen.", modal));

    // const modal = {
    //   fullscreen: {
    //     active: true,
    //     image: '',
    //   },
    //   // ,
    // };
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePost = () => {
    const modal = {
      type: "post",
      post: {
        active: true,
      },
    };

    store.dispatch(actions.TOGGLE_POST_OPTIONS("toggle post options.", modal));
  };

  const handleInfo = (id: any) => {
    const trackId = id.track;

    axios
      .get(SPOTIFY_GET_TRACK(trackId), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.keys.spotify.s_client_token,
        },
      })
      .then((response) => {
        console.log(response.data);

        const isrc = response.data.external_ids.isrc;

        axios
          .get(MUSIXMATCH_GET_LYRICS(isrc))
          .then((response2) => {
            // console.log(res.data, 'poi');
            //   console.log(
            //     response2.data.message.body.lyrics.lyrics_body,
            //     response.data,
            //   );
            const lyrics_body = response2.data.message.body
              ? response2.data.message.body.lyrics.lyrics_body
              : null;
            const track = {
              ...response.data,
              lyrics: lyrics_body,
            };

            navigation.navigate("TrackView", { track });
          })
          .catch((err) =>
            alert("Premium Content Only! Gain XP by using this app!")
          );
      });
  };

  const handleSave = (sId: string) => {
    setIsSaved(true);
    axios
      .put(SPOTIFY_TRACKS("save", sId), [sId], {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.keys.spotify.access_token,
        },
      })
      .then((response) => {
        axios
          .get(SAVE_POST_ROUTE(sId), {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + state.keys.traklist.access_token,
            },
          })
          .then((res) => {})
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        setIsSaved(false);
        console.log(err, " - track not saved");
      });
  };

  const handleMenu = () => {
    navigation.openDrawer();
  };

  const handleReplay = () => {
    store.dispatch(actions.TOGGLE_REPLAY("toggle replay."));
  };

  const handleSearch = () => {
    store.dispatch(actions.TOGGLE_SEARCH("toggle search."));
  };

  const handleInbox = () => {
    alert("DM's... Coming Soon");
  };

  const handleShareTrack = async ({
    artist,
    title,
    cover_art,
    audio_preview,
  }: any) => {
    console.log(
      "🚀 ~ file: useTraklistPlayer.ts ~ line 173 ~ handleShareTrack ~ artist, title, cover_art, audio_preview",
      artist,
      title,
      cover_art,
      audio_preview
    );

    // const iconUri =
    //   "https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/TRAKLIST.png?alt=media&token=c03fb331-bf09-4055-9729-271023fcc647";

    // const paths = await ImageMarker.markImage({
    //   src: cover_art,
    //   markerSrc: iconUri, // icon uri
    //   position: "bottomLeft",
    //   X: 20,
    //   Y: 20,
    //   scale: 1, // scale of bg
    //   markerScale: 0.2, // scale of icon
    //   quality: 100, // quality of image,
    //   // saveFormat: "png",
    // }).catch((err) => {
    //   console.log(err, "err");
    // });
    // console.log(
    //   "🚀 ~ file: useTraklistPlayer.ts ~ line 205 ~ useTraklistPlayer ~ paths",
    //   paths
    // );

    const fs = RNFetchBlob.fs;
    let imagePath = null;
    const imageBase64 = await RNFetchBlob.config({
      fileCache: true,
    })
      .fetch("GET", cover_art)
      // the image is now dowloaded to device's storage
      .then((resp) => {
        imagePath = resp.path();
        return resp.readFile("base64");
      })
      .catch((err) => {
        console.log("🚀 ~ file: PostHOC.js ~ line 150 ~ PostHOC ~ err", err);
      });

    const options: any = {
      title: "TRAKLITE",
      message: `TRAKLITE | Have you heard '${title}' by ${artist}??! \n\nGet an endless stream of new music previews, tailored to your listening habits, on TRAKLITE.\n\nhttps://apps.apple.com/gb/app/traklite/id1575800144 `,
      urls: [`data:image/png;base64,${imageBase64}`],
      remoteVideoUrl: audio_preview,
    };

    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  return {
    state,
    handleTogglePlay,
    handleSave,
    handleFullScreen,
    handleMute,
    handleInfo,
    handleOptions,
    handleShazam,
    handleFullScreenModal,
    handlePost,
    handleLock,
    isLocked,
    isSaved,
    handleMenu,
    handleGoBack,
    handleReplay,
    isNewTrak,
    handleSearch,
    handleInbox,
    handleShareTrack,
  };
};
