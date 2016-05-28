import test from 'ava';
import { canUseDOM } from '../src/env';

test('canUseDOM', (assert) => {
  assert.false(canUseDOM, 'should be `false` in a DOM-less environment');
});
