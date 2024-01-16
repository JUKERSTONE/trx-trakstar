/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import {TRX_HOC, TRAKLIST_APP} from './src';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import 'react-native-gesture-handler';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

const App = TRX_HOC(TRAKLIST_APP);

AppRegistry.registerComponent(appName, () => HeadlessCheck);
