import { SET_CLIENT_KEY } from "./types";

export const setClientKey = key => dispatch => dispatch({ type: SET_CLIENT_KEY, payload: key });