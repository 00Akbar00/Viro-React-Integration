import { AppRegistry } from 'react-native';
import App from './App'; // Assuming your main component is App
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
