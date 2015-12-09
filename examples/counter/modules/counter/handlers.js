export function increment(currentState) {
  const count = currentState.get('count');
  return currentState.set('count', count + 1);
}

export function decrement(currentState) {
  const count = currentState.get('count');
  return currentState.set('count', count - 1);
}

export function reset(currentState, payload, initialState) {
  return initialState;
}
