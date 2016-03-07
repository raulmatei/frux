import pickBy from 'lodash/pickBy';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';

export default function createModule({ stores, actions, getters }) {
  return (name, target, reactor) => {
    if (!isEmpty(stores)) {
      reactor.registerStores(stores);
    }

    target.actions[name] = pickBy(actions, isFunction);
    target.getters[name] = pickBy(getters, isArray);
  };
}
