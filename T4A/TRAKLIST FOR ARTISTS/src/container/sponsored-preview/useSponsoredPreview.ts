import {set} from 'mobx';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';

interface Settings {
  section: string;
  header: string;
  icon: string;
  body: {
    name: string;
    icon: string;
    description: string;
    selected: boolean;
  }[];
}
[];

export const useSponsoredPreview = (props: any) => {
  const placementFlowForm = props.route.params;

  const placmentMapping: any = {
    Banner: {
      Home: 'bn-home',
      Search: 'bn-search',
    },
    Ad: {
      Swipe: 'sp-radio-swipe',
      Radio: 'sp-radio',
      Collection: 'sp-radio-collection',
      Search: 'sp-search',
    },
  };

  const placement = 'sp-radio-collection';
  console.log(
    "🚀 ~ file: useSponsoredPreview.ts:40 ~ useSponsoredPreview ~  placmentMapping[placementFlowForm.settings['campaign-type']]:",
    placmentMapping[placementFlowForm.settings['campaign-type']][
      placementFlowForm.settings['campaign-placement']
    ],
  );

  console.log(
    '🚀 ~ file: useSponsoredPreview.ts:21 ~ useSponsoredPreview ~ placementFlowForm:',
    placmentMapping[placementFlowForm.settings['campaign-type']][
      'campaign-placement'
    ],
  );

  const handleSendPlacement = () => {
    firestore()
      .collection(
        'fundamentals/TRAKLIST/' +
          placmentMapping[placementFlowForm.settings['campaign-type']][
            placementFlowForm.settings['campaign-placement']
          ],
      )
      .add(placementFlowForm);
  };

  return {
    handleSendPlacement,
  };
};
