import React from 'react';

const operators = {
  43: '+',
  45: '-',
  46: '.',
  42: '\u00D7',
  47: '\u00F7'
};

export default (props) => {
  const { expression } = props;

  if (!expression || !expression.size) {
    return (
      <div>
        <div className='expression'></div>
        <div className='last'>
          <span>0</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='expression'></div>
      <div className='last'>
        {
          expression.map((item, index) => {
            if (typeof item === 'string' && item !== '.') {
              return (
                <span key={index} className='operator'>
                  {operators[item.charCodeAt(0)]}
                </span>
              );
            }

            return (
              <span key={index}>{item}</span>
            );
          })
        }
      </div>
    </div>
  );
}
