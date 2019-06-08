import { processEquals, processInput, evalExpression } from '../calc-logic.js';
import { CLEAR, EQUALS, REGULARKEY } from './types.js'
// import { inputs } from '../inputs.js';

const displayReducer = (state = [0], action) => {
    switch(action.type) {
        case CLEAR:
            return state;
        case EQUALS:
            let verifiedEqualsRequest = processEquals(state).join('');
            processedDisplay = [evalExpression(verifiedEqualsRequest)];
            return [processedDisplay];
        case REGULARKEY:
            let processedDisplay = processInput(action.userInput.key, state);
            return [processedDisplay];
        default:
            return state;
    };
};

