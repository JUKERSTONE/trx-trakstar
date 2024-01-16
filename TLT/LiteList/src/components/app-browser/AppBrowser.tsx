import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useLITELISTState} from '../../app';
import {AppBrowserContainer} from '../../containers';

export const APP_BROWSER_ = ({...props}) => {
  return <AppBrowserContainer {...props} />;
};
