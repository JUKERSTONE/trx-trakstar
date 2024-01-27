import React from 'react';
import {View, Text} from 'react-native';
import {AppBrowserElement} from '../../elements';
import {useAppBrowser} from './useAppBrowser';

export const AppBrowserContainer = ({...props}: any) => {
  const {...useAppBrowserProps} = useAppBrowser({...props});
  return <AppBrowserElement {...useAppBrowserProps} {...props} />;
};
