import React from 'react';
import {LandingNews} from '../../elements';
import {useLandingNews} from './useLandingNews';

export const LandingNewsView = () => {
  const {...useProps} = useLandingNews();
  return <LandingNews {...useProps} />;
};
