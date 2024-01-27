import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {CreditsElement} from '../../elements';
import {useCredits} from './useCredits';

export const CreditsContainer = ({query, navigation, ...props}: any) => {
  const {...useCreditsProps} = useCredits({navigation});
  return <CreditsElement {...useCreditsProps} {...props} />;
};
