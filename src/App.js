import React, { Component } from 'react';
import './App.css';


const inputs = [
  {"id":"one", "className":"numberButton", "key":"1"},
  {"id":"two", "className":"numberButton", "key":"2"},
  {"id":"three", "className":"numberButton", "key":"3"},
  {"id":"four", "className":"numberButton", "key":"4"},
  {"id":"five", "className":"numberButton", "key":"5"},
  {"id":"six", "className":"numberButton", "key":"6"},
  {"id":"seven", "className":"numberButton", "key":"7"},
  {"id":"eight", "className":"numberButton", "key":"8"},
  {"id":"nine", "className":"numberButton", "key":"9"},
  {"id":"zero", "className":"numberButton", "key":"0"}
]

const CalcButtons = () => {
  const buttons = inputs.map(function(button) {
    return <button className={button.className} id={button.id}>{button.key}</button>
  })
  
  return (
    <div>
        {buttons}
    </div>
  );
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state={
      //display:["0","+","7","0","+","7","0","+","7","0","+","7","0","+","7",]
      display:["0"]
    }

    this.handleEvent = this.handleEvent.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  handleEvent(userInput) {
    let currentDisplay = this.state.display;
    currentDisplay.push(userInput.key)
    this.setState({
      display: currentDisplay
    })
  }

  handlePress(event) {
    let pressTarget = inputs.filter(input => input.key === event.key);
    if(pressTarget.length){ 
      this.handleEvent(pressTarget[0]);
    }
  }

  handleClick(event) {
    //more stuff
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
            We are here
          </div>
  
          <div id="display">
            <div id="display-text"> 
              {this.state.display.join('')}
            </div>
          </div>
  
          <div id="calc-inputs">
            <CalcButtons />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
