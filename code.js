

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const zecimalBtn = document.getElementById('dot');
const equalBtn = document.getElementById('equal');
const clearBtn = document.getElementById('clear');
const backspaceBtn = document.getElementById('backspace');
const display = document.getElementById('display');
const zeroPH = document.getElementById('placeholder');

let firstOperand= 0;
let secondOperand = 0;
let currentOperator = 'plus';
let operatorSlice;
let clearEnabled = true;


numbers.forEach(num => {
    num.addEventListener('click', () => {
        clearOnInput()
        inputKey(num);
        checkPlaceHolder()
    })
});

operators.forEach(oprt => {
    oprt.addEventListener('click', () => {
        clearOnInput()
        if(checkForOprt()){
            getSecondOperand();
            showResult()
        }
        deleteMultipleOprt()        
        getOperatorSlice()
        getFirstOperand()
        getCurrentOperator(oprt)
        inputKey(oprt)
        zecimalBtn.disabled = false;
    })
});

equalBtn.addEventListener('click', () => {
    getSecondOperand();
    showResult()
    zecimalBtn.disabled = true;
    resetOperators()
});

clearBtn.addEventListener('click', () => {
    clear()
    checkPlaceHolder()
    zecimalBtn.disabled = false;
    resetOperators()
});

backspaceBtn.addEventListener('click', () => {
    deleteOne()
    checkPlaceHolder()
})

zecimalBtn.addEventListener('click', () => {
    addZero()
    inputKey(zecimalBtn)
    checkPlaceHolder()
    zecimalBtn.disabled = true;
}); 

function showResult() {
    display.innerText = operate(firstOperand, secondOperand, currentOperator);
}

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

function addZero() {
    if(display.innerText[display.innerText.length - 1] === '+'
    || display.innerText[display.innerText.length - 1] === '-'
    || display.innerText[display.innerText.length - 1] === '÷'
    || display.innerText[display.innerText.length - 1] === 'x'
    || display.innerText.length === 0){
        display.innerText += '0';
    }
}

function deleteOne() {
    if(display.innerText[display.innerText.length - 1] === '.'){
        zecimalBtn.disabled = false;Math.round((a / b) * 1000) / 1000;
    }
    display.innerText = display.innerText.slice(0, display.innerText.length - 1);
}
function clearOnInput() {
    if (clearEnabled) {
        clear()
        clearEnabled = false;
    }
}
function clear() {
    display.innerText = '';
}

function checkPlaceHolder() {
    display.innerText.length !== 0 ? zeroPH.innerText = '' : zeroPH.innerText = '0'
}

function resetOperators() {
    firstOperand = 0;
    secondOperand = 0;
    currentOperator = 'plus';
}

function checkForOprt() {
    let arr = display.innerText.split('');
    for(i of arr){
        if(i === '+'
        || i === '-'
        || i === 'x'
        || i === '÷'){
            return true;
        }
    }
    return false
}

function operate(a, b, id) {
    a = +a;
    b = +b;
    if(id === 'plus'){
        return Math.round((a = b) * 1000) / 1000;
    } else if(id === 'minus'){
        return Math.round((a - b) * 1000) / 1000;
    } else if(id === 'multiply'){
        return Math.round((a * b) * 1000) / 1000;
    } else if(id === 'divide'){
        if(b === 0){
            clearEnabled = true;
            return `Can't divide by 0`;
        }
        return Math.round((a / b) * 1000) / 1000;
    }
}
