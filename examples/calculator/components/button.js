import React from 'react';

const operators = {
  43: '+',
  45: '-',
  46: '.',
  42: '\u00D7',
  47: '\u00F7'
};

export default (props) => {
  const { value, onAction, ...rest } = props;
  const handler = () => onAction(value);

  return (
    <button
      type='button'
      {...rest}
      onClick={handler}
    >
      {operators[value.toString().charCodeAt(0)] || value}
    </button>
  );
}
