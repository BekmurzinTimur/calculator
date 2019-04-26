// UI

let displayText = document.querySelector(".display_inner");
let displayAnswer = document.querySelector(".display_answer");
let currentOperator = null; // Name of the function (add,subtract...)
let consecutiveOperation = false;
let isLocked = false; // true if "=" was pressed. Necessary to repeat last action upon pressing "="
let buffer = null; // variable for last action
let lastDisplayText = null; // variable that stores current value after pressing operator button

let pushTheNumber = function(number) {
    if (displayText.textContent.length <= 42)
    displayText.textContent += number;
}
let clearDisplay = function(full) {
    displayText.textContent = "";
    if (full) {
        currentOperator = null;
        lastDisplayText = null;
        displayAnswer.textContent = "";
    }
}
let deleteText = function() {
    displayText.textContent = displayText.textContent.slice(0,displayText.textContent.length - 1);
}

let buttons = document.querySelectorAll(".numberbutton");

buttons.forEach( elem => elem.addEventListener('click', (button) => pushTheNumber(button.target.textContent)));

let clearButton = document.querySelector("#clear");

clearButton.addEventListener('click', () => clearDisplay(true));

let deleteButton = document.querySelector("#delete");

deleteButton.addEventListener("click", () => deleteText());

// Operators and equals
let operatorButtons = document.querySelectorAll(".operator_button");

operatorButtons.forEach((operatorButton) => operatorButton.addEventListener( 'click', (event) => operatePreapre(event.target.id)));

let operatePreapre = function (operator)
{
    if (displayText.textContent != '')
    {
        if (consecutiveOperation) {
            equalsFun(); // imitate equalsButton for several consequtive operatorButtons
        }

        if (displayAnswer.textContent == "")
        lastDisplayText = displayText.textContent;
        else lastDisplayText = displayAnswer.textContent; // Save last answer
        isLocked = false;
        buffer = null;
        currentOperator = operator;
        consecutiveOperation = true;
        clearDisplay(false);
    }
}

let equalsButton = document.querySelector("#equals");

equalsButton.addEventListener( 'click', event => { 
    equalsFun();
})

let equalsFun = function () {
    if (currentOperator !== null) //Chek if any of the operator button was pressed.
    {
        consecutiveOperation = false;
        if (!isLocked) // Do if it the first time user pushed "="
        {
            buffer = displayText.textContent;
            displayAnswer.textContent = operate(currentOperator, lastDisplayText, displayText.textContent);
            isLocked = true;
        } else // Repeat last action every time user presses "="
        {
            displayAnswer.textContent = operate(currentOperator, displayAnswer.textContent, buffer); 
        }
        if (displayAnswer.textContent.length > 42)
        {
            displayAnswer.textContent = displayAnswer.textContent.splice(0,42);
        }
    }
}
let plusMinusButton = document.querySelector("#plus_minus");

plusMinusButton.addEventListener( 'click' , (event) => {
    if (displayText.textContent.charAt(0) != "-")
    {
        displayText.textContent = "-" + displayText.textContent;
    }
    else
    {
        displayText.textContent = displayText.textContent.slice(1);
    }
})

let operate = function (operator, value1, value2)
{
    if (operator == "add") {
        return add(+value1, +value2);
    }
    if (operator == "subtract") {
        return subtract(+value1, +value2);
    }
    if (operator == "multiply") {
        return multiply(+value1, +value2);
    }
    if (operator == "divide") {
        return divide(+value1, +value2);
    }
}

// Calculator Functions
let add = function(value1, value2) {
    return value1 + value2;
}

let subtract = function(value1, value2) {
    return value1 - value2;
}

let multiply = function(value1, value2) {
    return value1 * value2;
}

let divide = function(value1, value2) {
    if (value2 == 0) return "ERROR" 
    else return value1 / value2;
}