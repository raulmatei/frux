import * as ActionTypes from './action-types';

const handleOperatorInsertion = (currentState, payload) => {
  const { operator } = payload;
  const expression = currentState.get('expression');
  const lastInExpresion = expression.last();

  if (lastInExpresion === operator) {
    return currentState;
  }

  if (isNaN(lastInExpresion)) {
    return currentState.withMutations((state) => {
      const nextState = state.get('expression').pop();
      return state.set('expression', nextState.push(operator));
    });
  }

  return currentState.withMutations((state) => {
    const expresion = state.get('expression');
    return state.set('expression', expresion.push(operator));
  });
};


const handleNumberInsertion = (currentState, payload) => {
  const { number } = payload;
  const expression = currentState.get('expression');
  const lastInExpresion = expression.last();
  const nextNumber = Number(number);

  if (lastInExpresion === 0) {
    return currentState.withMutations((state) => {
      const nextExpr = state.get('expression').clear();
      return state.set('expression', nextExpr.push(nextNumber));
    });
  }

  return currentState.withMutations((state) => {
    const nextExpr = state.get('expression');
    return state.set('expression', nextExpr.push(nextNumber));
  });
};

const handleComputeResult = (currentState) => {
  const stringifiedExpr = currentState.get('expression').join('');
  const result = (
    eval(stringifiedExpr).toString().split('').map((item) => {
      const number = Number(item);

      if (isNaN(item)) {
        return item;
      }

      return number;
    })
  );

  return currentState.withMutations((state) => {
    const nextExpr = currentState.get('expression').clear();
    return state
      .set('expression', nextExpr.concat(result))
      .set('result', result.join(''));
  });
};

const handleDeleteLast = (currentState, payload, initialState) => {
  const expr = currentState.get('expression');
  const stringifiedExpr = expr.join('');
  const result = stringifiedExpr;

  if (result === currentState.get('result')) {
    return initialState;
  }

  return currentState.set('expression', expr.pop());
};

const handleClear = (currentState, payload, initialState) => {
  return initialState;
};


export default {
  [ActionTypes.SEND_OPERATOR]: handleOperatorInsertion,
  [ActionTypes.INPUT_NUMBER]: handleNumberInsertion,
  [ActionTypes.DELETE_LAST]: handleDeleteLast,
  [ActionTypes.COMPUTE_RESULT]: handleComputeResult,
  [ActionTypes.CLEAR]: handleClear
};
