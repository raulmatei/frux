import isFunction from 'lodash/isFunction';

export default function isPromise(value) {
  return !!value && (value instanceof Promise || isFunction(value.then));
}
