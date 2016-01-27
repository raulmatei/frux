import { Immutable } from 'nuclear-js';
import frux from 'frux';

import handlers from './handlers';
import * as actions from './actions';
import * as getters from './getters';


const initialState = {
  expression: [0],
  result: 0
};

const stores = {
  operations: frux.createStore(initialState, handlers)
};

export default frux.createModule({ stores, actions, getters });
