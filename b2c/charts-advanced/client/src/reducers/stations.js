import {
  RECEIVE_STATIONS,
  RECEIVE_ENABLED,
  RECEIVE_DELTA
} from '../actions/types';


const INITIAL_STATE = {
  isFetching: false,
  stations: {}
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case RECEIVE_STATIONS: {
      return { ...state, isFetching: false, ...action.payload };
    }
    case RECEIVE_ENABLED: {
      const { name, enabled } = action.payload;
      const piece = state.stations[name];

      return {
        ...state,
        stations:
          {
            ...state.stations,
            [name]: {
              ...piece,
              enabled
            }
          }
      }
    }
    case RECEIVE_DELTA: {
      const { name, delta } = action.payload;
      const piece = state.stations[name];
      const newPoints = piece.points.splice(delta.length, piece.points.length);

      return {
        ...state,
        stations:
          {
            ...state.stations,
            [name]: {
              ...piece,
              points: [...newPoints, ...delta]
            }
          }
      }
    }
    default: return state;
  }
};