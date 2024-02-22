let calcScreen = document.getElementById("calcScreen");
let outputScreen = document.getElementById("outputScreen");

function clearScreen() {
  calcScreen.innerHTML = "0";
  outputScreen.textContent = "";
}


function numbers(value) {
  if (calcScreen.textContent === "0") {
    calcScreen.textContent = value;
  } else {
    calcScreen.textContent += value;
  }

  evaluateExpression();
}

document.getElementById("delete").addEventListener("click", () => {
  if (calcScreen.textContent.length > 1) {
    calcScreen.textContent = calcScreen.textContent.slice(0, -1);
    evaluateExpression();
  } else {
    clearScreen();
  }

  
});

function evaluateExpression() {
  let expression = calcScreen.textContent;
  let result = 0;

  let terms = expression.split(/[\+\-\x\÷\%]/).map((term) => parseFloat(term));
  let operators = expression.split(/[\d\.]+/).filter(Boolean);

  result = terms[0];


    if (terms.length === 1 && terms[0].toString().endsWith("%")) {
      result = parseFloat(terms[0]) / 100;
    } else {
      for (let i = 1; i < terms.length; i++) {
        let term = terms[i];
        let operator = operators[i - 1];

        if (operator === "+") {
          result += term;
        } else if (operator === "-") {
          result -= term;
        } else if (operator === "x") {
          result *= term;
        } else if (operator === "÷") {
          result /= term;
        } else if (operator === "%") {
          result = result * (term / 100);
        }
      }
    }

  result = Number(result.toFixed(2));


  outputScreen.textContent = result.toString();
}


function operations(ops) {
  let lastChar = calcScreen.textContent.slice(-1);

  if (lastChar === "." && ops === ".") {
    return;
  } else if (lastChar === ".") {
    calcScreen.textContent = calcScreen.textContent.slice(0, -1) + ops;
  } else if (!lastChar.match(/[\÷\x\%\-\+]/)) {
    let currentNumber = getLastNumber();
    if (currentNumber.includes(".") && ops === ".") {
      return;
    } else {
      calcScreen.innerHTML += ops;
    }
  } else if (ops === ".") {
    calcScreen.innerHTML += "0" + ops;
  }
}

function getLastNumber() {
  let expression = calcScreen.textContent;
  let terms = expression.split(/[\+\-\x\÷\%]/);
  return terms[terms.length - 1];
}


document.getElementById("equals").addEventListener('click', () => {

  calcScreen.classList.add("slide-up-animation");
  outputScreen.classList.add("slide-up-animation2");

  setTimeout(() => {
    calcScreen.classList.remove("slide-up-animation");
    outputScreen.classList.remove("slide-up-animation2");

     calcScreen.textContent =
       outputScreen.textContent === ""
         ? calcScreen.textContent
        : outputScreen.textContent;
    
    outputScreen.textContent = "";
  }, 500); 


})