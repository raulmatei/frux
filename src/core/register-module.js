import isEmpty from 'lodash/lang/isEmpty';

export default function registerModule({ stores, actions, getters }) {
  return (target, reactor) => {
    if (!isEmpty(stores)) {
      reactor.registerStores(stores);
    }

    target.actions = { ...target.actions, ...actions };
    target.getters = { ...target.getters, ...getters };
  };
}
