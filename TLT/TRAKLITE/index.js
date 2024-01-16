/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {App} from './src/0.app/app';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);

// export {default} from './storybook';
