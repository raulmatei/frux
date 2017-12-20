import React from 'react';
import {render} from 'react-dom';
import {Reactor} from 'nuclear-js';
import {connect as nuclearConnect, Provider} from 'nuclear-js-react-addons';
import invariant from 'invariant';
import isFunction from 'lodash/isFunction';
import forEach from 'lodash/forEach';
import createMountNode from './create-mount-node';
import createStore from './create-store';
import createModule from './create-module';
import {canUseDOM} from './env';

let reactor = null;
let batchDispatchInvocation = (callback) => callback();

const actions = {};
const getters = {};
const middlewaresRegistry = [];

function connect(BaseComponent) {
  const displayName = BaseComponent.displayName || BaseComponent.name;
  const getDataBindings = BaseComponent.getDataBindings;

  invariant(
    isFunction(getDataBindings),
    `${displayName} component should implement 'getDataBindings' static method`
  );

  return nuclearConnect((props) => getDataBindings(getters, props))(BaseComponent);
}

function mount(component, node) {
  const WrappedWithProvider = (
    <Provider reactor={reactor}>
      {component}
    </Provider>
  );

  invariant(
    component,
    'frux#mount: No component was provided.'
  );

  if (canUseDOM) {
    return render(WrappedWithProvider, node || createMountNode());
  }

  return WrappedWithProvider;
}

function use(...middlewares) {
  middlewares.forEach((middleware) => {
    invariant(
      isFunction(middleware),
      `Check your middlewares and make sure they are all functions.`
    );

    middlewaresRegistry.push(middleware);
  });

  // We just keep track of middlewares, nothing's yet implemented
  console.log(middlewaresRegistry);
}

function registerModule(name, module) {
  const target = { actions, getters };

  module(name, target, reactor);
}

function initialize({ options, ...modules }) {
  const { dispatchInterceptor, ...rest } = options;

  if (isFunction(dispatchInterceptor)) {
    batchDispatchInvocation = dispatchInterceptor;
  }

  reactor = new Reactor(rest);

  forEach(modules, (module, name) => {
    if (isFunction(module)) {
      registerModule(name, module);
    }
  });

  return { actions, getters };
}

export function dispatch({ type, payload }) {
  batchDispatchInvocation(() => reactor.dispatch(type, payload));
}

export function batch(callback) {
  reactor.batch(callback);
}

export function evaluate(getter) {
  return reactor.evaluate(getter);
}

export function observe(getter, callback) {
  reactor.observe(getter, callback);

  return {
    unobserve() {
      reactor.unobserve(getter, callback);
    }
  };
}

export function serialize(storeName) {
  if (typeof storeName !== 'string' || !storeName) {
    return reactor.serialize();
  }

  return reactor.evaluateToJS([storeName]);
}

export function loadState(stores) {
  reactor.loadState(stores);
}

export function reset() {
  reactor.reset();
}

export {
  Immutable,
  isKeyPath,
  isGetter,
  toJS,
  toImmutable,
  isImmutable
} from 'nuclear-js';

export default {
  use,
  initialize,
  mount,
  registerModule,
  createModule,
  createStore,
  dispatch,
  batch,
  evaluate,
  observe,
  loadState,
  serialize,
  reset,
  connect
};
