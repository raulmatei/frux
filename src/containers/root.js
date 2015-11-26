import React, { Component, Children } from 'react';
import context from 'frux/main';

class Root extends Component {
  render() {
    return Children.only(this.props.children);
  }
}

export default context.provide(Root);
