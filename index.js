/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import RecyclerListViewContainer from './RecyclerListViewDm'
AppRegistry.registerComponent(appName, () => RecyclerListViewContainer);
