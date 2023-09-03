class Calculator {
    constructor(previousValue, currentValue) {
        this.previousValue = previousValue
        this.currentValue = currentValue
        this.clear()
    }

    clear() {
        this.currentOperand = "0";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperations(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation

        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
          case "+":
            computation = prev + current;
            break;
          case "-":
            computation = prev - current;
            break;
          case "×":
            computation = prev * current;
            break;
          case "÷":
            computation = prev / current;
            break;
          case "%":
            computation = prev % current;
            break;
          default:
            return;
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNum = number.toString()
        const digits = parseFloat(stringNum.split('.')[0])
        const decimal = stringNum.split(".")[1];
        
        let integerDisplay
        if (isNaN(digits)) {
            integerDisplay =''
        } else {
            integerDisplay = digits.toLocaleString('en', {maximumFractionDigits: 0 })
        }
        if (decimal != null){
            return `${integerDisplay}.${decimal}`
        } else {
            return integerDisplay
        }
    }

    updateValue() {
        this.currentValue.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousValue.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousValue.innerText = ''
        }
       

    }
}

const numbers = document.querySelectorAll('[data-number]');

const operations = document.querySelectorAll('[data-operation]');

const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const clearBtn = document.querySelector('[data-clear]');
const percentBtn = document.querySelector('[data-percent]');
const previousValue = document.querySelector('[data-previous-operand]');
const currentValue = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousValue, currentValue);

numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateValue()
    })
})

operations.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperations(button.innerText);
        calculator.updateValue();
    });
});

equalsBtn.addEventListener("click", () => {
    calculator.compute();
    calculator.updateValue();
});

clearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateValue();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateValue();
});



//------------------- --- -- -- - ------------------------//

const usedPositions = [];

function generateRandomPosition() {
  const maxX = window.innerWidth;
  const maxY = window.innerHeight;
  let x, y;

  do {
    x = Math.random() * maxX;
    y = Math.random() * maxY;
  } while (
    usedPositions.some(
      (pos) => Math.abs(pos.x - x) < 30 && Math.abs(pos.y - y) < 30
    )
  );

  usedPositions.push({ x, y });
  return { x, y };
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 10);
}

function createRandomNumbers() {
  const numberBackground = document.getElementById("number-background");

  for (let i = 0; i < 200; i++) {
    const position = generateRandomPosition();
    const span = document.createElement("span");
    span.textContent = generateRandomNumber();
    span.style.top = position.y + "px";
    span.style.left = position.x + "px";
    numberBackground.appendChild(span);
  }
}

createRandomNumbers();