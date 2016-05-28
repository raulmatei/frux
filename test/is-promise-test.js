import test from 'ava';
import isPromise from '../src/is-promise';

test('`isPromise(promise)', (assert) => {
  const actual = isPromise(new Promise(() => {}));
  const expected = true;

  assert.is(actual, expected,
    'should return `true` when a Promise object is passed');
});

test('`isPromise({})`', (assert) => {
  const actual = isPromise({});
  const expected = false;

  assert.is(actual, expected,
    'should return `false` when a plain Object is passed');
});

test('`isPromise(null)`', (assert) => {
  const actual = isPromise(null);
  const expected = false;

  assert.is(actual, expected,
    'should return `false` when `null` is passed');
});

test('`isPromise()`', (assert) => {
  const actual = isPromise();
  const expected = false;

  assert.is(actual, expected,
    'should return `false` when no argument is passed');
});

test('`isPromise(7)`', (assert) => {
  const actual = isPromise(7);
  const expected = false;

  assert.is(actual, expected,
    'should return `false` when a positive number is passed as an argument');
});

test('`isPromise(-7)`', (assert) => {
  const actual = isPromise(-7);
  const expected = false;

  assert.is(actual, expected,
    'should return `false` when a negative number is passed as an argument');
});

test('`isPromise("string")`', (assert) => {
  const actual = isPromise('string');
  const expected = false;

  assert.is(actual, expected,
    'should return `false` when a string is passed as an argument');
});
