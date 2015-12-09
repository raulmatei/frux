import isEmpty from 'lodash/lang/isEmpty';

export default function createModule({ stores, actions, getters }) {
  return (name, target, reactor) => {
    if (!isEmpty(stores)) {
      reactor.registerStores(stores);
    }

    target.actions[name] = actions;
    target.getters[name] = getters;
  };
}
