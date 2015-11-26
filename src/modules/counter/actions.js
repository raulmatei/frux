import { dispatch } from 'frux/core/interface';
import { INCREMENT, DECREMENT, RESET } from 'frux/modules/counter/action-types';

export function increment() {
  return dispatch({ type: INCREMENT });
}

export function decrement() {
  return dispatch({ type: DECREMENT });
}

export function reset() {
  return dispatch({ type: RESET });
}
