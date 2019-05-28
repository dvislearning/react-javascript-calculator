import React, { Component } from 'react';
import './App.css';
import './calc-logic.js';
import * as Calc from './calc-logic.js';


const inputs = [
  {"id":"one", "className":"button", "key":"1"},
  {"id":"two", "className":"button", "key":"2"},
  {"id":"three", "className":"button", "key":"3"},
  {"id":"divide", "className":"button", "key":"/"},
  {"id":"four", "className":"button", "key":"4"},
  {"id":"five", "className":"button", "key":"5"},
  {"id":"six", "className":"button", "key":"6"},
  {"id":"multiply", "className":"button", "key":"*"},
  {"id":"seven", "className":"button", "key":"7"},
  {"id":"eight", "className":"button", "key":"8"},
  {"id":"nine", "className":"button", "key":"9"},
  {"id":"subtract", "className":"button", "key":"-"},
  {"id":"zero", "className":"button", "key":"0"},
  {"id":"decimal", "className":"button", "key":"."},
  {"id":"equals", "className":"button", "key":"="},
  {"id":"add", "className":"button", "key":"+"},
  {"id":"clear", "className":"button", "key":"Escape"}
];

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
      let verifiedEqualsRequest = Calc.processEquals(currentDisplay).join('');
      processedDisplay = [Calc.evalExpression(verifiedEqualsRequest)];
    }
    else {
      processedDisplay = Calc.processInput(userInput.key, currentDisplay);
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
