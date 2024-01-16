import {SafeAreaView, Text, Button} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useAsyncStorage, toggleExchangeView, store} from '../stores';
import {SponsoredSettingsContainer} from '../container/sponsored-settings/SponsoredSettings';

interface SettingsScreenProps {
  name: string | null;
  type: 'banner' | 'ad' | null;
  placement:
    | 'Radio'
    | 'Collections'
    | 'Swipe'
    | 'Search'
    | 'Shop'
    | 'Home'
    | null;
  activePeriod: string | null;
  wallet: string | null;
}

const placementTypeMapping = {
  banner: {
    search: 'bn-search',
    shop: 'bn-shop',
    home: 'bn-home',
  },
  ad: {
    collections: 'sp-radio',
    search: 'sp-search',
    radio: 'sp-radio',
    swipe: 'sp-radio',
    shop: 'sp-shop',
  },
};

export const SettingsScreen = (props: any) => {
  const [] = useState<SettingsScreenProps>({
    name: null,
    type: null,
    placement: null,
    activePeriod: null,
    wallet: null,
  });
  return <SponsoredSettingsContainer {...props} />;
};
