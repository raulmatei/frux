import test from 'ava';
import { Store, Immutable } from 'nuclear-js';
import createStore from '../src/create-store';

test('createStore()', (assert) => {
  const store = createStore();

  assert.true(store instanceof Store,
    'should return an instance of of `Nuclear.Store`');

  assert.is(typeof store.getInitialState, 'function',
    'should have a `getInitialState` method');

  assert.is(typeof store.initialize, 'function',
    'should have an `initialize` method');
});

test('createStore(initialState)', (assert) => {
  const initialState = { count: 0 };
  const store = createStore(initialState);
  const immutableState = store.getInitialState();

  assert.true(Immutable.Map.isMap(immutableState),
    'should convert the state into a Immutable data structure');

  assert.deepEqual(immutableState.toJS(), initialState,
    'should not modify the state when converting back and forth');
});

test('createStore(initialState, handlers)', (assert) => {
  const initialState = { count: 0 };

  const handlers = {
    increment: (currentState, payload) => {
      return currentState.set('count', currentState.get('count') + 1);
    },

    decrement: (currentState, payload) => {
      return currentState.set('count', currentState.get('count') - 1);
    },

    reset: (currentState, payload, initialState) => {
      return initialState;
    }
  };

  const store = createStore(initialState, handlers);
  const immutableState = store.getInitialState();
  const incremented = store.handle(immutableState, 'increment');
  const decremented = store.handle(incremented, 'decrement');
  const reseted = store.handle(incremented, 'reset');

  assert.is(incremented.get('count'), 1,
    'should handle `increment` and return the next state');

  assert.is(decremented.get('count'), 0,
    'should handle `decrement` and return the next state');

  assert.deepEqual(reseted.toJS(), initialState,
    'should handle `reset` and return the initial state');
});

test('createStore(initialState, handlers)', (assert) => {
  const initialState = { count: 0 };

  const handlers = {
    increment: 1,
    decrement: {}
  };

  const store = createStore(initialState, handlers);
  const immutableState = store.getInitialState();
  const incremented = store.handle(immutableState, 'increment');
  const decremented = store.handle(immutableState, 'decrement');

  assert.true(immutableState.equals(incremented) &&
    immutableState.equals(decremented),
    'should not register handlers that are not functions');
});
