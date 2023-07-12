const validKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', Math.PI];
const validOperators = ['+', '-', '×', '÷', '^'];

/**
 * Add 2 numbers a and b
 * @param {number} a First number
 * @param {number} b Second number 
 * @returns Sum of a and b
 */
function add(a, b) {
    return a + b;
}


/**
 * Subtract a number b from another number a
 * @param {number} a First number
 * @param {number} b Second number
 * @returns Difference between a and b
 */
function subtract(a, b) {
    return a - b;
}

/**
 * Multiply two numbers a and b
 * @param {number} a First number
 * @param {number} b Second number
 * @returns Product of a and b
 */
function multiply(a, b) {
    return a * b;
}

/**
 * Divide a number a by another number b
 * @param {number} a First number
 * @param {number} b Second number
 * @returns Quotient of a divided by b
 */
function divide(a, b) {
    if (b === 0) {
        return 'DIVIDE BY 0 ERROR'
    }
    return a / b;
}

/**
 * Find the exponentiation a to the power of b
 * @param {number} a First number
 * @param {number} b Second number
 * @returns a to the power of b
 */
function power(a, b) {
    return a ** b;
}

/**
 * Represent the percentage of a number as a decimal
 * @param {number} a Number to convert to decimal
 * @returns Percentage of a number as a decimal
 */
function percentage(a) {
    return a/100;
}

/**
 * Update the operands, operator, and expression based on the given input and the current state of the
 * operands and operator.
 * @param {string} input User input
 */
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

    // Convert input of π back to string representation to display on calculator screen
    if (input === Math.PI) {
        input = 'π';
    }
    expression += input;
    updateDisplay(expression);
}

/**
 * Updates the expression displayed on the calculator screen
 * @param {*} expression The expression to be evaluated by the calculator
 */
function updateDisplay(expression) {
    const display = document.querySelector('.expression');
    display.textContent = expression;
}

/**
 * Convert input displayed on screen to input that JavaScript can easily interpret
 * @param {string} input User input
 * @returns A string that can be easily interpreted
 */
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

/**
 * Performs an operation on the operands given an operator
 */
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
    expression = String(result);
    updateDisplay(expression);
    displayAnswer(result);
}

/**
 * Displays the result on the calculator screen
 * @param {*} result The result of an evaluated expression
 */
function displayAnswer(result) {
    const answer = document.querySelector('.answer');
    answer.textContent = result;
}

/**
 * Resets the calculator state by resetting both operand, the operator, and the expression displayed on 
 * the calculator screen
 */
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


/**
 * 
 */
function handleDecimal() {
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

// Button event listeners
buttons.forEach(button => {
    button.addEventListener('click', () => {
        processInput(button.textContent);
    })
});

window.addEventListener('keydown', e => {
    const key = String(e.key);

    // Handle special cases (keys that aren't operands or operators)
    if (key === 'Backspace') {
        clear();
    }
    else if (key === '%') {
        operator = '%';
        operate();
    }
    else if (key === 'Enter' || key === '=') {
        operate();
    }
    else if (key === '.') {
        handleDecimal();
    }

    if(!validKeys.includes(key) && !validOperators.includes(key)) {
        return;
    }
    processInput(key);
});

percentButton.addEventListener('click', () => {
    operator = '%';
    operate();
});

decimalButton.addEventListener('click', handleDecimal);

equalityButton.addEventListener('click', operate);

clearButton.addEventListener('click', clear);

