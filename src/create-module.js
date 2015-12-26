import pick from 'lodash/object/pick';
import isEmpty from 'lodash/lang/isEmpty';
import isArray from 'lodash/lang/isArray';
import isFunction from 'lodash/lang/isFunction';

export default function createModule({ stores, actions, getters }) {
  return (name, target, reactor) => {
    if (!isEmpty(stores)) {
      reactor.registerStores(stores);
    }

    target.actions[name] = pick(actions, isFunction);
    target.getters[name] = pick(getters, isArray);
  };
}
