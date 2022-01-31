'use strict';

document.querySelector(".menuHamburger").addEventListener("click", () =>
    document.querySelector(".sidebar").classList.toggle("showMenu")
);

const display = document.getElementById('display');
const numbers = document.querySelectorAll('[id*=digit]');
const maths = document.querySelectorAll('[id*=math]');

let newNumber = true;
let mathMemory;
let numberMemory;

const mathStandBy = () => mathMemory !== undefined;

const calc = () => {
    if (mathStandBy()){
        const numberNow = parseFloat(display.textContent.replace(',','.'));
        newNumber = true;
        const count = eval (`${numberMemory}${mathMemory}${numberNow}`);
        updateDisplay(count);
    }
}

const updateDisplay = (text) => {
    if (newNumber || display.textContent == "0"){
        display.textContent = text.toLocaleString('BR');
        newNumber = false;
    }else{
        display.textContent += text.toLocaleString('BR');
    }
}

const insertNumber = (event) => updateDisplay(event.target.textContent);
numbers.forEach (number => number.addEventListener('click', insertNumber));


const selecionarOperador = (event) => {
    if (!newNumber) {
        calc();
        newNumber = true;
        mathMemory = event.target.textContent;
        numberMemory = parseFloat(display.textContent.replace(',','.'));
    }
}
maths.forEach (math => math.addEventListener('click', selecionarOperador));

const functionEqual = () => {
    calc();
    mathMemory = undefined;
}
document.getElementById('equal').addEventListener('click', functionEqual);

const displayClean = () => display.textContent = '0';
document.getElementById('displayClean').addEventListener('click', displayClean);

const calcClean = () => {
    displayClean();
    mathMemory = undefined;
    newNumber = true;
    numberMemory = undefined;
}
document.getElementById('calcClean').addEventListener('click', calcClean);

const removeLastNumber = () => {
    if (display.textContent.length ==1 || display.textContent == '' || display.textContent == 0){
        display.textContent = '0';  
    } else
    display.textContent = display.textContent.slice(0, -1);
}
document.getElementById('backspace').addEventListener('click', removeLastNumber);

const reverseSignal = () => {
    newNumber = true
    updateDisplay (display.textContent * -1);
}
document.getElementById('reverse').addEventListener('click', reverseSignal);


const thereIsDecimal = () => display.textContent.indexOf(',') !== -1;
const thereIsValue = () => display.textContent.length > 0 || display.textContent == "0";
const insertDecimal = () => {
    if (!thereIsDecimal()){
        if (thereIsValue()){
            updateDisplay(',');
        }else{
            updateDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', insertDecimal);


const  activateKeyboard = {
    '0'         : 'digit0',
    '1'         : 'digit1',
    '2'         : 'digit2',
    '3'         : 'digit3',
    '4'         : 'digit4',
    '5'         : 'digit5',
    '6'         : 'digit6',
    '7'         : 'digit7',
    '8'         : 'digit8',
    '9'         : 'digit9',
    '/'         : 'mathDiv',
    '*'         : 'mathMultiply',
    '-'         : 'mathSub',
    '+'         : 'mathAdd',
    '='         : 'equal',
    'Enter'     : 'equal',
    'Backspace' : 'backspace',
    'c'         : 'displayClean',
    'Escape'    : 'calcClean',
    ','         : 'decimal'
}

const checkKeys = (event) => {
    const key = event.key;
    const existingKey = () => Object.keys( activateKeyboard).indexOf(key) !== -1;
    if (existingKey())  document.getElementById( activateKeyboard[key]).click();
}
document.addEventListener('keydown', checkKeys);
