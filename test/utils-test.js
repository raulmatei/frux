import test from 'ava';
import { isPromise, isStandardAction } from '../src/utils';
import { type } from './fixtures';

test('Utils `isPromise(promise)', (assert) => {
  const actual = isPromise(new Promise(() => {}));
  const expected = true;

  assert.is(actual, expected,
    'should return `true` when a Promise object is passed');
});

test('Utils `isPromise({})`', (assert) => {
  const actual = isPromise({});
  const expected = false;

  assert.is(actual, expected,
    'should return `false` when a plain Object is passed');
});

test('Utils `isPromise(null)`', (assert) => {
  const actual = isPromise(null);
  const expected = false;

  assert.is(actual, expected,
    'should return `false` when `null` is passed');
});

test('Utils `isPromise()`', (assert) => {
  const actual = isPromise();
  const expected = false;

  assert.is(actual, expected,
    'should return `false` when no argument is passed');
});

test('Utils `isPromise(7)`', (assert) => {
  const actual = isPromise(7);
  const expected = false;

  assert.is(actual, expected,
    'should return `false` when a positive number is passed as an argument');
});

test('Utils `isPromise(-7)`', (assert) => {
  const actual = isPromise(-7);
  const expected = false;

  assert.is(actual, expected,
    'should return `false` when a negative number is passed as an argument');
});

test('Utils `isPromise("string")`', (assert) => {
  const actual = isPromise('string');
  const expected = false;

  assert.is(actual, expected,
    'should return `false` when a string is passed as an argument');
});

test('Utils `isFSA({})`', (assert) => {
  const actual = isStandardAction({});
  const expected = false;

  assert.is(actual, expected,
    'should return `false` when a `type` property is missing');
});

test('Utils `isFSA({ type })`', (assert) => {
  const actual = isStandardAction({ type });
  const expected = true;

  assert.is(actual, expected,
    'should return `true` when a `type` property exists');
});

test('Utils `isFSA({ type, extra })`', (assert) => {
  const actual = isStandardAction({ type, extra: true });
  const expected = false;

  assert.is(actual, expected,
    'should return `false` when a `type` property exists');
});

test('Utils `isFSA({ type, meta })`', (assert) => {
  const actual = isStandardAction({ type, meta: true });
  const expected = true;

  assert.is(actual, expected,
    'should return `true` when an `meta` property exists');
});
