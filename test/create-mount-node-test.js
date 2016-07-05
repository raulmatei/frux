import test from 'ava';
import createMountNode from '../src/create-mount-node';
import document from 'global/document';


test('createMountNode()', (assert) => {
  global.document = document;

  const node = createMountNode();
  const parent = node.parentNode;

  assert.is(node.tagName, 'DIV', 'should create a `div` element');
  assert.deepEqual(node.childNodes, [], 'should create an empty `div` element');
  assert.is(parent.tagName, 'BODY', 'should be created inside `body` tag');
  assert.deepEqual(parent.childNodes[0], node, 'should be created as the first element in `body` tag');
});
