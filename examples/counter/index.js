import frux from '../../src/frux';
import counter from './modules/counter';
import Counter from './components/counter';

frux.initialize({
  component: Counter,
  options: { debug: true },
  counter
});