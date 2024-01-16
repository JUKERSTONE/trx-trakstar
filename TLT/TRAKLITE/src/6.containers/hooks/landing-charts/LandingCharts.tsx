import React from 'react';
import {useLandingCharts} from './useLandingCharts';
import {LandingCharts} from '../../../7.elements/landing-charts/LandingCharts';

export const LandingChartsView = () => {
  const {...useProps} = useLandingCharts();
  return <LandingCharts {...useProps} />;
};
