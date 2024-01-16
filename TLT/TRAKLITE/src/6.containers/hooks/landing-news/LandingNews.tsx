import React from 'react';
import {LandingNews} from '../../../7.elements/landing-news/LandingNews';
import {useLandingNews} from './useLandingNews';

export const LandingNewsView = () => {
  const {...useProps} = useLandingNews();
  return <LandingNews {...useProps} />;
};
