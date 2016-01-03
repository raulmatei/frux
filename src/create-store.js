import forEach from 'lodash/collection/forEach';
import isEmpty from 'lodash/lang/isEmpty';
import isFunction from 'lodash/lang/isFunction';
import snakeCase from 'lodash/string/snakeCase';
import { Store, toImmutable } from 'nuclear-js';

export default function createStore(initialState, handlers) {
  const immutableState = toImmutable(initialState);

  const spec = {
    getInitialState() {
      return immutableState;
    },

    initialize() {
      if (!isEmpty(handlers)) {
        forEach(handlers, (handler, handlerName = '') => {
          const ACTION_NAME = snakeCase(handlerName).toUpperCase();

          if (!ACTION_NAME) {
            throw new Error('Frux#createStore: handler must be a named function.');
          }

          if (isFunction(handler)) {
            this.on(ACTION_NAME, (currentState, payload) => {
              return handler.call(null, currentState, payload, immutableState);
            });
          }
        });
      }
    }
  };

  return new Store(spec);
}
