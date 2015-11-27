import forEach from 'lodash/collection/forEach';

let cachedReactor = {};

export default function injectModules({ context, reactor, ...modules }) {
  cachedReactor = reactor;
  forEach(modules, (module) => module(context, reactor));
}

export function dispatch({ type, ...payload }) {
  cachedReactor.dispatch(type, payload);
}

export function evaluate(path, callback) {
  cachedReactor.evaluate(path, callback);
}
