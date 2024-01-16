import {useContext, useState, useEffect} from 'react';
import {Linking} from 'react-native';
import axios from 'axios';
import {api, useAPI} from '../../api';
import {handleTrending} from '../../app';

export const useLandingNews = ({navigation}: any) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    handleGetNews();
  }, []);

  const handleGetNews = async () => {
    const trending = await handleTrending();
    setNews(trending.news);
  };

  const handleShareNews = (item: any) => {
    console.log(
      '🚀 ~ file: useRSSComplex.ts:16 ~ handleNavigateWebsite ~ item:',
      item,
    );
    navigation.navigate('GENIUS', {
      url: item,
    });
  };

  return {
    news,
    handleShareNews,
    // share,
  };
};
