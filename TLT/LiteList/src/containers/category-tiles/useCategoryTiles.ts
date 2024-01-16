import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
import {store, handleMediaPlayerAction} from '../../stores';
import {useLITELISTState, useFirebase, handleGetCategories} from '../../app';
import {useAPI} from '../../api';
import {useStripe} from '@stripe/stripe-react-native';
import firestore from '@react-native-firebase/firestore';
import {useEffectAsync} from '../../app';
import {useFocusEffect} from '@react-navigation/native';

export const useCategoryTiles = ({navigation, route}: any) => {
  const [categories, setCategories] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      return async () => {
        const categories = await handleGetCategories();
        console.log(
          '🚀 ~ file: useCategoryTiles.ts:13 ~ useEffectAsync ~ categories:',
          categories,
        );
        setCategories(categories);

        // setTimeout(() => {
        //   navigation.navigate('Explorer', {
        //     categories,
        //     selectedCategoryIndex: 1,
        //   });
        // }, 1500);
      };
    }, []),
  );
  // useEffectAsync(async () => {
  //   const categories = await handleGetCategories();
  //   console.log(
  //     '🚀 ~ file: useCategoryTiles.ts:13 ~ useEffectAsync ~ categories:',
  //     categories,
  //   );
  //   setCategories(categories);

  //   setTimeout(() => {
  //     navigation.navigate('Explorer', {categories, selectedCategoryIndex: 1});
  //   }, 500);
  // }, []);

  const handleNavigateExplorer = ({selectedCategoryIndex}: any) => {
    navigation.navigate('Explorer', {categories, selectedCategoryIndex});
  };

  return {
    categories,
    handleNavigateExplorer,
  };
};
