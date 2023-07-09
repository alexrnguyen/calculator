const validKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const validOperators = ['+', '-', '*', '/'];

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function processInput(input) {
    if (operator === '' && !validOperators.includes(input) && validKeys.includes(input)) {
        operand1 += input;
    }
    else if (operator === '' && validOperators.includes(input)) {
        if (operand1 === '') {
            operand1 = '0';
        }

        if (input === 'x') {
            operator = '*';
        }
        else if (input === '') {
            operator = '/'
        }
        else {
            operator = input;
        }
    }
    else if (operator !== '' && validKeys.includes(input)) {
        operand2 += input;
    }

    const display = document.querySelector('.expression');
    expression += input;
    display.textContent = expression;
    console.table([operand1, operator, operand2, expression]);
}

/**
 * 
 * @param {*} operand1 
 * @param {*} operand2 
 * @param {*} operator 
 */
function operate(operand1, operand2, operator) {
    let result = 0;
    if (operator === '+') {
        result = add(operand1, operand2);
    }
    else if (operator === '-') {
        result = subtract(operand1, operand2);
    }
    else if (operator === '*') {
        result = multiply(operand1, operand2);
    }
    else if (operator === '/') {
        result = divide(operand1, operand2);
    }

    // Round to 5 decimal places if necessary
    // result = result.toFixed(5);
    console.log(result);

    const answer = document.querySelector('.answer');
    answer.textContent = result;
    return result;
}

function clear() {
    const display = document.querySelector('.expression');
    const answer = document.querySelector('.answer');
    display.textContent = '0';
    answer.textContent = '';

    // Reset variables
    operand1 = '';
    operand2 = '';
    operator = '';
    expression = '';
}

let operand1 = '';
let operand2 = '';
let operator = '';
let expression = '';
const buttons = document.querySelectorAll('.number, .operator');
const equalityButton = document.querySelector('#equal');
const clearButton = document.querySelector('#clear');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        processInput(button.textContent);
    })
});

window.addEventListener('keydown', e => {
    if(!validKeys.includes(e.key) || !validOperators.includes(e.key)) {
        return;
    }1
    processInput(e.key);
});

equalityButton.addEventListener('click', () => operate(Number(operand1), Number(operand2), operator));

clearButton.addEventListener('click', clear);

