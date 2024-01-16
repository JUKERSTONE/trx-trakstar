import { useState, useContext, useEffect } from "react";

import axios from "axios";

import { useProvider } from "../../../3.stores";
import { SPOTIFY_TRACKS, SAVE_POST_ROUTE } from "../../../1.api";
import { store } from "../../../3.stores";
import * as actions from "../../../3.stores";
import { useGenerate } from "../../../0.app";

export const useSwipeStack = (props: any) => {
  const [visible, setVisible] = useState(false);
  const {
    handleRecommendations,
    recommendations,
    isUnavailable,
    handleReload,
  } = useGenerate();

  useEffect(() => {
    handleRecommendations();
  }, []);

  const { state } = useContext(useProvider);
  const tracks = state.loggedIn
    ? state.user_data.services.spotify.top_tracks
    : state.offline.likes;

  const handleLeftSwipe = () => {
    // pop modal
    return;
  };
  const handleRightSwipe = (id: string) => {
    if (state.loggedIn) {
      axios
        .put(SPOTIFY_TRACKS("save", id), [id], {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.keys.spotify.access_token,
          },
        })
        .then((response) => {
          axios
            .get(SAVE_POST_ROUTE(id), {
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
          console.log(err, " - track not saved");
        });
    } else alert("you must authenticate to save songs to your Spotify Library");
  };

  const generateItems = (index: number) => {
    if (index == recommendations.length - 4) {
      alert(
        "Generating new recommendations based on your listening history..."
      );
      () => handleRecommendations();
    }
  };

  const popModal = () => {
    setVisible(true);
    setTimeout(() => setVisible(false), 1000);
  };

  const handleSetPlayer = (index: number) => {
    const info = {
      ...state.player,
      id: {
        track: recommendations[index - 9]?.track?.id,
        artist: recommendations[index - 9]?.artist?.id,
      },
      title: recommendations[index - 9]?.track?.name,
      artist: recommendations[index - 9]?.artist?.name,
      uri: recommendations[index - 9]?.track?.artwork,
      preview_url: recommendations[index - 9]?.track?.preview_url,
      isPaused: recommendations[index - 9]?.track?.preview_url ? false : true,
    };
    store.dispatch(actions.SET_PLAYER("set player.", info));
  };

  return {
    recommendations,
    handleLeftSwipe,
    handleRightSwipe,
    generateItems,
    isUnavailable,
    handleReload,
    visible,
    setVisible,
    state,
    popModal,
    handleSetPlayer,
  };
};
