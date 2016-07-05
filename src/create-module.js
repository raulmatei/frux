import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';
import invariant from 'invariant';

export default function createModule(descriptor) {
  const looksLikeGetter = (value) => isFunction(value) || isArray(value);

  invariant(
    isPlainObject(descriptor),

    '`createModule()` requires a descriptor object ' +
    '`{ stores, actions, getters }` to be passed as an argument'
  );

  return (name, target, reactor) => {
    const { stores = {}, actions = {}, getters = {} } = descriptor;

    if (!isEmpty(stores)) {
      reactor.registerStores(stores);
    }

    target.actions[name] = pickBy(actions, isFunction);
    target.getters[name] = pickBy(getters, looksLikeGetter);
  };
}
