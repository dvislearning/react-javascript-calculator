import React, { Component } from 'react';
import './App.css';
import { inputs } from './inputs.js';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { displayReducer } from './redux/reducers';
import { mapDispatchToProps, mapStateToProps } from './redux/react-redux';
import { CalcButtons } from './CalcButtons'


class App extends Component {

  constructor(props) {
    super(props);

    this.state={
      currentEntry: ''
    };

    this.handleEvent = this.handleEvent.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleEvent(userInput){
    this.props.handleDisplayInput(userInput);
    this.setState({ currentEntry: '' })
  }

  handlePress(event) {
    let pressTarget = inputs.filter(input => input.key === event.key);
    if(pressTarget.length){ 
      this.handleEvent(pressTarget[0])
    }
  }

  handleClick(event) {
    if(event.target.className === "button"){
      const clickTarget = inputs.filter((input) => input.id === event.target.id)[0];
      this.handleEvent(clickTarget)
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
              {this.props.display.join('')}
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

export const Container = connect(mapStateToProps, mapDispatchToProps)(App);

export const store = createStore(displayReducer);
