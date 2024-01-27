import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useLITELISTState} from '../../app';
import {TRAKLISTradioContainer} from '../../containers';
import {OnboardIslandElement} from '../../elements/onboard-island';
import {OnboardIslandContainer} from '../../containers/onboard-island';
import {useOnboardIsland} from '../../containers/onboard-island/useOnboardIsland';

export const ONBOARD_ISLAND = ({...props}: any) => {
  const {...useOnboardIslandProps} = useOnboardIsland(props);
  return <OnboardIslandContainer {...useOnboardIslandProps} />;
};
