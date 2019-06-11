import React from 'react';
import { inputs } from './inputs.js';

export const CalcButtons = (props) => {
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
  };