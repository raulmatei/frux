import { dispatch, batch } from 'frux';

export function sendOperator(operator) {
  dispatch({
    type: 'SEND_OPERATOR',
    payload: { operator }
  });
}

export function inputNumber(number) {
  dispatch({
    type: 'INPUT_NUMBER',
    payload: { number }
  });
}

export function deleteLast() {
  dispatch({ type: 'DELETE_LAST' });
}

export function computeResult() {
  dispatch({ type: 'COMPUTE_RESULT' });
}

export function reset() {
  dispatch({ type: 'RESET' });
}
