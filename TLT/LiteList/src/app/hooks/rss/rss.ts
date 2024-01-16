import {useState} from 'react';
import * as rssParser from 'react-native-rss-parser';
import {store, setRSS} from '../../../stores';

export const handleRSS = async () => {
  const complexRSS = await fetch(
    'https://assets.complex.com/feeds/channels/all.xml',
  )
    .then(response => response.text())
    .then(responseData => rssParser.parse(responseData))
    .then(rss => {
      console.log('🚀 ~ file: useRSSFeed.ts:19 ~ handleRSSFeed ~ rss:', rss);
      console.log(rss.title);
      console.log(rss.items.length);
      return rss.items;
    })
    .catch((err: any) => {
      console.log('🚀 ~ file: rss.ts:29 ~ handleRSS ~ err:', err);
    });

  // const pitchforkRSS = await fetch('https://www.music-news.com/rss/UK/reviews')
  //   .then(response => response.text())
  //   .then(responseData => rssParser.parse(responseData))
  //   .then(rss => {
  //     console.log('🚀 ~ file: rss.ts:22 ~ handleRSS ~ rss:', rss);
  //     console.log(rss.title);
  //     console.log(rss.items.length);
  //     return rss.items;
  //   })
  //   .catch((err: any) => {
  //     console.log('🚀 ~ file: rss.ts:29 ~ handleRSS ~ err:', err);
  //   });

  // console.log('🚀 ~ file: rss.ts:21 ~ handleRSS ~ pitchforkRSS:', pitchforkRSS);

  // const action = setRSS({complexRSS});
  // store.dispatch(action);

  console.log('🚀 ~ file: rss.ts:7 ~ handleRSS ~ complexRSS:', complexRSS);

  return complexRSS;
};
