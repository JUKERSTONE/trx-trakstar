import React from 'react';
import {View, Text} from 'react-native';
import {LandingTRXCategoriesElement} from '../../elements';
import {useLandingTRXCategories} from './useLandingTRXCategories';

export const LandingTRXCategoriesContainer = ({...props}: any) => {
  const {...useLandingTRXCategoriesProps} = useLandingTRXCategories({});
  return (
    <LandingTRXCategoriesElement {...useLandingTRXCategoriesProps} {...props} />
  );
};
