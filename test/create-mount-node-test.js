import test from 'ava';
import createMountNode from '../src/create-mount-node';
import document from 'global/document';

global.document = document;

test('createMountNode()', (assert) => {
  const node = createMountNode();

  assert.is(node.tagName, 'DIV', 'should create a `div` element');
  assert.is(node.parentNode.tagName, 'BODY', 'should be created inside `body` tag');
  assert.deepEqual(node.childNodes, [], 'should create an empty `div` element');
});
