import { dispatch, batch } from 'frux';
import {
  SEND_OPERATOR,
  INPUT_NUMBER,
  DELETE_LAST,
  COMPUTE_RESULT,
  CLEAR
} from './action-types';

export function sendOperator(operator) {
  dispatch({
    type: SEND_OPERATOR,
    payload: { operator }
  });
}

export function inputNumber(number) {
  dispatch({
    type: INPUT_NUMBER,
    payload: { number }
  });
}

export function deleteLast() {
  dispatch({ type: DELETE_LAST });
}

export function computeResult() {
  dispatch({ type: COMPUTE_RESULT });
}

export function clear() {
  dispatch({ type: CLEAR });
}
