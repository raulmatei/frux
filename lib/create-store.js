'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createStore;

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _nuclearJs = require('nuclear-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createStore(initialState, handlers) {
  var immutableState = (0, _nuclearJs.toImmutable)(initialState);

  var spec = {
    getInitialState: function getInitialState() {
      return immutableState;
    },
    initialize: function initialize() {
      var _this = this;

      if (!(0, _isEmpty2.default)(handlers)) {
        (0, _forEach2.default)(handlers, function (handler) {
          var handlerName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

          if (!handlerName) {
            throw new Error('Frux#createStore: handler must be a named function.');
          }

          if ((0, _isFunction2.default)(handler)) {
            _this.on(handlerName, function (currentState, payload) {
              return handler.call(null, currentState, payload, immutableState);
            });
          }
        });
      }
    }
  };

  return new _nuclearJs.Store(spec);
}