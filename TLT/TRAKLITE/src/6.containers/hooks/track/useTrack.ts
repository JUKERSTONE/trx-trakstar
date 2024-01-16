import React, { useEffect, useState, useContext } from "react";
import { store } from "../../../3.stores";
import * as actions from "../../../3.stores";
import axios from "axios";
import {
  SPOTIFY_TRACKS,
  SAVE_POST_ROUTE,
  SET_GAMIFICATION_LIKE,
} from "../../../1.api";
import { useProvider } from "../../../3.stores";

export const useTrack = (id: string) => {
  const { state } = useContext(useProvider);

  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(
    state.offline.likes.includes(id) ?? false
  );
  console.log("🚀 ~ file: useTrack.ts ~ line 17 ~ useTrack ~ isLiked", isLiked);
  useEffect(() => {
    if (
      state.user_data?.likes?.some(
        (like: any) => like["type"] === "track" && like["trackID"] === id
      )
    ) {
      setIsLiked(true);
    }
  }, []);

  const handleTape = () => {};

  const handlePreviewTrack = (info: any) => {
    // alert(JSON.stringify(item));

    store.dispatch(actions.SET_PLAYER("set player.", info));
  };

  const handleSave = (sId: string) => {
    if (state.loggedIn) {
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
    } else {
      alert("Please authenticate to save tracks to Spotify");
    }
  };

  const handleLike = (sId: string) => {
    console.log("🚀 ~ file: useTrack.ts ~ line 72 ~ handleLike ~ sId", sId);
    if (state.loggedIn) {
      axios
        .post(
          SET_GAMIFICATION_LIKE("track"),
          { trackID: sId },
          {
            headers: {
              "Content-Type": "application/json",
              // Authorization: "Bearer " + state.keys.traklist?.access_token,
            },
          }
        )
        .then((response) => {
          console.log(
            "🚀 ~ file: useTrack.ts ~ line 84 ~ handleLike ~ response",
            response.data
          );
          const data = [...state.user_data?.likes, response.data];
          const set = Array.from(new Set(data));
          console.log(
            "🚀 ~ file: useTrack.ts ~ line 86 ~ handleLike ~ set",
            set
          );
          store.dispatch(actions.ONLINE_LIKE("user online like.", set));

          setIsLiked(true);
        });
    } else {
      // setLikesData([...likesData, sId]);
      const data = [...state.offline?.likes, sId];
      const set = Array.from(new Set(data));

      try {
        store.dispatch(actions.OFFLINE_LIKE("user offline like.", set));
        setIsLiked(true);
      } catch (e) {
        //
      }
    }
  };

  return {
    handleTape,
    handleSave,
    handleLike,
    handlePreviewTrack,
    isLiked,
    isSaved,
  };
};
