// import { GET_TRENDING } from "../../../1.api";

import {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {api, useAPI} from '../../api';
import {handleTrending} from '../../app';

export const useLandingTrakListWeek = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    handleGetTrending();
  }, []);

  const handleGetTrending = async () => {
    const trending = await handleTrending();
    setTrending(trending.trending);
  };

  const data = [
    {
      rank: 1,
      artwork:
        'https://static.stereogum.com/uploads/2021/08/Drake-Certified-Lover-Boy-1630334465.jpeg',
      title: 'Way 2 Sexy (with Future & Young Thug)',
      artist: 'Drake',
      status: 'rising' as 'same' | 'rising' | 'falling',
    },
    {
      rank: 2,
      artwork:
        'https://static.highsnobiety.com/thumbor/eOIwJut_9esN_RpESnDVx9fZ9gE=/1200x720/static.highsnobiety.com/wp-content/uploads/2021/08/18122847/kanye-west-donda-album-cover-01.jpg',
      title: 'Hurricane',
      artist: 'Kanye West',
      status: 'rising' as 'same' | 'rising' | 'falling',
    },
    {
      rank: 3,
      artwork:
        'https://media.pitchfork.com/photos/6129483b461ddb015442fd60/1:1/w_500/Baby-Keem-Kendrick-Lamar.jpeg',
      title: 'Familly Ties',
      artist: 'Baby Keem',
      status: 'falling' as 'same' | 'rising' | 'falling',
    },
  ];

  return {
    trending,
    data,
  };
};
