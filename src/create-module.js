import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';

export default function createModule(descriptor) {
  const looksLikeGetter = (value) => isFunction(value) || isArray(value);

  if (!descriptor || (!isObject(descriptor) || isArray(descriptor))) {
    throw new Error(
      'createModule() requires a descriptor object ' +
      '`{ stores, actions, getters }` to be passed as an argument'
    );
  }

  return (name, target, reactor) => {
    const { stores = {}, actions = {}, getters = {} } = descriptor;

    if (!isEmpty(stores)) {
      reactor.registerStores(stores);
    }

    target.actions[name] = pickBy(actions, isFunction);
    target.getters[name] = pickBy(getters, looksLikeGetter);
  };
}
