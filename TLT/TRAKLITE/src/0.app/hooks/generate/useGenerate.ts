import { useState, useContext, useEffect } from "react";

import { useProvider } from "../../../3.stores";

import {
  getRecommendedTracks,
  generate,
  getSeedArray,
  getStack,
} from "./handlers";

export const useGenerate = () => {
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [recommendations, setRecommendations] = useState<any>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    handleRecommendations();
  }, []);

  const { state } = useContext(useProvider);
  // const tracks = state.loggedIn
  //   ? state.user_data.services.spotify.top_tracks
  //   : state.offline.likes;

  const handleRecommendations = () => {
    const SPOT = state.loggedIn
      ? state.user_data.services.spotify.top_tracks
      : state.offline.likes;
    // const AM
    // const SCLOUD
    // const SGENPOT

    const TRAKseed = [SPOT /** , AM, SCLOUD, GEN */];

    const randomTrackIndicies = generate(tracks); // picks an array of random numbers in range within the number of tracks
    const seedArray = getSeedArray(tracks, randomTrackIndicies, state.loggedIn); // gets an array of ids

    let data;
    // gets TRAKLIST likes from backend and filters them for trak.type==='track
    if (state.user_data.likes?.length !== 0) {
      data = state.user_data?.likes?.filter((like: any) => {
        if (like["type"] === "track") {
          return like;
        }
      });
    }

    // does the same thing for online TRAK
    let seedArrayOnline, concat, seeds;
    if (state.loggedIn && data) {
      const randomTrackIndiciesOnline = generate(data);

      seedArrayOnline = getSeedArray(
        data,
        randomTrackIndiciesOnline,
        state.loggedIn
      ).slice(0, 2);

      // Puts them together
      concat = seedArray.concat(seedArrayOnline);

      //  Serializes them
      seeds = concat.join();
    } else {
      seeds = seedArray.join();
    }

    // And they're off.
    const recommendedTracks: any = getRecommendedTracks(seeds, state);

    // Here you go
    Promise.resolve(recommendedTracks).then((tracks) => {
      const stack: any = tracks.success
        ? getStack(tracks.response, state)
        : handleReload();

      return Promise.resolve(stack).then((response) => {
        return setRecommendations([...recommendations, ...response]);
      });
    });
  };

  const handleReload = () => {
    setRecommendations([]);
    handleRecommendations();
    if (recommendations) setIsUnavailable(false);
  };

  return {
    handleRecommendations,
    recommendations,
    setRecommendations,
    isUnavailable,
    setIsUnavailable,
    handleReload,
  };
};
