(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["frux"] = factory(require("react"), require("react-dom"));
	else
		root["frux"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isImmutable = exports.toImmutable = exports.toJS = exports.isGetter = exports.isKeyPath = exports.Immutable = undefined;
	exports.dispatch = dispatch;
	exports.batch = batch;
	exports.evaluate = evaluate;
	exports.observe = observe;
	exports.serialize = serialize;
	exports.loadState = loadState;
	exports.reset = reset;

	var _nuclearJs = __webpack_require__(1);

	Object.defineProperty(exports, 'Immutable', {
	  enumerable: true,
	  get: function get() {
	    return _nuclearJs.Immutable;
	  }
	});
	Object.defineProperty(exports, 'isKeyPath', {
	  enumerable: true,
	  get: function get() {
	    return _nuclearJs.isKeyPath;
	  }
	});
	Object.defineProperty(exports, 'isGetter', {
	  enumerable: true,
	  get: function get() {
	    return _nuclearJs.isGetter;
	  }
	});
	Object.defineProperty(exports, 'toJS', {
	  enumerable: true,
	  get: function get() {
	    return _nuclearJs.toJS;
	  }
	});
	Object.defineProperty(exports, 'toImmutable', {
	  enumerable: true,
	  get: function get() {
	    return _nuclearJs.toImmutable;
	  }
	});
	Object.defineProperty(exports, 'isImmutable', {
	  enumerable: true,
	  get: function get() {
	    return _nuclearJs.isImmutable;
	  }
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _invariant = __webpack_require__(4);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _isFunction = __webpack_require__(6);

	var _isFunction2 = _interopRequireDefault(_isFunction);

	var _forEach = __webpack_require__(8);

	var _forEach2 = _interopRequireDefault(_forEach);

	var _utils = __webpack_require__(105);

	var _nuclearJsReactAddons = __webpack_require__(112);

	var _createStore = __webpack_require__(121);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _createModule = __webpack_require__(131);

	var _createModule2 = _interopRequireDefault(_createModule);

	var _env = __webpack_require__(143);

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

	  if (_env.canUseDOM) {
	    return (0, _reactDom.render)(WrappedWithProvider, node || (0, _utils.createMountingNode)());
	  }

	  return WrappedWithProvider;
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
	  mountServer: mountServer,
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["Nuclear"] = factory();
		else
			root["Nuclear"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, '__esModule', {
		  value: true
		});

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		__webpack_require__(1);

		var _store = __webpack_require__(2);

		var _store2 = _interopRequireDefault(_store);

		var _reactor = __webpack_require__(6);

		var _reactor2 = _interopRequireDefault(_reactor);

		var _immutable = __webpack_require__(3);

		var _immutable2 = _interopRequireDefault(_immutable);

		var _immutableHelpers = __webpack_require__(5);

		var _keyPath = __webpack_require__(11);

		var _getter = __webpack_require__(10);

		var _createReactMixin = __webpack_require__(7);

		var _createReactMixin2 = _interopRequireDefault(_createReactMixin);

		exports['default'] = {
		  Reactor: _reactor2['default'],
		  Store: _store2['default'],
		  Immutable: _immutable2['default'],
		  isKeyPath: _keyPath.isKeyPath,
		  isGetter: _getter.isGetter,
		  toJS: _immutableHelpers.toJS,
		  toImmutable: _immutableHelpers.toImmutable,
		  isImmutable: _immutableHelpers.isImmutable,
		  createReactMixin: _createReactMixin2['default']
		};
		module.exports = exports['default'];

	/***/ },
	/* 1 */
	/***/ function(module, exports) {

		"use strict";

		try {
		  if (!(window.console && console.log)) {
		    console = {
		      log: function log() {},
		      debug: function debug() {},
		      info: function info() {},
		      warn: function warn() {},
		      error: function error() {}
		    };
		  }
		} catch (e) {}

	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, '__esModule', {
		  value: true
		});

		var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

		exports.isStore = isStore;

		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

		var _immutable = __webpack_require__(3);

		var _utils = __webpack_require__(4);

		var _immutableHelpers = __webpack_require__(5);

		/**
		 * Stores define how a certain domain of the application should respond to actions
		 * taken on the whole system.  They manage their own section of the entire app state
		 * and have no knowledge about the other parts of the application state.
		 */

		var Store = (function () {
		  function Store(config) {
		    _classCallCheck(this, Store);

		    this.__handlers = (0, _immutable.Map)({});

		    if (config) {
		      // allow `MyStore extends Store` syntax without throwing error
		      (0, _utils.extend)(this, config);
		    }

		    this.initialize();
		  }

		  /**
		   * This method is overridden by extending classes to setup message handlers
		   * via `this.on` and to set up the initial state
		   *
		   * Anything returned from this function will be coerced into an ImmutableJS value
		   * and set as the initial state for the part of the ReactorCore
		   */

		  _createClass(Store, [{
		    key: 'initialize',
		    value: function initialize() {}
		    // extending classes implement to setup action handlers

		    /**
		     * Overridable method to get the initial state for this type of store
		     */

		  }, {
		    key: 'getInitialState',
		    value: function getInitialState() {
		      return (0, _immutable.Map)();
		    }

		    /**
		     * Takes a current reactor state, action type and payload
		     * does the reaction and returns the new state
		     */
		  }, {
		    key: 'handle',
		    value: function handle(state, type, payload) {
		      var handler = this.__handlers.get(type);

		      if (typeof handler === 'function') {
		        return handler.call(this, state, payload, type);
		      }

		      return state;
		    }

		    /**
		     * Pure function taking the current state of store and returning
		     * the new state after a NuclearJS reactor has been reset
		     *
		     * Overridable
		     */
		  }, {
		    key: 'handleReset',
		    value: function handleReset(state) {
		      return this.getInitialState();
		    }

		    /**
		     * Binds an action type => handler
		     */
		  }, {
		    key: 'on',
		    value: function on(actionType, handler) {
		      this.__handlers = this.__handlers.set(actionType, handler);
		    }

		    /**
		     * Serializes store state to plain JSON serializable JavaScript
		     * Overridable
		     * @param {*}
		     * @return {*}
		     */
		  }, {
		    key: 'serialize',
		    value: function serialize(state) {
		      return (0, _immutableHelpers.toJS)(state);
		    }

		    /**
		     * Deserializes plain JavaScript to store state
		     * Overridable
		     * @param {*}
		     * @return {*}
		     */
		  }, {
		    key: 'deserialize',
		    value: function deserialize(state) {
		      return (0, _immutableHelpers.toImmutable)(state);
		    }
		  }]);

		  return Store;
		})();

		function isStore(toTest) {
		  return toTest instanceof Store;
		}

		exports['default'] = (0, _utils.toFactory)(Store);

	/***/ },
	/* 3 */
	/***/ function(module, exports, __webpack_require__) {

		/**
		 *  Copyright (c) 2014-2015, Facebook, Inc.
		 *  All rights reserved.
		 *
		 *  This source code is licensed under the BSD-style license found in the
		 *  LICENSE file in the root directory of this source tree. An additional grant
		 *  of patent rights can be found in the PATENTS file in the same directory.
		 */
		(function (global, factory) {
		   true ? module.exports = factory() :
		  typeof define === 'function' && define.amd ? define(factory) :
		  global.Immutable = factory()
		}(this, function () { 'use strict';var SLICE$0 = Array.prototype.slice;

		  function createClass(ctor, superClass) {
		    if (superClass) {
		      ctor.prototype = Object.create(superClass.prototype);
		    }
		    ctor.prototype.constructor = ctor;
		  }

		  // Used for setting prototype methods that IE8 chokes on.
		  var DELETE = 'delete';

		  // Constants describing the size of trie nodes.
		  var SHIFT = 5; // Resulted in best performance after ______?
		  var SIZE = 1 << SHIFT;
		  var MASK = SIZE - 1;

		  // A consistent shared value representing "not set" which equals nothing other
		  // than itself, and nothing that could be provided externally.
		  var NOT_SET = {};

		  // Boolean references, Rough equivalent of `bool &`.
		  var CHANGE_LENGTH = { value: false };
		  var DID_ALTER = { value: false };

		  function MakeRef(ref) {
		    ref.value = false;
		    return ref;
		  }

		  function SetRef(ref) {
		    ref && (ref.value = true);
		  }

		  // A function which returns a value representing an "owner" for transient writes
		  // to tries. The return value will only ever equal itself, and will not equal
		  // the return of any subsequent call of this function.
		  function OwnerID() {}

		  // http://jsperf.com/copy-array-inline
		  function arrCopy(arr, offset) {
		    offset = offset || 0;
		    var len = Math.max(0, arr.length - offset);
		    var newArr = new Array(len);
		    for (var ii = 0; ii < len; ii++) {
		      newArr[ii] = arr[ii + offset];
		    }
		    return newArr;
		  }

		  function ensureSize(iter) {
		    if (iter.size === undefined) {
		      iter.size = iter.__iterate(returnTrue);
		    }
		    return iter.size;
		  }

		  function wrapIndex(iter, index) {
		    // This implements "is array index" which the ECMAString spec defines as:
		    //     A String property name P is an array index if and only if
		    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
		    //     to 2^32−1.
		    // However note that we're currently calling ToNumber() instead of ToUint32()
		    // which should be improved in the future, as floating point numbers should
		    // not be accepted as an array index.
		    if (typeof index !== 'number') {
		      var numIndex = +index;
		      if ('' + numIndex !== index) {
		        return NaN;
		      }
		      index = numIndex;
		    }
		    return index < 0 ? ensureSize(iter) + index : index;
		  }

		  function returnTrue() {
		    return true;
		  }

		  function wholeSlice(begin, end, size) {
		    return (begin === 0 || (size !== undefined && begin <= -size)) &&
		      (end === undefined || (size !== undefined && end >= size));
		  }

		  function resolveBegin(begin, size) {
		    return resolveIndex(begin, size, 0);
		  }

		  function resolveEnd(end, size) {
		    return resolveIndex(end, size, size);
		  }

		  function resolveIndex(index, size, defaultIndex) {
		    return index === undefined ?
		      defaultIndex :
		      index < 0 ?
		        Math.max(0, size + index) :
		        size === undefined ?
		          index :
		          Math.min(size, index);
		  }

		  function Iterable(value) {
		      return isIterable(value) ? value : Seq(value);
		    }


		  createClass(KeyedIterable, Iterable);
		    function KeyedIterable(value) {
		      return isKeyed(value) ? value : KeyedSeq(value);
		    }


		  createClass(IndexedIterable, Iterable);
		    function IndexedIterable(value) {
		      return isIndexed(value) ? value : IndexedSeq(value);
		    }


		  createClass(SetIterable, Iterable);
		    function SetIterable(value) {
		      return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
		    }



		  function isIterable(maybeIterable) {
		    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
		  }

		  function isKeyed(maybeKeyed) {
		    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
		  }

		  function isIndexed(maybeIndexed) {
		    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
		  }

		  function isAssociative(maybeAssociative) {
		    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
		  }

		  function isOrdered(maybeOrdered) {
		    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
		  }

		  Iterable.isIterable = isIterable;
		  Iterable.isKeyed = isKeyed;
		  Iterable.isIndexed = isIndexed;
		  Iterable.isAssociative = isAssociative;
		  Iterable.isOrdered = isOrdered;

		  Iterable.Keyed = KeyedIterable;
		  Iterable.Indexed = IndexedIterable;
		  Iterable.Set = SetIterable;


		  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
		  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
		  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
		  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

		  /* global Symbol */

		  var ITERATE_KEYS = 0;
		  var ITERATE_VALUES = 1;
		  var ITERATE_ENTRIES = 2;

		  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
		  var FAUX_ITERATOR_SYMBOL = '@@iterator';

		  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;


		  function src_Iterator__Iterator(next) {
		      this.next = next;
		    }

		    src_Iterator__Iterator.prototype.toString = function() {
		      return '[Iterator]';
		    };


		  src_Iterator__Iterator.KEYS = ITERATE_KEYS;
		  src_Iterator__Iterator.VALUES = ITERATE_VALUES;
		  src_Iterator__Iterator.ENTRIES = ITERATE_ENTRIES;

		  src_Iterator__Iterator.prototype.inspect =
		  src_Iterator__Iterator.prototype.toSource = function () { return this.toString(); }
		  src_Iterator__Iterator.prototype[ITERATOR_SYMBOL] = function () {
		    return this;
		  };


		  function iteratorValue(type, k, v, iteratorResult) {
		    var value = type === 0 ? k : type === 1 ? v : [k, v];
		    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
		      value: value, done: false
		    });
		    return iteratorResult;
		  }

		  function iteratorDone() {
		    return { value: undefined, done: true };
		  }

		  function hasIterator(maybeIterable) {
		    return !!getIteratorFn(maybeIterable);
		  }

		  function isIterator(maybeIterator) {
		    return maybeIterator && typeof maybeIterator.next === 'function';
		  }

		  function getIterator(iterable) {
		    var iteratorFn = getIteratorFn(iterable);
		    return iteratorFn && iteratorFn.call(iterable);
		  }

		  function getIteratorFn(iterable) {
		    var iteratorFn = iterable && (
		      (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
		      iterable[FAUX_ITERATOR_SYMBOL]
		    );
		    if (typeof iteratorFn === 'function') {
		      return iteratorFn;
		    }
		  }

		  function isArrayLike(value) {
		    return value && typeof value.length === 'number';
		  }

		  createClass(Seq, Iterable);
		    function Seq(value) {
		      return value === null || value === undefined ? emptySequence() :
		        isIterable(value) ? value.toSeq() : seqFromValue(value);
		    }

		    Seq.of = function(/*...values*/) {
		      return Seq(arguments);
		    };

		    Seq.prototype.toSeq = function() {
		      return this;
		    };

		    Seq.prototype.toString = function() {
		      return this.__toString('Seq {', '}');
		    };

		    Seq.prototype.cacheResult = function() {
		      if (!this._cache && this.__iterateUncached) {
		        this._cache = this.entrySeq().toArray();
		        this.size = this._cache.length;
		      }
		      return this;
		    };

		    // abstract __iterateUncached(fn, reverse)

		    Seq.prototype.__iterate = function(fn, reverse) {
		      return seqIterate(this, fn, reverse, true);
		    };

		    // abstract __iteratorUncached(type, reverse)

		    Seq.prototype.__iterator = function(type, reverse) {
		      return seqIterator(this, type, reverse, true);
		    };



		  createClass(KeyedSeq, Seq);
		    function KeyedSeq(value) {
		      return value === null || value === undefined ?
		        emptySequence().toKeyedSeq() :
		        isIterable(value) ?
		          (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) :
		          keyedSeqFromValue(value);
		    }

		    KeyedSeq.prototype.toKeyedSeq = function() {
		      return this;
		    };



		  createClass(IndexedSeq, Seq);
		    function IndexedSeq(value) {
		      return value === null || value === undefined ? emptySequence() :
		        !isIterable(value) ? indexedSeqFromValue(value) :
		        isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
		    }

		    IndexedSeq.of = function(/*...values*/) {
		      return IndexedSeq(arguments);
		    };

		    IndexedSeq.prototype.toIndexedSeq = function() {
		      return this;
		    };

		    IndexedSeq.prototype.toString = function() {
		      return this.__toString('Seq [', ']');
		    };

		    IndexedSeq.prototype.__iterate = function(fn, reverse) {
		      return seqIterate(this, fn, reverse, false);
		    };

		    IndexedSeq.prototype.__iterator = function(type, reverse) {
		      return seqIterator(this, type, reverse, false);
		    };



		  createClass(SetSeq, Seq);
		    function SetSeq(value) {
		      return (
		        value === null || value === undefined ? emptySequence() :
		        !isIterable(value) ? indexedSeqFromValue(value) :
		        isKeyed(value) ? value.entrySeq() : value
		      ).toSetSeq();
		    }

		    SetSeq.of = function(/*...values*/) {
		      return SetSeq(arguments);
		    };

		    SetSeq.prototype.toSetSeq = function() {
		      return this;
		    };



		  Seq.isSeq = isSeq;
		  Seq.Keyed = KeyedSeq;
		  Seq.Set = SetSeq;
		  Seq.Indexed = IndexedSeq;

		  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

		  Seq.prototype[IS_SEQ_SENTINEL] = true;



		  // #pragma Root Sequences

		  createClass(ArraySeq, IndexedSeq);
		    function ArraySeq(array) {
		      this._array = array;
		      this.size = array.length;
		    }

		    ArraySeq.prototype.get = function(index, notSetValue) {
		      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
		    };

		    ArraySeq.prototype.__iterate = function(fn, reverse) {
		      var array = this._array;
		      var maxIndex = array.length - 1;
		      for (var ii = 0; ii <= maxIndex; ii++) {
		        if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
		          return ii + 1;
		        }
		      }
		      return ii;
		    };

		    ArraySeq.prototype.__iterator = function(type, reverse) {
		      var array = this._array;
		      var maxIndex = array.length - 1;
		      var ii = 0;
		      return new src_Iterator__Iterator(function() 
		        {return ii > maxIndex ?
		          iteratorDone() :
		          iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++])}
		      );
		    };



		  createClass(ObjectSeq, KeyedSeq);
		    function ObjectSeq(object) {
		      var keys = Object.keys(object);
		      this._object = object;
		      this._keys = keys;
		      this.size = keys.length;
		    }

		    ObjectSeq.prototype.get = function(key, notSetValue) {
		      if (notSetValue !== undefined && !this.has(key)) {
		        return notSetValue;
		      }
		      return this._object[key];
		    };

		    ObjectSeq.prototype.has = function(key) {
		      return this._object.hasOwnProperty(key);
		    };

		    ObjectSeq.prototype.__iterate = function(fn, reverse) {
		      var object = this._object;
		      var keys = this._keys;
		      var maxIndex = keys.length - 1;
		      for (var ii = 0; ii <= maxIndex; ii++) {
		        var key = keys[reverse ? maxIndex - ii : ii];
		        if (fn(object[key], key, this) === false) {
		          return ii + 1;
		        }
		      }
		      return ii;
		    };

		    ObjectSeq.prototype.__iterator = function(type, reverse) {
		      var object = this._object;
		      var keys = this._keys;
		      var maxIndex = keys.length - 1;
		      var ii = 0;
		      return new src_Iterator__Iterator(function()  {
		        var key = keys[reverse ? maxIndex - ii : ii];
		        return ii++ > maxIndex ?
		          iteratorDone() :
		          iteratorValue(type, key, object[key]);
		      });
		    };

		  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;


		  createClass(IterableSeq, IndexedSeq);
		    function IterableSeq(iterable) {
		      this._iterable = iterable;
		      this.size = iterable.length || iterable.size;
		    }

		    IterableSeq.prototype.__iterateUncached = function(fn, reverse) {
		      if (reverse) {
		        return this.cacheResult().__iterate(fn, reverse);
		      }
		      var iterable = this._iterable;
		      var iterator = getIterator(iterable);
		      var iterations = 0;
		      if (isIterator(iterator)) {
		        var step;
		        while (!(step = iterator.next()).done) {
		          if (fn(step.value, iterations++, this) === false) {
		            break;
		          }
		        }
		      }
		      return iterations;
		    };

		    IterableSeq.prototype.__iteratorUncached = function(type, reverse) {
		      if (reverse) {
		        return this.cacheResult().__iterator(type, reverse);
		      }
		      var iterable = this._iterable;
		      var iterator = getIterator(iterable);
		      if (!isIterator(iterator)) {
		        return new src_Iterator__Iterator(iteratorDone);
		      }
		      var iterations = 0;
		      return new src_Iterator__Iterator(function()  {
		        var step = iterator.next();
		        return step.done ? step : iteratorValue(type, iterations++, step.value);
		      });
		    };



		  createClass(IteratorSeq, IndexedSeq);
		    function IteratorSeq(iterator) {
		      this._iterator = iterator;
		      this._iteratorCache = [];
		    }

		    IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {
		      if (reverse) {
		        return this.cacheResult().__iterate(fn, reverse);
		      }
		      var iterator = this._iterator;
		      var cache = this._iteratorCache;
		      var iterations = 0;
		      while (iterations < cache.length) {
		        if (fn(cache[iterations], iterations++, this) === false) {
		          return iterations;
		        }
		      }
		      var step;
		      while (!(step = iterator.next()).done) {
		        var val = step.value;
		        cache[iterations] = val;
		        if (fn(val, iterations++, this) === false) {
		          break;
		        }
		      }
		      return iterations;
		    };

		    IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {
		      if (reverse) {
		        return this.cacheResult().__iterator(type, reverse);
		      }
		      var iterator = this._iterator;
		      var cache = this._iteratorCache;
		      var iterations = 0;
		      return new src_Iterator__Iterator(function()  {
		        if (iterations >= cache.length) {
		          var step = iterator.next();
		          if (step.done) {
		            return step;
		          }
		          cache[iterations] = step.value;
		        }
		        return iteratorValue(type, iterations, cache[iterations++]);
		      });
		    };




		  // # pragma Helper functions

		  function isSeq(maybeSeq) {
		    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
		  }

		  var EMPTY_SEQ;

		  function emptySequence() {
		    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
		  }

		  function keyedSeqFromValue(value) {
		    var seq =
		      Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() :
		      isIterator(value) ? new IteratorSeq(value).fromEntrySeq() :
		      hasIterator(value) ? new IterableSeq(value).fromEntrySeq() :
		      typeof value === 'object' ? new ObjectSeq(value) :
		      undefined;
		    if (!seq) {
		      throw new TypeError(
		        'Expected Array or iterable object of [k, v] entries, '+
		        'or keyed object: ' + value
		      );
		    }
		    return seq;
		  }

		  function indexedSeqFromValue(value) {
		    var seq = maybeIndexedSeqFromValue(value);
		    if (!seq) {
		      throw new TypeError(
		        'Expected Array or iterable object of values: ' + value
		      );
		    }
		    return seq;
		  }

		  function seqFromValue(value) {
		    var seq = maybeIndexedSeqFromValue(value) ||
		      (typeof value === 'object' && new ObjectSeq(value));
		    if (!seq) {
		      throw new TypeError(
		        'Expected Array or iterable object of values, or keyed object: ' + value
		      );
		    }
		    return seq;
		  }

		  function maybeIndexedSeqFromValue(value) {
		    return (
		      isArrayLike(value) ? new ArraySeq(value) :
		      isIterator(value) ? new IteratorSeq(value) :
		      hasIterator(value) ? new IterableSeq(value) :
		      undefined
		    );
		  }

		  function seqIterate(seq, fn, reverse, useKeys) {
		    var cache = seq._cache;
		    if (cache) {
		      var maxIndex = cache.length - 1;
		      for (var ii = 0; ii <= maxIndex; ii++) {
		        var entry = cache[reverse ? maxIndex - ii : ii];
		        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
		          return ii + 1;
		        }
		      }
		      return ii;
		    }
		    return seq.__iterateUncached(fn, reverse);
		  }

		  function seqIterator(seq, type, reverse, useKeys) {
		    var cache = seq._cache;
		    if (cache) {
		      var maxIndex = cache.length - 1;
		      var ii = 0;
		      return new src_Iterator__Iterator(function()  {
		        var entry = cache[reverse ? maxIndex - ii : ii];
		        return ii++ > maxIndex ?
		          iteratorDone() :
		          iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
		      });
		    }
		    return seq.__iteratorUncached(type, reverse);
		  }

		  createClass(Collection, Iterable);
		    function Collection() {
		      throw TypeError('Abstract');
		    }


		  createClass(KeyedCollection, Collection);function KeyedCollection() {}

		  createClass(IndexedCollection, Collection);function IndexedCollection() {}

		  createClass(SetCollection, Collection);function SetCollection() {}


		  Collection.Keyed = KeyedCollection;
		  Collection.Indexed = IndexedCollection;
		  Collection.Set = SetCollection;

		  /**
		   * An extension of the "same-value" algorithm as [described for use by ES6 Map
		   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
		   *
		   * NaN is considered the same as NaN, however -0 and 0 are considered the same
		   * value, which is different from the algorithm described by
		   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
		   *
		   * This is extended further to allow Objects to describe the values they
		   * represent, by way of `valueOf` or `equals` (and `hashCode`).
		   *
		   * Note: because of this extension, the key equality of Immutable.Map and the
		   * value equality of Immutable.Set will differ from ES6 Map and Set.
		   *
		   * ### Defining custom values
		   *
		   * The easiest way to describe the value an object represents is by implementing
		   * `valueOf`. For example, `Date` represents a value by returning a unix
		   * timestamp for `valueOf`:
		   *
		   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
		   *     var date2 = new Date(1234567890000);
		   *     date1.valueOf(); // 1234567890000
		   *     assert( date1 !== date2 );
		   *     assert( Immutable.is( date1, date2 ) );
		   *
		   * Note: overriding `valueOf` may have other implications if you use this object
		   * where JavaScript expects a primitive, such as implicit string coercion.
		   *
		   * For more complex types, especially collections, implementing `valueOf` may
		   * not be performant. An alternative is to implement `equals` and `hashCode`.
		   *
		   * `equals` takes another object, presumably of similar type, and returns true
		   * if the it is equal. Equality is symmetrical, so the same result should be
		   * returned if this and the argument are flipped.
		   *
		   *     assert( a.equals(b) === b.equals(a) );
		   *
		   * `hashCode` returns a 32bit integer number representing the object which will
		   * be used to determine how to store the value object in a Map or Set. You must
		   * provide both or neither methods, one must not exist without the other.
		   *
		   * Also, an important relationship between these methods must be upheld: if two
		   * values are equal, they *must* return the same hashCode. If the values are not
		   * equal, they might have the same hashCode; this is called a hash collision,
		   * and while undesirable for performance reasons, it is acceptable.
		   *
		   *     if (a.equals(b)) {
		   *       assert( a.hashCode() === b.hashCode() );
		   *     }
		   *
		   * All Immutable collections implement `equals` and `hashCode`.
		   *
		   */
		  function is(valueA, valueB) {
		    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
		      return true;
		    }
		    if (!valueA || !valueB) {
		      return false;
		    }
		    if (typeof valueA.valueOf === 'function' &&
		        typeof valueB.valueOf === 'function') {
		      valueA = valueA.valueOf();
		      valueB = valueB.valueOf();
		      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
		        return true;
		      }
		      if (!valueA || !valueB) {
		        return false;
		      }
		    }
		    if (typeof valueA.equals === 'function' &&
		        typeof valueB.equals === 'function' &&
		        valueA.equals(valueB)) {
		      return true;
		    }
		    return false;
		  }

		  function fromJS(json, converter) {
		    return converter ?
		      fromJSWith(converter, json, '', {'': json}) :
		      fromJSDefault(json);
		  }

		  function fromJSWith(converter, json, key, parentJSON) {
		    if (Array.isArray(json)) {
		      return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
		    }
		    if (isPlainObj(json)) {
		      return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
		    }
		    return json;
		  }

		  function fromJSDefault(json) {
		    if (Array.isArray(json)) {
		      return IndexedSeq(json).map(fromJSDefault).toList();
		    }
		    if (isPlainObj(json)) {
		      return KeyedSeq(json).map(fromJSDefault).toMap();
		    }
		    return json;
		  }

		  function isPlainObj(value) {
		    return value && (value.constructor === Object || value.constructor === undefined);
		  }

		  var src_Math__imul =
		    typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ?
		    Math.imul :
		    function imul(a, b) {
		      a = a | 0; // int
		      b = b | 0; // int
		      var c = a & 0xffff;
		      var d = b & 0xffff;
		      // Shift by 0 fixes the sign on the high part.
		      return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0; // int
		    };

		  // v8 has an optimization for storing 31-bit signed numbers.
		  // Values which have either 00 or 11 as the high order bits qualify.
		  // This function drops the highest order bit in a signed number, maintaining
		  // the sign bit.
		  function smi(i32) {
		    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
		  }

		  function hash(o) {
		    if (o === false || o === null || o === undefined) {
		      return 0;
		    }
		    if (typeof o.valueOf === 'function') {
		      o = o.valueOf();
		      if (o === false || o === null || o === undefined) {
		        return 0;
		      }
		    }
		    if (o === true) {
		      return 1;
		    }
		    var type = typeof o;
		    if (type === 'number') {
		      var h = o | 0;
		      if (h !== o) {
		        h ^= o * 0xFFFFFFFF;
		      }
		      while (o > 0xFFFFFFFF) {
		        o /= 0xFFFFFFFF;
		        h ^= o;
		      }
		      return smi(h);
		    }
		    if (type === 'string') {
		      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
		    }
		    if (typeof o.hashCode === 'function') {
		      return o.hashCode();
		    }
		    return hashJSObj(o);
		  }

		  function cachedHashString(string) {
		    var hash = stringHashCache[string];
		    if (hash === undefined) {
		      hash = hashString(string);
		      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
		        STRING_HASH_CACHE_SIZE = 0;
		        stringHashCache = {};
		      }
		      STRING_HASH_CACHE_SIZE++;
		      stringHashCache[string] = hash;
		    }
		    return hash;
		  }

		  // http://jsperf.com/hashing-strings
		  function hashString(string) {
		    // This is the hash from JVM
		    // The hash code for a string is computed as
		    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
		    // where s[i] is the ith character of the string and n is the length of
		    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
		    // (exclusive) by dropping high bits.
		    var hash = 0;
		    for (var ii = 0; ii < string.length; ii++) {
		      hash = 31 * hash + string.charCodeAt(ii) | 0;
		    }
		    return smi(hash);
		  }

		  function hashJSObj(obj) {
		    var hash;
		    if (usingWeakMap) {
		      hash = weakMap.get(obj);
		      if (hash !== undefined) {
		        return hash;
		      }
		    }

		    hash = obj[UID_HASH_KEY];
		    if (hash !== undefined) {
		      return hash;
		    }

		    if (!canDefineProperty) {
		      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
		      if (hash !== undefined) {
		        return hash;
		      }

		      hash = getIENodeHash(obj);
		      if (hash !== undefined) {
		        return hash;
		      }
		    }

		    hash = ++objHashUID;
		    if (objHashUID & 0x40000000) {
		      objHashUID = 0;
		    }

		    if (usingWeakMap) {
		      weakMap.set(obj, hash);
		    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
		      throw new Error('Non-extensible objects are not allowed as keys.');
		    } else if (canDefineProperty) {
		      Object.defineProperty(obj, UID_HASH_KEY, {
		        'enumerable': false,
		        'configurable': false,
		        'writable': false,
		        'value': hash
		      });
		    } else if (obj.propertyIsEnumerable !== undefined &&
		               obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
		      // Since we can't define a non-enumerable property on the object
		      // we'll hijack one of the less-used non-enumerable properties to
		      // save our hash on it. Since this is a function it will not show up in
		      // `JSON.stringify` which is what we want.
		      obj.propertyIsEnumerable = function() {
		        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
		      };
		      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
		    } else if (obj.nodeType !== undefined) {
		      // At this point we couldn't get the IE `uniqueID` to use as a hash
		      // and we couldn't use a non-enumerable property to exploit the
		      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
		      // itself.
		      obj[UID_HASH_KEY] = hash;
		    } else {
		      throw new Error('Unable to set a non-enumerable property on object.');
		    }

		    return hash;
		  }

		  // Get references to ES5 object methods.
		  var isExtensible = Object.isExtensible;

		  // True if Object.defineProperty works as expected. IE8 fails this test.
		  var canDefineProperty = (function() {
		    try {
		      Object.defineProperty({}, '@', {});
		      return true;
		    } catch (e) {
		      return false;
		    }
		  }());

		  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
		  // and avoid memory leaks from the IE cloneNode bug.
		  function getIENodeHash(node) {
		    if (node && node.nodeType > 0) {
		      switch (node.nodeType) {
		        case 1: // Element
		          return node.uniqueID;
		        case 9: // Document
		          return node.documentElement && node.documentElement.uniqueID;
		      }
		    }
		  }

		  // If possible, use a WeakMap.
		  var usingWeakMap = typeof WeakMap === 'function';
		  var weakMap;
		  if (usingWeakMap) {
		    weakMap = new WeakMap();
		  }

		  var objHashUID = 0;

		  var UID_HASH_KEY = '__immutablehash__';
		  if (typeof Symbol === 'function') {
		    UID_HASH_KEY = Symbol(UID_HASH_KEY);
		  }

		  var STRING_HASH_CACHE_MIN_STRLEN = 16;
		  var STRING_HASH_CACHE_MAX_SIZE = 255;
		  var STRING_HASH_CACHE_SIZE = 0;
		  var stringHashCache = {};

		  function invariant(condition, error) {
		    if (!condition) throw new Error(error);
		  }

		  function assertNotInfinite(size) {
		    invariant(
		      size !== Infinity,
		      'Cannot perform this action with an infinite size.'
		    );
		  }

		  createClass(ToKeyedSequence, KeyedSeq);
		    function ToKeyedSequence(indexed, useKeys) {
		      this._iter = indexed;
		      this._useKeys = useKeys;
		      this.size = indexed.size;
		    }

		    ToKeyedSequence.prototype.get = function(key, notSetValue) {
		      return this._iter.get(key, notSetValue);
		    };

		    ToKeyedSequence.prototype.has = function(key) {
		      return this._iter.has(key);
		    };

		    ToKeyedSequence.prototype.valueSeq = function() {
		      return this._iter.valueSeq();
		    };

		    ToKeyedSequence.prototype.reverse = function() {var this$0 = this;
		      var reversedSequence = reverseFactory(this, true);
		      if (!this._useKeys) {
		        reversedSequence.valueSeq = function()  {return this$0._iter.toSeq().reverse()};
		      }
		      return reversedSequence;
		    };

		    ToKeyedSequence.prototype.map = function(mapper, context) {var this$0 = this;
		      var mappedSequence = mapFactory(this, mapper, context);
		      if (!this._useKeys) {
		        mappedSequence.valueSeq = function()  {return this$0._iter.toSeq().map(mapper, context)};
		      }
		      return mappedSequence;
		    };

		    ToKeyedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
		      var ii;
		      return this._iter.__iterate(
		        this._useKeys ?
		          function(v, k)  {return fn(v, k, this$0)} :
		          ((ii = reverse ? resolveSize(this) : 0),
		            function(v ) {return fn(v, reverse ? --ii : ii++, this$0)}),
		        reverse
		      );
		    };

		    ToKeyedSequence.prototype.__iterator = function(type, reverse) {
		      if (this._useKeys) {
		        return this._iter.__iterator(type, reverse);
		      }
		      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
		      var ii = reverse ? resolveSize(this) : 0;
		      return new src_Iterator__Iterator(function()  {
		        var step = iterator.next();
		        return step.done ? step :
		          iteratorValue(type, reverse ? --ii : ii++, step.value, step);
		      });
		    };

		  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;


		  createClass(ToIndexedSequence, IndexedSeq);
		    function ToIndexedSequence(iter) {
		      this._iter = iter;
		      this.size = iter.size;
		    }

		    ToIndexedSequence.prototype.includes = function(value) {
		      return this._iter.includes(value);
		    };

		    ToIndexedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
		      var iterations = 0;
		      return this._iter.__iterate(function(v ) {return fn(v, iterations++, this$0)}, reverse);
		    };

		    ToIndexedSequence.prototype.__iterator = function(type, reverse) {
		      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
		      var iterations = 0;
		      return new src_Iterator__Iterator(function()  {
		        var step = iterator.next();
		        return step.done ? step :
		          iteratorValue(type, iterations++, step.value, step)
		      });
		    };



		  createClass(ToSetSequence, SetSeq);
		    function ToSetSequence(iter) {
		      this._iter = iter;
		      this.size = iter.size;
		    }

		    ToSetSequence.prototype.has = function(key) {
		      return this._iter.includes(key);
		    };

		    ToSetSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
		      return this._iter.__iterate(function(v ) {return fn(v, v, this$0)}, reverse);
		    };

		    ToSetSequence.prototype.__iterator = function(type, reverse) {
		      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
		      return new src_Iterator__Iterator(function()  {
		        var step = iterator.next();
		        return step.done ? step :
		          iteratorValue(type, step.value, step.value, step);
		      });
		    };



		  createClass(FromEntriesSequence, KeyedSeq);
		    function FromEntriesSequence(entries) {
		      this._iter = entries;
		      this.size = entries.size;
		    }

		    FromEntriesSequence.prototype.entrySeq = function() {
		      return this._iter.toSeq();
		    };

		    FromEntriesSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
		      return this._iter.__iterate(function(entry ) {
		        // Check if entry exists first so array access doesn't throw for holes
		        // in the parent iteration.
		        if (entry) {
		          validateEntry(entry);
		          var indexedIterable = isIterable(entry);
		          return fn(
		            indexedIterable ? entry.get(1) : entry[1],
		            indexedIterable ? entry.get(0) : entry[0],
		            this$0
		          );
		        }
		      }, reverse);
		    };

		    FromEntriesSequence.prototype.__iterator = function(type, reverse) {
		      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
		      return new src_Iterator__Iterator(function()  {
		        while (true) {
		          var step = iterator.next();
		          if (step.done) {
		            return step;
		          }
		          var entry = step.value;
		          // Check if entry exists first so array access doesn't throw for holes
		          // in the parent iteration.
		          if (entry) {
		            validateEntry(entry);
		            var indexedIterable = isIterable(entry);
		            return iteratorValue(
		              type,
		              indexedIterable ? entry.get(0) : entry[0],
		              indexedIterable ? entry.get(1) : entry[1],
		              step
		            );
		          }
		        }
		      });
		    };


		  ToIndexedSequence.prototype.cacheResult =
		  ToKeyedSequence.prototype.cacheResult =
		  ToSetSequence.prototype.cacheResult =
		  FromEntriesSequence.prototype.cacheResult =
		    cacheResultThrough;


		  function flipFactory(iterable) {
		    var flipSequence = makeSequence(iterable);
		    flipSequence._iter = iterable;
		    flipSequence.size = iterable.size;
		    flipSequence.flip = function()  {return iterable};
		    flipSequence.reverse = function () {
		      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
		      reversedSequence.flip = function()  {return iterable.reverse()};
		      return reversedSequence;
		    };
		    flipSequence.has = function(key ) {return iterable.includes(key)};
		    flipSequence.includes = function(key ) {return iterable.has(key)};
		    flipSequence.cacheResult = cacheResultThrough;
		    flipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
		      return iterable.__iterate(function(v, k)  {return fn(k, v, this$0) !== false}, reverse);
		    }
		    flipSequence.__iteratorUncached = function(type, reverse) {
		      if (type === ITERATE_ENTRIES) {
		        var iterator = iterable.__iterator(type, reverse);
		        return new src_Iterator__Iterator(function()  {
		          var step = iterator.next();
		          if (!step.done) {
		            var k = step.value[0];
		            step.value[0] = step.value[1];
		            step.value[1] = k;
		          }
		          return step;
		        });
		      }
		      return iterable.__iterator(
		        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
		        reverse
		      );
		    }
		    return flipSequence;
		  }


		  function mapFactory(iterable, mapper, context) {
		    var mappedSequence = makeSequence(iterable);
		    mappedSequence.size = iterable.size;
		    mappedSequence.has = function(key ) {return iterable.has(key)};
		    mappedSequence.get = function(key, notSetValue)  {
		      var v = iterable.get(key, NOT_SET);
		      return v === NOT_SET ?
		        notSetValue :
		        mapper.call(context, v, key, iterable);
		    };
		    mappedSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
		      return iterable.__iterate(
		        function(v, k, c)  {return fn(mapper.call(context, v, k, c), k, this$0) !== false},
		        reverse
		      );
		    }
		    mappedSequence.__iteratorUncached = function (type, reverse) {
		      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
		      return new src_Iterator__Iterator(function()  {
		        var step = iterator.next();
		        if (step.done) {
		          return step;
		        }
		        var entry = step.value;
		        var key = entry[0];
		        return iteratorValue(
		          type,
		          key,
		          mapper.call(context, entry[1], key, iterable),
		          step
		        );
		      });
		    }
		    return mappedSequence;
		  }


		  function reverseFactory(iterable, useKeys) {
		    var reversedSequence = makeSequence(iterable);
		    reversedSequence._iter = iterable;
		    reversedSequence.size = iterable.size;
		    reversedSequence.reverse = function()  {return iterable};
		    if (iterable.flip) {
		      reversedSequence.flip = function () {
		        var flipSequence = flipFactory(iterable);
		        flipSequence.reverse = function()  {return iterable.flip()};
		        return flipSequence;
		      };
		    }
		    reversedSequence.get = function(key, notSetValue) 
		      {return iterable.get(useKeys ? key : -1 - key, notSetValue)};
		    reversedSequence.has = function(key )
		      {return iterable.has(useKeys ? key : -1 - key)};
		    reversedSequence.includes = function(value ) {return iterable.includes(value)};
		    reversedSequence.cacheResult = cacheResultThrough;
		    reversedSequence.__iterate = function (fn, reverse) {var this$0 = this;
		      return iterable.__iterate(function(v, k)  {return fn(v, k, this$0)}, !reverse);
		    };
		    reversedSequence.__iterator =
		      function(type, reverse)  {return iterable.__iterator(type, !reverse)};
		    return reversedSequence;
		  }


		  function filterFactory(iterable, predicate, context, useKeys) {
		    var filterSequence = makeSequence(iterable);
		    if (useKeys) {
		      filterSequence.has = function(key ) {
		        var v = iterable.get(key, NOT_SET);
		        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
		      };
		      filterSequence.get = function(key, notSetValue)  {
		        var v = iterable.get(key, NOT_SET);
		        return v !== NOT_SET && predicate.call(context, v, key, iterable) ?
		          v : notSetValue;
		      };
		    }
		    filterSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
		      var iterations = 0;
		      iterable.__iterate(function(v, k, c)  {
		        if (predicate.call(context, v, k, c)) {
		          iterations++;
		          return fn(v, useKeys ? k : iterations - 1, this$0);
		        }
		      }, reverse);
		      return iterations;
		    };
		    filterSequence.__iteratorUncached = function (type, reverse) {
		      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
		      var iterations = 0;
		      return new src_Iterator__Iterator(function()  {
		        while (true) {
		          var step = iterator.next();
		          if (step.done) {
		            return step;
		          }
		          var entry = step.value;
		          var key = entry[0];
		          var value = entry[1];
		          if (predicate.call(context, value, key, iterable)) {
		            return iteratorValue(type, useKeys ? key : iterations++, value, step);
		          }
		        }
		      });
		    }
		    return filterSequence;
		  }


		  function countByFactory(iterable, grouper, context) {
		    var groups = src_Map__Map().asMutable();
		    iterable.__iterate(function(v, k)  {
		      groups.update(
		        grouper.call(context, v, k, iterable),
		        0,
		        function(a ) {return a + 1}
		      );
		    });
		    return groups.asImmutable();
		  }


		  function groupByFactory(iterable, grouper, context) {
		    var isKeyedIter = isKeyed(iterable);
		    var groups = (isOrdered(iterable) ? OrderedMap() : src_Map__Map()).asMutable();
		    iterable.__iterate(function(v, k)  {
		      groups.update(
		        grouper.call(context, v, k, iterable),
		        function(a ) {return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a)}
		      );
		    });
		    var coerce = iterableClass(iterable);
		    return groups.map(function(arr ) {return reify(iterable, coerce(arr))});
		  }


		  function sliceFactory(iterable, begin, end, useKeys) {
		    var originalSize = iterable.size;

		    // Sanitize begin & end using this shorthand for ToInt32(argument)
		    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
		    if (begin !== undefined) {
		      begin = begin | 0;
		    }
		    if (end !== undefined) {
		      end = end | 0;
		    }

		    if (wholeSlice(begin, end, originalSize)) {
		      return iterable;
		    }

		    var resolvedBegin = resolveBegin(begin, originalSize);
		    var resolvedEnd = resolveEnd(end, originalSize);

		    // begin or end will be NaN if they were provided as negative numbers and
		    // this iterable's size is unknown. In that case, cache first so there is
		    // a known size and these do not resolve to NaN.
		    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
		      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
		    }

		    // Note: resolvedEnd is undefined when the original sequence's length is
		    // unknown and this slice did not supply an end and should contain all
		    // elements after resolvedBegin.
		    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
		    var resolvedSize = resolvedEnd - resolvedBegin;
		    var sliceSize;
		    if (resolvedSize === resolvedSize) {
		      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
		    }

		    var sliceSeq = makeSequence(iterable);

		    // If iterable.size is undefined, the size of the realized sliceSeq is
		    // unknown at this point unless the number of items to slice is 0
		    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

		    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
		      sliceSeq.get = function (index, notSetValue) {
		        index = wrapIndex(this, index);
		        return index >= 0 && index < sliceSize ?
		          iterable.get(index + resolvedBegin, notSetValue) :
		          notSetValue;
		      }
		    }

		    sliceSeq.__iterateUncached = function(fn, reverse) {var this$0 = this;
		      if (sliceSize === 0) {
		        return 0;
		      }
		      if (reverse) {
		        return this.cacheResult().__iterate(fn, reverse);
		      }
		      var skipped = 0;
		      var isSkipping = true;
		      var iterations = 0;
		      iterable.__iterate(function(v, k)  {
		        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
		          iterations++;
		          return fn(v, useKeys ? k : iterations - 1, this$0) !== false &&
		                 iterations !== sliceSize;
		        }
		      });
		      return iterations;
		    };

		    sliceSeq.__iteratorUncached = function(type, reverse) {
		      if (sliceSize !== 0 && reverse) {
		        return this.cacheResult().__iterator(type, reverse);
		      }
		      // Don't bother instantiating parent iterator if taking 0.
		      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
		      var skipped = 0;
		      var iterations = 0;
		      return new src_Iterator__Iterator(function()  {
		        while (skipped++ < resolvedBegin) {
		          iterator.next();
		        }
		        if (++iterations > sliceSize) {
		          return iteratorDone();
		        }
		        var step = iterator.next();
		        if (useKeys || type === ITERATE_VALUES) {
		          return step;
		        } else if (type === ITERATE_KEYS) {
		          return iteratorValue(type, iterations - 1, undefined, step);
		        } else {
		          return iteratorValue(type, iterations - 1, step.value[1], step);
		        }
		      });
		    }

		    return sliceSeq;
		  }


		  function takeWhileFactory(iterable, predicate, context) {
		    var takeSequence = makeSequence(iterable);
		    takeSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
		      if (reverse) {
		        return this.cacheResult().__iterate(fn, reverse);
		      }
		      var iterations = 0;
		      iterable.__iterate(function(v, k, c) 
		        {return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0)}
		      );
		      return iterations;
		    };
		    takeSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
		      if (reverse) {
		        return this.cacheResult().__iterator(type, reverse);
		      }
		      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
		      var iterating = true;
		      return new src_Iterator__Iterator(function()  {
		        if (!iterating) {
		          return iteratorDone();
		        }
		        var step = iterator.next();
		        if (step.done) {
		          return step;
		        }
		        var entry = step.value;
		        var k = entry[0];
		        var v = entry[1];
		        if (!predicate.call(context, v, k, this$0)) {
		          iterating = false;
		          return iteratorDone();
		        }
		        return type === ITERATE_ENTRIES ? step :
		          iteratorValue(type, k, v, step);
		      });
		    };
		    return takeSequence;
		  }


		  function skipWhileFactory(iterable, predicate, context, useKeys) {
		    var skipSequence = makeSequence(iterable);
		    skipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
		      if (reverse) {
		        return this.cacheResult().__iterate(fn, reverse);
		      }
		      var isSkipping = true;
		      var iterations = 0;
		      iterable.__iterate(function(v, k, c)  {
		        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
		          iterations++;
		          return fn(v, useKeys ? k : iterations - 1, this$0);
		        }
		      });
		      return iterations;
		    };
		    skipSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
		      if (reverse) {
		        return this.cacheResult().__iterator(type, reverse);
		      }
		      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
		      var skipping = true;
		      var iterations = 0;
		      return new src_Iterator__Iterator(function()  {
		        var step, k, v;
		        do {
		          step = iterator.next();
		          if (step.done) {
		            if (useKeys || type === ITERATE_VALUES) {
		              return step;
		            } else if (type === ITERATE_KEYS) {
		              return iteratorValue(type, iterations++, undefined, step);
		            } else {
		              return iteratorValue(type, iterations++, step.value[1], step);
		            }
		          }
		          var entry = step.value;
		          k = entry[0];
		          v = entry[1];
		          skipping && (skipping = predicate.call(context, v, k, this$0));
		        } while (skipping);
		        return type === ITERATE_ENTRIES ? step :
		          iteratorValue(type, k, v, step);
		      });
		    };
		    return skipSequence;
		  }


		  function concatFactory(iterable, values) {
		    var isKeyedIterable = isKeyed(iterable);
		    var iters = [iterable].concat(values).map(function(v ) {
		      if (!isIterable(v)) {
		        v = isKeyedIterable ?
		          keyedSeqFromValue(v) :
		          indexedSeqFromValue(Array.isArray(v) ? v : [v]);
		      } else if (isKeyedIterable) {
		        v = KeyedIterable(v);
		      }
		      return v;
		    }).filter(function(v ) {return v.size !== 0});

		    if (iters.length === 0) {
		      return iterable;
		    }

		    if (iters.length === 1) {
		      var singleton = iters[0];
		      if (singleton === iterable ||
		          isKeyedIterable && isKeyed(singleton) ||
		          isIndexed(iterable) && isIndexed(singleton)) {
		        return singleton;
		      }
		    }

		    var concatSeq = new ArraySeq(iters);
		    if (isKeyedIterable) {
		      concatSeq = concatSeq.toKeyedSeq();
		    } else if (!isIndexed(iterable)) {
		      concatSeq = concatSeq.toSetSeq();
		    }
		    concatSeq = concatSeq.flatten(true);
		    concatSeq.size = iters.reduce(
		      function(sum, seq)  {
		        if (sum !== undefined) {
		          var size = seq.size;
		          if (size !== undefined) {
		            return sum + size;
		          }
		        }
		      },
		      0
		    );
		    return concatSeq;
		  }


		  function flattenFactory(iterable, depth, useKeys) {
		    var flatSequence = makeSequence(iterable);
		    flatSequence.__iterateUncached = function(fn, reverse) {
		      var iterations = 0;
		      var stopped = false;
		      function flatDeep(iter, currentDepth) {var this$0 = this;
		        iter.__iterate(function(v, k)  {
		          if ((!depth || currentDepth < depth) && isIterable(v)) {
		            flatDeep(v, currentDepth + 1);
		          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
		            stopped = true;
		          }
		          return !stopped;
		        }, reverse);
		      }
		      flatDeep(iterable, 0);
		      return iterations;
		    }
		    flatSequence.__iteratorUncached = function(type, reverse) {
		      var iterator = iterable.__iterator(type, reverse);
		      var stack = [];
		      var iterations = 0;
		      return new src_Iterator__Iterator(function()  {
		        while (iterator) {
		          var step = iterator.next();
		          if (step.done !== false) {
		            iterator = stack.pop();
		            continue;
		          }
		          var v = step.value;
		          if (type === ITERATE_ENTRIES) {
		            v = v[1];
		          }
		          if ((!depth || stack.length < depth) && isIterable(v)) {
		            stack.push(iterator);
		            iterator = v.__iterator(type, reverse);
		          } else {
		            return useKeys ? step : iteratorValue(type, iterations++, v, step);
		          }
		        }
		        return iteratorDone();
		      });
		    }
		    return flatSequence;
		  }


		  function flatMapFactory(iterable, mapper, context) {
		    var coerce = iterableClass(iterable);
		    return iterable.toSeq().map(
		      function(v, k)  {return coerce(mapper.call(context, v, k, iterable))}
		    ).flatten(true);
		  }


		  function interposeFactory(iterable, separator) {
		    var interposedSequence = makeSequence(iterable);
		    interposedSequence.size = iterable.size && iterable.size * 2 -1;
		    interposedSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
		      var iterations = 0;
		      iterable.__iterate(function(v, k) 
		        {return (!iterations || fn(separator, iterations++, this$0) !== false) &&
		        fn(v, iterations++, this$0) !== false},
		        reverse
		      );
		      return iterations;
		    };
		    interposedSequence.__iteratorUncached = function(type, reverse) {
		      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
		      var iterations = 0;
		      var step;
		      return new src_Iterator__Iterator(function()  {
		        if (!step || iterations % 2) {
		          step = iterator.next();
		          if (step.done) {
		            return step;
		          }
		        }
		        return iterations % 2 ?
		          iteratorValue(type, iterations++, separator) :
		          iteratorValue(type, iterations++, step.value, step);
		      });
		    };
		    return interposedSequence;
		  }


		  function sortFactory(iterable, comparator, mapper) {
		    if (!comparator) {
		      comparator = defaultComparator;
		    }
		    var isKeyedIterable = isKeyed(iterable);
		    var index = 0;
		    var entries = iterable.toSeq().map(
		      function(v, k)  {return [k, v, index++, mapper ? mapper(v, k, iterable) : v]}
		    ).toArray();
		    entries.sort(function(a, b)  {return comparator(a[3], b[3]) || a[2] - b[2]}).forEach(
		      isKeyedIterable ?
		      function(v, i)  { entries[i].length = 2; } :
		      function(v, i)  { entries[i] = v[1]; }
		    );
		    return isKeyedIterable ? KeyedSeq(entries) :
		      isIndexed(iterable) ? IndexedSeq(entries) :
		      SetSeq(entries);
		  }


		  function maxFactory(iterable, comparator, mapper) {
		    if (!comparator) {
		      comparator = defaultComparator;
		    }
		    if (mapper) {
		      var entry = iterable.toSeq()
		        .map(function(v, k)  {return [v, mapper(v, k, iterable)]})
		        .reduce(function(a, b)  {return maxCompare(comparator, a[1], b[1]) ? b : a});
		      return entry && entry[0];
		    } else {
		      return iterable.reduce(function(a, b)  {return maxCompare(comparator, a, b) ? b : a});
		    }
		  }

		  function maxCompare(comparator, a, b) {
		    var comp = comparator(b, a);
		    // b is considered the new max if the comparator declares them equal, but
		    // they are not equal and b is in fact a nullish value.
		    return (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) || comp > 0;
		  }


		  function zipWithFactory(keyIter, zipper, iters) {
		    var zipSequence = makeSequence(keyIter);
		    zipSequence.size = new ArraySeq(iters).map(function(i ) {return i.size}).min();
		    // Note: this a generic base implementation of __iterate in terms of
		    // __iterator which may be more generically useful in the future.
		    zipSequence.__iterate = function(fn, reverse) {
		      /* generic:
		      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
		      var step;
		      var iterations = 0;
		      while (!(step = iterator.next()).done) {
		        iterations++;
		        if (fn(step.value[1], step.value[0], this) === false) {
		          break;
		        }
		      }
		      return iterations;
		      */
		      // indexed:
		      var iterator = this.__iterator(ITERATE_VALUES, reverse);
		      var step;
		      var iterations = 0;
		      while (!(step = iterator.next()).done) {
		        if (fn(step.value, iterations++, this) === false) {
		          break;
		        }
		      }
		      return iterations;
		    };
		    zipSequence.__iteratorUncached = function(type, reverse) {
		      var iterators = iters.map(function(i )
		        {return (i = Iterable(i), getIterator(reverse ? i.reverse() : i))}
		      );
		      var iterations = 0;
		      var isDone = false;
		      return new src_Iterator__Iterator(function()  {
		        var steps;
		        if (!isDone) {
		          steps = iterators.map(function(i ) {return i.next()});
		          isDone = steps.some(function(s ) {return s.done});
		        }
		        if (isDone) {
		          return iteratorDone();
		        }
		        return iteratorValue(
		          type,
		          iterations++,
		          zipper.apply(null, steps.map(function(s ) {return s.value}))
		        );
		      });
		    };
		    return zipSequence
		  }


		  // #pragma Helper Functions

		  function reify(iter, seq) {
		    return isSeq(iter) ? seq : iter.constructor(seq);
		  }

		  function validateEntry(entry) {
		    if (entry !== Object(entry)) {
		      throw new TypeError('Expected [K, V] tuple: ' + entry);
		    }
		  }

		  function resolveSize(iter) {
		    assertNotInfinite(iter.size);
		    return ensureSize(iter);
		  }

		  function iterableClass(iterable) {
		    return isKeyed(iterable) ? KeyedIterable :
		      isIndexed(iterable) ? IndexedIterable :
		      SetIterable;
		  }

		  function makeSequence(iterable) {
		    return Object.create(
		      (
		        isKeyed(iterable) ? KeyedSeq :
		        isIndexed(iterable) ? IndexedSeq :
		        SetSeq
		      ).prototype
		    );
		  }

		  function cacheResultThrough() {
		    if (this._iter.cacheResult) {
		      this._iter.cacheResult();
		      this.size = this._iter.size;
		      return this;
		    } else {
		      return Seq.prototype.cacheResult.call(this);
		    }
		  }

		  function defaultComparator(a, b) {
		    return a > b ? 1 : a < b ? -1 : 0;
		  }

		  function forceIterator(keyPath) {
		    var iter = getIterator(keyPath);
		    if (!iter) {
		      // Array might not be iterable in this environment, so we need a fallback
		      // to our wrapped type.
		      if (!isArrayLike(keyPath)) {
		        throw new TypeError('Expected iterable or array-like: ' + keyPath);
		      }
		      iter = getIterator(Iterable(keyPath));
		    }
		    return iter;
		  }

		  createClass(src_Map__Map, KeyedCollection);

		    // @pragma Construction

		    function src_Map__Map(value) {
		      return value === null || value === undefined ? emptyMap() :
		        isMap(value) && !isOrdered(value) ? value :
		        emptyMap().withMutations(function(map ) {
		          var iter = KeyedIterable(value);
		          assertNotInfinite(iter.size);
		          iter.forEach(function(v, k)  {return map.set(k, v)});
		        });
		    }

		    src_Map__Map.prototype.toString = function() {
		      return this.__toString('Map {', '}');
		    };

		    // @pragma Access

		    src_Map__Map.prototype.get = function(k, notSetValue) {
		      return this._root ?
		        this._root.get(0, undefined, k, notSetValue) :
		        notSetValue;
		    };

		    // @pragma Modification

		    src_Map__Map.prototype.set = function(k, v) {
		      return updateMap(this, k, v);
		    };

		    src_Map__Map.prototype.setIn = function(keyPath, v) {
		      return this.updateIn(keyPath, NOT_SET, function()  {return v});
		    };

		    src_Map__Map.prototype.remove = function(k) {
		      return updateMap(this, k, NOT_SET);
		    };

		    src_Map__Map.prototype.deleteIn = function(keyPath) {
		      return this.updateIn(keyPath, function()  {return NOT_SET});
		    };

		    src_Map__Map.prototype.update = function(k, notSetValue, updater) {
		      return arguments.length === 1 ?
		        k(this) :
		        this.updateIn([k], notSetValue, updater);
		    };

		    src_Map__Map.prototype.updateIn = function(keyPath, notSetValue, updater) {
		      if (!updater) {
		        updater = notSetValue;
		        notSetValue = undefined;
		      }
		      var updatedValue = updateInDeepMap(
		        this,
		        forceIterator(keyPath),
		        notSetValue,
		        updater
		      );
		      return updatedValue === NOT_SET ? undefined : updatedValue;
		    };

		    src_Map__Map.prototype.clear = function() {
		      if (this.size === 0) {
		        return this;
		      }
		      if (this.__ownerID) {
		        this.size = 0;
		        this._root = null;
		        this.__hash = undefined;
		        this.__altered = true;
		        return this;
		      }
		      return emptyMap();
		    };

		    // @pragma Composition

		    src_Map__Map.prototype.merge = function(/*...iters*/) {
		      return mergeIntoMapWith(this, undefined, arguments);
		    };

		    src_Map__Map.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
		      return mergeIntoMapWith(this, merger, iters);
		    };

		    src_Map__Map.prototype.mergeIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
		      return this.updateIn(
		        keyPath,
		        emptyMap(),
		        function(m ) {return typeof m.merge === 'function' ?
		          m.merge.apply(m, iters) :
		          iters[iters.length - 1]}
		      );
		    };

		    src_Map__Map.prototype.mergeDeep = function(/*...iters*/) {
		      return mergeIntoMapWith(this, deepMerger(undefined), arguments);
		    };

		    src_Map__Map.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
		      return mergeIntoMapWith(this, deepMerger(merger), iters);
		    };

		    src_Map__Map.prototype.mergeDeepIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
		      return this.updateIn(
		        keyPath,
		        emptyMap(),
		        function(m ) {return typeof m.mergeDeep === 'function' ?
		          m.mergeDeep.apply(m, iters) :
		          iters[iters.length - 1]}
		      );
		    };

		    src_Map__Map.prototype.sort = function(comparator) {
		      // Late binding
		      return OrderedMap(sortFactory(this, comparator));
		    };

		    src_Map__Map.prototype.sortBy = function(mapper, comparator) {
		      // Late binding
		      return OrderedMap(sortFactory(this, comparator, mapper));
		    };

		    // @pragma Mutability

		    src_Map__Map.prototype.withMutations = function(fn) {
		      var mutable = this.asMutable();
		      fn(mutable);
		      return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
		    };

		    src_Map__Map.prototype.asMutable = function() {
		      return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
		    };

		    src_Map__Map.prototype.asImmutable = function() {
		      return this.__ensureOwner();
		    };

		    src_Map__Map.prototype.wasAltered = function() {
		      return this.__altered;
		    };

		    src_Map__Map.prototype.__iterator = function(type, reverse) {
		      return new MapIterator(this, type, reverse);
		    };

		    src_Map__Map.prototype.__iterate = function(fn, reverse) {var this$0 = this;
		      var iterations = 0;
		      this._root && this._root.iterate(function(entry ) {
		        iterations++;
		        return fn(entry[1], entry[0], this$0);
		      }, reverse);
		      return iterations;
		    };

		    src_Map__Map.prototype.__ensureOwner = function(ownerID) {
		      if (ownerID === this.__ownerID) {
		        return this;
		      }
		      if (!ownerID) {
		        this.__ownerID = ownerID;
		        this.__altered = false;
		        return this;
		      }
		      return makeMap(this.size, this._root, ownerID, this.__hash);
		    };


		  function isMap(maybeMap) {
		    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
		  }

		  src_Map__Map.isMap = isMap;

		  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

		  var MapPrototype = src_Map__Map.prototype;
		  MapPrototype[IS_MAP_SENTINEL] = true;
		  MapPrototype[DELETE] = MapPrototype.remove;
		  MapPrototype.removeIn = MapPrototype.deleteIn;


		  // #pragma Trie Nodes



		    function ArrayMapNode(ownerID, entries) {
		      this.ownerID = ownerID;
		      this.entries = entries;
		    }

		    ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
		      var entries = this.entries;
		      for (var ii = 0, len = entries.length; ii < len; ii++) {
		        if (is(key, entries[ii][0])) {
		          return entries[ii][1];
		        }
		      }
		      return notSetValue;
		    };

		    ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
		      var removed = value === NOT_SET;

		      var entries = this.entries;
		      var idx = 0;
		      for (var len = entries.length; idx < len; idx++) {
		        if (is(key, entries[idx][0])) {
		          break;
		        }
		      }
		      var exists = idx < len;

		      if (exists ? entries[idx][1] === value : removed) {
		        return this;
		      }

		      SetRef(didAlter);
		      (removed || !exists) && SetRef(didChangeSize);

		      if (removed && entries.length === 1) {
		        return; // undefined
		      }

		      if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
		        return createNodes(ownerID, entries, key, value);
		      }

		      var isEditable = ownerID && ownerID === this.ownerID;
		      var newEntries = isEditable ? entries : arrCopy(entries);

		      if (exists) {
		        if (removed) {
		          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
		        } else {
		          newEntries[idx] = [key, value];
		        }
		      } else {
		        newEntries.push([key, value]);
		      }

		      if (isEditable) {
		        this.entries = newEntries;
		        return this;
		      }

		      return new ArrayMapNode(ownerID, newEntries);
		    };




		    function BitmapIndexedNode(ownerID, bitmap, nodes) {
		      this.ownerID = ownerID;
		      this.bitmap = bitmap;
		      this.nodes = nodes;
		    }

		    BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {
		      if (keyHash === undefined) {
		        keyHash = hash(key);
		      }
		      var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));
		      var bitmap = this.bitmap;
		      return (bitmap & bit) === 0 ? notSetValue :
		        this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);
		    };

		    BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
		      if (keyHash === undefined) {
		        keyHash = hash(key);
		      }
		      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
		      var bit = 1 << keyHashFrag;
		      var bitmap = this.bitmap;
		      var exists = (bitmap & bit) !== 0;

		      if (!exists && value === NOT_SET) {
		        return this;
		      }

		      var idx = popCount(bitmap & (bit - 1));
		      var nodes = this.nodes;
		      var node = exists ? nodes[idx] : undefined;
		      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

		      if (newNode === node) {
		        return this;
		      }

		      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
		        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
		      }

		      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
		        return nodes[idx ^ 1];
		      }

		      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
		        return newNode;
		      }

		      var isEditable = ownerID && ownerID === this.ownerID;
		      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
		      var newNodes = exists ? newNode ?
		        setIn(nodes, idx, newNode, isEditable) :
		        spliceOut(nodes, idx, isEditable) :
		        spliceIn(nodes, idx, newNode, isEditable);

		      if (isEditable) {
		        this.bitmap = newBitmap;
		        this.nodes = newNodes;
		        return this;
		      }

		      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
		    };




		    function HashArrayMapNode(ownerID, count, nodes) {
		      this.ownerID = ownerID;
		      this.count = count;
		      this.nodes = nodes;
		    }

		    HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
		      if (keyHash === undefined) {
		        keyHash = hash(key);
		      }
		      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
		      var node = this.nodes[idx];
		      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
		    };

		    HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
		      if (keyHash === undefined) {
		        keyHash = hash(key);
		      }
		      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
		      var removed = value === NOT_SET;
		      var nodes = this.nodes;
		      var node = nodes[idx];

		      if (removed && !node) {
		        return this;
		      }

		      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
		      if (newNode === node) {
		        return this;
		      }

		      var newCount = this.count;
		      if (!node) {
		        newCount++;
		      } else if (!newNode) {
		        newCount--;
		        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
		          return packNodes(ownerID, nodes, newCount, idx);
		        }
		      }

		      var isEditable = ownerID && ownerID === this.ownerID;
		      var newNodes = setIn(nodes, idx, newNode, isEditable);

		      if (isEditable) {
		        this.count = newCount;
		        this.nodes = newNodes;
		        return this;
		      }

		      return new HashArrayMapNode(ownerID, newCount, newNodes);
		    };




		    function HashCollisionNode(ownerID, keyHash, entries) {
		      this.ownerID = ownerID;
		      this.keyHash = keyHash;
		      this.entries = entries;
		    }

		    HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {
		      var entries = this.entries;
		      for (var ii = 0, len = entries.length; ii < len; ii++) {
		        if (is(key, entries[ii][0])) {
		          return entries[ii][1];
		        }
		      }
		      return notSetValue;
		    };

		    HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
		      if (keyHash === undefined) {
		        keyHash = hash(key);
		      }

		      var removed = value === NOT_SET;

		      if (keyHash !== this.keyHash) {
		        if (removed) {
		          return this;
		        }
		        SetRef(didAlter);
		        SetRef(didChangeSize);
		        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
		      }

		      var entries = this.entries;
		      var idx = 0;
		      for (var len = entries.length; idx < len; idx++) {
		        if (is(key, entries[idx][0])) {
		          break;
		        }
		      }
		      var exists = idx < len;

		      if (exists ? entries[idx][1] === value : removed) {
		        return this;
		      }

		      SetRef(didAlter);
		      (removed || !exists) && SetRef(didChangeSize);

		      if (removed && len === 2) {
		        return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
		      }

		      var isEditable = ownerID && ownerID === this.ownerID;
		      var newEntries = isEditable ? entries : arrCopy(entries);

		      if (exists) {
		        if (removed) {
		          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
		        } else {
		          newEntries[idx] = [key, value];
		        }
		      } else {
		        newEntries.push([key, value]);
		      }

		      if (isEditable) {
		        this.entries = newEntries;
		        return this;
		      }

		      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
		    };




		    function ValueNode(ownerID, keyHash, entry) {
		      this.ownerID = ownerID;
		      this.keyHash = keyHash;
		      this.entry = entry;
		    }

		    ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
		      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
		    };

		    ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
		      var removed = value === NOT_SET;
		      var keyMatch = is(key, this.entry[0]);
		      if (keyMatch ? value === this.entry[1] : removed) {
		        return this;
		      }

		      SetRef(didAlter);

		      if (removed) {
		        SetRef(didChangeSize);
		        return; // undefined
		      }

		      if (keyMatch) {
		        if (ownerID && ownerID === this.ownerID) {
		          this.entry[1] = value;
		          return this;
		        }
		        return new ValueNode(ownerID, this.keyHash, [key, value]);
		      }

		      SetRef(didChangeSize);
		      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
		    };



		  // #pragma Iterators

		  ArrayMapNode.prototype.iterate =
		  HashCollisionNode.prototype.iterate = function (fn, reverse) {
		    var entries = this.entries;
		    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
		      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
		        return false;
		      }
		    }
		  }

		  BitmapIndexedNode.prototype.iterate =
		  HashArrayMapNode.prototype.iterate = function (fn, reverse) {
		    var nodes = this.nodes;
		    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
		      var node = nodes[reverse ? maxIndex - ii : ii];
		      if (node && node.iterate(fn, reverse) === false) {
		        return false;
		      }
		    }
		  }

		  ValueNode.prototype.iterate = function (fn, reverse) {
		    return fn(this.entry);
		  }

		  createClass(MapIterator, src_Iterator__Iterator);

		    function MapIterator(map, type, reverse) {
		      this._type = type;
		      this._reverse = reverse;
		      this._stack = map._root && mapIteratorFrame(map._root);
		    }

		    MapIterator.prototype.next = function() {
		      var type = this._type;
		      var stack = this._stack;
		      while (stack) {
		        var node = stack.node;
		        var index = stack.index++;
		        var maxIndex;
		        if (node.entry) {
		          if (index === 0) {
		            return mapIteratorValue(type, node.entry);
		          }
		        } else if (node.entries) {
		          maxIndex = node.entries.length - 1;
		          if (index <= maxIndex) {
		            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
		          }
		        } else {
		          maxIndex = node.nodes.length - 1;
		          if (index <= maxIndex) {
		            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
		            if (subNode) {
		              if (subNode.entry) {
		                return mapIteratorValue(type, subNode.entry);
		              }
		              stack = this._stack = mapIteratorFrame(subNode, stack);
		            }
		            continue;
		          }
		        }
		        stack = this._stack = this._stack.__prev;
		      }
		      return iteratorDone();
		    };


		  function mapIteratorValue(type, entry) {
		    return iteratorValue(type, entry[0], entry[1]);
		  }

		  function mapIteratorFrame(node, prev) {
		    return {
		      node: node,
		      index: 0,
		      __prev: prev
		    };
		  }

		  function makeMap(size, root, ownerID, hash) {
		    var map = Object.create(MapPrototype);
		    map.size = size;
		    map._root = root;
		    map.__ownerID = ownerID;
		    map.__hash = hash;
		    map.__altered = false;
		    return map;
		  }

		  var EMPTY_MAP;
		  function emptyMap() {
		    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
		  }

		  function updateMap(map, k, v) {
		    var newRoot;
		    var newSize;
		    if (!map._root) {
		      if (v === NOT_SET) {
		        return map;
		      }
		      newSize = 1;
		      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
		    } else {
		      var didChangeSize = MakeRef(CHANGE_LENGTH);
		      var didAlter = MakeRef(DID_ALTER);
		      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
		      if (!didAlter.value) {
		        return map;
		      }
		      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
		    }
		    if (map.__ownerID) {
		      map.size = newSize;
		      map._root = newRoot;
		      map.__hash = undefined;
		      map.__altered = true;
		      return map;
		    }
		    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
		  }

		  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
		    if (!node) {
		      if (value === NOT_SET) {
		        return node;
		      }
		      SetRef(didAlter);
		      SetRef(didChangeSize);
		      return new ValueNode(ownerID, keyHash, [key, value]);
		    }
		    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
		  }

		  function isLeafNode(node) {
		    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
		  }

		  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
		    if (node.keyHash === keyHash) {
		      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
		    }

		    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
		    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

		    var newNode;
		    var nodes = idx1 === idx2 ?
		      [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] :
		      ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);

		    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
		  }

		  function createNodes(ownerID, entries, key, value) {
		    if (!ownerID) {
		      ownerID = new OwnerID();
		    }
		    var node = new ValueNode(ownerID, hash(key), [key, value]);
		    for (var ii = 0; ii < entries.length; ii++) {
		      var entry = entries[ii];
		      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
		    }
		    return node;
		  }

		  function packNodes(ownerID, nodes, count, excluding) {
		    var bitmap = 0;
		    var packedII = 0;
		    var packedNodes = new Array(count);
		    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
		      var node = nodes[ii];
		      if (node !== undefined && ii !== excluding) {
		        bitmap |= bit;
		        packedNodes[packedII++] = node;
		      }
		    }
		    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
		  }

		  function expandNodes(ownerID, nodes, bitmap, including, node) {
		    var count = 0;
		    var expandedNodes = new Array(SIZE);
		    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
		      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
		    }
		    expandedNodes[including] = node;
		    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
		  }

		  function mergeIntoMapWith(map, merger, iterables) {
		    var iters = [];
		    for (var ii = 0; ii < iterables.length; ii++) {
		      var value = iterables[ii];
		      var iter = KeyedIterable(value);
		      if (!isIterable(value)) {
		        iter = iter.map(function(v ) {return fromJS(v)});
		      }
		      iters.push(iter);
		    }
		    return mergeIntoCollectionWith(map, merger, iters);
		  }

		  function deepMerger(merger) {
		    return function(existing, value, key) 
		      {return existing && existing.mergeDeepWith && isIterable(value) ?
		        existing.mergeDeepWith(merger, value) :
		        merger ? merger(existing, value, key) : value};
		  }

		  function mergeIntoCollectionWith(collection, merger, iters) {
		    iters = iters.filter(function(x ) {return x.size !== 0});
		    if (iters.length === 0) {
		      return collection;
		    }
		    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
		      return collection.constructor(iters[0]);
		    }
		    return collection.withMutations(function(collection ) {
		      var mergeIntoMap = merger ?
		        function(value, key)  {
		          collection.update(key, NOT_SET, function(existing )
		            {return existing === NOT_SET ? value : merger(existing, value, key)}
		          );
		        } :
		        function(value, key)  {
		          collection.set(key, value);
		        }
		      for (var ii = 0; ii < iters.length; ii++) {
		        iters[ii].forEach(mergeIntoMap);
		      }
		    });
		  }

		  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
		    var isNotSet = existing === NOT_SET;
		    var step = keyPathIter.next();
		    if (step.done) {
		      var existingValue = isNotSet ? notSetValue : existing;
		      var newValue = updater(existingValue);
		      return newValue === existingValue ? existing : newValue;
		    }
		    invariant(
		      isNotSet || (existing && existing.set),
		      'invalid keyPath'
		    );
		    var key = step.value;
		    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
		    var nextUpdated = updateInDeepMap(
		      nextExisting,
		      keyPathIter,
		      notSetValue,
		      updater
		    );
		    return nextUpdated === nextExisting ? existing :
		      nextUpdated === NOT_SET ? existing.remove(key) :
		      (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
		  }

		  function popCount(x) {
		    x = x - ((x >> 1) & 0x55555555);
		    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
		    x = (x + (x >> 4)) & 0x0f0f0f0f;
		    x = x + (x >> 8);
		    x = x + (x >> 16);
		    return x & 0x7f;
		  }

		  function setIn(array, idx, val, canEdit) {
		    var newArray = canEdit ? array : arrCopy(array);
		    newArray[idx] = val;
		    return newArray;
		  }

		  function spliceIn(array, idx, val, canEdit) {
		    var newLen = array.length + 1;
		    if (canEdit && idx + 1 === newLen) {
		      array[idx] = val;
		      return array;
		    }
		    var newArray = new Array(newLen);
		    var after = 0;
		    for (var ii = 0; ii < newLen; ii++) {
		      if (ii === idx) {
		        newArray[ii] = val;
		        after = -1;
		      } else {
		        newArray[ii] = array[ii + after];
		      }
		    }
		    return newArray;
		  }

		  function spliceOut(array, idx, canEdit) {
		    var newLen = array.length - 1;
		    if (canEdit && idx === newLen) {
		      array.pop();
		      return array;
		    }
		    var newArray = new Array(newLen);
		    var after = 0;
		    for (var ii = 0; ii < newLen; ii++) {
		      if (ii === idx) {
		        after = 1;
		      }
		      newArray[ii] = array[ii + after];
		    }
		    return newArray;
		  }

		  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
		  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
		  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

		  createClass(List, IndexedCollection);

		    // @pragma Construction

		    function List(value) {
		      var empty = emptyList();
		      if (value === null || value === undefined) {
		        return empty;
		      }
		      if (isList(value)) {
		        return value;
		      }
		      var iter = IndexedIterable(value);
		      var size = iter.size;
		      if (size === 0) {
		        return empty;
		      }
		      assertNotInfinite(size);
		      if (size > 0 && size < SIZE) {
		        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
		      }
		      return empty.withMutations(function(list ) {
		        list.setSize(size);
		        iter.forEach(function(v, i)  {return list.set(i, v)});
		      });
		    }

		    List.of = function(/*...values*/) {
		      return this(arguments);
		    };

		    List.prototype.toString = function() {
		      return this.__toString('List [', ']');
		    };

		    // @pragma Access

		    List.prototype.get = function(index, notSetValue) {
		      index = wrapIndex(this, index);
		      if (index >= 0 && index < this.size) {
		        index += this._origin;
		        var node = listNodeFor(this, index);
		        return node && node.array[index & MASK];
		      }
		      return notSetValue;
		    };

		    // @pragma Modification

		    List.prototype.set = function(index, value) {
		      return updateList(this, index, value);
		    };

		    List.prototype.remove = function(index) {
		      return !this.has(index) ? this :
		        index === 0 ? this.shift() :
		        index === this.size - 1 ? this.pop() :
		        this.splice(index, 1);
		    };

		    List.prototype.clear = function() {
		      if (this.size === 0) {
		        return this;
		      }
		      if (this.__ownerID) {
		        this.size = this._origin = this._capacity = 0;
		        this._level = SHIFT;
		        this._root = this._tail = null;
		        this.__hash = undefined;
		        this.__altered = true;
		        return this;
		      }
		      return emptyList();
		    };

		    List.prototype.push = function(/*...values*/) {
		      var values = arguments;
		      var oldSize = this.size;
		      return this.withMutations(function(list ) {
		        setListBounds(list, 0, oldSize + values.length);
		        for (var ii = 0; ii < values.length; ii++) {
		          list.set(oldSize + ii, values[ii]);
		        }
		      });
		    };

		    List.prototype.pop = function() {
		      return setListBounds(this, 0, -1);
		    };

		    List.prototype.unshift = function(/*...values*/) {
		      var values = arguments;
		      return this.withMutations(function(list ) {
		        setListBounds(list, -values.length);
		        for (var ii = 0; ii < values.length; ii++) {
		          list.set(ii, values[ii]);
		        }
		      });
		    };

		    List.prototype.shift = function() {
		      return setListBounds(this, 1);
		    };

		    // @pragma Composition

		    List.prototype.merge = function(/*...iters*/) {
		      return mergeIntoListWith(this, undefined, arguments);
		    };

		    List.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
		      return mergeIntoListWith(this, merger, iters);
		    };

		    List.prototype.mergeDeep = function(/*...iters*/) {
		      return mergeIntoListWith(this, deepMerger(undefined), arguments);
		    };

		    List.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
		      return mergeIntoListWith(this, deepMerger(merger), iters);
		    };

		    List.prototype.setSize = function(size) {
		      return setListBounds(this, 0, size);
		    };

		    // @pragma Iteration

		    List.prototype.slice = function(begin, end) {
		      var size = this.size;
		      if (wholeSlice(begin, end, size)) {
		        return this;
		      }
		      return setListBounds(
		        this,
		        resolveBegin(begin, size),
		        resolveEnd(end, size)
		      );
		    };

		    List.prototype.__iterator = function(type, reverse) {
		      var index = 0;
		      var values = iterateList(this, reverse);
		      return new src_Iterator__Iterator(function()  {
		        var value = values();
		        return value === DONE ?
		          iteratorDone() :
		          iteratorValue(type, index++, value);
		      });
		    };

		    List.prototype.__iterate = function(fn, reverse) {
		      var index = 0;
		      var values = iterateList(this, reverse);
		      var value;
		      while ((value = values()) !== DONE) {
		        if (fn(value, index++, this) === false) {
		          break;
		        }
		      }
		      return index;
		    };

		    List.prototype.__ensureOwner = function(ownerID) {
		      if (ownerID === this.__ownerID) {
		        return this;
		      }
		      if (!ownerID) {
		        this.__ownerID = ownerID;
		        return this;
		      }
		      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
		    };


		  function isList(maybeList) {
		    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
		  }

		  List.isList = isList;

		  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

		  var ListPrototype = List.prototype;
		  ListPrototype[IS_LIST_SENTINEL] = true;
		  ListPrototype[DELETE] = ListPrototype.remove;
		  ListPrototype.setIn = MapPrototype.setIn;
		  ListPrototype.deleteIn =
		  ListPrototype.removeIn = MapPrototype.removeIn;
		  ListPrototype.update = MapPrototype.update;
		  ListPrototype.updateIn = MapPrototype.updateIn;
		  ListPrototype.mergeIn = MapPrototype.mergeIn;
		  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
		  ListPrototype.withMutations = MapPrototype.withMutations;
		  ListPrototype.asMutable = MapPrototype.asMutable;
		  ListPrototype.asImmutable = MapPrototype.asImmutable;
		  ListPrototype.wasAltered = MapPrototype.wasAltered;



		    function VNode(array, ownerID) {
		      this.array = array;
		      this.ownerID = ownerID;
		    }

		    // TODO: seems like these methods are very similar

		    VNode.prototype.removeBefore = function(ownerID, level, index) {
		      if (index === level ? 1 << level : 0 || this.array.length === 0) {
		        return this;
		      }
		      var originIndex = (index >>> level) & MASK;
		      if (originIndex >= this.array.length) {
		        return new VNode([], ownerID);
		      }
		      var removingFirst = originIndex === 0;
		      var newChild;
		      if (level > 0) {
		        var oldChild = this.array[originIndex];
		        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
		        if (newChild === oldChild && removingFirst) {
		          return this;
		        }
		      }
		      if (removingFirst && !newChild) {
		        return this;
		      }
		      var editable = editableVNode(this, ownerID);
		      if (!removingFirst) {
		        for (var ii = 0; ii < originIndex; ii++) {
		          editable.array[ii] = undefined;
		        }
		      }
		      if (newChild) {
		        editable.array[originIndex] = newChild;
		      }
		      return editable;
		    };

		    VNode.prototype.removeAfter = function(ownerID, level, index) {
		      if (index === (level ? 1 << level : 0) || this.array.length === 0) {
		        return this;
		      }
		      var sizeIndex = ((index - 1) >>> level) & MASK;
		      if (sizeIndex >= this.array.length) {
		        return this;
		      }

		      var newChild;
		      if (level > 0) {
		        var oldChild = this.array[sizeIndex];
		        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
		        if (newChild === oldChild && sizeIndex === this.array.length - 1) {
		          return this;
		        }
		      }

		      var editable = editableVNode(this, ownerID);
		      editable.array.splice(sizeIndex + 1);
		      if (newChild) {
		        editable.array[sizeIndex] = newChild;
		      }
		      return editable;
		    };



		  var DONE = {};

		  function iterateList(list, reverse) {
		    var left = list._origin;
		    var right = list._capacity;
		    var tailPos = getTailOffset(right);
		    var tail = list._tail;

		    return iterateNodeOrLeaf(list._root, list._level, 0);

		    function iterateNodeOrLeaf(node, level, offset) {
		      return level === 0 ?
		        iterateLeaf(node, offset) :
		        iterateNode(node, level, offset);
		    }

		    function iterateLeaf(node, offset) {
		      var array = offset === tailPos ? tail && tail.array : node && node.array;
		      var from = offset > left ? 0 : left - offset;
		      var to = right - offset;
		      if (to > SIZE) {
		        to = SIZE;
		      }
		      return function()  {
		        if (from === to) {
		          return DONE;
		        }
		        var idx = reverse ? --to : from++;
		        return array && array[idx];
		      };
		    }

		    function iterateNode(node, level, offset) {
		      var values;
		      var array = node && node.array;
		      var from = offset > left ? 0 : (left - offset) >> level;
		      var to = ((right - offset) >> level) + 1;
		      if (to > SIZE) {
		        to = SIZE;
		      }
		      return function()  {
		        do {
		          if (values) {
		            var value = values();
		            if (value !== DONE) {
		              return value;
		            }
		            values = null;
		          }
		          if (from === to) {
		            return DONE;
		          }
		          var idx = reverse ? --to : from++;
		          values = iterateNodeOrLeaf(
		            array && array[idx], level - SHIFT, offset + (idx << level)
		          );
		        } while (true);
		      };
		    }
		  }

		  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
		    var list = Object.create(ListPrototype);
		    list.size = capacity - origin;
		    list._origin = origin;
		    list._capacity = capacity;
		    list._level = level;
		    list._root = root;
		    list._tail = tail;
		    list.__ownerID = ownerID;
		    list.__hash = hash;
		    list.__altered = false;
		    return list;
		  }

		  var EMPTY_LIST;
		  function emptyList() {
		    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
		  }

		  function updateList(list, index, value) {
		    index = wrapIndex(list, index);

		    if (index !== index) {
		      return list;
		    }

		    if (index >= list.size || index < 0) {
		      return list.withMutations(function(list ) {
		        index < 0 ?
		          setListBounds(list, index).set(0, value) :
		          setListBounds(list, 0, index + 1).set(index, value)
		      });
		    }

		    index += list._origin;

		    var newTail = list._tail;
		    var newRoot = list._root;
		    var didAlter = MakeRef(DID_ALTER);
		    if (index >= getTailOffset(list._capacity)) {
		      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
		    } else {
		      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
		    }

		    if (!didAlter.value) {
		      return list;
		    }

		    if (list.__ownerID) {
		      list._root = newRoot;
		      list._tail = newTail;
		      list.__hash = undefined;
		      list.__altered = true;
		      return list;
		    }
		    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
		  }

		  function updateVNode(node, ownerID, level, index, value, didAlter) {
		    var idx = (index >>> level) & MASK;
		    var nodeHas = node && idx < node.array.length;
		    if (!nodeHas && value === undefined) {
		      return node;
		    }

		    var newNode;

		    if (level > 0) {
		      var lowerNode = node && node.array[idx];
		      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
		      if (newLowerNode === lowerNode) {
		        return node;
		      }
		      newNode = editableVNode(node, ownerID);
		      newNode.array[idx] = newLowerNode;
		      return newNode;
		    }

		    if (nodeHas && node.array[idx] === value) {
		      return node;
		    }

		    SetRef(didAlter);

		    newNode = editableVNode(node, ownerID);
		    if (value === undefined && idx === newNode.array.length - 1) {
		      newNode.array.pop();
		    } else {
		      newNode.array[idx] = value;
		    }
		    return newNode;
		  }

		  function editableVNode(node, ownerID) {
		    if (ownerID && node && ownerID === node.ownerID) {
		      return node;
		    }
		    return new VNode(node ? node.array.slice() : [], ownerID);
		  }

		  function listNodeFor(list, rawIndex) {
		    if (rawIndex >= getTailOffset(list._capacity)) {
		      return list._tail;
		    }
		    if (rawIndex < 1 << (list._level + SHIFT)) {
		      var node = list._root;
		      var level = list._level;
		      while (node && level > 0) {
		        node = node.array[(rawIndex >>> level) & MASK];
		        level -= SHIFT;
		      }
		      return node;
		    }
		  }

		  function setListBounds(list, begin, end) {
		    // Sanitize begin & end using this shorthand for ToInt32(argument)
		    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
		    if (begin !== undefined) {
		      begin = begin | 0;
		    }
		    if (end !== undefined) {
		      end = end | 0;
		    }
		    var owner = list.__ownerID || new OwnerID();
		    var oldOrigin = list._origin;
		    var oldCapacity = list._capacity;
		    var newOrigin = oldOrigin + begin;
		    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
		    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
		      return list;
		    }

		    // If it's going to end after it starts, it's empty.
		    if (newOrigin >= newCapacity) {
		      return list.clear();
		    }

		    var newLevel = list._level;
		    var newRoot = list._root;

		    // New origin might need creating a higher root.
		    var offsetShift = 0;
		    while (newOrigin + offsetShift < 0) {
		      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
		      newLevel += SHIFT;
		      offsetShift += 1 << newLevel;
		    }
		    if (offsetShift) {
		      newOrigin += offsetShift;
		      oldOrigin += offsetShift;
		      newCapacity += offsetShift;
		      oldCapacity += offsetShift;
		    }

		    var oldTailOffset = getTailOffset(oldCapacity);
		    var newTailOffset = getTailOffset(newCapacity);

		    // New size might need creating a higher root.
		    while (newTailOffset >= 1 << (newLevel + SHIFT)) {
		      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
		      newLevel += SHIFT;
		    }

		    // Locate or create the new tail.
		    var oldTail = list._tail;
		    var newTail = newTailOffset < oldTailOffset ?
		      listNodeFor(list, newCapacity - 1) :
		      newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

		    // Merge Tail into tree.
		    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
		      newRoot = editableVNode(newRoot, owner);
		      var node = newRoot;
		      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
		        var idx = (oldTailOffset >>> level) & MASK;
		        node = node.array[idx] = editableVNode(node.array[idx], owner);
		      }
		      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
		    }

		    // If the size has been reduced, there's a chance the tail needs to be trimmed.
		    if (newCapacity < oldCapacity) {
		      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
		    }

		    // If the new origin is within the tail, then we do not need a root.
		    if (newOrigin >= newTailOffset) {
		      newOrigin -= newTailOffset;
		      newCapacity -= newTailOffset;
		      newLevel = SHIFT;
		      newRoot = null;
		      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

		    // Otherwise, if the root has been trimmed, garbage collect.
		    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
		      offsetShift = 0;

		      // Identify the new top root node of the subtree of the old root.
		      while (newRoot) {
		        var beginIndex = (newOrigin >>> newLevel) & MASK;
		        if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {
		          break;
		        }
		        if (beginIndex) {
		          offsetShift += (1 << newLevel) * beginIndex;
		        }
		        newLevel -= SHIFT;
		        newRoot = newRoot.array[beginIndex];
		      }

		      // Trim the new sides of the new root.
		      if (newRoot && newOrigin > oldOrigin) {
		        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
		      }
		      if (newRoot && newTailOffset < oldTailOffset) {
		        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
		      }
		      if (offsetShift) {
		        newOrigin -= offsetShift;
		        newCapacity -= offsetShift;
		      }
		    }

		    if (list.__ownerID) {
		      list.size = newCapacity - newOrigin;
		      list._origin = newOrigin;
		      list._capacity = newCapacity;
		      list._level = newLevel;
		      list._root = newRoot;
		      list._tail = newTail;
		      list.__hash = undefined;
		      list.__altered = true;
		      return list;
		    }
		    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
		  }

		  function mergeIntoListWith(list, merger, iterables) {
		    var iters = [];
		    var maxSize = 0;
		    for (var ii = 0; ii < iterables.length; ii++) {
		      var value = iterables[ii];
		      var iter = IndexedIterable(value);
		      if (iter.size > maxSize) {
		        maxSize = iter.size;
		      }
		      if (!isIterable(value)) {
		        iter = iter.map(function(v ) {return fromJS(v)});
		      }
		      iters.push(iter);
		    }
		    if (maxSize > list.size) {
		      list = list.setSize(maxSize);
		    }
		    return mergeIntoCollectionWith(list, merger, iters);
		  }

		  function getTailOffset(size) {
		    return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);
		  }

		  createClass(OrderedMap, src_Map__Map);

		    // @pragma Construction

		    function OrderedMap(value) {
		      return value === null || value === undefined ? emptyOrderedMap() :
		        isOrderedMap(value) ? value :
		        emptyOrderedMap().withMutations(function(map ) {
		          var iter = KeyedIterable(value);
		          assertNotInfinite(iter.size);
		          iter.forEach(function(v, k)  {return map.set(k, v)});
		        });
		    }

		    OrderedMap.of = function(/*...values*/) {
		      return this(arguments);
		    };

		    OrderedMap.prototype.toString = function() {
		      return this.__toString('OrderedMap {', '}');
		    };

		    // @pragma Access

		    OrderedMap.prototype.get = function(k, notSetValue) {
		      var index = this._map.get(k);
		      return index !== undefined ? this._list.get(index)[1] : notSetValue;
		    };

		    // @pragma Modification

		    OrderedMap.prototype.clear = function() {
		      if (this.size === 0) {
		        return this;
		      }
		      if (this.__ownerID) {
		        this.size = 0;
		        this._map.clear();
		        this._list.clear();
		        return this;
		      }
		      return emptyOrderedMap();
		    };

		    OrderedMap.prototype.set = function(k, v) {
		      return updateOrderedMap(this, k, v);
		    };

		    OrderedMap.prototype.remove = function(k) {
		      return updateOrderedMap(this, k, NOT_SET);
		    };

		    OrderedMap.prototype.wasAltered = function() {
		      return this._map.wasAltered() || this._list.wasAltered();
		    };

		    OrderedMap.prototype.__iterate = function(fn, reverse) {var this$0 = this;
		      return this._list.__iterate(
		        function(entry ) {return entry && fn(entry[1], entry[0], this$0)},
		        reverse
		      );
		    };

		    OrderedMap.prototype.__iterator = function(type, reverse) {
		      return this._list.fromEntrySeq().__iterator(type, reverse);
		    };

		    OrderedMap.prototype.__ensureOwner = function(ownerID) {
		      if (ownerID === this.__ownerID) {
		        return this;
		      }
		      var newMap = this._map.__ensureOwner(ownerID);
		      var newList = this._list.__ensureOwner(ownerID);
		      if (!ownerID) {
		        this.__ownerID = ownerID;
		        this._map = newMap;
		        this._list = newList;
		        return this;
		      }
		      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
		    };


		  function isOrderedMap(maybeOrderedMap) {
		    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
		  }

		  OrderedMap.isOrderedMap = isOrderedMap;

		  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
		  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;



		  function makeOrderedMap(map, list, ownerID, hash) {
		    var omap = Object.create(OrderedMap.prototype);
		    omap.size = map ? map.size : 0;
		    omap._map = map;
		    omap._list = list;
		    omap.__ownerID = ownerID;
		    omap.__hash = hash;
		    return omap;
		  }

		  var EMPTY_ORDERED_MAP;
		  function emptyOrderedMap() {
		    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
		  }

		  function updateOrderedMap(omap, k, v) {
		    var map = omap._map;
		    var list = omap._list;
		    var i = map.get(k);
		    var has = i !== undefined;
		    var newMap;
		    var newList;
		    if (v === NOT_SET) { // removed
		      if (!has) {
		        return omap;
		      }
		      if (list.size >= SIZE && list.size >= map.size * 2) {
		        newList = list.filter(function(entry, idx)  {return entry !== undefined && i !== idx});
		        newMap = newList.toKeyedSeq().map(function(entry ) {return entry[0]}).flip().toMap();
		        if (omap.__ownerID) {
		          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
		        }
		      } else {
		        newMap = map.remove(k);
		        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
		      }
		    } else {
		      if (has) {
		        if (v === list.get(i)[1]) {
		          return omap;
		        }
		        newMap = map;
		        newList = list.set(i, [k, v]);
		      } else {
		        newMap = map.set(k, list.size);
		        newList = list.set(list.size, [k, v]);
		      }
		    }
		    if (omap.__ownerID) {
		      omap.size = newMap.size;
		      omap._map = newMap;
		      omap._list = newList;
		      omap.__hash = undefined;
		      return omap;
		    }
		    return makeOrderedMap(newMap, newList);
		  }

		  createClass(Stack, IndexedCollection);

		    // @pragma Construction

		    function Stack(value) {
		      return value === null || value === undefined ? emptyStack() :
		        isStack(value) ? value :
		        emptyStack().unshiftAll(value);
		    }

		    Stack.of = function(/*...values*/) {
		      return this(arguments);
		    };

		    Stack.prototype.toString = function() {
		      return this.__toString('Stack [', ']');
		    };

		    // @pragma Access

		    Stack.prototype.get = function(index, notSetValue) {
		      var head = this._head;
		      index = wrapIndex(this, index);
		      while (head && index--) {
		        head = head.next;
		      }
		      return head ? head.value : notSetValue;
		    };

		    Stack.prototype.peek = function() {
		      return this._head && this._head.value;
		    };

		    // @pragma Modification

		    Stack.prototype.push = function(/*...values*/) {
		      if (arguments.length === 0) {
		        return this;
		      }
		      var newSize = this.size + arguments.length;
		      var head = this._head;
		      for (var ii = arguments.length - 1; ii >= 0; ii--) {
		        head = {
		          value: arguments[ii],
		          next: head
		        };
		      }
		      if (this.__ownerID) {
		        this.size = newSize;
		        this._head = head;
		        this.__hash = undefined;
		        this.__altered = true;
		        return this;
		      }
		      return makeStack(newSize, head);
		    };

		    Stack.prototype.pushAll = function(iter) {
		      iter = IndexedIterable(iter);
		      if (iter.size === 0) {
		        return this;
		      }
		      assertNotInfinite(iter.size);
		      var newSize = this.size;
		      var head = this._head;
		      iter.reverse().forEach(function(value ) {
		        newSize++;
		        head = {
		          value: value,
		          next: head
		        };
		      });
		      if (this.__ownerID) {
		        this.size = newSize;
		        this._head = head;
		        this.__hash = undefined;
		        this.__altered = true;
		        return this;
		      }
		      return makeStack(newSize, head);
		    };

		    Stack.prototype.pop = function() {
		      return this.slice(1);
		    };

		    Stack.prototype.unshift = function(/*...values*/) {
		      return this.push.apply(this, arguments);
		    };

		    Stack.prototype.unshiftAll = function(iter) {
		      return this.pushAll(iter);
		    };

		    Stack.prototype.shift = function() {
		      return this.pop.apply(this, arguments);
		    };

		    Stack.prototype.clear = function() {
		      if (this.size === 0) {
		        return this;
		      }
		      if (this.__ownerID) {
		        this.size = 0;
		        this._head = undefined;
		        this.__hash = undefined;
		        this.__altered = true;
		        return this;
		      }
		      return emptyStack();
		    };

		    Stack.prototype.slice = function(begin, end) {
		      if (wholeSlice(begin, end, this.size)) {
		        return this;
		      }
		      var resolvedBegin = resolveBegin(begin, this.size);
		      var resolvedEnd = resolveEnd(end, this.size);
		      if (resolvedEnd !== this.size) {
		        // super.slice(begin, end);
		        return IndexedCollection.prototype.slice.call(this, begin, end);
		      }
		      var newSize = this.size - resolvedBegin;
		      var head = this._head;
		      while (resolvedBegin--) {
		        head = head.next;
		      }
		      if (this.__ownerID) {
		        this.size = newSize;
		        this._head = head;
		        this.__hash = undefined;
		        this.__altered = true;
		        return this;
		      }
		      return makeStack(newSize, head);
		    };

		    // @pragma Mutability

		    Stack.prototype.__ensureOwner = function(ownerID) {
		      if (ownerID === this.__ownerID) {
		        return this;
		      }
		      if (!ownerID) {
		        this.__ownerID = ownerID;
		        this.__altered = false;
		        return this;
		      }
		      return makeStack(this.size, this._head, ownerID, this.__hash);
		    };

		    // @pragma Iteration

		    Stack.prototype.__iterate = function(fn, reverse) {
		      if (reverse) {
		        return this.reverse().__iterate(fn);
		      }
		      var iterations = 0;
		      var node = this._head;
		      while (node) {
		        if (fn(node.value, iterations++, this) === false) {
		          break;
		        }
		        node = node.next;
		      }
		      return iterations;
		    };

		    Stack.prototype.__iterator = function(type, reverse) {
		      if (reverse) {
		        return this.reverse().__iterator(type);
		      }
		      var iterations = 0;
		      var node = this._head;
		      return new src_Iterator__Iterator(function()  {
		        if (node) {
		          var value = node.value;
		          node = node.next;
		          return iteratorValue(type, iterations++, value);
		        }
		        return iteratorDone();
		      });
		    };


		  function isStack(maybeStack) {
		    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
		  }

		  Stack.isStack = isStack;

		  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

		  var StackPrototype = Stack.prototype;
		  StackPrototype[IS_STACK_SENTINEL] = true;
		  StackPrototype.withMutations = MapPrototype.withMutations;
		  StackPrototype.asMutable = MapPrototype.asMutable;
		  StackPrototype.asImmutable = MapPrototype.asImmutable;
		  StackPrototype.wasAltered = MapPrototype.wasAltered;


		  function makeStack(size, head, ownerID, hash) {
		    var map = Object.create(StackPrototype);
		    map.size = size;
		    map._head = head;
		    map.__ownerID = ownerID;
		    map.__hash = hash;
		    map.__altered = false;
		    return map;
		  }

		  var EMPTY_STACK;
		  function emptyStack() {
		    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
		  }

		  createClass(src_Set__Set, SetCollection);

		    // @pragma Construction

		    function src_Set__Set(value) {
		      return value === null || value === undefined ? emptySet() :
		        isSet(value) && !isOrdered(value) ? value :
		        emptySet().withMutations(function(set ) {
		          var iter = SetIterable(value);
		          assertNotInfinite(iter.size);
		          iter.forEach(function(v ) {return set.add(v)});
		        });
		    }

		    src_Set__Set.of = function(/*...values*/) {
		      return this(arguments);
		    };

		    src_Set__Set.fromKeys = function(value) {
		      return this(KeyedIterable(value).keySeq());
		    };

		    src_Set__Set.prototype.toString = function() {
		      return this.__toString('Set {', '}');
		    };

		    // @pragma Access

		    src_Set__Set.prototype.has = function(value) {
		      return this._map.has(value);
		    };

		    // @pragma Modification

		    src_Set__Set.prototype.add = function(value) {
		      return updateSet(this, this._map.set(value, true));
		    };

		    src_Set__Set.prototype.remove = function(value) {
		      return updateSet(this, this._map.remove(value));
		    };

		    src_Set__Set.prototype.clear = function() {
		      return updateSet(this, this._map.clear());
		    };

		    // @pragma Composition

		    src_Set__Set.prototype.union = function() {var iters = SLICE$0.call(arguments, 0);
		      iters = iters.filter(function(x ) {return x.size !== 0});
		      if (iters.length === 0) {
		        return this;
		      }
		      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
		        return this.constructor(iters[0]);
		      }
		      return this.withMutations(function(set ) {
		        for (var ii = 0; ii < iters.length; ii++) {
		          SetIterable(iters[ii]).forEach(function(value ) {return set.add(value)});
		        }
		      });
		    };

		    src_Set__Set.prototype.intersect = function() {var iters = SLICE$0.call(arguments, 0);
		      if (iters.length === 0) {
		        return this;
		      }
		      iters = iters.map(function(iter ) {return SetIterable(iter)});
		      var originalSet = this;
		      return this.withMutations(function(set ) {
		        originalSet.forEach(function(value ) {
		          if (!iters.every(function(iter ) {return iter.includes(value)})) {
		            set.remove(value);
		          }
		        });
		      });
		    };

		    src_Set__Set.prototype.subtract = function() {var iters = SLICE$0.call(arguments, 0);
		      if (iters.length === 0) {
		        return this;
		      }
		      iters = iters.map(function(iter ) {return SetIterable(iter)});
		      var originalSet = this;
		      return this.withMutations(function(set ) {
		        originalSet.forEach(function(value ) {
		          if (iters.some(function(iter ) {return iter.includes(value)})) {
		            set.remove(value);
		          }
		        });
		      });
		    };

		    src_Set__Set.prototype.merge = function() {
		      return this.union.apply(this, arguments);
		    };

		    src_Set__Set.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
		      return this.union.apply(this, iters);
		    };

		    src_Set__Set.prototype.sort = function(comparator) {
		      // Late binding
		      return OrderedSet(sortFactory(this, comparator));
		    };

		    src_Set__Set.prototype.sortBy = function(mapper, comparator) {
		      // Late binding
		      return OrderedSet(sortFactory(this, comparator, mapper));
		    };

		    src_Set__Set.prototype.wasAltered = function() {
		      return this._map.wasAltered();
		    };

		    src_Set__Set.prototype.__iterate = function(fn, reverse) {var this$0 = this;
		      return this._map.__iterate(function(_, k)  {return fn(k, k, this$0)}, reverse);
		    };

		    src_Set__Set.prototype.__iterator = function(type, reverse) {
		      return this._map.map(function(_, k)  {return k}).__iterator(type, reverse);
		    };

		    src_Set__Set.prototype.__ensureOwner = function(ownerID) {
		      if (ownerID === this.__ownerID) {
		        return this;
		      }
		      var newMap = this._map.__ensureOwner(ownerID);
		      if (!ownerID) {
		        this.__ownerID = ownerID;
		        this._map = newMap;
		        return this;
		      }
		      return this.__make(newMap, ownerID);
		    };


		  function isSet(maybeSet) {
		    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
		  }

		  src_Set__Set.isSet = isSet;

		  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

		  var SetPrototype = src_Set__Set.prototype;
		  SetPrototype[IS_SET_SENTINEL] = true;
		  SetPrototype[DELETE] = SetPrototype.remove;
		  SetPrototype.mergeDeep = SetPrototype.merge;
		  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
		  SetPrototype.withMutations = MapPrototype.withMutations;
		  SetPrototype.asMutable = MapPrototype.asMutable;
		  SetPrototype.asImmutable = MapPrototype.asImmutable;

		  SetPrototype.__empty = emptySet;
		  SetPrototype.__make = makeSet;

		  function updateSet(set, newMap) {
		    if (set.__ownerID) {
		      set.size = newMap.size;
		      set._map = newMap;
		      return set;
		    }
		    return newMap === set._map ? set :
		      newMap.size === 0 ? set.__empty() :
		      set.__make(newMap);
		  }

		  function makeSet(map, ownerID) {
		    var set = Object.create(SetPrototype);
		    set.size = map ? map.size : 0;
		    set._map = map;
		    set.__ownerID = ownerID;
		    return set;
		  }

		  var EMPTY_SET;
		  function emptySet() {
		    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
		  }

		  createClass(OrderedSet, src_Set__Set);

		    // @pragma Construction

		    function OrderedSet(value) {
		      return value === null || value === undefined ? emptyOrderedSet() :
		        isOrderedSet(value) ? value :
		        emptyOrderedSet().withMutations(function(set ) {
		          var iter = SetIterable(value);
		          assertNotInfinite(iter.size);
		          iter.forEach(function(v ) {return set.add(v)});
		        });
		    }

		    OrderedSet.of = function(/*...values*/) {
		      return this(arguments);
		    };

		    OrderedSet.fromKeys = function(value) {
		      return this(KeyedIterable(value).keySeq());
		    };

		    OrderedSet.prototype.toString = function() {
		      return this.__toString('OrderedSet {', '}');
		    };


		  function isOrderedSet(maybeOrderedSet) {
		    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
		  }

		  OrderedSet.isOrderedSet = isOrderedSet;

		  var OrderedSetPrototype = OrderedSet.prototype;
		  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

		  OrderedSetPrototype.__empty = emptyOrderedSet;
		  OrderedSetPrototype.__make = makeOrderedSet;

		  function makeOrderedSet(map, ownerID) {
		    var set = Object.create(OrderedSetPrototype);
		    set.size = map ? map.size : 0;
		    set._map = map;
		    set.__ownerID = ownerID;
		    return set;
		  }

		  var EMPTY_ORDERED_SET;
		  function emptyOrderedSet() {
		    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
		  }

		  createClass(Record, KeyedCollection);

		    function Record(defaultValues, name) {
		      var hasInitialized;

		      var RecordType = function Record(values) {
		        if (values instanceof RecordType) {
		          return values;
		        }
		        if (!(this instanceof RecordType)) {
		          return new RecordType(values);
		        }
		        if (!hasInitialized) {
		          hasInitialized = true;
		          var keys = Object.keys(defaultValues);
		          setProps(RecordTypePrototype, keys);
		          RecordTypePrototype.size = keys.length;
		          RecordTypePrototype._name = name;
		          RecordTypePrototype._keys = keys;
		          RecordTypePrototype._defaultValues = defaultValues;
		        }
		        this._map = src_Map__Map(values);
		      };

		      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
		      RecordTypePrototype.constructor = RecordType;

		      return RecordType;
		    }

		    Record.prototype.toString = function() {
		      return this.__toString(recordName(this) + ' {', '}');
		    };

		    // @pragma Access

		    Record.prototype.has = function(k) {
		      return this._defaultValues.hasOwnProperty(k);
		    };

		    Record.prototype.get = function(k, notSetValue) {
		      if (!this.has(k)) {
		        return notSetValue;
		      }
		      var defaultVal = this._defaultValues[k];
		      return this._map ? this._map.get(k, defaultVal) : defaultVal;
		    };

		    // @pragma Modification

		    Record.prototype.clear = function() {
		      if (this.__ownerID) {
		        this._map && this._map.clear();
		        return this;
		      }
		      var RecordType = this.constructor;
		      return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
		    };

		    Record.prototype.set = function(k, v) {
		      if (!this.has(k)) {
		        throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
		      }
		      var newMap = this._map && this._map.set(k, v);
		      if (this.__ownerID || newMap === this._map) {
		        return this;
		      }
		      return makeRecord(this, newMap);
		    };

		    Record.prototype.remove = function(k) {
		      if (!this.has(k)) {
		        return this;
		      }
		      var newMap = this._map && this._map.remove(k);
		      if (this.__ownerID || newMap === this._map) {
		        return this;
		      }
		      return makeRecord(this, newMap);
		    };

		    Record.prototype.wasAltered = function() {
		      return this._map.wasAltered();
		    };

		    Record.prototype.__iterator = function(type, reverse) {var this$0 = this;
		      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterator(type, reverse);
		    };

		    Record.prototype.__iterate = function(fn, reverse) {var this$0 = this;
		      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterate(fn, reverse);
		    };

		    Record.prototype.__ensureOwner = function(ownerID) {
		      if (ownerID === this.__ownerID) {
		        return this;
		      }
		      var newMap = this._map && this._map.__ensureOwner(ownerID);
		      if (!ownerID) {
		        this.__ownerID = ownerID;
		        this._map = newMap;
		        return this;
		      }
		      return makeRecord(this, newMap, ownerID);
		    };


		  var RecordPrototype = Record.prototype;
		  RecordPrototype[DELETE] = RecordPrototype.remove;
		  RecordPrototype.deleteIn =
		  RecordPrototype.removeIn = MapPrototype.removeIn;
		  RecordPrototype.merge = MapPrototype.merge;
		  RecordPrototype.mergeWith = MapPrototype.mergeWith;
		  RecordPrototype.mergeIn = MapPrototype.mergeIn;
		  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
		  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
		  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
		  RecordPrototype.setIn = MapPrototype.setIn;
		  RecordPrototype.update = MapPrototype.update;
		  RecordPrototype.updateIn = MapPrototype.updateIn;
		  RecordPrototype.withMutations = MapPrototype.withMutations;
		  RecordPrototype.asMutable = MapPrototype.asMutable;
		  RecordPrototype.asImmutable = MapPrototype.asImmutable;


		  function makeRecord(likeRecord, map, ownerID) {
		    var record = Object.create(Object.getPrototypeOf(likeRecord));
		    record._map = map;
		    record.__ownerID = ownerID;
		    return record;
		  }

		  function recordName(record) {
		    return record._name || record.constructor.name || 'Record';
		  }

		  function setProps(prototype, names) {
		    try {
		      names.forEach(setProp.bind(undefined, prototype));
		    } catch (error) {
		      // Object.defineProperty failed. Probably IE8.
		    }
		  }

		  function setProp(prototype, name) {
		    Object.defineProperty(prototype, name, {
		      get: function() {
		        return this.get(name);
		      },
		      set: function(value) {
		        invariant(this.__ownerID, 'Cannot set on an immutable record.');
		        this.set(name, value);
		      }
		    });
		  }

		  function deepEqual(a, b) {
		    if (a === b) {
		      return true;
		    }

		    if (
		      !isIterable(b) ||
		      a.size !== undefined && b.size !== undefined && a.size !== b.size ||
		      a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash ||
		      isKeyed(a) !== isKeyed(b) ||
		      isIndexed(a) !== isIndexed(b) ||
		      isOrdered(a) !== isOrdered(b)
		    ) {
		      return false;
		    }

		    if (a.size === 0 && b.size === 0) {
		      return true;
		    }

		    var notAssociative = !isAssociative(a);

		    if (isOrdered(a)) {
		      var entries = a.entries();
		      return b.every(function(v, k)  {
		        var entry = entries.next().value;
		        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
		      }) && entries.next().done;
		    }

		    var flipped = false;

		    if (a.size === undefined) {
		      if (b.size === undefined) {
		        if (typeof a.cacheResult === 'function') {
		          a.cacheResult();
		        }
		      } else {
		        flipped = true;
		        var _ = a;
		        a = b;
		        b = _;
		      }
		    }

		    var allEqual = true;
		    var bSize = b.__iterate(function(v, k)  {
		      if (notAssociative ? !a.has(v) :
		          flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
		        allEqual = false;
		        return false;
		      }
		    });

		    return allEqual && a.size === bSize;
		  }

		  createClass(Range, IndexedSeq);

		    function Range(start, end, step) {
		      if (!(this instanceof Range)) {
		        return new Range(start, end, step);
		      }
		      invariant(step !== 0, 'Cannot step a Range by 0');
		      start = start || 0;
		      if (end === undefined) {
		        end = Infinity;
		      }
		      step = step === undefined ? 1 : Math.abs(step);
		      if (end < start) {
		        step = -step;
		      }
		      this._start = start;
		      this._end = end;
		      this._step = step;
		      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
		      if (this.size === 0) {
		        if (EMPTY_RANGE) {
		          return EMPTY_RANGE;
		        }
		        EMPTY_RANGE = this;
		      }
		    }

		    Range.prototype.toString = function() {
		      if (this.size === 0) {
		        return 'Range []';
		      }
		      return 'Range [ ' +
		        this._start + '...' + this._end +
		        (this._step > 1 ? ' by ' + this._step : '') +
		      ' ]';
		    };

		    Range.prototype.get = function(index, notSetValue) {
		      return this.has(index) ?
		        this._start + wrapIndex(this, index) * this._step :
		        notSetValue;
		    };

		    Range.prototype.includes = function(searchValue) {
		      var possibleIndex = (searchValue - this._start) / this._step;
		      return possibleIndex >= 0 &&
		        possibleIndex < this.size &&
		        possibleIndex === Math.floor(possibleIndex);
		    };

		    Range.prototype.slice = function(begin, end) {
		      if (wholeSlice(begin, end, this.size)) {
		        return this;
		      }
		      begin = resolveBegin(begin, this.size);
		      end = resolveEnd(end, this.size);
		      if (end <= begin) {
		        return new Range(0, 0);
		      }
		      return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
		    };

		    Range.prototype.indexOf = function(searchValue) {
		      var offsetValue = searchValue - this._start;
		      if (offsetValue % this._step === 0) {
		        var index = offsetValue / this._step;
		        if (index >= 0 && index < this.size) {
		          return index
		        }
		      }
		      return -1;
		    };

		    Range.prototype.lastIndexOf = function(searchValue) {
		      return this.indexOf(searchValue);
		    };

		    Range.prototype.__iterate = function(fn, reverse) {
		      var maxIndex = this.size - 1;
		      var step = this._step;
		      var value = reverse ? this._start + maxIndex * step : this._start;
		      for (var ii = 0; ii <= maxIndex; ii++) {
		        if (fn(value, ii, this) === false) {
		          return ii + 1;
		        }
		        value += reverse ? -step : step;
		      }
		      return ii;
		    };

		    Range.prototype.__iterator = function(type, reverse) {
		      var maxIndex = this.size - 1;
		      var step = this._step;
		      var value = reverse ? this._start + maxIndex * step : this._start;
		      var ii = 0;
		      return new src_Iterator__Iterator(function()  {
		        var v = value;
		        value += reverse ? -step : step;
		        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
		      });
		    };

		    Range.prototype.equals = function(other) {
		      return other instanceof Range ?
		        this._start === other._start &&
		        this._end === other._end &&
		        this._step === other._step :
		        deepEqual(this, other);
		    };


		  var EMPTY_RANGE;

		  createClass(Repeat, IndexedSeq);

		    function Repeat(value, times) {
		      if (!(this instanceof Repeat)) {
		        return new Repeat(value, times);
		      }
		      this._value = value;
		      this.size = times === undefined ? Infinity : Math.max(0, times);
		      if (this.size === 0) {
		        if (EMPTY_REPEAT) {
		          return EMPTY_REPEAT;
		        }
		        EMPTY_REPEAT = this;
		      }
		    }

		    Repeat.prototype.toString = function() {
		      if (this.size === 0) {
		        return 'Repeat []';
		      }
		      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
		    };

		    Repeat.prototype.get = function(index, notSetValue) {
		      return this.has(index) ? this._value : notSetValue;
		    };

		    Repeat.prototype.includes = function(searchValue) {
		      return is(this._value, searchValue);
		    };

		    Repeat.prototype.slice = function(begin, end) {
		      var size = this.size;
		      return wholeSlice(begin, end, size) ? this :
		        new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
		    };

		    Repeat.prototype.reverse = function() {
		      return this;
		    };

		    Repeat.prototype.indexOf = function(searchValue) {
		      if (is(this._value, searchValue)) {
		        return 0;
		      }
		      return -1;
		    };

		    Repeat.prototype.lastIndexOf = function(searchValue) {
		      if (is(this._value, searchValue)) {
		        return this.size;
		      }
		      return -1;
		    };

		    Repeat.prototype.__iterate = function(fn, reverse) {
		      for (var ii = 0; ii < this.size; ii++) {
		        if (fn(this._value, ii, this) === false) {
		          return ii + 1;
		        }
		      }
		      return ii;
		    };

		    Repeat.prototype.__iterator = function(type, reverse) {var this$0 = this;
		      var ii = 0;
		      return new src_Iterator__Iterator(function() 
		        {return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone()}
		      );
		    };

		    Repeat.prototype.equals = function(other) {
		      return other instanceof Repeat ?
		        is(this._value, other._value) :
		        deepEqual(other);
		    };


		  var EMPTY_REPEAT;

		  /**
		   * Contributes additional methods to a constructor
		   */
		  function mixin(ctor, methods) {
		    var keyCopier = function(key ) { ctor.prototype[key] = methods[key]; };
		    Object.keys(methods).forEach(keyCopier);
		    Object.getOwnPropertySymbols &&
		      Object.getOwnPropertySymbols(methods).forEach(keyCopier);
		    return ctor;
		  }

		  Iterable.Iterator = src_Iterator__Iterator;

		  mixin(Iterable, {

		    // ### Conversion to other types

		    toArray: function() {
		      assertNotInfinite(this.size);
		      var array = new Array(this.size || 0);
		      this.valueSeq().__iterate(function(v, i)  { array[i] = v; });
		      return array;
		    },

		    toIndexedSeq: function() {
		      return new ToIndexedSequence(this);
		    },

		    toJS: function() {
		      return this.toSeq().map(
		        function(value ) {return value && typeof value.toJS === 'function' ? value.toJS() : value}
		      ).__toJS();
		    },

		    toJSON: function() {
		      return this.toSeq().map(
		        function(value ) {return value && typeof value.toJSON === 'function' ? value.toJSON() : value}
		      ).__toJS();
		    },

		    toKeyedSeq: function() {
		      return new ToKeyedSequence(this, true);
		    },

		    toMap: function() {
		      // Use Late Binding here to solve the circular dependency.
		      return src_Map__Map(this.toKeyedSeq());
		    },

		    toObject: function() {
		      assertNotInfinite(this.size);
		      var object = {};
		      this.__iterate(function(v, k)  { object[k] = v; });
		      return object;
		    },

		    toOrderedMap: function() {
		      // Use Late Binding here to solve the circular dependency.
		      return OrderedMap(this.toKeyedSeq());
		    },

		    toOrderedSet: function() {
		      // Use Late Binding here to solve the circular dependency.
		      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
		    },

		    toSet: function() {
		      // Use Late Binding here to solve the circular dependency.
		      return src_Set__Set(isKeyed(this) ? this.valueSeq() : this);
		    },

		    toSetSeq: function() {
		      return new ToSetSequence(this);
		    },

		    toSeq: function() {
		      return isIndexed(this) ? this.toIndexedSeq() :
		        isKeyed(this) ? this.toKeyedSeq() :
		        this.toSetSeq();
		    },

		    toStack: function() {
		      // Use Late Binding here to solve the circular dependency.
		      return Stack(isKeyed(this) ? this.valueSeq() : this);
		    },

		    toList: function() {
		      // Use Late Binding here to solve the circular dependency.
		      return List(isKeyed(this) ? this.valueSeq() : this);
		    },


		    // ### Common JavaScript methods and properties

		    toString: function() {
		      return '[Iterable]';
		    },

		    __toString: function(head, tail) {
		      if (this.size === 0) {
		        return head + tail;
		      }
		      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
		    },


		    // ### ES6 Collection methods (ES6 Array and Map)

		    concat: function() {var values = SLICE$0.call(arguments, 0);
		      return reify(this, concatFactory(this, values));
		    },

		    includes: function(searchValue) {
		      return this.some(function(value ) {return is(value, searchValue)});
		    },

		    entries: function() {
		      return this.__iterator(ITERATE_ENTRIES);
		    },

		    every: function(predicate, context) {
		      assertNotInfinite(this.size);
		      var returnValue = true;
		      this.__iterate(function(v, k, c)  {
		        if (!predicate.call(context, v, k, c)) {
		          returnValue = false;
		          return false;
		        }
		      });
		      return returnValue;
		    },

		    filter: function(predicate, context) {
		      return reify(this, filterFactory(this, predicate, context, true));
		    },

		    find: function(predicate, context, notSetValue) {
		      var entry = this.findEntry(predicate, context);
		      return entry ? entry[1] : notSetValue;
		    },

		    findEntry: function(predicate, context) {
		      var found;
		      this.__iterate(function(v, k, c)  {
		        if (predicate.call(context, v, k, c)) {
		          found = [k, v];
		          return false;
		        }
		      });
		      return found;
		    },

		    findLastEntry: function(predicate, context) {
		      return this.toSeq().reverse().findEntry(predicate, context);
		    },

		    forEach: function(sideEffect, context) {
		      assertNotInfinite(this.size);
		      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
		    },

		    join: function(separator) {
		      assertNotInfinite(this.size);
		      separator = separator !== undefined ? '' + separator : ',';
		      var joined = '';
		      var isFirst = true;
		      this.__iterate(function(v ) {
		        isFirst ? (isFirst = false) : (joined += separator);
		        joined += v !== null && v !== undefined ? v.toString() : '';
		      });
		      return joined;
		    },

		    keys: function() {
		      return this.__iterator(ITERATE_KEYS);
		    },

		    map: function(mapper, context) {
		      return reify(this, mapFactory(this, mapper, context));
		    },

		    reduce: function(reducer, initialReduction, context) {
		      assertNotInfinite(this.size);
		      var reduction;
		      var useFirst;
		      if (arguments.length < 2) {
		        useFirst = true;
		      } else {
		        reduction = initialReduction;
		      }
		      this.__iterate(function(v, k, c)  {
		        if (useFirst) {
		          useFirst = false;
		          reduction = v;
		        } else {
		          reduction = reducer.call(context, reduction, v, k, c);
		        }
		      });
		      return reduction;
		    },

		    reduceRight: function(reducer, initialReduction, context) {
		      var reversed = this.toKeyedSeq().reverse();
		      return reversed.reduce.apply(reversed, arguments);
		    },

		    reverse: function() {
		      return reify(this, reverseFactory(this, true));
		    },

		    slice: function(begin, end) {
		      return reify(this, sliceFactory(this, begin, end, true));
		    },

		    some: function(predicate, context) {
		      return !this.every(not(predicate), context);
		    },

		    sort: function(comparator) {
		      return reify(this, sortFactory(this, comparator));
		    },

		    values: function() {
		      return this.__iterator(ITERATE_VALUES);
		    },


		    // ### More sequential methods

		    butLast: function() {
		      return this.slice(0, -1);
		    },

		    isEmpty: function() {
		      return this.size !== undefined ? this.size === 0 : !this.some(function()  {return true});
		    },

		    count: function(predicate, context) {
		      return ensureSize(
		        predicate ? this.toSeq().filter(predicate, context) : this
		      );
		    },

		    countBy: function(grouper, context) {
		      return countByFactory(this, grouper, context);
		    },

		    equals: function(other) {
		      return deepEqual(this, other);
		    },

		    entrySeq: function() {
		      var iterable = this;
		      if (iterable._cache) {
		        // We cache as an entries array, so we can just return the cache!
		        return new ArraySeq(iterable._cache);
		      }
		      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
		      entriesSequence.fromEntrySeq = function()  {return iterable.toSeq()};
		      return entriesSequence;
		    },

		    filterNot: function(predicate, context) {
		      return this.filter(not(predicate), context);
		    },

		    findLast: function(predicate, context, notSetValue) {
		      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
		    },

		    first: function() {
		      return this.find(returnTrue);
		    },

		    flatMap: function(mapper, context) {
		      return reify(this, flatMapFactory(this, mapper, context));
		    },

		    flatten: function(depth) {
		      return reify(this, flattenFactory(this, depth, true));
		    },

		    fromEntrySeq: function() {
		      return new FromEntriesSequence(this);
		    },

		    get: function(searchKey, notSetValue) {
		      return this.find(function(_, key)  {return is(key, searchKey)}, undefined, notSetValue);
		    },

		    getIn: function(searchKeyPath, notSetValue) {
		      var nested = this;
		      // Note: in an ES6 environment, we would prefer:
		      // for (var key of searchKeyPath) {
		      var iter = forceIterator(searchKeyPath);
		      var step;
		      while (!(step = iter.next()).done) {
		        var key = step.value;
		        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
		        if (nested === NOT_SET) {
		          return notSetValue;
		        }
		      }
		      return nested;
		    },

		    groupBy: function(grouper, context) {
		      return groupByFactory(this, grouper, context);
		    },

		    has: function(searchKey) {
		      return this.get(searchKey, NOT_SET) !== NOT_SET;
		    },

		    hasIn: function(searchKeyPath) {
		      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
		    },

		    isSubset: function(iter) {
		      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
		      return this.every(function(value ) {return iter.includes(value)});
		    },

		    isSuperset: function(iter) {
		      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
		      return iter.isSubset(this);
		    },

		    keySeq: function() {
		      return this.toSeq().map(keyMapper).toIndexedSeq();
		    },

		    last: function() {
		      return this.toSeq().reverse().first();
		    },

		    max: function(comparator) {
		      return maxFactory(this, comparator);
		    },

		    maxBy: function(mapper, comparator) {
		      return maxFactory(this, comparator, mapper);
		    },

		    min: function(comparator) {
		      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
		    },

		    minBy: function(mapper, comparator) {
		      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
		    },

		    rest: function() {
		      return this.slice(1);
		    },

		    skip: function(amount) {
		      return this.slice(Math.max(0, amount));
		    },

		    skipLast: function(amount) {
		      return reify(this, this.toSeq().reverse().skip(amount).reverse());
		    },

		    skipWhile: function(predicate, context) {
		      return reify(this, skipWhileFactory(this, predicate, context, true));
		    },

		    skipUntil: function(predicate, context) {
		      return this.skipWhile(not(predicate), context);
		    },

		    sortBy: function(mapper, comparator) {
		      return reify(this, sortFactory(this, comparator, mapper));
		    },

		    take: function(amount) {
		      return this.slice(0, Math.max(0, amount));
		    },

		    takeLast: function(amount) {
		      return reify(this, this.toSeq().reverse().take(amount).reverse());
		    },

		    takeWhile: function(predicate, context) {
		      return reify(this, takeWhileFactory(this, predicate, context));
		    },

		    takeUntil: function(predicate, context) {
		      return this.takeWhile(not(predicate), context);
		    },

		    valueSeq: function() {
		      return this.toIndexedSeq();
		    },


		    // ### Hashable Object

		    hashCode: function() {
		      return this.__hash || (this.__hash = hashIterable(this));
		    }


		    // ### Internal

		    // abstract __iterate(fn, reverse)

		    // abstract __iterator(type, reverse)
		  });

		  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
		  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
		  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
		  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

		  var IterablePrototype = Iterable.prototype;
		  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
		  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
		  IterablePrototype.__toJS = IterablePrototype.toArray;
		  IterablePrototype.__toStringMapper = quoteString;
		  IterablePrototype.inspect =
		  IterablePrototype.toSource = function() { return this.toString(); };
		  IterablePrototype.chain = IterablePrototype.flatMap;
		  IterablePrototype.contains = IterablePrototype.includes;

		  // Temporary warning about using length
		  (function () {
		    try {
		      Object.defineProperty(IterablePrototype, 'length', {
		        get: function () {
		          if (!Iterable.noLengthWarning) {
		            var stack;
		            try {
		              throw new Error();
		            } catch (error) {
		              stack = error.stack;
		            }
		            if (stack.indexOf('_wrapObject') === -1) {
		              console && console.warn && console.warn(
		                'iterable.length has been deprecated, '+
		                'use iterable.size or iterable.count(). '+
		                'This warning will become a silent error in a future version. ' +
		                stack
		              );
		              return this.size;
		            }
		          }
		        }
		      });
		    } catch (e) {}
		  })();



		  mixin(KeyedIterable, {

		    // ### More sequential methods

		    flip: function() {
		      return reify(this, flipFactory(this));
		    },

		    findKey: function(predicate, context) {
		      var entry = this.findEntry(predicate, context);
		      return entry && entry[0];
		    },

		    findLastKey: function(predicate, context) {
		      return this.toSeq().reverse().findKey(predicate, context);
		    },

		    keyOf: function(searchValue) {
		      return this.findKey(function(value ) {return is(value, searchValue)});
		    },

		    lastKeyOf: function(searchValue) {
		      return this.findLastKey(function(value ) {return is(value, searchValue)});
		    },

		    mapEntries: function(mapper, context) {var this$0 = this;
		      var iterations = 0;
		      return reify(this,
		        this.toSeq().map(
		          function(v, k)  {return mapper.call(context, [k, v], iterations++, this$0)}
		        ).fromEntrySeq()
		      );
		    },

		    mapKeys: function(mapper, context) {var this$0 = this;
		      return reify(this,
		        this.toSeq().flip().map(
		          function(k, v)  {return mapper.call(context, k, v, this$0)}
		        ).flip()
		      );
		    }

		  });

		  var KeyedIterablePrototype = KeyedIterable.prototype;
		  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
		  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
		  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
		  KeyedIterablePrototype.__toStringMapper = function(v, k)  {return JSON.stringify(k) + ': ' + quoteString(v)};



		  mixin(IndexedIterable, {

		    // ### Conversion to other types

		    toKeyedSeq: function() {
		      return new ToKeyedSequence(this, false);
		    },


		    // ### ES6 Collection methods (ES6 Array and Map)

		    filter: function(predicate, context) {
		      return reify(this, filterFactory(this, predicate, context, false));
		    },

		    findIndex: function(predicate, context) {
		      var entry = this.findEntry(predicate, context);
		      return entry ? entry[0] : -1;
		    },

		    indexOf: function(searchValue) {
		      var key = this.toKeyedSeq().keyOf(searchValue);
		      return key === undefined ? -1 : key;
		    },

		    lastIndexOf: function(searchValue) {
		      return this.toSeq().reverse().indexOf(searchValue);
		    },

		    reverse: function() {
		      return reify(this, reverseFactory(this, false));
		    },

		    slice: function(begin, end) {
		      return reify(this, sliceFactory(this, begin, end, false));
		    },

		    splice: function(index, removeNum /*, ...values*/) {
		      var numArgs = arguments.length;
		      removeNum = Math.max(removeNum | 0, 0);
		      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
		        return this;
		      }
		      // If index is negative, it should resolve relative to the size of the
		      // collection. However size may be expensive to compute if not cached, so
		      // only call count() if the number is in fact negative.
		      index = resolveBegin(index, index < 0 ? this.count() : this.size);
		      var spliced = this.slice(0, index);
		      return reify(
		        this,
		        numArgs === 1 ?
		          spliced :
		          spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
		      );
		    },


		    // ### More collection methods

		    findLastIndex: function(predicate, context) {
		      var key = this.toKeyedSeq().findLastKey(predicate, context);
		      return key === undefined ? -1 : key;
		    },

		    first: function() {
		      return this.get(0);
		    },

		    flatten: function(depth) {
		      return reify(this, flattenFactory(this, depth, false));
		    },

		    get: function(index, notSetValue) {
		      index = wrapIndex(this, index);
		      return (index < 0 || (this.size === Infinity ||
		          (this.size !== undefined && index > this.size))) ?
		        notSetValue :
		        this.find(function(_, key)  {return key === index}, undefined, notSetValue);
		    },

		    has: function(index) {
		      index = wrapIndex(this, index);
		      return index >= 0 && (this.size !== undefined ?
		        this.size === Infinity || index < this.size :
		        this.indexOf(index) !== -1
		      );
		    },

		    interpose: function(separator) {
		      return reify(this, interposeFactory(this, separator));
		    },

		    interleave: function(/*...iterables*/) {
		      var iterables = [this].concat(arrCopy(arguments));
		      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
		      var interleaved = zipped.flatten(true);
		      if (zipped.size) {
		        interleaved.size = zipped.size * iterables.length;
		      }
		      return reify(this, interleaved);
		    },

		    last: function() {
		      return this.get(-1);
		    },

		    skipWhile: function(predicate, context) {
		      return reify(this, skipWhileFactory(this, predicate, context, false));
		    },

		    zip: function(/*, ...iterables */) {
		      var iterables = [this].concat(arrCopy(arguments));
		      return reify(this, zipWithFactory(this, defaultZipper, iterables));
		    },

		    zipWith: function(zipper/*, ...iterables */) {
		      var iterables = arrCopy(arguments);
		      iterables[0] = this;
		      return reify(this, zipWithFactory(this, zipper, iterables));
		    }

		  });

		  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
		  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;



		  mixin(SetIterable, {

		    // ### ES6 Collection methods (ES6 Array and Map)

		    get: function(value, notSetValue) {
		      return this.has(value) ? value : notSetValue;
		    },

		    includes: function(value) {
		      return this.has(value);
		    },


		    // ### More sequential methods

		    keySeq: function() {
		      return this.valueSeq();
		    }

		  });

		  SetIterable.prototype.has = IterablePrototype.includes;


		  // Mixin subclasses

		  mixin(KeyedSeq, KeyedIterable.prototype);
		  mixin(IndexedSeq, IndexedIterable.prototype);
		  mixin(SetSeq, SetIterable.prototype);

		  mixin(KeyedCollection, KeyedIterable.prototype);
		  mixin(IndexedCollection, IndexedIterable.prototype);
		  mixin(SetCollection, SetIterable.prototype);


		  // #pragma Helper functions

		  function keyMapper(v, k) {
		    return k;
		  }

		  function entryMapper(v, k) {
		    return [k, v];
		  }

		  function not(predicate) {
		    return function() {
		      return !predicate.apply(this, arguments);
		    }
		  }

		  function neg(predicate) {
		    return function() {
		      return -predicate.apply(this, arguments);
		    }
		  }

		  function quoteString(value) {
		    return typeof value === 'string' ? JSON.stringify(value) : value;
		  }

		  function defaultZipper() {
		    return arrCopy(arguments);
		  }

		  function defaultNegComparator(a, b) {
		    return a < b ? 1 : a > b ? -1 : 0;
		  }

		  function hashIterable(iterable) {
		    if (iterable.size === Infinity) {
		      return 0;
		    }
		    var ordered = isOrdered(iterable);
		    var keyed = isKeyed(iterable);
		    var h = ordered ? 1 : 0;
		    var size = iterable.__iterate(
		      keyed ?
		        ordered ?
		          function(v, k)  { h = 31 * h + hashMerge(hash(v), hash(k)) | 0; } :
		          function(v, k)  { h = h + hashMerge(hash(v), hash(k)) | 0; } :
		        ordered ?
		          function(v ) { h = 31 * h + hash(v) | 0; } :
		          function(v ) { h = h + hash(v) | 0; }
		    );
		    return murmurHashOfSize(size, h);
		  }

		  function murmurHashOfSize(size, h) {
		    h = src_Math__imul(h, 0xCC9E2D51);
		    h = src_Math__imul(h << 15 | h >>> -15, 0x1B873593);
		    h = src_Math__imul(h << 13 | h >>> -13, 5);
		    h = (h + 0xE6546B64 | 0) ^ size;
		    h = src_Math__imul(h ^ h >>> 16, 0x85EBCA6B);
		    h = src_Math__imul(h ^ h >>> 13, 0xC2B2AE35);
		    h = smi(h ^ h >>> 16);
		    return h;
		  }

		  function hashMerge(a, b) {
		    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
		  }

		  var Immutable = {

		    Iterable: Iterable,

		    Seq: Seq,
		    Collection: Collection,
		    Map: src_Map__Map,
		    OrderedMap: OrderedMap,
		    List: List,
		    Stack: Stack,
		    Set: src_Set__Set,
		    OrderedSet: OrderedSet,

		    Record: Record,
		    Range: Range,
		    Repeat: Repeat,

		    is: is,
		    fromJS: fromJS

		  };

		  return Immutable;

		}));

	/***/ },
	/* 4 */
	/***/ function(module, exports) {

		/**
		 * Checks if the passed in value is a string
		 * @param {*} val
		 * @return {boolean}
		 */
		'use strict';

		var _bind = Function.prototype.bind;
		exports.isString = function (val) {
		  return typeof val === 'string' || objectToString(val) === '[object String]';
		};

		/**
		 * Checks if the passed in value is an array
		 * @param {*} val
		 * @return {boolean}
		 */
		exports.isArray = Array.isArray /* istanbul ignore next */ || function (val) {
		  return objectToString(val) === '[object Array]';
		};

		// taken from underscore source to account for browser discrepancy
		/* istanbul ignore if  */
		if (typeof /./ !== 'function' && typeof Int8Array !== 'object') {
		  /**
		   * Checks if the passed in value is a function
		   * @param {*} val
		   * @return {boolean}
		   */
		  exports.isFunction = function (obj) {
		    return typeof obj === 'function' || false;
		  };
		} else {
		  /**
		   * Checks if the passed in value is a function
		   * @param {*} val
		   * @return {boolean}
		   */
		  exports.isFunction = function (val) {
		    return toString.call(val) === '[object Function]';
		  };
		}

		/**
		 * Checks if the passed in value is of type Object
		 * @param {*} val
		 * @return {boolean}
		 */
		exports.isObject = function (obj) {
		  var type = typeof obj;
		  return type === 'function' || type === 'object' && !!obj;
		};

		/**
		 * Extends an object with the properties of additional objects
		 * @param {object} obj
		 * @param {object} objects
		 * @return {object}
		 */
		exports.extend = function (obj) {
		  var length = arguments.length;

		  if (!obj || length < 2) {
		    return obj || {};
		  }

		  for (var index = 1; index < length; index++) {
		    var source = arguments[index];
		    var keys = Object.keys(source);
		    var l = keys.length;

		    for (var i = 0; i < l; i++) {
		      var key = keys[i];
		      obj[key] = source[key];
		    }
		  }

		  return obj;
		};

		/**
		 * Creates a shallow clone of an object
		 * @param {object} obj
		 * @return {object}
		 */
		exports.clone = function (obj) {
		  if (!exports.isObject(obj)) {
		    return obj;
		  }
		  return exports.isArray(obj) ? obj.slice() : exports.extend({}, obj);
		};

		/**
		 * Iterates over a collection of elements yielding each iteration to an
		 * iteratee. The iteratee may be bound to the context argument and is invoked
		 * each time with three arguments (value, index|key, collection). Iteration may
		 * be exited early by explicitly returning false.
		 * @param {array|object|string} collection
		 * @param {function} iteratee
		 * @param {*} context
		 * @return {array|object|string}
		 */
		exports.each = function (collection, iteratee, context) {
		  var length = collection ? collection.length : 0;
		  var i = -1;
		  var keys;
		  var origIteratee;

		  if (context) {
		    origIteratee = iteratee;
		    iteratee = function (value, index, innerCollection) {
		      return origIteratee.call(context, value, index, innerCollection);
		    };
		  }

		  if (isLength(length)) {
		    while (++i < length) {
		      if (iteratee(collection[i], i, collection) === false) {
		        break;
		      }
		    }
		  } else {
		    keys = Object.keys(collection);
		    length = keys.length;
		    while (++i < length) {
		      if (iteratee(collection[keys[i]], keys[i], collection) === false) {
		        break;
		      }
		    }
		  }

		  return collection;
		};

		/**
		 * Returns a new function the invokes `func` with `partialArgs` prepended to
		 * any passed into the new function. Acts like `Array.prototype.bind`, except
		 * it does not alter `this` context.
		 * @param {function} func
		 * @param {*} partialArgs
		 * @return {function}
		 */
		exports.partial = function (func) {
		  var slice = Array.prototype.slice;
		  var partialArgs = slice.call(arguments, 1);

		  return function () {
		    return func.apply(this, partialArgs.concat(slice.call(arguments)));
		  };
		};

		/**
		 * Returns a factory method that allows construction with or without `new`
		 */
		exports.toFactory = function (Klass) {
		  var Factory = function Factory() {
		    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		      args[_key] = arguments[_key];
		    }

		    return new (_bind.apply(Klass, [null].concat(args)))();
		  };

		  Factory.__proto__ = Klass; // eslint-disable-line no-proto
		  Factory.prototype = Klass.prototype;
		  return Factory;
		};

		/**
		 * Returns the text value representation of an object
		 * @private
		 * @param {*} obj
		 * @return {string}
		 */
		function objectToString(obj) {
		  return obj && typeof obj === 'object' && toString.call(obj);
		}

		/**
		 * Checks if the value is a valid array-like length.
		 * @private
		 * @param {*} val
		 * @return {bool}
		 */
		function isLength(val) {
		  return typeof val === 'number' && val > -1 && val % 1 === 0 && val <= Number.MAX_VALUE;
		}

	/***/ },
	/* 5 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		exports.isImmutable = isImmutable;
		exports.isImmutableValue = isImmutableValue;
		exports.toJS = toJS;
		exports.toImmutable = toImmutable;

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		var _immutable = __webpack_require__(3);

		var _immutable2 = _interopRequireDefault(_immutable);

		var _utils = __webpack_require__(4);

		/**
		 * A collection of helpers for the ImmutableJS library
		 */

		/**
		 * @param {*} obj
		 * @return {boolean}
		 */

		function isImmutable(obj) {
		  return _immutable2['default'].Iterable.isIterable(obj);
		}

		/**
		 * Returns true if the value is an ImmutableJS data structure
		 * or a JavaScript primitive that is immutable (string, number, etc)
		 * @param {*} obj
		 * @return {boolean}
		 */

		function isImmutableValue(obj) {
		  return isImmutable(obj) || !(0, _utils.isObject)(obj);
		}

		/**
		 * Converts an Immutable Sequence to JS object
		 * Can be called on any type
		 */

		function toJS(arg) {
		  // arg instanceof Immutable.Sequence is unreliable
		  return isImmutable(arg) ? arg.toJS() : arg;
		}

		/**
		 * Converts a JS object to an Immutable object, if it's
		 * already Immutable its a no-op
		 */

		function toImmutable(arg) {
		  return isImmutable(arg) ? arg : _immutable2['default'].fromJS(arg);
		}

	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, '__esModule', {
		  value: true
		});

		var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

		var _immutable = __webpack_require__(3);

		var _immutable2 = _interopRequireDefault(_immutable);

		var _createReactMixin = __webpack_require__(7);

		var _createReactMixin2 = _interopRequireDefault(_createReactMixin);

		var _reactorFns = __webpack_require__(8);

		var fns = _interopRequireWildcard(_reactorFns);

		var _keyPath = __webpack_require__(11);

		var _getter = __webpack_require__(10);

		var _immutableHelpers = __webpack_require__(5);

		var _utils = __webpack_require__(4);

		var _reactorRecords = __webpack_require__(12);

		/**
		 * State is stored in NuclearJS Reactors.  Reactors
		 * contain a 'state' object which is an Immutable.Map
		 *
		 * The only way Reactors can change state is by reacting to
		 * messages.  To update state, Reactor's dispatch messages to
		 * all registered cores, and the core returns it's new
		 * state based on the message
		 */

		var Reactor = (function () {
		  function Reactor() {
		    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		    _classCallCheck(this, Reactor);

		    var debug = !!config.debug;
		    var baseOptions = debug ? _reactorRecords.DEBUG_OPTIONS : _reactorRecords.PROD_OPTIONS;
		    var initialReactorState = new _reactorRecords.ReactorState({
		      debug: debug,
		      // merge config options with the defaults
		      options: baseOptions.merge(config.options || {})
		    });

		    this.prevReactorState = initialReactorState;
		    this.reactorState = initialReactorState;
		    this.observerState = new _reactorRecords.ObserverState();

		    this.ReactMixin = (0, _createReactMixin2['default'])(this);

		    // keep track of the depth of batch nesting
		    this.__batchDepth = 0;

		    // keep track if we are currently dispatching
		    this.__isDispatching = false;
		  }

		  /**
		   * Evaluates a KeyPath or Getter in context of the reactor state
		   * @param {KeyPath|Getter} keyPathOrGetter
		   * @return {*}
		   */

		  _createClass(Reactor, [{
		    key: 'evaluate',
		    value: function evaluate(keyPathOrGetter) {
		      var _fns$evaluate = fns.evaluate(this.reactorState, keyPathOrGetter);

		      var result = _fns$evaluate.result;
		      var reactorState = _fns$evaluate.reactorState;

		      this.reactorState = reactorState;
		      return result;
		    }

		    /**
		     * Gets the coerced state (to JS object) of the reactor.evaluate
		     * @param {KeyPath|Getter} keyPathOrGetter
		     * @return {*}
		     */
		  }, {
		    key: 'evaluateToJS',
		    value: function evaluateToJS(keyPathOrGetter) {
		      return (0, _immutableHelpers.toJS)(this.evaluate(keyPathOrGetter));
		    }

		    /**
		     * Adds a change observer whenever a certain part of the reactor state changes
		     *
		     * 1. observe(handlerFn) - 1 argument, called anytime reactor.state changes
		     * 2. observe(keyPath, handlerFn) same as above
		     * 3. observe(getter, handlerFn) called whenever any getter dependencies change with
		     *    the value of the getter
		     *
		     * Adds a change handler whenever certain deps change
		     * If only one argument is passed invoked the handler whenever
		     * the reactor state changes
		     *
		     * @param {KeyPath|Getter} getter
		     * @param {function} handler
		     * @return {function} unwatch function
		     */
		  }, {
		    key: 'observe',
		    value: function observe(getter, handler) {
		      var _this = this;

		      if (arguments.length === 1) {
		        handler = getter;
		        getter = [];
		      }

		      var _fns$addObserver = fns.addObserver(this.observerState, getter, handler);

		      var observerState = _fns$addObserver.observerState;
		      var entry = _fns$addObserver.entry;

		      this.observerState = observerState;
		      return function () {
		        _this.observerState = fns.removeObserverByEntry(_this.observerState, entry);
		      };
		    }
		  }, {
		    key: 'unobserve',
		    value: function unobserve(getter, handler) {
		      if (arguments.length === 0) {
		        throw new Error('Must call unobserve with a Getter');
		      }
		      if (!(0, _getter.isGetter)(getter) && !(0, _keyPath.isKeyPath)(getter)) {
		        throw new Error('Must call unobserve with a Getter');
		      }

		      this.observerState = fns.removeObserver(this.observerState, getter, handler);
		    }

		    /**
		     * Dispatches a single message
		     * @param {string} actionType
		     * @param {object|undefined} payload
		     */
		  }, {
		    key: 'dispatch',
		    value: function dispatch(actionType, payload) {
		      if (this.__batchDepth === 0) {
		        if (fns.getOption(this.reactorState, 'throwOnDispatchInDispatch')) {
		          if (this.__isDispatching) {
		            this.__isDispatching = false;
		            throw new Error('Dispatch may not be called while a dispatch is in progress');
		          }
		        }
		        this.__isDispatching = true;
		      }

		      try {
		        this.reactorState = fns.dispatch(this.reactorState, actionType, payload);
		      } catch (e) {
		        this.__isDispatching = false;
		        throw e;
		      }

		      try {
		        this.__notify();
		      } finally {
		        this.__isDispatching = false;
		      }
		    }

		    /**
		     * Allows batching of dispatches before notifying change observers
		     * @param {Function} fn
		     */
		  }, {
		    key: 'batch',
		    value: function batch(fn) {
		      this.batchStart();
		      fn();
		      this.batchEnd();
		    }

		    /**
		     * @deprecated
		     * @param {String} id
		     * @param {Store} store
		     */
		  }, {
		    key: 'registerStore',
		    value: function registerStore(id, store) {
		      /* eslint-disable no-console */
		      console.warn('Deprecation warning: `registerStore` will no longer be supported in 1.1, use `registerStores` instead');
		      /* eslint-enable no-console */
		      this.registerStores(_defineProperty({}, id, store));
		    }

		    /**
		     * @param {Object} stores
		     */
		  }, {
		    key: 'registerStores',
		    value: function registerStores(stores) {
		      this.reactorState = fns.registerStores(this.reactorState, stores);
		      this.__notify();
		    }

		    /**
		     * Replace store implementation (handlers) without modifying the app state or calling getInitialState
		     * Useful for hot reloading
		     * @param {Object} stores
		     */
		  }, {
		    key: 'replaceStores',
		    value: function replaceStores(stores) {
		      this.reactorState = fns.replaceStores(this.reactorState, stores);
		    }

		    /**
		     * Returns a plain object representing the application state
		     * @return {Object}
		     */
		  }, {
		    key: 'serialize',
		    value: function serialize() {
		      return fns.serialize(this.reactorState);
		    }

		    /**
		     * @param {Object} state
		     */
		  }, {
		    key: 'loadState',
		    value: function loadState(state) {
		      this.reactorState = fns.loadState(this.reactorState, state);
		      this.__notify();
		    }

		    /**
		     * Resets the state of a reactor and returns back to initial state
		     */
		  }, {
		    key: 'reset',
		    value: function reset() {
		      var newState = fns.reset(this.reactorState);
		      this.reactorState = newState;
		      this.prevReactorState = newState;
		      this.observerState = new _reactorRecords.ObserverState();
		    }

		    /**
		     * Notifies all change observers with the current state
		     * @private
		     */
		  }, {
		    key: '__notify',
		    value: function __notify() {
		      var _this2 = this;

		      if (this.__batchDepth > 0) {
		        // in the middle of batch, dont notify
		        return;
		      }

		      var dirtyStores = this.reactorState.get('dirtyStores');
		      if (dirtyStores.size === 0) {
		        return;
		      }

		      var observerIdsToNotify = _immutable2['default'].Set().withMutations(function (set) {
		        // notify all observers
		        set.union(_this2.observerState.get('any'));

		        dirtyStores.forEach(function (id) {
		          var entries = _this2.observerState.getIn(['stores', id]);
		          if (!entries) {
		            return;
		          }
		          set.union(entries);
		        });
		      });

		      observerIdsToNotify.forEach(function (observerId) {
		        var entry = _this2.observerState.getIn(['observersMap', observerId]);
		        if (!entry) {
		          // don't notify here in the case a handler called unobserve on another observer
		          return;
		        }

		        var getter = entry.get('getter');
		        var handler = entry.get('handler');

		        var prevEvaluateResult = fns.evaluate(_this2.prevReactorState, getter);
		        var currEvaluateResult = fns.evaluate(_this2.reactorState, getter);

		        _this2.prevReactorState = prevEvaluateResult.reactorState;
		        _this2.reactorState = currEvaluateResult.reactorState;

		        var prevValue = prevEvaluateResult.result;
		        var currValue = currEvaluateResult.result;

		        if (!_immutable2['default'].is(prevValue, currValue)) {
		          handler.call(null, currValue);
		        }
		      });

		      var nextReactorState = fns.resetDirtyStores(this.reactorState);

		      this.prevReactorState = nextReactorState;
		      this.reactorState = nextReactorState;
		    }

		    /**
		     * Starts batching, ie pausing notifies and batching up changes
		     * to be notified when batchEnd() is called
		     */
		  }, {
		    key: 'batchStart',
		    value: function batchStart() {
		      this.__batchDepth++;
		    }

		    /**
		     * Ends a batch cycle and will notify obsevers of all changes if
		     * the batch depth is back to 0 (outer most batch completed)
		     */
		  }, {
		    key: 'batchEnd',
		    value: function batchEnd() {
		      this.__batchDepth--;

		      if (this.__batchDepth <= 0) {
		        // set to true to catch if dispatch called from observer
		        this.__isDispatching = true;
		        try {
		          this.__notify();
		        } catch (e) {
		          this.__isDispatching = false;
		          throw e;
		        }
		        this.__isDispatching = false;
		      }
		    }
		  }]);

		  return Reactor;
		})();

		exports['default'] = (0, _utils.toFactory)(Reactor);
		module.exports = exports['default'];

	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, '__esModule', {
		  value: true
		});

		function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

		var _utils = __webpack_require__(4);

		/**
		 * Returns a mapping of the getDataBinding keys to
		 * the reactor values
		 */
		function getState(reactor, data) {
		  var state = {};
		  (0, _utils.each)(data, function (value, key) {
		    state[key] = reactor.evaluate(value);
		  });
		  return state;
		}

		/**
		 * @param {Reactor} reactor
		 */

		exports['default'] = function (reactor) {
		  return {
		    getInitialState: function getInitialState() {
		      return getState(reactor, this.getDataBindings());
		    },

		    componentDidMount: function componentDidMount() {
		      var _this = this;

		      this.__unwatchFns = [];
		      (0, _utils.each)(this.getDataBindings(), function (getter, key) {
		        var unwatchFn = reactor.observe(getter, function (val) {
		          _this.setState(_defineProperty({}, key, val));
		        });

		        _this.__unwatchFns.push(unwatchFn);
		      });
		    },

		    componentWillUnmount: function componentWillUnmount() {
		      while (this.__unwatchFns.length) {
		        this.__unwatchFns.shift()();
		      }
		    }
		  };
		};

		module.exports = exports['default'];

	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		exports.registerStores = registerStores;
		exports.replaceStores = replaceStores;
		exports.dispatch = dispatch;
		exports.loadState = loadState;
		exports.addObserver = addObserver;
		exports.getOption = getOption;
		exports.removeObserver = removeObserver;
		exports.removeObserverByEntry = removeObserverByEntry;
		exports.reset = reset;
		exports.evaluate = evaluate;
		exports.serialize = serialize;
		exports.resetDirtyStores = resetDirtyStores;

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		var _immutable = __webpack_require__(3);

		var _immutable2 = _interopRequireDefault(_immutable);

		var _logging = __webpack_require__(9);

		var _logging2 = _interopRequireDefault(_logging);

		var _immutableHelpers = __webpack_require__(5);

		var _getter = __webpack_require__(10);

		var _keyPath = __webpack_require__(11);

		var _utils = __webpack_require__(4);

		/**
		 * Immutable Types
		 */
		var EvaluateResult = _immutable2['default'].Record({ result: null, reactorState: null });

		function evaluateResult(result, reactorState) {
		  return new EvaluateResult({
		    result: result,
		    reactorState: reactorState
		  });
		}

		/**
		 * @param {ReactorState} reactorState
		 * @param {Object<String, Store>} stores
		 * @return {ReactorState}
		 */

		function registerStores(reactorState, stores) {
		  return reactorState.withMutations(function (reactorState) {
		    (0, _utils.each)(stores, function (store, id) {
		      if (reactorState.getIn(['stores', id])) {
		        /* eslint-disable no-console */
		        console.warn('Store already defined for id = ' + id);
		        /* eslint-enable no-console */
		      }

		      var initialState = store.getInitialState();

		      if (initialState === undefined && getOption(reactorState, 'throwOnUndefinedStoreReturnValue')) {
		        throw new Error('Store getInitialState() must return a value, did you forget a return statement');
		      }
		      if (getOption(reactorState, 'throwOnNonImmutableStore') && !(0, _immutableHelpers.isImmutableValue)(initialState)) {
		        throw new Error('Store getInitialState() must return an immutable value, did you forget to call toImmutable');
		      }

		      reactorState.update('stores', function (stores) {
		        return stores.set(id, store);
		      }).update('state', function (state) {
		        return state.set(id, initialState);
		      }).update('dirtyStores', function (state) {
		        return state.add(id);
		      }).update('storeStates', function (storeStates) {
		        return incrementStoreStates(storeStates, [id]);
		      });
		    });
		    incrementId(reactorState);
		  });
		}

		/**
		 * Overrides the store implementation without resetting the value of that particular part of the app state
		 * this is useful when doing hot reloading of stores.
		 * @param {ReactorState} reactorState
		 * @param {Object<String, Store>} stores
		 * @return {ReactorState}
		 */

		function replaceStores(reactorState, stores) {
		  return reactorState.withMutations(function (reactorState) {
		    (0, _utils.each)(stores, function (store, id) {
		      reactorState.update('stores', function (stores) {
		        return stores.set(id, store);
		      });
		    });
		  });
		}

		/**
		 * @param {ReactorState} reactorState
		 * @param {String} actionType
		 * @param {*} payload
		 * @return {ReactorState}
		 */

		function dispatch(reactorState, actionType, payload) {
		  if (actionType === undefined && getOption(reactorState, 'throwOnUndefinedActionType')) {
		    throw new Error('`dispatch` cannot be called with an `undefined` action type.');
		  }

		  var currState = reactorState.get('state');
		  var dirtyStores = reactorState.get('dirtyStores');

		  var nextState = currState.withMutations(function (state) {
		    _logging2['default'].dispatchStart(reactorState, actionType, payload);

		    // let each store handle the message
		    reactorState.get('stores').forEach(function (store, id) {
		      var currState = state.get(id);
		      var newState = undefined;

		      try {
		        newState = store.handle(currState, actionType, payload);
		      } catch (e) {
		        // ensure console.group is properly closed
		        _logging2['default'].dispatchError(reactorState, e.message);
		        throw e;
		      }

		      if (newState === undefined && getOption(reactorState, 'throwOnUndefinedStoreReturnValue')) {
		        var errorMsg = 'Store handler must return a value, did you forget a return statement';
		        _logging2['default'].dispatchError(reactorState, errorMsg);
		        throw new Error(errorMsg);
		      }

		      state.set(id, newState);

		      if (currState !== newState) {
		        // if the store state changed add store to list of dirty stores
		        dirtyStores = dirtyStores.add(id);
		      }
		    });

		    _logging2['default'].dispatchEnd(reactorState, state, dirtyStores);
		  });

		  var nextReactorState = reactorState.set('state', nextState).set('dirtyStores', dirtyStores).update('storeStates', function (storeStates) {
		    return incrementStoreStates(storeStates, dirtyStores);
		  });

		  return incrementId(nextReactorState);
		}

		/**
		 * @param {ReactorState} reactorState
		 * @param {Immutable.Map} state
		 * @return {ReactorState}
		 */

		function loadState(reactorState, state) {
		  var dirtyStores = [];
		  var stateToLoad = (0, _immutableHelpers.toImmutable)({}).withMutations(function (stateToLoad) {
		    (0, _utils.each)(state, function (serializedStoreState, storeId) {
		      var store = reactorState.getIn(['stores', storeId]);
		      if (store) {
		        var storeState = store.deserialize(serializedStoreState);
		        if (storeState !== undefined) {
		          stateToLoad.set(storeId, storeState);
		          dirtyStores.push(storeId);
		        }
		      }
		    });
		  });

		  var dirtyStoresSet = _immutable2['default'].Set(dirtyStores);
		  return reactorState.update('state', function (state) {
		    return state.merge(stateToLoad);
		  }).update('dirtyStores', function (stores) {
		    return stores.union(dirtyStoresSet);
		  }).update('storeStates', function (storeStates) {
		    return incrementStoreStates(storeStates, dirtyStores);
		  });
		}

		/**
		 * Adds a change observer whenever a certain part of the reactor state changes
		 *
		 * 1. observe(handlerFn) - 1 argument, called anytime reactor.state changes
		 * 2. observe(keyPath, handlerFn) same as above
		 * 3. observe(getter, handlerFn) called whenever any getter dependencies change with
		 *    the value of the getter
		 *
		 * Adds a change handler whenever certain deps change
		 * If only one argument is passed invoked the handler whenever
		 * the reactor state changes
		 *
		 * @param {ObserverState} observerState
		 * @param {KeyPath|Getter} getter
		 * @param {function} handler
		 * @return {ObserveResult}
		 */

		function addObserver(observerState, getter, handler) {
		  // use the passed in getter as the key so we can rely on a byreference call for unobserve
		  var getterKey = getter;
		  if ((0, _keyPath.isKeyPath)(getter)) {
		    getter = (0, _getter.fromKeyPath)(getter);
		  }

		  var currId = observerState.get('nextId');
		  var storeDeps = (0, _getter.getStoreDeps)(getter);
		  var entry = _immutable2['default'].Map({
		    id: currId,
		    storeDeps: storeDeps,
		    getterKey: getterKey,
		    getter: getter,
		    handler: handler
		  });

		  var updatedObserverState = undefined;
		  if (storeDeps.size === 0) {
		    // no storeDeps means the observer is dependent on any of the state changing
		    updatedObserverState = observerState.update('any', function (observerIds) {
		      return observerIds.add(currId);
		    });
		  } else {
		    updatedObserverState = observerState.withMutations(function (map) {
		      storeDeps.forEach(function (storeId) {
		        var path = ['stores', storeId];
		        if (!map.hasIn(path)) {
		          map.setIn(path, _immutable2['default'].Set());
		        }
		        map.updateIn(['stores', storeId], function (observerIds) {
		          return observerIds.add(currId);
		        });
		      });
		    });
		  }

		  updatedObserverState = updatedObserverState.set('nextId', currId + 1).setIn(['observersMap', currId], entry);

		  return {
		    observerState: updatedObserverState,
		    entry: entry
		  };
		}

		/**
		 * @param {ReactorState} reactorState
		 * @param {String} option
		 * @return {Boolean}
		 */

		function getOption(reactorState, option) {
		  var value = reactorState.getIn(['options', option]);
		  if (value === undefined) {
		    throw new Error('Invalid option: ' + option);
		  }
		  return value;
		}

		/**
		 * Use cases
		 * removeObserver(observerState, [])
		 * removeObserver(observerState, [], handler)
		 * removeObserver(observerState, ['keyPath'])
		 * removeObserver(observerState, ['keyPath'], handler)
		 * removeObserver(observerState, getter)
		 * removeObserver(observerState, getter, handler)
		 * @param {ObserverState} observerState
		 * @param {KeyPath|Getter} getter
		 * @param {Function} handler
		 * @return {ObserverState}
		 */

		function removeObserver(observerState, getter, handler) {
		  var entriesToRemove = observerState.get('observersMap').filter(function (entry) {
		    // use the getterKey in the case of a keyPath is transformed to a getter in addObserver
		    var entryGetter = entry.get('getterKey');
		    var handlersMatch = !handler || entry.get('handler') === handler;
		    if (!handlersMatch) {
		      return false;
		    }
		    // check for a by-value equality of keypaths
		    if ((0, _keyPath.isKeyPath)(getter) && (0, _keyPath.isKeyPath)(entryGetter)) {
		      return (0, _keyPath.isEqual)(getter, entryGetter);
		    }
		    // we are comparing two getters do it by reference
		    return getter === entryGetter;
		  });

		  return observerState.withMutations(function (map) {
		    entriesToRemove.forEach(function (entry) {
		      return removeObserverByEntry(map, entry);
		    });
		  });
		}

		/**
		 * Removes an observer entry by id from the observerState
		 * @param {ObserverState} observerState
		 * @param {Immutable.Map} entry
		 * @return {ObserverState}
		 */

		function removeObserverByEntry(observerState, entry) {
		  return observerState.withMutations(function (map) {
		    var id = entry.get('id');
		    var storeDeps = entry.get('storeDeps');

		    if (storeDeps.size === 0) {
		      map.update('any', function (anyObsevers) {
		        return anyObsevers.remove(id);
		      });
		    } else {
		      storeDeps.forEach(function (storeId) {
		        map.updateIn(['stores', storeId], function (observers) {
		          if (observers) {
		            // check for observers being present because reactor.reset() can be called before an unwatch fn
		            return observers.remove(id);
		          }
		          return observers;
		        });
		      });
		    }

		    map.removeIn(['observersMap', id]);
		  });
		}

		/**
		 * @param {ReactorState} reactorState
		 * @return {ReactorState}
		 */

		function reset(reactorState) {
		  var prevState = reactorState.get('state');

		  return reactorState.withMutations(function (reactorState) {
		    var storeMap = reactorState.get('stores');
		    var storeIds = storeMap.keySeq().toJS();
		    storeMap.forEach(function (store, id) {
		      var storeState = prevState.get(id);
		      var resetStoreState = store.handleReset(storeState);
		      if (resetStoreState === undefined && getOption(reactorState, 'throwOnUndefinedStoreReturnValue')) {
		        throw new Error('Store handleReset() must return a value, did you forget a return statement');
		      }
		      if (getOption(reactorState, 'throwOnNonImmutableStore') && !(0, _immutableHelpers.isImmutableValue)(resetStoreState)) {
		        throw new Error('Store reset state must be an immutable value, did you forget to call toImmutable');
		      }
		      reactorState.setIn(['state', id], resetStoreState);
		    });

		    reactorState.update('storeStates', function (storeStates) {
		      return incrementStoreStates(storeStates, storeIds);
		    });
		    resetDirtyStores(reactorState);
		  });
		}

		/**
		 * @param {ReactorState} reactorState
		 * @param {KeyPath|Gettter} keyPathOrGetter
		 * @return {EvaluateResult}
		 */

		function evaluate(reactorState, keyPathOrGetter) {
		  var state = reactorState.get('state');

		  if ((0, _keyPath.isKeyPath)(keyPathOrGetter)) {
		    // if its a keyPath simply return
		    return evaluateResult(state.getIn(keyPathOrGetter), reactorState);
		  } else if (!(0, _getter.isGetter)(keyPathOrGetter)) {
		    throw new Error('evaluate must be passed a keyPath or Getter');
		  }

		  // Must be a Getter
		  // if the value is cached for this dispatch cycle, return the cached value
		  if (isCached(reactorState, keyPathOrGetter)) {
		    // Cache hit
		    return evaluateResult(getCachedValue(reactorState, keyPathOrGetter), reactorState);
		  }

		  // evaluate dependencies
		  var args = (0, _getter.getDeps)(keyPathOrGetter).map(function (dep) {
		    return evaluate(reactorState, dep).result;
		  });
		  var evaluatedValue = (0, _getter.getComputeFn)(keyPathOrGetter).apply(null, args);

		  return evaluateResult(evaluatedValue, cacheValue(reactorState, keyPathOrGetter, evaluatedValue));
		}

		/**
		 * Returns serialized state for all stores
		 * @param {ReactorState} reactorState
		 * @return {Object}
		 */

		function serialize(reactorState) {
		  var serialized = {};
		  reactorState.get('stores').forEach(function (store, id) {
		    var storeState = reactorState.getIn(['state', id]);
		    var serializedState = store.serialize(storeState);
		    if (serializedState !== undefined) {
		      serialized[id] = serializedState;
		    }
		  });
		  return serialized;
		}

		/**
		 * Returns serialized state for all stores
		 * @param {ReactorState} reactorState
		 * @return {ReactorState}
		 */

		function resetDirtyStores(reactorState) {
		  return reactorState.set('dirtyStores', _immutable2['default'].Set());
		}

		/**
		 * Currently cache keys are always getters by reference
		 * @param {Getter} getter
		 * @return {Getter}
		 */
		function getCacheKey(getter) {
		  return getter;
		}

		/**
		 * @param {ReactorState} reactorState
		 * @param {Getter|KeyPath} keyPathOrGetter
		 * @return {Immutable.Map}
		 */
		function getCacheEntry(reactorState, keyPathOrGetter) {
		  var key = getCacheKey(keyPathOrGetter);
		  return reactorState.getIn(['cache', key]);
		}

		/**
		 * @param {ReactorState} reactorState
		 * @param {Getter} getter
		 * @return {Boolean}
		 */
		function isCached(reactorState, keyPathOrGetter) {
		  var entry = getCacheEntry(reactorState, keyPathOrGetter);
		  if (!entry) {
		    return false;
		  }

		  var storeStates = entry.get('storeStates');
		  if (storeStates.size === 0) {
		    // if there are no store states for this entry then it was never cached before
		    return false;
		  }

		  return storeStates.every(function (stateId, storeId) {
		    return reactorState.getIn(['storeStates', storeId]) === stateId;
		  });
		}

		/**
		 * Caches the value of a getter given state, getter, args, value
		 * @param {ReactorState} reactorState
		 * @param {Getter} getter
		 * @param {*} value
		 * @return {ReactorState}
		 */
		function cacheValue(reactorState, getter, value) {
		  var cacheKey = getCacheKey(getter);
		  var dispatchId = reactorState.get('dispatchId');
		  var storeDeps = (0, _getter.getStoreDeps)(getter);
		  var storeStates = (0, _immutableHelpers.toImmutable)({}).withMutations(function (map) {
		    storeDeps.forEach(function (storeId) {
		      var stateId = reactorState.getIn(['storeStates', storeId]);
		      map.set(storeId, stateId);
		    });
		  });

		  return reactorState.setIn(['cache', cacheKey], _immutable2['default'].Map({
		    value: value,
		    storeStates: storeStates,
		    dispatchId: dispatchId
		  }));
		}

		/**
		 * Pulls out the cached value for a getter
		 */
		function getCachedValue(reactorState, getter) {
		  var key = getCacheKey(getter);
		  return reactorState.getIn(['cache', key, 'value']);
		}

		/**
		 * @param {ReactorState} reactorState
		 * @return {ReactorState}
		 */
		function incrementId(reactorState) {
		  return reactorState.update('dispatchId', function (id) {
		    return id + 1;
		  });
		}

		/**
		 * @param {Immutable.Map} storeStates
		 * @param {Array} storeIds
		 * @return {Immutable.Map}
		 */
		function incrementStoreStates(storeStates, storeIds) {
		  return storeStates.withMutations(function (map) {
		    storeIds.forEach(function (id) {
		      var nextId = map.has(id) ? map.get(id) + 1 : 1;
		      map.set(id, nextId);
		    });
		  });
		}

	/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var _reactorFns = __webpack_require__(8);

		/* eslint-disable no-console */
		/**
		 * Wraps a Reactor.react invocation in a console.group
		 * @param {ReactorState} reactorState
		 * @param {String} type
		 * @param {*} payload
		*/
		exports.dispatchStart = function (reactorState, type, payload) {
		  if (!(0, _reactorFns.getOption)(reactorState, 'logDispatches')) {
		    return;
		  }

		  if (console.group) {
		    console.groupCollapsed('Dispatch: %s', type);
		    console.group('payload');
		    console.debug(payload);
		    console.groupEnd();
		  }
		};

		exports.dispatchError = function (reactorState, error) {
		  if (!(0, _reactorFns.getOption)(reactorState, 'logDispatches')) {
		    return;
		  }

		  if (console.group) {
		    console.debug('Dispatch error: ' + error);
		    console.groupEnd();
		  }
		};

		exports.dispatchEnd = function (reactorState, state, dirtyStores) {
		  if (!(0, _reactorFns.getOption)(reactorState, 'logDispatches')) {
		    return;
		  }

		  if (console.group) {
		    if ((0, _reactorFns.getOption)(reactorState, 'logDirtyStores')) {
		      console.log('Stores updated:', dirtyStores.toList().toJS());
		    }

		    if ((0, _reactorFns.getOption)(reactorState, 'logAppState')) {
		      console.debug('Dispatch done, new state: ', state.toJS());
		    }
		    console.groupEnd();
		  }
		};
		/* eslint-enable no-console */

	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, '__esModule', {
		  value: true
		});

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		var _immutable = __webpack_require__(3);

		var _immutable2 = _interopRequireDefault(_immutable);

		var _utils = __webpack_require__(4);

		var _keyPath = __webpack_require__(11);

		/**
		 * Getter helper functions
		 * A getter is an array with the form:
		 * [<KeyPath>, ...<KeyPath>, <function>]
		 */
		var identity = function identity(x) {
		  return x;
		};

		/**
		 * Checks if something is a getter literal, ex: ['dep1', 'dep2', function(dep1, dep2) {...}]
		 * @param {*} toTest
		 * @return {boolean}
		 */
		function isGetter(toTest) {
		  return (0, _utils.isArray)(toTest) && (0, _utils.isFunction)(toTest[toTest.length - 1]);
		}

		/**
		 * Returns the compute function from a getter
		 * @param {Getter} getter
		 * @return {function}
		 */
		function getComputeFn(getter) {
		  return getter[getter.length - 1];
		}

		/**
		 * Returns an array of deps from a getter
		 * @param {Getter} getter
		 * @return {function}
		 */
		function getDeps(getter) {
		  return getter.slice(0, getter.length - 1);
		}

		/**
		 * Returns an array of deps from a getter and all its deps
		 * @param {Getter} getter
		 * @param {Immutable.Set} existing
		 * @return {Immutable.Set}
		 */
		function getFlattenedDeps(getter, existing) {
		  if (!existing) {
		    existing = _immutable2['default'].Set();
		  }

		  var toAdd = _immutable2['default'].Set().withMutations(function (set) {
		    if (!isGetter(getter)) {
		      throw new Error('getFlattenedDeps must be passed a Getter');
		    }

		    getDeps(getter).forEach(function (dep) {
		      if ((0, _keyPath.isKeyPath)(dep)) {
		        set.add((0, _immutable.List)(dep));
		      } else if (isGetter(dep)) {
		        set.union(getFlattenedDeps(dep));
		      } else {
		        throw new Error('Invalid getter, each dependency must be a KeyPath or Getter');
		      }
		    });
		  });

		  return existing.union(toAdd);
		}

		/**
		 * @param {KeyPath}
		 * @return {Getter}
		 */
		function fromKeyPath(keyPath) {
		  if (!(0, _keyPath.isKeyPath)(keyPath)) {
		    throw new Error('Cannot create Getter from KeyPath: ' + keyPath);
		  }

		  return [keyPath, identity];
		}

		/**
		 * Adds non enumerated __storeDeps property
		 * @param {Getter}
		 */
		function getStoreDeps(getter) {
		  if (getter.hasOwnProperty('__storeDeps')) {
		    return getter.__storeDeps;
		  }

		  var storeDeps = getFlattenedDeps(getter).map(function (keyPath) {
		    return keyPath.first();
		  }).filter(function (x) {
		    return !!x;
		  });

		  Object.defineProperty(getter, '__storeDeps', {
		    enumerable: false,
		    configurable: false,
		    writable: false,
		    value: storeDeps
		  });

		  return storeDeps;
		}

		exports['default'] = {
		  isGetter: isGetter,
		  getComputeFn: getComputeFn,
		  getFlattenedDeps: getFlattenedDeps,
		  getStoreDeps: getStoreDeps,
		  getDeps: getDeps,
		  fromKeyPath: fromKeyPath
		};
		module.exports = exports['default'];

	/***/ },
	/* 11 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, '__esModule', {
		  value: true
		});
		exports.isKeyPath = isKeyPath;
		exports.isEqual = isEqual;

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		var _immutable = __webpack_require__(3);

		var _immutable2 = _interopRequireDefault(_immutable);

		var _utils = __webpack_require__(4);

		/**
		 * Checks if something is simply a keyPath and not a getter
		 * @param {*} toTest
		 * @return {boolean}
		 */

		function isKeyPath(toTest) {
		  return (0, _utils.isArray)(toTest) && !(0, _utils.isFunction)(toTest[toTest.length - 1]);
		}

		/**
		 * Checks if two keypaths are equal by value
		 * @param {KeyPath} a
		 * @param {KeyPath} a
		 * @return {Boolean}
		 */

		function isEqual(a, b) {
		  var iA = _immutable2['default'].List(a);
		  var iB = _immutable2['default'].List(b);

		  return _immutable2['default'].is(iA, iB);
		}

	/***/ },
	/* 12 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, '__esModule', {
		  value: true
		});

		var _immutable = __webpack_require__(3);

		var PROD_OPTIONS = (0, _immutable.Map)({
		  // logs information for each dispatch
		  logDispatches: false,
		  // log the entire app state after each dispatch
		  logAppState: false,
		  // logs what stores changed after a dispatch
		  logDirtyStores: false,
		  // if true, throws an error when dispatching an `undefined` actionType
		  throwOnUndefinedActionType: false,
		  // if true, throws an error if a store returns undefined
		  throwOnUndefinedStoreReturnValue: false,
		  // if true, throws an error if a store.getInitialState() returns a non immutable value
		  throwOnNonImmutableStore: false,
		  // if true, throws when dispatching in dispatch
		  throwOnDispatchInDispatch: false
		});

		exports.PROD_OPTIONS = PROD_OPTIONS;
		var DEBUG_OPTIONS = (0, _immutable.Map)({
		  // logs information for each dispatch
		  logDispatches: true,
		  // log the entire app state after each dispatch
		  logAppState: true,
		  // logs what stores changed after a dispatch
		  logDirtyStores: true,
		  // if true, throws an error when dispatching an `undefined` actionType
		  throwOnUndefinedActionType: true,
		  // if true, throws an error if a store returns undefined
		  throwOnUndefinedStoreReturnValue: true,
		  // if true, throws an error if a store.getInitialState() returns a non immutable value
		  throwOnNonImmutableStore: true,
		  // if true, throws when dispatching in dispatch
		  throwOnDispatchInDispatch: true
		});

		exports.DEBUG_OPTIONS = DEBUG_OPTIONS;
		var ReactorState = (0, _immutable.Record)({
		  dispatchId: 0,
		  state: (0, _immutable.Map)(),
		  stores: (0, _immutable.Map)(),
		  cache: (0, _immutable.Map)(),
		  // maintains a mapping of storeId => state id (monotomically increasing integer whenever store state changes)
		  storeStates: (0, _immutable.Map)(),
		  dirtyStores: (0, _immutable.Set)(),
		  debug: false,
		  // production defaults
		  options: PROD_OPTIONS
		});

		exports.ReactorState = ReactorState;
		var ObserverState = (0, _immutable.Record)({
		  // observers registered to any store change
		  any: (0, _immutable.Set)(),
		  // observers registered to specific store changes
		  stores: (0, _immutable.Map)({}),

		  observersMap: (0, _immutable.Map)({}),

		  nextId: 1
		});
		exports.ObserverState = ObserverState;

	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 5 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(7);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.exports = isFunction;


/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(9),
	    baseEach = __webpack_require__(10),
	    baseIteratee = __webpack_require__(32),
	    isArray = __webpack_require__(27);

	/**
	 * Iterates over elements of `collection` and invokes `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length"
	 * property are iterated like arrays. To avoid this behavior use `_.forIn`
	 * or `_.forOwn` for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @example
	 *
	 * _([1, 2]).forEach(function(value) {
	 *   console.log(value);
	 * });
	 * // => Logs `1` then `2`.
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	 */
	function forEach(collection, iteratee) {
	  return (typeof iteratee == 'function' && isArray(collection))
	    ? arrayEach(collection, iteratee)
	    : baseEach(collection, baseIteratee(iteratee));
	}

	module.exports = forEach;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(11),
	    createBaseEach = __webpack_require__(31);

	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(12),
	    keys = __webpack_require__(14);

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(13);

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(15),
	    baseKeys = __webpack_require__(17),
	    indexKeys = __webpack_require__(18),
	    isArrayLike = __webpack_require__(22),
	    isIndex = __webpack_require__(29),
	    isPrototype = __webpack_require__(30);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;

	  for (var key in object) {
	    if (baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(16);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) ||
	    (typeof object == 'object' && key in object && getPrototype(object) === null);
	}

	module.exports = baseHas;


/***/ },
/* 16 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;

	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}

	module.exports = getPrototype;


/***/ },
/* 17 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;

	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}

	module.exports = baseKeys;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(19),
	    isArguments = __webpack_require__(20),
	    isArray = __webpack_require__(27),
	    isLength = __webpack_require__(25),
	    isString = __webpack_require__(28);

	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) &&
	      (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}

	module.exports = indexKeys;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(21);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	module.exports = isArguments;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(22),
	    isObjectLike = __webpack_require__(26);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(23),
	    isFunction = __webpack_require__(6),
	    isLength = __webpack_require__(25);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(24);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 25 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 27 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(27),
	    isObjectLike = __webpack_require__(26);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 29 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ },
/* 30 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(22);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(33),
	    baseMatchesProperty = __webpack_require__(90),
	    identity = __webpack_require__(102),
	    isArray = __webpack_require__(27),
	    property = __webpack_require__(103);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}

	module.exports = baseIteratee;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(34),
	    getMatchData = __webpack_require__(84),
	    matchesStrictComparable = __webpack_require__(89);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(35),
	    baseIsEqual = __webpack_require__(68);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var stackClear = __webpack_require__(36),
	    stackDelete = __webpack_require__(37),
	    stackGet = __webpack_require__(41),
	    stackHas = __webpack_require__(43),
	    stackSet = __webpack_require__(45);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function Stack(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ },
/* 36 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = { 'array': [], 'map': null };
	}

	module.exports = stackClear;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var assocDelete = __webpack_require__(38);

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocDelete(array, key) : data.map['delete'](key);
	}

	module.exports = stackDelete;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(39);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the associative array.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function assocDelete(array, key) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = array.length - 1;
	  if (index == lastIndex) {
	    array.pop();
	  } else {
	    splice.call(array, index, 1);
	  }
	  return true;
	}

	module.exports = assocDelete;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(40);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 40 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var assocGet = __webpack_require__(42);

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocGet(array, key) : data.map.get(key);
	}

	module.exports = stackGet;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(39);

	/**
	 * Gets the associative array value for `key`.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function assocGet(array, key) {
	  var index = assocIndexOf(array, key);
	  return index < 0 ? undefined : array[index][1];
	}

	module.exports = assocGet;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var assocHas = __webpack_require__(44);

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocHas(array, key) : data.map.has(key);
	}

	module.exports = stackHas;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(39);

	/**
	 * Checks if an associative array value for `key` exists.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function assocHas(array, key) {
	  return assocIndexOf(array, key) > -1;
	}

	module.exports = assocHas;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(46),
	    assocSet = __webpack_require__(66);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__,
	      array = data.array;

	  if (array) {
	    if (array.length < (LARGE_ARRAY_SIZE - 1)) {
	      assocSet(array, key, value);
	    } else {
	      data.array = null;
	      data.map = new MapCache(array);
	    }
	  }
	  var map = data.map;
	  if (map) {
	    map.set(key, value);
	  }
	  return this;
	}

	module.exports = stackSet;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var mapClear = __webpack_require__(47),
	    mapDelete = __webpack_require__(58),
	    mapGet = __webpack_require__(62),
	    mapHas = __webpack_require__(64),
	    mapSet = __webpack_require__(65);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function MapCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapClear;
	MapCache.prototype['delete'] = mapDelete;
	MapCache.prototype.get = mapGet;
	MapCache.prototype.has = mapHas;
	MapCache.prototype.set = mapSet;

	module.exports = MapCache;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(48),
	    Map = __webpack_require__(54);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': Map ? new Map : [],
	    'string': new Hash
	  };
	}

	module.exports = mapClear;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(49);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @returns {Object} Returns the new hash object.
	 */
	function Hash() {}

	// Avoid inheriting from `Object.prototype` when possible.
	Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;

	module.exports = Hash;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(50);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(51);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(6),
	    isHostObject = __webpack_require__(52),
	    isObject = __webpack_require__(7),
	    toSource = __webpack_require__(53);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = isNative;


/***/ },
/* 52 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.exports = isHostObject;


/***/ },
/* 53 */
/***/ function(module, exports) {

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(50),
	    root = __webpack_require__(55);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {var checkGlobal = __webpack_require__(57);

	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	  ? exports
	  : undefined;

	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	  ? module
	  : undefined;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self] && self);

	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window] && window);

	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal ||
	  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
	    freeSelf || thisGlobal || Function('return this')();

	module.exports = root;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(56)(module), (function() { return this; }())))

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 57 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}

	module.exports = checkGlobal;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(54),
	    assocDelete = __webpack_require__(38),
	    hashDelete = __webpack_require__(59),
	    isKeyable = __webpack_require__(61);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapDelete(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map['delete'](key) : assocDelete(data.map, key);
	}

	module.exports = mapDelete;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var hashHas = __webpack_require__(60);

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(hash, key) {
	  return hashHas(hash, key) && delete hash[key];
	}

	module.exports = hashDelete;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(49);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(hash, key) {
	  return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
	}

	module.exports = hashHas;


/***/ },
/* 61 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return type == 'number' || type == 'boolean' ||
	    (type == 'string' && value != '__proto__') || value == null;
	}

	module.exports = isKeyable;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(54),
	    assocGet = __webpack_require__(42),
	    hashGet = __webpack_require__(63),
	    isKeyable = __webpack_require__(61);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapGet(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashGet(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.get(key) : assocGet(data.map, key);
	}

	module.exports = mapGet;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(49);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(hash, key) {
	  if (nativeCreate) {
	    var result = hash[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(54),
	    assocHas = __webpack_require__(44),
	    hashHas = __webpack_require__(60),
	    isKeyable = __webpack_require__(61);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapHas(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashHas(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.has(key) : assocHas(data.map, key);
	}

	module.exports = mapHas;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(54),
	    assocSet = __webpack_require__(66),
	    hashSet = __webpack_require__(67),
	    isKeyable = __webpack_require__(61);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapSet(key, value) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
	  } else if (Map) {
	    data.map.set(key, value);
	  } else {
	    assocSet(data.map, key, value);
	  }
	  return this;
	}

	module.exports = mapSet;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(39);

	/**
	 * Sets the associative array `key` to `value`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function assocSet(array, key, value) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    array.push([key, value]);
	  } else {
	    array[index][1] = value;
	  }
	}

	module.exports = assocSet;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(49);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function hashSet(hash, key, value) {
	  hash[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	}

	module.exports = hashSet;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(69),
	    isObject = __webpack_require__(7),
	    isObjectLike = __webpack_require__(26);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}

	module.exports = baseIsEqual;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(35),
	    equalArrays = __webpack_require__(70),
	    equalByTag = __webpack_require__(72),
	    equalObjects = __webpack_require__(77),
	    getTag = __webpack_require__(78),
	    isArray = __webpack_require__(27),
	    isHostObject = __webpack_require__(52),
	    isTypedArray = __webpack_require__(83);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;

	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(71);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var index = -1,
	      isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      isUnordered = bitmask & UNORDERED_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(array, other);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isUnordered) {
	      if (!arraySome(other, function(othValue) {
	            return arrValue === othValue ||
	              equalFunc(arrValue, othValue, customizer, bitmask, stack);
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, customizer, bitmask, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  return result;
	}

	module.exports = equalArrays;


/***/ },
/* 71 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(73),
	    Uint8Array = __webpack_require__(74),
	    equalArrays = __webpack_require__(70),
	    mapToArray = __webpack_require__(75),
	    setToArray = __webpack_require__(76);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and
	      // booleans to `1` or `0` treating invalid dates coerced to `NaN` as
	      // not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object) ? other != +other : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= UNORDERED_COMPARE_FLAG;
	      stack.set(object, other);

	      // Recursively compare objects (susceptible to call stack limits).
	      return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(55);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(55);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 75 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to an array.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;


/***/ },
/* 76 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(15),
	    keys = __webpack_require__(14);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : baseHas(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  return result;
	}

	module.exports = equalObjects;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(79),
	    Map = __webpack_require__(54),
	    Promise = __webpack_require__(80),
	    Set = __webpack_require__(81),
	    WeakMap = __webpack_require__(82),
	    toSource = __webpack_require__(53);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function getTag(value) {
	  return objectToString.call(value);
	}

	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge, and promises in Node.js.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(50),
	    root = __webpack_require__(55);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(50),
	    root = __webpack_require__(55);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(50),
	    root = __webpack_require__(55);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(50),
	    root = __webpack_require__(55);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(25),
	    isObjectLike = __webpack_require__(26);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	module.exports = isTypedArray;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(85),
	    toPairs = __webpack_require__(86);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = toPairs(object),
	      length = result.length;

	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(7);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var baseToPairs = __webpack_require__(87),
	    keys = __webpack_require__(14);

	/**
	 * Creates an array of own enumerable string keyed-value pairs for `object`
	 * which can be consumed by `_.fromPairs`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @alias entries
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.toPairs(new Foo);
	 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
	 */
	function toPairs(object) {
	  return baseToPairs(object, keys(object));
	}

	module.exports = toPairs;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(88);

	/**
	 * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
	 * of key-value pairs for `object` corresponding to the property names of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the new array of key-value pairs.
	 */
	function baseToPairs(object, props) {
	  return arrayMap(props, function(key) {
	    return [key, object[key]];
	  });
	}

	module.exports = baseToPairs;


/***/ },
/* 88 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 89 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}

	module.exports = matchesStrictComparable;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(68),
	    get = __webpack_require__(91),
	    hasIn = __webpack_require__(99),
	    isKey = __webpack_require__(98),
	    isStrictComparable = __webpack_require__(85),
	    matchesStrictComparable = __webpack_require__(89);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(path, srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(92);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(93),
	    isKey = __webpack_require__(98);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(27),
	    stringToPath = __webpack_require__(94);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	module.exports = castPath;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(95),
	    toString = __webpack_require__(96);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoize(function(string) {
	  var result = [];
	  toString(string).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	module.exports = stringToPath;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(46);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoizing function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result);
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Assign cache to `_.memoize`.
	memoize.Cache = MapCache;

	module.exports = memoize;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(73),
	    isSymbol = __webpack_require__(97);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (value == null) {
	    return '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toString;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(26);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(27),
	    isSymbol = __webpack_require__(97);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol') {
	    return true;
	  }
	  return !isArray(value) &&
	    (isSymbol(value) || reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	      (object != null && value in Object(object)));
	}

	module.exports = isKey;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(100),
	    hasPath = __webpack_require__(101);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;


/***/ },
/* 100 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return key in Object(object);
	}

	module.exports = baseHasIn;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(93),
	    isArguments = __webpack_require__(20),
	    isArray = __webpack_require__(27),
	    isIndex = __webpack_require__(29),
	    isKey = __webpack_require__(98),
	    isLength = __webpack_require__(25),
	    isString = __webpack_require__(28);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var result,
	      index = -1,
	      length = path.length;

	  while (++index < length) {
	    var key = path[index];
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result) {
	    return result;
	  }
	  var length = object ? object.length : 0;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isString(object) || isArguments(object));
	}

	module.exports = hasPath;


/***/ },
/* 102 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(24),
	    basePropertyDeep = __webpack_require__(104),
	    isKey = __webpack_require__(98);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(92);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createMountingNode = createMountingNode;
	exports.isPromise = isPromise;
	exports.isStandardAction = isStandardAction;

	var _isFunction = __webpack_require__(6);

	var _isFunction2 = _interopRequireDefault(_isFunction);

	var _fluxStandardAction = __webpack_require__(106);

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

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.isFSA = isFSA;
	exports.isError = isError;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _lodashIsplainobject = __webpack_require__(107);

	var _lodashIsplainobject2 = _interopRequireDefault(_lodashIsplainobject);

	var validKeys = ['type', 'payload', 'error', 'meta'];

	function isValidKey(key) {
	  return validKeys.indexOf(key) > -1;
	}

	function isFSA(action) {
	  return _lodashIsplainobject2['default'](action) && typeof action.type !== 'undefined' && Object.keys(action).every(isValidKey);
	}

	function isError(action) {
	  return action.error === true;
	}

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var baseFor = __webpack_require__(108),
	    isArguments = __webpack_require__(109),
	    keysIn = __webpack_require__(110);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * The base implementation of `_.forIn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForIn(object, iteratee) {
	  return baseFor(object, iteratee, keysIn);
	}

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * **Note:** This method assumes objects created by the `Object` constructor
	 * have no inherited enumerable properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  var Ctor;

	  // Exit early for non `Object` objects.
	  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
	      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
	    return false;
	  }
	  // IE < 9 iterates inherited properties before own properties. If the first
	  // iterated property is an object's own property then there are no inherited
	  // enumerable properties.
	  var result;
	  // In most environments an object's own properties are iterated before
	  // its inherited properties. If the last iterated property is an object's
	  // own property then there are no inherited enumerable properties.
	  baseForIn(value, function(subValue, key) {
	    result = key;
	  });
	  return result === undefined || hasOwnProperty.call(value, result);
	}

	module.exports = isPlainObject;


/***/ },
/* 108 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	/**
	 * Creates a base function for methods like `_.forIn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = baseFor;


/***/ },
/* 109 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.8 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isArguments;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.8 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var isArguments = __webpack_require__(109),
	    isArray = __webpack_require__(111);

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ },
/* 111 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]',
	    funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 equivalents which return 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isArray;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _connect = __webpack_require__(113);

	var _connect2 = _interopRequireDefault(_connect);

	var _Provider = __webpack_require__(116);

	var _Provider2 = _interopRequireDefault(_Provider);

	var _nuclearMixin = __webpack_require__(117);

	var _nuclearMixin2 = _interopRequireDefault(_nuclearMixin);

	var _provideReactor = __webpack_require__(118);

	var _provideReactor2 = _interopRequireDefault(_provideReactor);

	var _nuclearComponent = __webpack_require__(120);

	var _nuclearComponent2 = _interopRequireDefault(_nuclearComponent);

	exports.connect = _connect2['default'];
	exports.Provider = _Provider2['default'];
	exports.nuclearMixin = _nuclearMixin2['default'];
	exports.provideReactor = _provideReactor2['default'];
	exports.nuclearComponent = _nuclearComponent2['default'];

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = connect;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _reactorShape = __webpack_require__(114);

	var _reactorShape2 = _interopRequireDefault(_reactorShape);

	var _hoistNonReactStatics = __webpack_require__(115);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	function getDisplayName(WrappedComponent) {
	  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	}

	function connect(mapStateToProps) {
	  return function wrapWithConnect(WrappedComponent) {
	    var Connect = (function (_Component) {
	      _inherits(Connect, _Component);

	      function Connect(props, context) {
	        _classCallCheck(this, Connect);

	        _Component.call(this, props, context);
	        this.reactor = props.reactor || context.reactor;
	        this.unsubscribeFns = [];
	        this.updatePropMap(props);
	      }

	      Connect.prototype.resubscribe = function resubscribe(props) {
	        this.unsubscribe();
	        this.updatePropMap(props);
	        this.updateState();
	        this.subscribe();
	      };

	      Connect.prototype.componentWillMount = function componentWillMount() {
	        this.updateState();
	      };

	      Connect.prototype.componentDidMount = function componentDidMount() {
	        this.subscribe(this.props);
	      };

	      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
	        this.unsubscribe();
	      };

	      Connect.prototype.updatePropMap = function updatePropMap(props) {
	        this.propMap = mapStateToProps ? mapStateToProps(props) : {};
	      };

	      Connect.prototype.updateState = function updateState() {
	        var propMap = this.propMap;
	        var stateToSet = {};

	        for (var key in propMap) {
	          var getter = propMap[key];
	          stateToSet[key] = this.reactor.evaluate(getter);
	        }

	        this.setState(stateToSet);
	      };

	      Connect.prototype.subscribe = function subscribe() {
	        var _this = this;

	        var propMap = this.propMap;

	        var _loop = function (key) {
	          var getter = propMap[key];
	          var unsubscribeFn = _this.reactor.observe(getter, function (val) {
	            var _setState;

	            _this.setState((_setState = {}, _setState[key] = val, _setState));
	          });

	          _this.unsubscribeFns.push(unsubscribeFn);
	        };

	        for (var key in propMap) {
	          _loop(key);
	        }
	      };

	      Connect.prototype.unsubscribe = function unsubscribe() {
	        if (this.unsubscribeFns.length === 0) {
	          return;
	        }

	        while (this.unsubscribeFns.length > 0) {
	          this.unsubscribeFns.shift()();
	        }
	      };

	      Connect.prototype.render = function render() {
	        return _react.createElement(WrappedComponent, _extends({
	          reactor: this.reactor
	        }, this.props, this.state));
	      };

	      return Connect;
	    })(_react.Component);

	    Connect.displayName = 'Connect(' + getDisplayName(WrappedComponent) + ')';
	    Connect.WrappedComponent = WrappedComponent;
	    Connect.contextTypes = {
	      reactor: _reactorShape2['default']
	    };
	    Connect.propTypes = {
	      reactor: _reactorShape2['default']
	    };

	    return _hoistNonReactStatics2['default'](Connect, WrappedComponent);
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	exports['default'] = _react.PropTypes.shape({
	  dispatch: _react.PropTypes.func.isRequired,
	  evaluate: _react.PropTypes.func.isRequired,
	  evaluateToJS: _react.PropTypes.func.isRequired,
	  observe: _react.PropTypes.func.isRequired
	});
	module.exports = exports['default'];

/***/ },
/* 115 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';

	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};

	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};

	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent) {
	    var keys = Object.getOwnPropertyNames(sourceComponent);
	    for (var i=0; i<keys.length; ++i) {
	        if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]]) {
	            try {
	                targetComponent[keys[i]] = sourceComponent[keys[i]];
	            } catch (error) {

	            }
	        }
	    }

	    return targetComponent;
	};


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _reactorShape = __webpack_require__(114);

	var _reactorShape2 = _interopRequireDefault(_reactorShape);

	var Provider = (function (_Component) {
	  _inherits(Provider, _Component);

	  Provider.prototype.getChildContext = function getChildContext() {
	    return {
	      reactor: this.reactor
	    };
	  };

	  function Provider(props, context) {
	    _classCallCheck(this, Provider);

	    _Component.call(this, props, context);
	    this.reactor = props.reactor;
	  }

	  Provider.prototype.render = function render() {
	    return _react.Children.only(this.props.children);
	  };

	  return Provider;
	})(_react.Component);

	exports['default'] = Provider;

	Provider.propTypes = {
	  reactor: _reactorShape2['default'].isRequired,
	  children: _react.PropTypes.element.isRequired
	};

	Provider.childContextTypes = {
	  reactor: _reactorShape2['default'].isRequired
	};
	module.exports = exports['default'];

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	/**
	 * Iterate on an object
	 */
	function each(obj, fn) {
	  for (var key in obj) {
	    if (obj.hasOwnProperty(key)) {
	      fn(obj[key], key);
	    }
	  }
	}

	/**
	 * Returns a mapping of the getDataBinding keys to
	 * the reactor values
	 */
	function getState(reactor, data) {
	  var state = {};
	  each(data, function (value, key) {
	    state[key] = reactor.evaluate(value);
	  });
	  return state;
	}

	/**
	 * Mixin expecting a context.reactor on the component
	 *
	 * Should be used if a higher level component has been
	 * wrapped with provideReactor
	 * @type {Object}
	 */
	exports['default'] = {
	  contextTypes: {
	    reactor: _react.PropTypes.object.isRequired
	  },

	  getInitialState: function getInitialState() {
	    if (!this.getDataBindings) {
	      return null;
	    }
	    return getState(this.context.reactor, this.getDataBindings());
	  },

	  componentDidMount: function componentDidMount() {
	    if (!this.getDataBindings) {
	      return;
	    }
	    var component = this;
	    component.__nuclearUnwatchFns = [];
	    each(this.getDataBindings(), function (getter, key) {
	      var unwatchFn = component.context.reactor.observe(getter, function (val) {
	        var newState = {};
	        newState[key] = val;
	        component.setState(newState);
	      });

	      component.__nuclearUnwatchFns.push(unwatchFn);
	    });
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    if (!this.__nuclearUnwatchFns) {
	      return;
	    }
	    while (this.__nuclearUnwatchFns.length) {
	      this.__nuclearUnwatchFns.shift()();
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = provideReactor;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _hoistNonReactStatics = __webpack_require__(115);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _objectAssign = __webpack_require__(119);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	function createComponent(Component, additionalContextTypes) {
	  var componentName = Component.displayName || Component.name;
	  var childContextTypes = _objectAssign2['default']({
	    reactor: _react2['default'].PropTypes.object.isRequired
	  }, additionalContextTypes || {});

	  var ReactorProvider = _react2['default'].createClass({
	    displayName: 'ReactorProvider(' + componentName + ')',

	    propTypes: {
	      reactor: _react2['default'].PropTypes.object.isRequired
	    },

	    childContextTypes: childContextTypes,

	    getChildContext: function getChildContext() {
	      var childContext = {
	        reactor: this.props.reactor
	      };
	      if (additionalContextTypes) {
	        Object.keys(additionalContextTypes).forEach(function (key) {
	          childContext[key] = this.props[key];
	        }, this);
	      }
	      return childContext;
	    },

	    render: function render() {
	      return _react2['default'].createElement(Component, this.props);
	    }
	  });

	  _hoistNonReactStatics2['default'](ReactorProvider, Component);

	  return ReactorProvider;
	}

	/**
	 * Provides reactor prop to all children as React context
	 *
	 * Example:
	 *   var WrappedComponent = provideReactor(Component, {
	 *     foo: React.PropTypes.string
	 *   });
	 *
	 * Also supports the decorator pattern:
	 *   @provideReactor({
	 *     foo: React.PropTypes.string
	 *   })
	 *   class BaseComponent extends React.Component {
	 *     render() {
	 *       return <div/>;
	 *     }
	 *   }
	 *
	 * @method provideReactor
	 * @param {React.Component} [Component] component to wrap
	 * @param {object} additionalContextTypes Additional contextTypes to add
	 * @returns {React.Component|Function} returns function if using decorator pattern
	 */

	function provideReactor(Component, additionalContextTypes) {
	  console.warn('`provideReactor` is deprecated, use `<Provider reactor={reactor} />` instead');
	  // support decorator pattern
	  if (arguments.length === 0 || typeof arguments[0] !== 'function') {
	    additionalContextTypes = arguments[0];
	    return function connectToReactorDecorator(ComponentToDecorate) {
	      return createComponent(ComponentToDecorate, additionalContextTypes);
	    };
	  }

	  return createComponent.apply(null, arguments);
	}

	module.exports = exports['default'];

/***/ },
/* 119 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = nuclearComponent;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _connect = __webpack_require__(113);

	var _connect2 = _interopRequireDefault(_connect);

	/**
	 * Provides dataBindings + reactor
	 * as props to wrapped component
	 *
	 * Example:
	 *   var WrappedComponent = nuclearComponent(Component, function(props) {
	 *     return { counter: 'counter' };
	 *   );
	 *
	 * Also supports the decorator pattern:
	 *   @nuclearComponent((props) => {
	 *     return { counter: 'counter' }
	 *   })
	 *   class BaseComponent extends React.Component {
	 *     render() {
	 *       const { counter, reactor } = this.props;
	 *       return <div/>;
	 *     }
	 *   }
	 *
	 * @method nuclearComponent
	 * @param {React.Component} [Component] component to wrap
	 * @param {Function} getDataBindings function which returns dataBindings to listen for data change
	 * @returns {React.Component|Function} returns function if using decorator pattern
	 */

	function nuclearComponent(Component, getDataBindings) {
	  console.warn('nuclearComponent is deprecated, use `connect()` instead');
	  // support decorator pattern
	  // detect all React Components because they have a render method
	  if (arguments.length === 0 || !Component.prototype.render) {
	    // Component here is the getDataBindings Function
	    return _connect2['default'](Component);
	  }

	  return _connect2['default'](getDataBindings)(Component);
	}

	module.exports = exports['default'];

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createStore;

	var _forEach = __webpack_require__(8);

	var _forEach2 = _interopRequireDefault(_forEach);

	var _isEmpty = __webpack_require__(122);

	var _isEmpty2 = _interopRequireDefault(_isEmpty);

	var _isFunction = __webpack_require__(6);

	var _isFunction2 = _interopRequireDefault(_isFunction);

	var _snakeCase = __webpack_require__(125);

	var _snakeCase2 = _interopRequireDefault(_snakeCase);

	var _nuclearJs = __webpack_require__(1);

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
	          var handlerName = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

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

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var getTag = __webpack_require__(78),
	    isArguments = __webpack_require__(20),
	    isArray = __webpack_require__(27),
	    isArrayLike = __webpack_require__(22),
	    isBuffer = __webpack_require__(123),
	    isFunction = __webpack_require__(6),
	    isObjectLike = __webpack_require__(26),
	    isString = __webpack_require__(28),
	    keys = __webpack_require__(14);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    setTag = '[object Set]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

	/**
	 * Checks if `value` is an empty object, collection, map, or set.
	 *
	 * Objects are considered empty if they have no own enumerable string keyed
	 * properties.
	 *
	 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
	 * jQuery-like collections are considered empty if they have a `length` of `0`.
	 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	 * @example
	 *
	 * _.isEmpty(null);
	 * // => true
	 *
	 * _.isEmpty(true);
	 * // => true
	 *
	 * _.isEmpty(1);
	 * // => true
	 *
	 * _.isEmpty([1, 2, 3]);
	 * // => false
	 *
	 * _.isEmpty({ 'a': 1 });
	 * // => false
	 */
	function isEmpty(value) {
	  if (isArrayLike(value) &&
	      (isArray(value) || isString(value) || isFunction(value.splice) ||
	        isArguments(value) || isBuffer(value))) {
	    return !value.length;
	  }
	  if (isObjectLike(value)) {
	    var tag = getTag(value);
	    if (tag == mapTag || tag == setTag) {
	      return !value.size;
	    }
	  }
	  for (var key in value) {
	    if (hasOwnProperty.call(value, key)) {
	      return false;
	    }
	  }
	  return !(nonEnumShadows && keys(value).length);
	}

	module.exports = isEmpty;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var constant = __webpack_require__(124),
	    root = __webpack_require__(55);

	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	  ? exports
	  : undefined;

	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	  ? module
	  : undefined;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = (freeModule && freeModule.exports === freeExports)
	  ? freeExports
	  : undefined;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = !Buffer ? constant(false) : function(value) {
	  return value instanceof Buffer;
	};

	module.exports = isBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(56)(module)))

/***/ },
/* 124 */
/***/ function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var getter = _.constant(object);
	 *
	 * getter() === object;
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var createCompounder = __webpack_require__(126);

	/**
	 * Converts `string` to
	 * [snake case](https://en.wikipedia.org/wiki/Snake_case).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the snake cased string.
	 * @example
	 *
	 * _.snakeCase('Foo Bar');
	 * // => 'foo_bar'
	 *
	 * _.snakeCase('fooBar');
	 * // => 'foo_bar'
	 *
	 * _.snakeCase('--FOO-BAR--');
	 * // => 'foo_bar'
	 */
	var snakeCase = createCompounder(function(result, word, index) {
	  return result + (index ? '_' : '') + word.toLowerCase();
	});

	module.exports = snakeCase;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(127),
	    deburr = __webpack_require__(128),
	    words = __webpack_require__(130);

	/** Used to compose unicode capture groups. */
	var rsApos = "['\u2019]";

	/** Used to match apostrophes. */
	var reApos = RegExp(rsApos, 'g');

	/**
	 * Creates a function like `_.camelCase`.
	 *
	 * @private
	 * @param {Function} callback The function to combine each word.
	 * @returns {Function} Returns the new compounder function.
	 */
	function createCompounder(callback) {
	  return function(string) {
	    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
	  };
	}

	module.exports = createCompounder;


/***/ },
/* 127 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array.length;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	module.exports = arrayReduce;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var deburrLetter = __webpack_require__(129),
	    toString = __webpack_require__(96);

	/** Used to match latin-1 supplementary letters (excluding mathematical operators). */
	var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;

	/** Used to compose unicode character classes. */
	var rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0';

	/** Used to compose unicode capture groups. */
	var rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']';

	/**
	 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
	 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
	 */
	var reComboMark = RegExp(rsCombo, 'g');

	/**
	 * Deburrs `string` by converting
	 * [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	 * to basic latin letters and removing
	 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to deburr.
	 * @returns {string} Returns the deburred string.
	 * @example
	 *
	 * _.deburr('déjà vu');
	 * // => 'deja vu'
	 */
	function deburr(string) {
	  string = toString(string);
	  return string && string.replace(reLatin1, deburrLetter).replace(reComboMark, '');
	}

	module.exports = deburr;


/***/ },
/* 129 */
/***/ function(module, exports) {

	/** Used to map latin-1 supplementary letters to basic latin letters. */
	var deburredLetters = {
	  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
	  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
	  '\xc7': 'C',  '\xe7': 'c',
	  '\xd0': 'D',  '\xf0': 'd',
	  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
	  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
	  '\xcC': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
	  '\xeC': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
	  '\xd1': 'N',  '\xf1': 'n',
	  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
	  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
	  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
	  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
	  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
	  '\xc6': 'Ae', '\xe6': 'ae',
	  '\xde': 'Th', '\xfe': 'th',
	  '\xdf': 'ss'
	};

	/**
	 * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
	 *
	 * @private
	 * @param {string} letter The matched letter to deburr.
	 * @returns {string} Returns the deburred letter.
	 */
	function deburrLetter(letter) {
	  return deburredLetters[letter];
	}

	module.exports = deburrLetter;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(96);

	/** Used to match non-compound words composed of alphanumeric characters. */
	var reBasicWord = /[a-zA-Z0-9]+/g;

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0',
	    rsDingbatRange = '\\u2700-\\u27bf',
	    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
	    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
	    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
	    rsQuoteRange = '\\u2018\\u2019\\u201c\\u201d',
	    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
	    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
	    rsVarRange = '\\ufe0e\\ufe0f',
	    rsBreakRange = rsMathOpRange + rsNonCharRange + rsQuoteRange + rsSpaceRange;

	/** Used to compose unicode capture groups. */
	var rsApos = "['\u2019]",
	    rsBreak = '[' + rsBreakRange + ']',
	    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
	    rsDigits = '\\d+',
	    rsDingbat = '[' + rsDingbatRange + ']',
	    rsLower = '[' + rsLowerRange + ']',
	    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsUpper = '[' + rsUpperRange + ']',
	    rsZWJ = '\\u200d';

	/** Used to compose unicode regexes. */
	var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')',
	    rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')',
	    rsOptLowerContr = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
	    rsOptUpperContr = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
	    reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

	/** Used to match complex or compound words. */
	var reComplexWord = RegExp([
	  rsUpper + '?' + rsLower + '+' + rsOptLowerContr + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
	  rsUpperMisc + '+' + rsOptUpperContr + '(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')',
	  rsUpper + '?' + rsLowerMisc + '+' + rsOptLowerContr,
	  rsUpper + '+' + rsOptUpperContr,
	  rsDigits,
	  rsEmoji
	].join('|'), 'g');

	/** Used to detect strings that need a more robust regexp to match words. */
	var reHasComplexWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

	/**
	 * Splits `string` into an array of its words.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category String
	 * @param {string} [string=''] The string to inspect.
	 * @param {RegExp|string} [pattern] The pattern to match words.
	 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
	 * @returns {Array} Returns the words of `string`.
	 * @example
	 *
	 * _.words('fred, barney, & pebbles');
	 * // => ['fred', 'barney', 'pebbles']
	 *
	 * _.words('fred, barney, & pebbles', /[^, ]+/g);
	 * // => ['fred', 'barney', '&', 'pebbles']
	 */
	function words(string, pattern, guard) {
	  string = toString(string);
	  pattern = guard ? undefined : pattern;

	  if (pattern === undefined) {
	    pattern = reHasComplexWord.test(string) ? reComplexWord : reBasicWord;
	  }
	  return string.match(pattern) || [];
	}

	module.exports = words;


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createModule;

	var _pickBy = __webpack_require__(132);

	var _pickBy2 = _interopRequireDefault(_pickBy);

	var _isEmpty = __webpack_require__(122);

	var _isEmpty2 = _interopRequireDefault(_isEmpty);

	var _isArray = __webpack_require__(27);

	var _isArray2 = _interopRequireDefault(_isArray);

	var _isFunction = __webpack_require__(6);

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

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(32),
	    basePickBy = __webpack_require__(133);

	/**
	 * Creates an object composed of the `object` properties `predicate` returns
	 * truthy for. The predicate is invoked with two arguments: (value, key).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {Array|Function|Object|string} [predicate=_.identity]
	 *  The function invoked per property.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.pickBy(object, _.isNumber);
	 * // => { 'a': 1, 'c': 3 }
	 */
	function pickBy(object, predicate) {
	  return object == null ? {} : basePickBy(object, baseIteratee(predicate));
	}

	module.exports = pickBy;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var getAllKeysIn = __webpack_require__(134);

	/**
	 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {Function} predicate The function invoked per property.
	 * @returns {Object} Returns the new object.
	 */
	function basePickBy(object, predicate) {
	  var index = -1,
	      props = getAllKeysIn(object),
	      length = props.length,
	      result = {};

	  while (++index < length) {
	    var key = props[index],
	        value = object[key];

	    if (predicate(value, key)) {
	      result[key] = value;
	    }
	  }
	  return result;
	}

	module.exports = basePickBy;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(135),
	    getSymbolsIn = __webpack_require__(137),
	    keysIn = __webpack_require__(139);

	/**
	 * Creates an array of own and inherited enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeysIn(object) {
	  return baseGetAllKeys(object, keysIn, getSymbolsIn);
	}

	module.exports = getAllKeysIn;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(136),
	    isArray = __webpack_require__(27);

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object)
	    ? result
	    : arrayPush(result, symbolsFunc(object));
	}

	module.exports = baseGetAllKeys;


/***/ },
/* 136 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(136),
	    getPrototype = __webpack_require__(16),
	    getSymbols = __webpack_require__(138);

	/** Built-in value references. */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own and inherited enumerable symbol properties
	 * of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbolsIn = !getOwnPropertySymbols ? getSymbols : function(object) {
	  var result = [];
	  while (object) {
	    arrayPush(result, getSymbols(object));
	    object = getPrototype(object);
	  }
	  return result;
	};

	module.exports = getSymbolsIn;


/***/ },
/* 138 */
/***/ function(module, exports) {

	/** Built-in value references. */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	function getSymbols(object) {
	  // Coerce `object` to an object to avoid non-object errors in V8.
	  // See https://bugs.chromium.org/p/v8/issues/detail?id=3443 for more details.
	  return getOwnPropertySymbols(Object(object));
	}

	// Fallback for IE < 11.
	if (!getOwnPropertySymbols) {
	  getSymbols = function() {
	    return [];
	  };
	}

	module.exports = getSymbols;


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var baseKeysIn = __webpack_require__(140),
	    indexKeys = __webpack_require__(18),
	    isIndex = __webpack_require__(29),
	    isPrototype = __webpack_require__(30);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  var index = -1,
	      isProto = isPrototype(object),
	      props = baseKeysIn(object),
	      propsLength = props.length,
	      indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;

	  while (++index < propsLength) {
	    var key = props[index];
	    if (!(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var Reflect = __webpack_require__(141),
	    iteratorToArray = __webpack_require__(142);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Built-in value references. */
	var enumerate = Reflect ? Reflect.enumerate : undefined,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * The base implementation of `_.keysIn` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  object = object == null ? object : Object(object);

	  var result = [];
	  for (var key in object) {
	    result.push(key);
	  }
	  return result;
	}

	// Fallback for IE < 9 with es6-shim.
	if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
	  baseKeysIn = function(object) {
	    return iteratorToArray(enumerate(object));
	  };
	}

	module.exports = baseKeysIn;


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(55);

	/** Built-in value references. */
	var Reflect = root.Reflect;

	module.exports = Reflect;


/***/ },
/* 142 */
/***/ function(module, exports) {

	/**
	 * Converts `iterator` to an array.
	 *
	 * @private
	 * @param {Object} iterator The iterator to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function iteratorToArray(iterator) {
	  var data,
	      result = [];

	  while (!(data = iterator.next()).done) {
	    result.push(data.value);
	  }
	  return result;
	}

	module.exports = iteratorToArray;


/***/ },
/* 143 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ }
/******/ ])
});
;