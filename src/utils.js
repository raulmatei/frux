import isFunction from 'lodash/isFunction';
import { isFSA } from 'flux-standard-action';

export function createMountingNode() {
  const bodyElement = document.body;
  const nextNode = bodyElement.firstChild;
  const rootElement = document.createElement('div');

  bodyElement.insertBefore(rootElement, nextNode);
  return rootElement;
}

export function isPromise(value) {
  return !!value && (value instanceof Promise || isFunction(value.then));
}

export function isStandardAction(value) {
  return isFSA(value);
}
