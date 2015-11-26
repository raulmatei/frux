import forEach from 'lodash/collection/forEach';

let target = {};

export default function createInterface(spec) {
  const { context, reactor, ...modules } = spec;

  target = reactor;

  forEach(modules, (module) => {
    module(context, reactor);
  });
}

export function dispatch({ type, ...payload }) {
  target.dispatch(type, payload);
}

export function evaluate(path, callback) {
  target.evaluate(path, callback);
}
