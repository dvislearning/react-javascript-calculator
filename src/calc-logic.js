let total = 0;

let currentValid = null;

let calcs = [5, "+", 10]

let display = ["0"];


function processInput(input) {
    if(/[123456789]/.test(input)) {
        if(display.length === 1 && display[0] === "0") {
            display[0] = input;
        }
        else {
            display.push(input);
        }  
    } else if(input == 0) {
        if(!display[display.length -1] === 0) {
            display.push(input);
        } else { display.push("not today")  }
    }
    return display.join('');
}

const operations = {
    '+': (a,b) => {return a+b},
    '-': (a,b) => {return a-b},
    '*': (a,b) => {return a*b},
    '/': (a,b) => {return a/b}
}

let add = function(a,b) {return a+b}
let subtract = function(a,b) {return a-b}
let multiply = function(a,b) {return a*b}
let divide = function(a,b) {return a/b}


function processChunk(chunk) {
    // Stuff
}


function isValidExpression(string) {
    if (/(\d+(\+|\-|\*|\/)\d+)/g.test(string)) {
        currentSegment = string;
        currentOperator = string[1]
    }
    return false
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
 console.log(processInput("12"));
// console.log(display[display.length -1]);