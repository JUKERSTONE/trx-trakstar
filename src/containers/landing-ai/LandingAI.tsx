import React from 'react';
import {View, Text} from 'react-native';
import {useLandingAI} from './useLandingAI';
import {LandingAI} from '../../elements/landing-ai';
// import {useInvestment} from '../../../0.app';

interface LandingAIProps {
  navigation: any;
}

export const LandingAIContainer: React.FC<LandingAIProps> = ({navigation}) => {
  const {...useLandingAIProps} = useLandingAI({navigation});
  return <LandingAI {...useLandingAIProps} />;
};
