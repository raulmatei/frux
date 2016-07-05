'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createMountNode;
function createMountNode() {
  var bodyElement = document.body;
  var nextNode = bodyElement.firstChild;
  var rootElement = document.createElement('div');

  bodyElement.insertBefore(rootElement, nextNode);
  return rootElement;
}