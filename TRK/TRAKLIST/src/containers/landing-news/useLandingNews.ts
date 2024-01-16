import {useContext, useState, useEffect} from 'react';
import {Linking} from 'react-native';
import axios from 'axios';
import {api, useAPI} from '../../api';

export const useLandingNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    handleLatestNews();
  }, []);

  const handleLatestNews = () => {
    const route: any = api.bernie({method: 'get_news'});

    axios
      .get(route, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log(
          '🚀 ~ file: useLandingNews.ts ~ line 24 ~ .then ~ response',
          response,
        );
        setNews(response.data.news);
      });
  };

  return {
    news,
    // share,
  };
};
