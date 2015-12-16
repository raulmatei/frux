import frux from 'frux';
import operations from './modules/operations';
import Calculator from './components/calculator';

frux.initialize({
  component: Calculator,
  options: { debug: true },
  operations
});
