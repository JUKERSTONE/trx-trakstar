import React from 'react';
import {LandingNews} from '../../elements';
import {useLandingNews} from './useLandingNews';

export const LandingNewsView = ({...props}) => {
  const {...useProps} = useLandingNews({...props});
  return <LandingNews {...useProps} />;
};
