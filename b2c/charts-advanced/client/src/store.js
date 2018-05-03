import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import io from 'socket.io-client';
import rootReducer from './reducers';
import { receiveStations, receiveEnabled, receiveDelta } from './actions/stations';

const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk));

const socket = io('http://localhost:8080');

socket.on('init', data => {
  store.dispatch(receiveStations(data));
});

socket.on('enabled', data => {
  store.dispatch(receiveEnabled(data));
});

socket.on('delta', data => {
  store.dispatch(receiveDelta(data));
});

export default store;