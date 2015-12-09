import React from 'react';
import invariant from 'invariant';
import { render } from 'react-dom';
import { Reactor } from 'nuclear-js';
import forEach from 'lodash/collection/forEach';
import isFunction from 'lodash/lang/isFunction';
import { nuclearComponent } from 'nuclear-js-react-addons';
import Root from 'frux/containers/root';
import createStore from 'frux/create-store';
import createModule from 'frux/create-module';

let reactor = null;
export const actions = {};
export const getters = {};

function connect(BaseComponent) {
  const displayName = BaseComponent.displayName || BaseComponent.name;
  const getDataBindings = BaseComponent.getDataBindings;

  invariant(
    isFunction(getDataBindings),
    `${displayName} component should implement 'getDataBindings' static method`
  );

  return nuclearComponent(BaseComponent, (props) => getDataBindings());
}

function createMountingNode() {
  const bodyElement = document.body;
  const nextNode = bodyElement.firstChild;
  const rootElement = document.createElement('div');

  bodyElement.insertBefore(rootElement, nextNode);
  return rootElement;
}

function mount(component, node = createMountingNode()) {
  render(
    <Root reactor={reactor}>
      {React.createElement(component)}
    </Root>,
    node
  );
}

function initialize({ component, node, options, ...modules }) {
  const target = { actions, getters };

  invariant(
    component,
    'frux#initialize: No component was provided.'
  );

  reactor = new Reactor(options);

  forEach(modules, (module, name) => {
    if (isFunction(module)) {
      module(name, target, reactor);
    }
  });

  mount(component, node);
}

export function batch(callback) {
  reactor.batch(callback);
}

export function dispatch({ type, payload }) {
  reactor.dispatch(type, payload);
}

export function evaluate(getter) {
  return reactor.evaluate(getter);
}

export function observe(getter, callback) {
  reactor.observe(getter, callback);

  return {
    unobserve(getter, callback) {
      reactor.unobserve(getter, callback);
    }
  };
}

export function reset() {
  reactor.reset();
}

export default {
  initialize,
  createModule,
  createStore,
  batch,
  evaluate,
  dispatch,
  observe,
  reset,
  connect
};