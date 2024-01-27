import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {useLITELISTState, handleAppendTRAKLIST} from '../../app';

export const useBeReal = ({navigation, route}: any) => {
  const [TRAKOption, setTRAKOption] = useState<any>(null);
  const [selectedEmotion, setSelectedEmotion] = useState<any>(null);
  const [TRAK, setTRAK] = useState<any>(null);

  // useEffect(() => {
  //   alert(JSON.stringify(TRAK));
  // }, []);

  const {useGET} = useAPI();
  const {handleGetState} = useLITELISTState();
  const keys = handleGetState({index: 'keys'});
  const accessToken = keys.spotify.accessToken;

  useEffect(() => {
    handleGetRecentlyPlayed();
  }, []);

  const handleGetRecentlyPlayed = async () => {
    const route = api.spotify({method: 'recently-played'});
    const route1 = api.spotify({method: 'now-playing'});
    console.log(
      '🚀 ~ file: useBeReal.ts ~ line 29 ~ handleGetRecentlyPlayed ~ route1',
      route1,
    );

    const currentlyPlaying: any = await useGET({
      route: route1,
      token: accessToken,
    })
      .then((response: any) => {
        console.log(
          '🚀 ~ file: useBeReal.ts ~ line 32 ~ .then ~ response',
          response,
        );
        return response.data;
      })
      .catch(err => {
        console.log(
          '🚀 ~ file: useBeReal.ts ~ line 39 ~ handleGetRecentlyPlayed ~ err',
          err,
        );

        return [];
      });

    console.log(
      '🚀 ~ file: useBeReal.ts ~ line 31 ~ handleGetRecentlyPlayed ~ currentlyPlaying',
      currentlyPlaying,
    );

    if (currentlyPlaying === '') {
      alert(1);
      const recentlyPlayed: any = await useGET({route, token: accessToken})
        .then((response: any) => {
          console.log(
            '🚀 ~ file: useBeReal.ts ~ line 62 ~ .then ~ response',
            response,
          );
          return response.data.items;
        })
        .catch(() => {
          return [];
        });

      return setTRAKOption({isSingle: false, trak: recentlyPlayed});
    } else {
      alert(2);

      return setTRAKOption({isSingle: true, trak: currentlyPlaying});
    }
  };

  const emotion = ['happy', 'sad'];

  const handleSelectEmotion = (emotion: any) => {
    setSelectedEmotion(emotion);
  };

  const handleAppend = () => {
    alert(
      JSON.stringify({
        createdAt: new Date().toString(),
        TRAK,
      }),
    );
    // handleAppendTRAKLIST({
    //   createdAt: new Date().toString(),
    //   TRAK,
    // });
  };

  return {
    TRAKOption,
    emotion,
    handleAppend,
    handleSelectEmotion,
    setTRAK,
  };
};
