

const numbers = document.querySelectorAll('.number');
const zeroBtn = document.querySelector('.number-zero');
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
const operatorArr = ['+', '-', 'x', '÷'];



numbers.forEach(num => {
    num.addEventListener('click', () => {
        clearOnInput()
        deleteZeroIfFirst()
        inputKey(num)
        checkPlaceHolder()
        enableOperators()
        enableZero()
    })
})

zeroBtn.addEventListener('click', () => {
    clearOnInput()
    inputZeroOnceIfFirst()
    inputKey(zeroBtn)
    checkPlaceHolder()
    enableOperators()
})

operators.forEach(oprt => {
    oprt.addEventListener('click', () => {

        deleteMultipleOprt()

        if(checkForOprt()){
            getSecondOperand()
            showResult()
        }
          
        getOperatorSlice()
        getFirstOperand()
        getCurrentOperator(oprt)

        inputKey(oprt)
        enableZero()
        zecimalBtn.disabled = false;
        clearEnabled = false;
    })
})

equalBtn.addEventListener('click', () => {
    if(display.innerText.length > operatorSlice){ //disables the equal btn if there's no second operand
        
        getSecondOperand()
        showResult()
        
        checkDotAfterEqual()
        resetOperators()
        enableOperators()
        enableZero()
        clearEnabled = true;
    }
})

zecimalBtn.addEventListener('click', () => {
    addZero()
    inputKey(zecimalBtn)
    checkPlaceHolder()
    disableOperators()
    enableZero()
    clearEnabled = false;
    zecimalBtn.disabled = true;
})

clearBtn.addEventListener('click', () => {
    clear()
    checkPlaceHolder()
    disableOperators()
    resetOperators()
    enableZero()
    zecimalBtn.disabled = false;
})

backspaceBtn.addEventListener('click', () => {
    clearOnInput()
    enableZero()
    deleteOne()
    disableOperators()
    checkPlaceHolder()
})

function deleteZeroIfFirst() {
    if(display.innerText[display.innerText.length - 1] === '0'){
        for(tmp of operatorArr){
            if(display.innerText[display.innerText.length - 2] === tmp
            || display.innerText[display.innerText.length - 2] === undefined){
                deleteOne()
            }
        }
    }
}

function inputZeroOnceIfFirst() {
    for(tmp of operatorArr){
        if(display.innerText[display.innerText.length - 1] === tmp
        || display.innerText[display.innerText.length - 1] === undefined){
            zeroBtn.disabled = true;
        }
    }
}

function enableZero() {
    zeroBtn.disabled = false;
}

function showResult() {
    display.innerText = operate(firstOperand, secondOperand, currentOperator);
}

function operate(a, b, id) {
    a = +a;
    b = +b;
    if(id === 'plus'){
        return Math.round((a + b) * 1000) / 1000;
    } else if(id === 'minus'){
        return Math.round((a - b) * 1000) / 1000;
    } else if(id === 'multiply'){
        return Math.round((a * b) * 1000) / 1000;
    } else if(id === 'divide'){
        if(b === 0){
            clearEnabled = true;
            return `Can't divide by 0`; // Rounded each operator individualy so it can display this message
        }
        return Math.round((a / b) * 1000) / 1000;
    }
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
    for(tmp of operatorArr){
        if(display.innerText[display.innerText.length - 1] === tmp){
            deleteOne()
        }
    }
}

function addZero() {
    for(tmp of operatorArr){
        if(display.innerText[display.innerText.length - 1] === tmp
        || display.innerText.length === 0){
            display.innerText += '0';
        }
    }
}

function deleteOne() {
    checkIfLastIsDot()
    display.innerText = display.innerText.slice(0, -1);

    if(display.innerText.length === 0){// bugfix
        zecimalBtn.disabled = false;
    }
}

function clearOnInput() {
    if (clearEnabled) {
        clear()
        clearEnabled = false;

        zecimalBtn.disabled = false; // bugfix
    }
}

function clear() {
    display.innerText = '';
}

function checkPlaceHolder() {
    display.innerText.length !== 0 ? zeroPH.innerText = '' : zeroPH.innerText = '0'
}

function checkDotAfterEqual() {
    for(i of display.innerText.split('')){
        if(i === '.'){
            zecimalBtn.disabled = true;
        }
    }
}

function disableOperators() {
    for(oprt of operators){
        if(display.innerText === ''){
            oprt.disabled = true;  
        }
    }
}

function enableOperators() {
    for(oprt of operators){
        oprt.disabled = false;  
    }
}

function resetOperators() {
    firstOperand = 0;
    secondOperand = 0;
    currentOperator = 'plus';
    operatorSlice = undefined;
}

function checkForOprt() {
    let arr = display.innerText.split('');
    for(i of arr){
        for(tmp of operatorArr){
            if(i === tmp){
                return true;
            }
        }
    }
    return false
}

function checkIfLastIsDot() {
    if(display.innerText[display.innerText.length - 1] === '.'){
        zecimalBtn.disabled = false;
        zeroBtn.disabled = true;
    }

    // bugfix // if there's a dot in the input when deleting an operator, disable the dot
    for(tmp of operatorArr){ 
        if(display.innerText[display.innerText.length - 1] === tmp){
            let dotFound = false;
            for(i of display.innerText.split('')){
                if(i === '.'){
                    dotFound = true;
                }
            }
            if(dotFound){
                zecimalBtn.disabled = true;
            }
        }
    }             
}

window.addEventListener('load', () => {
    disableOperators()
})