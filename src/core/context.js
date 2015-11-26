import invariant from 'invariant';
import { provideReactor, nuclearComponent } from 'nuclear-js-react-addons';

const actions = {};
const getters = {};
const provide = provideReactor;

function connect(BaseComponent) {
  const containerName = BaseComponent.displayName || BaseComponent.name;
  const dataBindings = BaseComponent.getDataBindings;

  invariant(
    (dataBindings || typeof dataBindings === 'function'),
    `${containerName} component should implement 'getDataBindings' static method`
  );

  return nuclearComponent(BaseComponent, (props) => dataBindings());
}

export default {
  provide,
  connect,
  actions,
  getters
};
