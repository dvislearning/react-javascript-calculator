import React, { Component } from 'react';
import './App.css';
import { processEquals, processInput, evalExpression } from './calc-logic.js';
import { inputs } from './inputs.js';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

// REDUX

export const CLEAR = 'CLEAR';
export const EQUALS = 'EQUALS';
export const REGULARKEY = 'REGULARKEY';


const actionClear = (userInput) => {
  return {
    type: CLEAR,
    input: userInput
  }
};

const actionEquals = (userInput) => {
  return {
    type: EQUALS,
    input: userInput
  }
};


const actionRegularKey = (userInput) => {
  return {
    type: REGULARKEY,
    input: userInput
  }
};


const displayReducer = (state = [0], action) => {
  switch(action.type) {
      case CLEAR:
          return [0];
      case EQUALS:
          let verifiedEqualsRequest = processEquals(state).join('');
          let resultDisplayed = [evalExpression(verifiedEqualsRequest)];
          return [resultDisplayed];
      case REGULARKEY:
          let processedDisplay = processInput(action.input.key, state);
          return [processedDisplay];
      default:
          return state;
  };
};

console.log(displayReducer(["7", "*", "8"], actionRegularKey({key: "8"})));

const store = createStore(displayReducer);



// REACT


const CalcButtons = (props) => {
  console.log(props)
  const buttons = inputs.map(function(button) {
    return <button 
              className={button.className} 
              id={button.id} 
              key={button.key} 
              onClick={props.onClick}>
                {button.key === "Escape" ? "AC" : button.key}
          </button>
  });
  
  return (
    <div id="calc-inputs">
        {buttons}
    </div>
  );
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state={
      display: ["0"]
    }

    this.handleEvent = this.handleEvent.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleEvent(userInput) {
    let currentDisplay = this.state.display;
    let processedDisplay;

    if(userInput.id === "clear") {
      processedDisplay = ["0"];
    }
    else if(userInput.id === "equals") {
      let verifiedEqualsRequest = processEquals(currentDisplay).join('');
      processedDisplay = [evalExpression(verifiedEqualsRequest)];
    }
    else {
      processedDisplay = processInput(userInput.key, currentDisplay);
    }

    this.setState({
      display: processedDisplay
    }) 
  }

  handlePress(event) {
    let pressTarget = inputs.filter(input => input.key === event.key);
    if(pressTarget.length){ 
      this.handleEvent(pressTarget[0]);
    }
  }

  handleClick(event) {
    if(event.target.className === "button"){
      const clickTarget = inputs.filter((input) => input.id === event.target.id)[0];
      this.handleEvent(clickTarget);
    }
  }

  componentDidMount() {
    document.getElementById('calc-inputs').addEventListener('keydown', this.handlePress);
  }

  componentWillUnMmount() {
    document.getElementById('calc-inputs').removeEventListener('keydown', this.handlePress);
  }

  render() {
    return (
      <div id="App">
        <div id="calculator">
          <div id="calc-header">
            <span id="header-text">
              Calculator by D.V.
            </span>
          </div>
  
          <div id="display">
            <div id="display-text"> 
              {this.state.display.join('')}
            </div>
          </div>
  
          <div id="calc-bottom">
            <CalcButtons onClick={this.handleClick} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
