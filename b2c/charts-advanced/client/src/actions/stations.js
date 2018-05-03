import {
  ROOT_URL,
  SET_CLIENT_KEY,
  RECEIVE_STATIONS,
  RECEIVE_ENABLED,
  RECEIVE_DELTA
} from "./types";


export const receiveStations = data => dispatch => {
  dispatch({ type: RECEIVE_STATIONS, payload: data });
  dispatch({ type: SET_CLIENT_KEY, payload: data.clientKey });
};

export const receiveEnabled = data => dispatch => {
  dispatch({ type: RECEIVE_ENABLED, payload: data });
};

export const receiveDelta = data => dispatch => {
  dispatch({ type: RECEIVE_DELTA, payload: data});
};