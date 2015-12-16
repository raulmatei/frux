import React, { Component } from 'react';
import frux, { actions } from 'frux';

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
  static getDataBindings(getters) {
    return {
      count: getters.counter.count
    };
  }

  render() {
    const { count } = this.props;
    const shouldDisableDecrement = count === 0;

    return (
      <div>
        <h1>Count: {count}</h1>
        <button
          type='button'
          style={btnStyles.increment}
          onClick={actions.counter.increment}
        >
          <strong>+</strong>
        </button>

        <button
          type='button'
          style={btnStyles.decrement}
          disabled={shouldDisableDecrement}
          onClick={actions.counter.decrement}
        >
          <strong>-</strong>
        </button>

        <button
          type='button'
          style={btnStyles.reset}
          onClick={actions.counter.reset}
        >
          Reset
        </button>
      </div>
    );
  }
}

export default frux.connect(Counter);
