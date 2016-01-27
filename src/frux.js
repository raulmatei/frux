import React, { PropTypes } from 'react';
import { Reactor } from 'nuclear-js';
import { render } from 'react-dom';
import invariant from 'invariant';
import isFunction from 'lodash/isFunction';
import forEach from 'lodash/forEach';
import { createMountingNode } from './utils';
import { connect as nuclearConnect, Provider } from 'nuclear-js-react-addons';
import createStore from './create-store';
import createModule from './create-module';

let reactor = null;

const actions = {};
const getters = {};

function connect(BaseComponent) {
  const displayName = BaseComponent.displayName || BaseComponent.name;
  const getDataBindings = BaseComponent.getDataBindings;

  invariant(
    isFunction(getDataBindings),
    `${displayName} component should implement 'getDataBindings' static method`
  );

  return nuclearConnect((props) => getDataBindings(getters))(BaseComponent);
}

function mount(component, node) {
  const mountNode = node || createMountingNode();

  invariant(
    component,
    'frux#mount: No component was provided.'
  );

  render(
    <Provider reactor={reactor}>
      {component}
    </Provider>,
    mountNode
  );
}

function registerModule(name, module) {
  const target = { actions, getters };

  if (isFunction(module)) {
    module(name, target, reactor);
  }
}

function initialize({ options, ...modules }) {
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

export default {
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
