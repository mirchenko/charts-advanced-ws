import { combineReducers } from 'redux';
import App from './app';
import Stations from './stations';

export default combineReducers({
  app: App,
  stations: Stations
});