let total = 0;

const operators = ["+","-","*","/"];

let display = ["0", "+", "9", "8", ".", "0"];

const firstEntry = display.length === 1 && display[0] === "0";

const afterOperator = operators.includes(display[display.length-1]);

const zeroAfterOperator = operators.includes(display[display.length-2]) && display[display.length-1] === "0";

// Checks if key press is valid
function processInput(input) {
    if(/[123456789]/.test(input)) {
        if(firstEntry) {
            display[0] = input;
        }
        else if (zeroAfterOperator) {
            display.pop()
        } 
        display.push(input)
    } else if(input == 0) {
        if(validZero()) {
            display.push(input);
        }
    } else if (input === ".") {
        if(validDecimal()) {
            if(afterOperator) {
                display.push("0");
            }
            display.push(input);
        }
    }
    return display.join('');
}

// Checks if number contains more than 1 decimal.
function validDecimal() {
    for(let i = display.length -1; i >= 0; i--) {
        if (display[i] === ".") {
            return false;
        }
        else if(operators.includes(display[i])) {
            break;
        }
    };
    return true; 
}

// Checks if number contains leading zeros
function validZero() {
    if(firstEntry) {
        return false;
    }

    for(let i = display.length -1; i >= 0; i--) {
        if(operators.includes(display[i])) {
            if(display[i+1] && display[i+1] == "0" && !(display[i+2])) {
                return false;
            }
        }
    }
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

function evalExpression(string) {
    let expArray = string.split(/(\+|\-|\*|\/)/g)
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

// console.log(/\d+(\+|\-|\*|\\)\d+/g.test('55-6645'));
// let testArr = "1123+6674".split(/(\+|\-|\*|\/)/g);
// console.log(evalExpression("3+3+12*2/2*8/5-15*33/1222*53")); //110
// console.log(evalExpression("3+3+12*2+2")) //32
// console.log(evalExpression("3+3+12*2")); //30
// console.log(calculateExpression(['13','+','41']));
console.log(processInput("8"));
// console.log(display[display.length -1]);
// console.log(validZero("0"));