import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';

export const useInstructions = ({navigation, route}: any) => {
  const handleNavigateNext = () => {
    const {
      params: {profile},
    } = route;

    navigation.navigate('PAYWALL', {
      screen: 'SUBSCRIPTIONS',
      params: {
        profile: {
          ...profile,
        },
      },
    });
    // navigation.navigate('PAYWALL', {
    //   profile: {
    //     ...profile,
    //   },
    // });
  };

  return {
    handleNavigateNext,
  };
};
