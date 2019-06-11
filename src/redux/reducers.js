import { processEquals, processInput, evalExpression } from '../calc-logic.js';
import { ENTRY } from './types.js';

export const displayReducer = (state = ['0'], action) => {
    switch(action.type) {
        case ENTRY:
            if(action.input.id === 'clear') {
              return ['0'];
            }
            else if(action.input.id === 'equals') {
              let verifiedEqualsRequest = processEquals(state).join('');
              let resultDisplayed = [evalExpression(verifiedEqualsRequest)];
              state = resultDisplayed;
              return state;
            } 
            else {
              let processedDisplay = processInput(action.input.key, state);
              state = processedDisplay;
              return state;
            }
        default:
            return state;
    };
  };