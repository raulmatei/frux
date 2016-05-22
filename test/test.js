import test from 'tape';

test('Boolean function', (nest) => {
  nest.test('converts positive numbers to `true`', (assert) => {
    const actual = Boolean(1);
    const expected = true;

    assert.equal(actual, expected, 'should be true');
    assert.end();
  });

  nest.test('converts negative numbers to `true`', (assert) => {
    const actual = Boolean(-1);
    const expected = true;

    assert.equal(actual, expected, 'should be true');
    assert.end();
  });

  nest.test('converts `0` to `false`', (assert) => {
    const actual = Boolean(0);
    const expected = false;

    assert.equal(actual, expected, 'should be true');
    assert.end();
  });
});
