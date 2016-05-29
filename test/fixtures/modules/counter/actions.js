import { dispatch } from '../../../../src/frux';
import * as ActionTypes from './action-types';

export function increment() {
  dispatch({ type: ActionTypes.INCREMENT });
}

export function decrement() {
  dispatch({ type: ActionTypes.DECREMENT });
}

export function reset() {
  dispatch({ type: ActionTypes.RESET });
}
