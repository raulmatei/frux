'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMountingNode = createMountingNode;
exports.isPromise = isPromise;
exports.isStandardAction = isStandardAction;

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _fluxStandardAction = require('flux-standard-action');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMountingNode() {
  var bodyElement = document.body;
  var nextNode = bodyElement.firstChild;
  var rootElement = document.createElement('div');

  bodyElement.insertBefore(rootElement, nextNode);
  return rootElement;
}

function isPromise(value) {
  return value && (value instanceof Promise || (0, _isFunction2.default)(value.then));
}

function isStandardAction(value) {
  return (0, _fluxStandardAction.isFSA)(value);
}