import createStore from 'frux/core/create-store';
import registerModule from 'frux/core/register-module';

import * as counterHandlers from 'frux/modules/counter/handlers';
import * as actions from 'frux/modules/counter/actions';
import * as getters from 'frux/modules/counter/getters';


const initialState = {
  count: 0
};

const stores = {
  counter: createStore(initialState, counterHandlers)
};

export default registerModule({ stores, actions, getters });
