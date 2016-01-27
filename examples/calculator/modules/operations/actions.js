import { dispatch, batch } from 'frux';
import {
  SEND_OPERATOR,
  INPUT_NUMBER,
  DELETE_LAST,
  COMPUTE_RESULT,
  CLEAR
} from './action-types';

export function sendOperator(operator) {
  return {
    type: SEND_OPERATOR,
    payload: { operator }
  };
}

function inputNumberAction(payload) {
  return { type: INPUT_NUMBER, payload };
}

export function inputNumber(number) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve(() => inputNumberAction({ number }));
    }, 1000);
  });
}

export function deleteLast() {
  return { type: DELETE_LAST };
}

export function computeResult() {
  return { type: COMPUTE_RESULT };
}

export function clear() {
  return { type: CLEAR };
}
