import React, { Component, Children } from 'react';
import { provideReactor } from 'nuclear-js-react-addons';

class Root extends Component {
  render() {
    return Children.only(this.props.children);
  }
}

export default provideReactor(Root);
