import { dispatch } from 'frux';
import { INCREMENT, DECREMENT, RESET } from './action-types';

export function increment() {
  return dispatch({
    type: INCREMENT,
    payload: null
  });
}

export function decrement() {
  return dispatch({
    type: DECREMENT,
    payload: null
  });
}

export function reset() {
  return dispatch({
    type: RESET,
    payload: null
  });
}
