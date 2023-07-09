const validKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', Math.PI];
const validOperators = ['+', '-', '×', '÷', '^'];

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
    if (b === 0) {
        return 'DIVIDE BY 0 ERROR'
    }
    return a / b;
}

function power(a, b) {
    return a ** b;
}

function percentage(a) {
    return a/100;
}

function processInput(input) {

    // Convert input of π to float representation in JavaScript
    if (input === 'π') {
        input = Math.PI;
    }
    
    if (operator === '' && validKeys.includes(input)) {
        operand1 += input;
    }
    else if (operator === '' && validOperators.includes(input)) {
        if (operand1 === '') {
            operand1 = '0';
            expression += '0';
        }
        operator = convertOperator(input);
    }
    else if (operator !== '' && validKeys.includes(input)) {
        operand2 += input;
    }
    else if (operand1 !== '' && validOperators.includes(input)) {
        operate();
        operator = convertOperator(input);
    }

    const display = document.querySelector('.expression');

    // Convert input of π back to string representation to display on calculator screen
    if (input === Math.PI) {
        input = 'π';
    }
    expression += input;
    display.textContent = expression;
    console.table([operand1, operator, operand2, expression]);
}

function convertOperator(input) {
    if (input === '×') {
        return '*';
    }
    else if (input === '÷') {
        return '/'
    }
    else {
        return input;
    }
}


function operate() {
    let result = 0;
    operand1 = Number(operand1);
    operand2 = Number(operand2);
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
    else if (operator === '^') {
        result = power(operand1, operand2);
    }
    else if (operator === '%') {
        result = percentage(operand1);
    }
    else {
        result = operand1;
    }

    // Round to 5 decimal places if necessary
    result = parseFloat(result.toFixed(5));

    // Values are evaluated in pairs. Thus, the answer becomes the first operand for the next 'pair'
    operand1 = String(result);
    operand2 = '';
    operator = '';

    const answer = document.querySelector('.answer');
    answer.textContent = result;
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
const percentButton = document.querySelector('#percentage');
const decimalButton = document.querySelector('#decimal');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        processInput(button.textContent);
    })
});

window.addEventListener('keydown', e => {
    if(!validKeys.includes(e.key) || !validOperators.includes(e.key)) {
        return;
    }
    processInput(e.key);
});

percentButton.addEventListener('click', () => {
    operator = '%';
    operate()
});

decimalButton.addEventListener('click', () => {
    const display = document.querySelector('.expression');
    // If no operator is set, the user is still inputting operand 1.
    if (operator === '') {
        if (operand1 === '') {
            operand1 = '0.';
            expression += '0.'
        }
        else if (!Array.from(operand1).includes('.')) {
            operand1 += '.';
            expression += '.'
        } 
    }
    else {
        if (operand2 === '') {
            operand2 = '0.';
            expression += '0.'
        }
        else if (!Array.from(operand2).includes('.')) {
            operand2 += '.';
            expression += '.'
        } 
    }
    display.textContent = expression;
});

equalityButton.addEventListener('click', () => operate());

clearButton.addEventListener('click', clear);

