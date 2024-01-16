import {View, Text} from 'react-native';
import React from 'react';
import {useCategoryTiles} from './useCategoryTiles';
import {CategoryTilesElement} from '../../elements';

export const CategoryTilesContainer = ({...props}: any) => {
  const {...useCategoryTilesProps} = useCategoryTiles({...props});
  return <CategoryTilesElement {...useCategoryTilesProps} {...props} />;
};
