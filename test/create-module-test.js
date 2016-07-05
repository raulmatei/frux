import test from 'ava';
import createModule from '../src/create-module';
import { Reactor, isGetter, isKeyPath } from 'nuclear-js';

test('`createModule()`', (assert) => {
  assert.throws(() => createModule(), Error,
    'should throw when no argument is passed');
});

test('`createModule("abc")`', (assert) => {
  assert.throws(() => createModule('abc'), Error,
    'should throw when a string is passed');
});

test('`createModule(null)`', (assert) => {
  assert.throws(() => createModule(null), Error,
    'should throw when `null` is passed');
});

test('`createModule(undefined)`', (assert) => {
  assert.throws(() => createModule(undefined), Error,
    'should throw when `undefined` is passed');
});

test('`createModule([])`', (assert) => {
  assert.throws(() => createModule([]), Error,
    'should throw when an empty Array is passed');
});

test('`createModule([...])`', (assert) => {
  assert.throws(() => createModule([{}, 7, 'abv', null, undefined]), Error,
    'should throw when a non-empty Array is passed');
});

test('`createModule({})`', (assert) => {
  const invokeWithEmptyObject = () => createModule({});

  assert.notThrows(invokeWithEmptyObject,
    'should not throw when an empty Object is passed');

  assert.is(typeof invokeWithEmptyObject, 'function',
    'should return a function when an empty object is passed');
});

test('`createModule({})` if empty module descriptor is passed', (assert) => {
  const name = 'testModule';
  const reactor = new Reactor();
  const module = createModule({});

  const target = {
    actions: {},
    getters: {}
  };

  const emptyRegistry = {
    actions: { testModule: {} },
    getters: { testModule: {} }
  };

  module(name, target, reactor);

  assert.deepEqual(target, emptyRegistry,
    'should create an empty module');

  assert.is(typeof target.actions[name], 'object',
    'should set a property with module name on the `actions` object');

  assert.is(typeof target.getters[name], 'object',
    'should set a property with module name on the `getters` object');
});

test('`createModule({ abc, xyz })` when wrong descriptor is passed', (assert) => {
  const name = 'testModule';
  const reactor = new Reactor();
  const module = createModule({ abc: 'abc', xyz: 'xyz' });

  const target = {
    actions: {},
    getters: {}
  };

  const emptyRegistry = {
    actions: { testModule: {} },
    getters: { testModule: {} }
  };

  module(name, target, reactor);

  assert.deepEqual(target, emptyRegistry,
    'should create an empty module');

  assert.is(typeof target.actions[name], 'object',
    'should set a property with module name on the `actions` object');

  assert.is(typeof target.getters[name], 'object',
    'should set a property with module name on the `getters` object');
});

test('`createModule({ actions, getters })` when valid descriptor is passed', (assert) => {
  const name = 'testModule';
  const reactor = new Reactor();

  const target = {
    actions: {},
    getters: {}
  };

  const actions = {
    testActionCreator() {}
  };

  const getters = {
    testDynamicGetter: (value) => [value, (data) => data],
    testGetter: ['test', (data) => data],
    testKeyPath: ['test']
  };

  const moduleRegistry = {
    actions: {
      testModule: actions
    },

    getters: {
      testModule: getters
    }
  };

  const module = createModule({ actions, getters });

  module(name, target, reactor);

  assert.deepEqual(target, moduleRegistry, 'should create a new module');

  assert.is(typeof target.actions[name].testActionCreator, 'function',
    'should create an `actions` object containing actions creators functions');

  assert.is(isGetter(target.getters[name].testGetter), true,
    'should create a `getters` object with a valid `getter`');

  assert.is(typeof target.getters[name].testDynamicGetter, 'function',
    'should create a `getters` object with a valid function `getter`');

  assert.is(isGetter(target.getters[name].testDynamicGetter('test')), true,
    'should create a `getters` object with a valid function `getter` that will return a valid `getter` when executed');

  assert.is(isKeyPath(target.getters[name].testKeyPath), true,
    'should create a `getters` object with a valid `keyPath`');
});
