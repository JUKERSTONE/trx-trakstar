import {useState, useContext, useEffect} from 'react';

import {
  getRecommendedTracks,
  generate,
  getSeedArray,
  getStack,
  handlePurgeSeed,
  handleTranslateRecommendations,
} from './handlers';
import {useLITELISTState} from '../../useLITELISTState';
import {Alert} from 'react-native';
import {store, setTRAKLIST} from '../../../stores';
import Toast from 'react-native-toast-message';

export const useGenerate = () => {
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [progress, setProgress] = useState(0);
  // const [recommendations, setRecommendations] = useState<any>([]);
  const [visible, setVisible] = useState(false);
  const {handleGetState} = useLITELISTState();

  useEffect(() => {
    handleRecommendations();
  }, []);

  const profile = handleGetState({index: 'profile'});
  console.log(
    '🚀 ~ file: useGenerate.ts ~ line 25 ~ useGenerate ~ profile',
    profile,
  );
  const traklandProfile = profile.trakland;
  console.log(
    '🚀 ~ file: useGenerate.ts ~ line 26 ~ useGenerate ~ traklandProfile',
    traklandProfile,
  );
  const TRXProfile = profile.TRX;
  const userCategory = TRXProfile.userCategory;
  const keys = handleGetState({index: 'keys'});
  const appToken = keys.spotify.appToken;
  console.log(
    '🚀 ~ file: useGenerate.ts ~ line 30 ~ useGenerate ~ userCategory',
    userCategory,
  );
  const spotify = traklandProfile.spotify;
  console.log(
    '🚀 ~ file: useGenerate.ts ~ line 35 ~ useGenerate ~ spotify',
    spotify,
  );
  const apple_music = traklandProfile.apple_music;

  const trx = traklandProfile.trx;

  const recommendation = apple_music?.recommendations;
  const topTracks = spotify?.top_tracks;
  console.log(
    '🚀 ~ file: useGenerate.ts ~ line 40 ~ useGenerate ~ topTracks',
    topTracks,
  );

  const handleRecommendations = async (isRegen = false, REGEN = []) => {
    let SPOT,
      AM,
      TRX = null;
    if (isRegen) {
      SPOT = REGEN;
    } else {
      SPOT = topTracks;
      AM = recommendation;
      TRX = trx;
    }
    const TRAKseed = {SPOT, AM, TRX /** , SCLOUD */};
    console.log(
      '🚀 ~ file: useGenerate.ts ~ line 61 ~ handleRecommendations ~ TRAKseed',
      TRAKseed,
    );

    const trxISRC = profile.TRX.likes
      .filter((item: any) => item?.spotifyId)
      .map((item: any) => item?.spotifyId);

    console.log(
      '🚀 ~ file: useGenerate.ts:81 ~ handleRecommendations ~ trxISRC:',
      trxISRC,
    );

    if (trxISRC.length) {
      console.log(
        '🚀 ~ file: useGenerate.ts:83 ~ handleRecommendations ~ trxISRC:',
        trxISRC,
      );
      const recommendedTracks: any = await getRecommendedTracks(
        trxISRC,
        appToken,
      );
      console.log(
        '🚀 ~ file: useGenerate.ts:87 ~ handleRecommendations ~ recommendedTracks:',
        recommendedTracks,
      );

      setProgress(7 / 8);

      // 5
      if (recommendedTracks.success) {
        const TRAK: any = await handleTranslateRecommendations(
          recommendedTracks.response,
          userCategory,
        );
        console.log(
          '🚀 ~ file: useGenerate.ts ~ line 111 ~ handleRecommendations ~ TRAK',
          TRAK,
        );

        setProgress(8 / 8);
        Toast.show({
          type: 'success',
          text1: 'Having fun?',
          text2: 'Generating new recommendations for you...',
        });
        const action = setTRAKLIST({traklist: TRAK});
        store.dispatch(action);
      } else {
        Toast.show({
          type: 'info',
          text1: 'Trying again',
          text2: 'Generating new recommendations for you...',
        });
        // handleRecommendations();
      }
      return;
    }

    if (TRX) {
      const trxSeeds = trx.map((item: any) => {
        return item.trak.spotifyId;
      });
      console.log(
        '🚀 ~ file: useGenerate.ts:82 ~ trxSeeds ~ trxSeeds:',
        trxSeeds,
      );

      const recommendedTracks: any = await getRecommendedTracks(
        trxSeeds,
        appToken,
      );
      console.log(
        '🚀 ~ file: useGenerate.ts:87 ~ handleRecommendations ~ recommendedTracks:',
        recommendedTracks,
      );

      setProgress(7 / 8);

      // 5
      if (recommendedTracks.success) {
        const TRAK: any = await handleTranslateRecommendations(
          recommendedTracks.response,
          userCategory,
        );
        console.log(
          '🚀 ~ file: useGenerate.ts ~ line 111 ~ handleRecommendations ~ TRAK',
          TRAK,
        );

        setProgress(8 / 8);
        Toast.show({
          type: 'success',
          text1: 'Having fun?',
          text2: 'Generating new recommendations for you...',
        });
        const action = setTRAKLIST({traklist: TRAK});
        store.dispatch(action);
      } else {
        Toast.show({
          type: 'info',
          text1: 'Trying again',
          text2: 'Generating new recommendations for you...',
        });
        // handleRecommendations();
      }
      return;
    }

    setProgress(3 / 8);

    // 1.
    const trakDemarcation = await handlePurgeSeed({
      seed: TRAKseed,
      userCategory,
    });
    console.log(
      '🚀 ~ file: useGenerate.ts ~ line 73 ~ handleRecommendations ~ trakDemarcation',
      trakDemarcation,
    );

    // may need to reload purge seed some times

    // if trak demarcation is less than 3, reload
    if (trakDemarcation!.length < 3) {
      alert(
        'whoops. you ran into a bug - please close and reopen the app until we get this fixed',
      );
    }

    setProgress(4 / 8);

    // 2.
    const randomTrackIndicies = generate(trakDemarcation); // picks an array of random numbers in range within the number of tracks
    console.log(
      '🚀 ~ file: useGenerate.ts ~ line 85 ~ handleRecommendations ~ randomTrackIndicies',
      randomTrackIndicies,
    );

    setProgress(5 / 8);

    // 3.
    const seedArray = getSeedArray({
      tracks: trakDemarcation,
      indicies: randomTrackIndicies,
      state: true,
      userCategory,
    }); // gets an array of ids

    setProgress(6 / 8);

    // 4.
    // mapped trx seed override - need spotifyId
    const seeds = seedArray.join();
    const recommendedTracks: any = await getRecommendedTracks(seeds, appToken);

    setProgress(7 / 8);

    // 5
    if (recommendedTracks.success) {
      const TRAK: any = await handleTranslateRecommendations(
        recommendedTracks.response,
        userCategory,
      );
      console.log(
        '🚀 ~ file: useGenerate.ts ~ line 111 ~ handleRecommendations ~ TRAK',
        TRAK,
      );

      setProgress(8 / 8);
      Toast.show({
        type: 'success',
        text1: 'Having fun?',
        text2: 'Generating new recommendations for you...',
      });
      const action = setTRAKLIST({traklist: TRAK});
      store.dispatch(action);
    } else {
      Toast.show({
        type: 'info',
        text1: 'Trying again',
        text2: 'Generating new recommendations for you...',
      });
      // handleRecommendations();
    }
  };

  return {
    handleRecommendations,
    isUnavailable,
    setIsUnavailable,
    // handleReload,
    progress,
  };
};
