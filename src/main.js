import invariant from 'invariant';
import isFunction from 'lodash/lang/isFunction';
import { provideReactor, nuclearComponent } from 'nuclear-js-react-addons';

const actions = {};
const getters = {};
const provide = provideReactor;

function connect(BaseComponent) {
  const displayName = BaseComponent.displayName || BaseComponent.name;
  const getDataBindings = BaseComponent.getDataBindings;

  invariant(
    isFunction(getDataBindings),
    `${displayName} component should implement 'getDataBindings' static method`
  );

  return nuclearComponent(BaseComponent, (props) => getDataBindings());
}

export default {
  provide,
  connect,
  actions,
  getters
};
