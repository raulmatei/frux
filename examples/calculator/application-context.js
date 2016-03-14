import frux from 'frux';
import operations from './modules/operations';

export const { actions, getters } = frux.initialize({
  options: { debug: true },
  operations
});
