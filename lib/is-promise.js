'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPromise;

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isPromise(value) {
  return !!value && (value instanceof Promise || (0, _isFunction2.default)(value.then));
}