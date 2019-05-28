const operators = ["+","-","*","/"];

function firstEntry(inputDisplay) {
    return (inputDisplay.length === 1 && inputDisplay[0] === "0");
};

function afterOperator(inputDisplay) {
    return (operators.includes(inputDisplay[inputDisplay.length-1]));
}

function zeroAfterOperator(inputDisplay) {
    return (operators.includes(inputDisplay[inputDisplay.length-2]) && inputDisplay[inputDisplay.length-1] === "0")
}

function validOperator(inputDisplay) {
    return (!(inputDisplay[inputDisplay.length-1] === ".") && !(afterOperator(inputDisplay)));
}

// Checks if number contains leading zeros
function validZero(inputDisplay) {
    if(firstEntry(inputDisplay)) {
        return false;
    }

    for(let i = inputDisplay.length -1; i >= 0; i--) {
        if(operators.includes(inputDisplay[i])) {
            if(inputDisplay[i+1] && inputDisplay[i+1] === "0" && !inputDisplay[i+2]) {
                return false;
            }
        }
    }
    return true;
}

// Checks if key press is valid
export function processInput(input, inputDisplay) {    
    if(/[123456789]/.test(input)) {
        if(firstEntry(inputDisplay)) {
            inputDisplay[0] = input;
        }
        else if (zeroAfterOperator(inputDisplay)) {
            inputDisplay.pop();
            inputDisplay.push(input);
        }
        else {
            inputDisplay.push(input);
        }
    } else if(input === "0") {
        if(validZero(inputDisplay)) {
            inputDisplay.push(input);
        }
    } else if (input === ".") {
        if(validDecimal(inputDisplay)) {
            if(afterOperator(inputDisplay)) {
                inputDisplay.push("0");
            }
            inputDisplay.push(input);
        }
    } else if (operators.includes(input)) {
        if (validOperator(inputDisplay)) {
            inputDisplay.push(input);
        }
        else if(afterOperator(inputDisplay)) {
            inputDisplay.pop();
            inputDisplay.push(input);
        }
    }
    return inputDisplay;
}

// Checks if number contains more than 1 decimal.
function validDecimal(inputDisplay) {
    for(let i = inputDisplay.length -1; i >= 0; i--) {
        if (inputDisplay[i] === ".") {
            return false;
        }
        else if(operators.includes(inputDisplay[i])) {
            break;
        }
    };
    return true; 
}

const operations = {
    '+': (a,b) => {return a+b},
    '-': (a,b) => {return a-b},
    '*': (a,b) => {return a*b},
    '/': (a,b) => {return a/b}
}

function calculateExpression(expression) {
    return operations[expression[1]](parseFloat(expression[0]), parseFloat(expression[2]))
}

export function processEquals(inputDisplay) {
    let endOfDisplay = inputDisplay[inputDisplay.length-1]
    if(operators.includes(endOfDisplay) || endOfDisplay === ".") {
        inputDisplay.pop();
    }
    return inputDisplay;
}

export function evalExpression(string) {
    let expArray = string.split(/(\+|-|\*|\/)/g)
    let total = 0;
    if(expArray.length === 3) {
        return calculateExpression(expArray);
    }
    else {
        let step = 1;
        total = expArray[0]
        while (step < expArray.length) {
            if(['*','/'].includes(expArray[step])) {
                total = calculateExpression([total,expArray[step],expArray[step+1]]);
                step += 2;
            }
            else if(['+','-'].includes(expArray[step])) {
                if(['+','-'].includes(expArray[step+2]) || !expArray[step+2]) {
                    total = calculateExpression([total,expArray[step],expArray[step+1]]);
                    step += 2;
                }
                else if(['*','/'].includes(expArray[step+2])) {
                    let groupTotal = expArray[step+1];
                    let localStep = step;
                    while(expArray[localStep+2] && ['*','/'].includes(expArray[localStep+2])) {
                        groupTotal = calculateExpression([groupTotal,expArray[localStep + 2],expArray[localStep+3]])
                        localStep += 2
                    }
                    total = calculateExpression([total,expArray[step],groupTotal]);
                    step = localStep + 2;
                }
            }
        }
        return total;
    }
}