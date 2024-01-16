import React, {useEffect, useState, useContext} from 'react';
import {
  PlayerContext,
  useAsyncStorage,
  handleUpdateBalances,
  store,
  handlePublicKeys,
} from '../../stores';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import * as Keychain from 'react-native-keychain';
import {handleFirestorePublicKeys} from '../../app';
import * as rssParser from 'react-native-rss-parser';

export const useRSSHypebeast = ({...props}: any) => {
  const categories = [
    {
      source: 'bilboard_pop',
      feed: 'https://www.billboard.com/pop',
    },
    {
      source: 'billboard_hiphop_rnb',
      feed: 'https://www.billboard.com/hip-hop-rap-r-and-b',
    },
    {
      source: 'billboard_rock',
      feed: 'https://www.billboard.com/rock',
    },
    {
      source: 'billboard_kpop',
      feed: 'https://www.billboard.com/kpop',
    },
  ];

  useEffect(() => {
    handleRSSFeed();
  }, []);

  const handleRSSFeed = async () => {
    const test = await fetch('https://www.billboard.com/pop')
      .then(response => response.text())
      .then(responseData => rssParser.parse(responseData));
    console.log(
      '🚀 ~ file: useRSSBilboard.ts:43 ~ handleRSSFeed ~ test:',
      test,
    );
    // .then(rss => {
    //   console.log('🚀 ~ file: useRSSFeed.ts:19 ~ handleRSSFeed ~ rss:', rss);
    //   console.log(rss.title);
    //   console.log(rss.items.length);
    //   return {
    //     items: rss.items,
    //     type: source,
    //   };
    // });
  };

  return {
    // handleLoadHTTPS,
    // handleHTTPSResponse,
    // tuc_public_keys: profileTRX.tuc_public_keys,
  };
};
