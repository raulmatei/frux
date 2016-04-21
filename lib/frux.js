'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatch = dispatch;
exports.batch = batch;
exports.evaluate = evaluate;
exports.observe = observe;
exports.serialize = serialize;
exports.loadState = loadState;
exports.reset = reset;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nuclearJs = require('nuclear-js');

var _reactDom = require('react-dom');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _utils = require('./utils');

var _nuclearJsReactAddons = require('nuclear-js-react-addons');

var _createStore = require('./create-store');

var _createStore2 = _interopRequireDefault(_createStore);

var _createModule = require('./create-module');

var _createModule2 = _interopRequireDefault(_createModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var reactor = null;

var actions = {};
var getters = {};
var middlewaresRegistry = [];

function connect(BaseComponent) {
  var displayName = BaseComponent.displayName || BaseComponent.name;
  var getDataBindings = BaseComponent.getDataBindings;

  (0, _invariant2.default)((0, _isFunction2.default)(getDataBindings), displayName + ' component should implement \'getDataBindings\' static method');

  return (0, _nuclearJsReactAddons.connect)(function (props) {
    return getDataBindings(getters);
  })(BaseComponent);
}

function mount(component, node) {
  var WrappedWithProvider = _react2.default.createElement(
    _nuclearJsReactAddons.Provider,
    { reactor: reactor },
    component
  );

  (0, _invariant2.default)(component, 'frux#mount: No component was provided.');

  if (process.env.IS_REACT_NATIVE) {
    return WrappedWithProvider;
  }

  (0, _reactDom.render)(WrappedWithProvider, node || (0, _utils.createMountingNode)());
}

function use() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  middlewares.forEach(function (middleware) {
    (0, _invariant2.default)((0, _isFunction2.default)(middleware), 'Check your middlewares and make sure they are all functions.');

    middlewaresRegistry.push(middleware);
  });

  // We just keep track of middlewares, nothing's yet implemented
  console.log(middlewaresRegistry);
}

function registerModule(name, module) {
  var target = { actions: actions, getters: getters };

  module(name, target, reactor);
}

function initialize(_ref) {
  var options = _ref.options;

  var modules = _objectWithoutProperties(_ref, ['options']);

  reactor = new _nuclearJs.Reactor(options);

  (0, _forEach2.default)(modules, function (module, name) {
    if ((0, _isFunction2.default)(module)) {
      registerModule(name, module);
    }
  });

  return { actions: actions, getters: getters };
}

function dispatch(_ref2) {
  var type = _ref2.type;
  var payload = _ref2.payload;

  reactor.dispatch(type, payload);
}

function batch(callback) {
  reactor.batch(callback);
}

function evaluate(getter) {
  return reactor.evaluate(getter);
}

function observe(getter, callback) {
  reactor.observe(getter, callback);

  return {
    unobserve: function unobserve() {
      reactor.unobserve(getter, callback);
    }
  };
}

function serialize(storeName) {
  if (typeof storeName !== 'string' || !storeName) {
    return reactor.serialize();
  }

  return reactor.evaluateToJS([storeName]);
}

function loadState(stores) {
  reactor.loadState(stores);
}

function reset() {
  reactor.reset();
}

exports.default = {
  use: use,
  initialize: initialize,
  mount: mount,
  registerModule: registerModule,
  createModule: _createModule2.default,
  createStore: _createStore2.default,
  dispatch: dispatch,
  batch: batch,
  evaluate: evaluate,
  observe: observe,
  loadState: loadState,
  serialize: serialize,
  reset: reset,
  connect: connect
};