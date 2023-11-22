const keys = document.querySelectorAll(".btn");
const screen = document.querySelector(".display-ctr");
let firstNumber;
let secondNumber;
let operator;
let containOperator = false;
let operatorClicked = false;
let equalCount = 0;
let decimalCount = 0;


keys.forEach((item) => {
    item.addEventListener("click", setUp);
})

function setUp(e) {

    let answer;
    let value = e.currentTarget.dataset.value;
    
    let operatorBtn = document.querySelector(`[data-value="${operator}"]`);
   console.log(operatorBtn);
   
    

    if (value >= "0" && value <= "9") {
        if (operatorClicked || screen.textContent === "0") {
            screen.textContent = value;
            operatorClicked = false
        } else {
            screen.textContent += value;
        }
        equalCount = 0;
        operatorBtn.classList.remove("active");
    }

    else if (value === "." && !decimalCount) {
        if (operatorClicked || screen.textContent === "0") {
            screen.textContent = value;
            operatorClicked = false
        } else {
            screen.textContent += value;
        }
        equalCount = 0;
        decimalCount++;
        operatorBtn.classList.remove("active");
    }

    else if (value === "add" || value === "subtract" || value === "product" || value === "divide") {
        if (containOperator) {
            secondNumber = +screen.textContent;
            answer = operate(firstNumber, secondNumber, operator);
            firstNumber = answer;
            display(answer);
        }
        else {
            firstNumber = +screen.textContent;
            containOperator = true;
        }
        operator = value;
        console.log(operator);
        operatorClicked = true;
        decimalCount = 0;
        equalCount = 0;
        e.currentTarget.classList.add("active");
    } 

    else if (value === "equal") {
        if (containOperator || equalCount) {
            if (!equalCount) {
                secondNumber = +screen.textContent;
            }
            answer = operate(firstNumber, secondNumber, operator);
            firstNumber = answer;
            equalCount++;
            containOperator = false;
            operatorBtn.classList.remove("active");
            display(answer);
           
        }
    }
        
    else if (value === "erase") {
        let ans = screen.textContent.toString();
        screen.textContent = ans.slice(0, ans.length - 1);
    }

    else if (value === "clear") {
        reset();
    }
}

function add(num1, num2) {
    return num1 + num2;
}
function subtract(num1, num2) {
    return num1 - num2;
}
function product(num1, num2) {
    return num1 * num2;
}
function divide(num1, num2) {
    if (num2 === 0) {
        return "Insane";
    } else {
        return num1 / num2;
    }
}

function operate(firstNumber, secondNumber, operator) {
     switch (operator) {
        case "add": return add(firstNumber, secondNumber);
            break;
        
        case "subtract": return subtract(firstNumber, secondNumber);
            break;
        
        case "product":return product(firstNumber, secondNumber);
            break;
        
        case "divide": return divide(firstNumber, secondNumber);
            break;
    }
}

function display(data) {
    let ans = data.toString();
    if (ans.length >= 11) {
        ans = ans.slice(0, 11);
    }
    screen.textContent = ans;
}

function reset() {
    firstNumber = 0;
    secondNumber = 0;
    screen.textContent = "0";
    containOperator = false;
    operatorClicked = false;
    equalCount = 0;
    decimalCount = 0;
}

function reduceLength(answer) {
    let length = answer.length;
    let data = answer.slice(0, 11);
    return data;
}

/* Fixing GITHub Contribution Chart Bugggg */