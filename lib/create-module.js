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

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createModule(descriptor) {
  var looksLikeGetter = function looksLikeGetter(value) {
    return (0, _isFunction2.default)(value) || (0, _isArray2.default)(value);
  };

  (0, _invariant2.default)((0, _isPlainObject2.default)(descriptor), '`createModule()` requires a descriptor object ' + '`{ stores, actions, getters }` to be passed as an argument');

  return function (name, target, reactor) {
    var _descriptor$stores = descriptor.stores;
    var stores = _descriptor$stores === undefined ? {} : _descriptor$stores;
    var _descriptor$actions = descriptor.actions;
    var actions = _descriptor$actions === undefined ? {} : _descriptor$actions;
    var _descriptor$getters = descriptor.getters;
    var getters = _descriptor$getters === undefined ? {} : _descriptor$getters;


    if (!(0, _isEmpty2.default)(stores)) {
      reactor.registerStores(stores);
    }

    target.actions[name] = (0, _pickBy2.default)(actions, _isFunction2.default);
    target.getters[name] = (0, _pickBy2.default)(getters, looksLikeGetter);
  };
}