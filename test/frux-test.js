import test from 'ava';
import frux from '../src/frux';
import React, { Component } from 'react';
import { counter } from './fixtures';

let actions = {};
let getters = {};

test.beforeEach(() => {
  const registry = frux.initialize({
    options: { debug: true },
    counter
  });

  actions = registry.actions;
  getters = registry.getters;
});

test.todo('frux#connect()');
test.todo('frux#mount(component)');
test.todo('frux#mount(component, node)');
test.todo('frux#mount(component) - SSR');
test.todo('frux#use(...middlewares)');
test.todo('frux#registerModule(name, module)');
test.todo('frux#initialize({ options, ...modules })');
test.todo('frux#dispatch({ type, payload })');
test.todo('frux#batch(callback)');
test.todo('frux#evaluate(getter)');
test.todo('frux#observe(getter, callback)');
test.todo('frux#serialize(storeName)');
test.todo('frux#loadState(stores)');

test('frux#reset()', (assert) => {
  const actual = frux.serialize();
  const expected = { counter: { count: 0 } };

  actions.counter.increment();
  frux.reset();

  assert.deepEqual(actual, expected,
    'should reset the store to its initial state');
});
