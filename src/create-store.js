import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import {Store, toImmutable} from 'nuclear-js';

export default function createStore(initialState, handlers) {
  const immutableState = toImmutable(initialState);

  const spec = {
    getInitialState() {
      return immutableState;
    },

    initialize() {
      if (!isEmpty(handlers)) {
        forEach(handlers, (handler, handlerName = '') => {
          if (!handlerName) {
            throw new Error('Frux#createStore: handler must be a named function.');
          }

          if (isFunction(handler)) {
            this.on(handlerName, (currentState, payload) => {
              return handler.call(null, currentState, payload, immutableState);
            });
          }
        });
      }
    }
  };

  return new Store(spec);
}
