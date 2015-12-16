import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import frux, { actions } from 'frux';
import Button from './button';
import Result from './result';
import './calculator.less';

const BACKSPACE = '\u232B';

class Calculator extends Component {
  static getDataBindings(getters) {
    return {
      expression: getters.operations.expression
    };
  }

  handleOperator(operator) {
    actions.operations.sendOperator(operator);
  }

  handleAppendNumber(value) {
    actions.operations.inputNumber(value);
  }

  handleKeyPress(event) {
    const { keyCode, which } = event;
    const char = String.fromCharCode(which);
    const { inputNumber, computeResult, sendOperator } = actions.operations;

    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (which >= 48 && which <= 57) {
      return inputNumber(char);
    }

    if ((which >= 42 && which <= 43) || (which >= 45 && which <= 47)) {
      return sendOperator(char);
    }
  }

  handleKeyUp(event) {
    const { keyCode } = event;
    const { reset, deleteLast, computeResult } = actions.operations;

    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (keyCode === 13) {
      return computeResult();
    }

    if (keyCode === 27) {
      return reset();
    }

    if (keyCode === 8) {
      return deleteLast();
    }
  }

  focusOnHiddenInput() {
    this.input.focus();
  }

  componentDidMount() {
    this.input = ReactDOM.findDOMNode(this.refs.Input);
    this.focusOnHiddenInput();
    window.addEventListener('mouseup', this.focusOnHiddenInput.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.focusOnHiddenInput.bind(this));
  }

  render() {
    const { expression } = this.props;

    return (
      <div className='calculator-viewport'>
        <table>
          <tbody>
            <tr>
              <td colSpan='4'>
                <div className='calculator-result'>
                  <Result expression={expression}/>
                  <div className='hidden'>
                    <input
                      ref='Input'
                      onBlur={this.focusOnHiddenInput.bind(this)}
                      onKeyUp={this.handleKeyUp.bind(this)}
                      onKeyPress={this.handleKeyPress.bind(this)}
                    />
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <Button value='CE' onAction={actions.operations.deleteLast}/>
              </td>
              <td>
                <Button value='C' onAction={actions.operations.reset}/>
              </td>
              <td>
                <Button
                  value={BACKSPACE}
                  className='backspace'
                  onAction={actions.operations.deleteLast}
                />
              </td>
              <td>
                <Button
                  value='/'
                  className='signs'
                  onAction={this.handleOperator}
                />
              </td>
            </tr>

            <tr>
              <td>
                <Button value={1} onAction={this.handleAppendNumber}/>
              </td>
              <td>
                <Button value={2} onAction={this.handleAppendNumber}/>
              </td>
              <td>
                <Button value={3} onAction={this.handleAppendNumber}/>
              </td>
              <td>
                <Button
                  value='*'
                  className='signs'
                  onAction={this.handleOperator}
                />
              </td>
            </tr>

            <tr>
              <td>
                <Button value={4} onAction={this.handleAppendNumber}/>
              </td>
              <td>
                <Button value={5} onAction={this.handleAppendNumber}/>
              </td>
              <td>
                <Button value={6} onAction={this.handleAppendNumber}/>
              </td>
              <td>
                <Button
                  value='-'
                  className='signs'
                  onAction={this.handleOperator}
                />
              </td>
            </tr>

            <tr>
              <td>
                <Button value={7} onAction={this.handleAppendNumber}/>
              </td>
              <td>
                <Button value={8} onAction={this.handleAppendNumber}/>
              </td>
              <td>
                <Button value={9} onAction={this.handleAppendNumber}/>
              </td>
              <td>
                <Button
                  value='+'
                  className='signs'
                  onAction={this.handleOperator}
                />
              </td>
            </tr>

            <tr>
              <td colSpan={2}>
                <Button
                  value={0}
                  className='wider'
                  onAction={this.handleAppendNumber}
                />
              </td>
              <td>
                <Button
                  value='.'
                  className='signs'
                  onAction={this.handleOperator}
                />
              </td>
              <td>
                <Button
                  value='='
                  className='equal'
                  onAction={actions.operations.computeResult}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default frux.connect(Calculator);
