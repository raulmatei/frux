import React, { Component } from 'react';
import context from 'frux/main';

const commonStyles = {
  width: 32,
  height: 32,
  marginLeft: 2,
  color: 'white',
  border: '0 none',
  fontSize: 18
};

const btnStyles = {
  increment: {
    ...commonStyles,
    marginLeft: 0,
    backgroundColor: 'green'
  },

  decrement: {
    ...commonStyles,
    backgroundColor: 'red'
  },

  reset: {
    ...commonStyles,
    width: 'auto',
    color: '#ccc',
    backgroundColor: 'transparent'
  }
};

class Counter extends Component {
  static getDataBindings() {
    return {
      count: context.getters.count
    };
  }

  render() {
    const { count } = this.props;
    const shouldDisableDecrement = count === 0;

    return (
      <div>
        <h1>Count: {this.props.count}</h1>
        <button
          type='button'
          style={btnStyles.increment}
          onClick={context.actions.increment}
        >
          <strong>+</strong>
        </button>

        <button
          type='button'
          style={btnStyles.decrement}
          disabled={shouldDisableDecrement}
          onClick={context.actions.decrement}
        >
          <strong>-</strong>
        </button>

        <button
          type='button'
          style={btnStyles.reset}
          onClick={context.actions.reset}
        >
          Reset
        </button>
      </div>
    );
  }
}

export default context.connect(Counter);
