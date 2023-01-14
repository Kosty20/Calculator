

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const zecimalBtn = document.getElementById('dot');
const equalBtn = document.getElementById('equal');
const clearBtn = document.getElementById('clear');
const backspaceBtn = document.getElementById('backspace');
const display = document.getElementById('display');

let firstOperand;
let secondOperand;
let currentOperator;
let operatorSlice;
let clearEnabled = true;


numbers.forEach(num => {
    num.addEventListener('click', () => {
        reset()
        inputKey(num);
    })
});

operators.forEach(oprt => {
    oprt.addEventListener('click', () => {
        deleteMultipleOprt()
        clearEnabled = false;
        getOperatorSlice()
        getFirstOperand()
        getCurrentOperator(oprt);
        inputKey(oprt);
    })
});

equalBtn.addEventListener('click', () => {
    getSecondOperand();
    display.innerText = operate(firstOperand, secondOperand, currentOperator);
    clearEnabled = true;
});

clearBtn.onclick = clear;
backspaceBtn.onclick = deleteOne;

function getFirstOperand() {
    firstOperand = display.innerText;
}
function getSecondOperand() {
    secondOperand = display.innerText.slice(operatorSlice);
}
function getCurrentOperator(oprt) {
    currentOperator = oprt.id;
}
function getOperatorSlice() {
    operatorSlice = display.innerText.length + 1;
}

function inputKey(element) {
    display.innerText += element.dataset.input;
}

function deleteMultipleOprt() {
    if(display.innerText[display.innerText.length - 1] === '+'
        || display.innerText[display.innerText.length - 1] === '-'
        || display.innerText[display.innerText.length - 1] === '÷'
        || display.innerText[display.innerText.length - 1] === 'x'){
            deleteOne()
        }
}

function deleteOne() {
    display.innerText = display.innerText.slice(0, display.innerText.length - 1);
}
function clear() {
    display.innerText = '';
}
function reset() {
    if(clearEnabled){
        clear()
        clearEnabled = false;
    }
}


function operate(a, b, id) {
    a = +a;
    b = +b;
    if(id === 'plus'){
        return a + b;
    } else if(id === 'minus'){
        return a - b;
    } else if(id === 'multiply'){
        return a * b;
    } else if(id === 'divide'){
        if(b === 0){
            return `Can't divide by 0`;
        }
        return Math.round((a / b) * 1000) / 1000;
    }
}
