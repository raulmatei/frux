import React, { PropTypes } from 'react';
import { Reactor } from 'nuclear-js';
import { render } from 'react-dom';
import invariant from 'invariant';
import isFunction from 'lodash/isFunction';
import forEach from 'lodash/forEach';
import { createMountingNode } from './utils';
import { connect as nuclearConnect, Provider } from 'nuclear-js-react-addons';

export createStore from './create-store';
export createModule from './create-module';

let reactor = null;

const actions = {};
const getters = {};
const middlewaresRegistry = [];

export function connect(BaseComponent) {
  const displayName = BaseComponent.displayName || BaseComponent.name;
  const getDataBindings = BaseComponent.getDataBindings;

  invariant(
    isFunction(getDataBindings),
    `${displayName} component should implement 'getDataBindings' static method`
  );

  return nuclearConnect((props) => getDataBindings(getters))(BaseComponent);
}

export function mount(component, node) {
  const WrappedWithProvider = (
    <Provider reactor={reactor}>
      {component}
    </Provider>
  );

  invariant(
    component,
    'frux#mount: No component was provided.'
  );

  if (process.env.IS_REACT_NATIVE) {
    return WrappedWithProvider;
  }

  render(WrappedWithProvider, node || createMountingNode());
}

export function use(...middlewares) {
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

export function registerModule(name, module) {
  const target = { actions, getters };

  module(name, target, reactor);
}

export function initialize({ options, ...modules }) {
  reactor = new Reactor(options);

  forEach(modules, (module, name) => {
    if (isFunction(module)) {
      registerModule(name, module);
    }
  });

  return { actions, getters };
}

export function dispatch({ type, payload }) {
  reactor.dispatch(type, payload);
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
