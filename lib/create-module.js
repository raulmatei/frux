'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createModule;

var _pickBy = require('lodash/pickBy');

var _pickBy2 = _interopRequireDefault(_pickBy);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createModule(_ref) {
  var stores = _ref.stores;
  var actions = _ref.actions;
  var getters = _ref.getters;

  return function (name, target, reactor) {
    if (!(0, _isEmpty2.default)(stores)) {
      reactor.registerStores(stores);
    }

    target.actions[name] = (0, _pickBy2.default)(actions, _isFunction2.default);
    target.getters[name] = (0, _pickBy2.default)(getters, _isArray2.default);
  };
}