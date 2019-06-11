import { ENTRY } from './types.js';

export const modifyDisplay = (userInput) => {
    return {
      type: ENTRY,
      input: userInput
    }
  };  