import React, {useEffect, useState, useContext} from 'react';
import {
  store,
  toggleExchangeView,
  toggleTRAKRelationshipsView,
} from '../../stores';
import * as rssParser from 'react-native-rss-parser';

export const useRSSFeed = ({navigation}: any) => {
  useEffect(() => {
    handleRSSFeed();
  }, []);

  const handleRSSFeed = async () => {};

  const handleSourceNavigation = (source: any) => {
    navigation.navigate(source);
  };

  return {
    handleSourceNavigation,
  };
};
