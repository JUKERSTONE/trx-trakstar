import {View, Text} from 'react-native';
import React from 'react';
// @ts-ignore
import {getColorFromURL} from 'rn-dominant-color';

export const handleGetColor = (url: string) => {
  return getColorFromURL(url)
    .then(async (colors: any) => {
      return await colors;
    })
    .catch((err: any) => {
      console.log(err);
    });
};
