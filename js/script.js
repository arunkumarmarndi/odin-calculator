// Variables to store input values and operator
let firstNumber = null;
let secondNumber = null;
let operator = null;
let displayValue = '0';
let isOperatorPressed = false;

const display = document.getElementById('display');

// Basic math functions
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
    if (b === 0) return "Error: Division by 0!";
    return a / b;
}

// Operate function to call the appropriate math operation
function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

// Function to update display
function updateDisplay(value) {
    if (displayValue === '0' || isOperatorPressed) {
        displayValue = value;
        isOperatorPressed = false;
    } else {
        displayValue += value;
    }
    display.textContent = displayValue;
}

// Number button event listeners
const numberButtons = document.querySelectorAll('.num');
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        updateDisplay(button.textContent);
    });
});

// Operator button event listeners
const operatorButtons = document.querySelectorAll('.op');
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (firstNumber === null) {
            firstNumber = parseFloat(displayValue);
        } else if (!isOperatorPressed) {
            secondNumber = parseFloat(displayValue);
            const result = operate(operator, firstNumber, secondNumber);
            display.textContent = result;
            firstNumber = result;
        }
        operator = button.textContent;
        isOperatorPressed = true;
    });
});

// Equals button functionality
document.getElementById('equals').addEventListener('click', () => {
    if (firstNumber !== null && operator !== null) {
        secondNumber = parseFloat(displayValue);
        const result = operate(operator, firstNumber, secondNumber);
        display.textContent = result;
        displayValue = result;
        firstNumber = null;
        operator = null;
    }
});

// Clear button functionality
document.getElementById('clear').addEventListener('click', () => {
    firstNumber = null;
    secondNumber = null;
    operator = null;
    displayValue = '0';
    display.textContent = displayValue;
});

// Backspace button functionality
document.getElementById('backspace').addEventListener('click', () => {
    displayValue = displayValue.slice(0, -1) || '0';
    display.textContent = displayValue;
});

// Decimal button functionality
document.getElementById('decimal').addEventListener('click', () => {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        display.textContent = displayValue;
    }
});

// Keyboard support
window.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) {
        updateDisplay(e.key);
    } else if (e.key === '.') {
        document.getElementById('decimal').click();
    } else if (e.key === 'Backspace') {
        document.getElementById('backspace').click();
    } else if (e.key === 'Enter' || e.key === '=') {
        document.getElementById('equals').click();
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        operatorButtons.forEach(button => {
            if (button.textContent === e.key) {
                button.click();
            }
        });
    } else if (e.key === 'Escape') {
        document.getElementById('clear').click();
    }
});
