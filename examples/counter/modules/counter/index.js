import frux from '../../../../src/frux';

import * as counterHandlers from './handlers';
import * as actions from './actions';
import * as getters from './getters';

const initialState = {
  count: 0
};

const stores = {
  counter: frux.createStore(initialState, counterHandlers)
};

export default frux.createModule({ stores, actions, getters });
