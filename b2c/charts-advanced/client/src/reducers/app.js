import {
  SET_CLIENT_KEY
} from '../actions/types';

const INITIAL_STATE = {
  clientKey: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_CLIENT_KEY: {
      return { ...state, clientKey: action.payload };
    }
    default: return state;
  }
};