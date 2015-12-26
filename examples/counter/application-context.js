import frux from 'frux';
import counter from './modules/counter';

export const { actions, getters } = frux.initialize({
  options: { debug: true },
  counter
});