function updateDisplayArea(displayStr) {
  console.log("[updateDisplayArea] displayStr: " + displayStr);
  let btnTxt = document.querySelector(`#${displayStr}`);
  displayArea.textContent += btnTxt.textContent;
}

function displayText(strToDisplay) {
  displayArea.textContent = strToDisplay;
}

function add(num1, num2) {
  return Number(num1) + Number(num2);
}

function substract(num1, num2) {
  return Number(num1) - Number(num2);
}

function multiplication(num1, num2) {
  return Number(num1) * Number(num2);
}

function divide(num1, num2) {
  return Number(num1) / Number(num2);
}

function operate(eqArray) {
  let num = 0;
  switch (eqArray[1]) {
    case "+":
      num = add(eqArray[0], eqArray[2]);
      break;
    case "-":
      num = substract(eqArray[0], eqArray[2]);
      break;
    case "x":
      num = multiplication(eqArray[0], eqArray[2]);
      break;
    case "/":
      num = divide(eqArray[0], eqArray[2]);
      break;
    default:
  }

  return num;
}

function clearDisplay() {
  displayArea.textContent = 0;
}

function clearCalculationMemory() {
  arithmeticArray = [];
  numberStr = "";
}

function arithmeticOperators(elemId) {
  if (elemId == "clear") {
    // user choose to 'clear'
    clearDisplay();
    clearCalculationMemory();
  } else if (elemId == "equals") {
    // user choose to end the input
    arithmeticArray.push(numberStr);
    numberStr = "";
    // console.log("[btnClick] arithmeticArray: " + arithmeticArray);
    let tmpResult = operate(arithmeticArray);
    displayText(tmpResult);
    // NOTE: Need to change this part.
    // It is not appropriate to clear the calculation memory
    // at this point because as per assignment requirements the
    // product must be ready for the next arithmetic operation.
    clearCalculationMemory();
    console.log("[arithmeticOperators] arithmeticArray: " + arithmeticArray);
    arithmeticArray.push(tmpResult);
  } else {
    if (numberStr != 0) {
      // this is to avoid the situation where the user continues with
      // the arithmetic operation on the previous arithmetic result.
      arithmeticArray.push(numberStr);
    }
    if (arithmeticArray.length == 3) {
      // Part of the assignment behaviour requirement
      let tmpResult = operate(arithmeticArray);
      displayText(tmpResult);
      arithmeticArray = [];
      arithmeticArray.push(tmpResult);
    }
    numberStr = "";
    let tmpChar = document.querySelector(`#${elemId}`).textContent;
    if (event.target.id == "division") {
      arithmeticArray.push("/");
    } else {
      arithmeticArray.push(tmpChar);
    }
    updateDisplayArea(elemId);
  }
}

function btnClick(event) {
  // I find that using the classList would sometimes get a empty '' string
  // on the console. This might cause problems later on.
  if (numberArray.includes(event.target.id)) {
    if (numberStr == "" && arithmeticArray.length == 0) {
      displayArea.textContent = "";
      // clearDisplay();
    }
    if (numberStr == "" && arithmeticArray.length == 1) {
      arithmeticArray = [];
      displayArea.textContent = "";
      // clearDisplay();
    }
    let tmpChar = document.querySelector(`#${event.target.id}`).textContent;
    if (numberStr.indexOf(".") != -1 && tmpChar == ".") {
      console.warn("[btnClick] Repeated dot found!");
    } else {
      numberStr += tmpChar;
      updateDisplayArea(event.target.id);
    }
  }
  if (operatorArray.includes(event.target.id)) {
    arithmeticOperators(event.target.id);
  }
  console.log("[btnClick] arithmeticArray: " + arithmeticArray);
}

function calculationProcess(calcArr) {
  let index = 0;
  operators.forEach((op) => {
    index = calcArr.indexOf(op) == -1 ? index : calcArr.indexOf(op);
    // console.log("[calculationProcess] index: " + index);
  });
  console.log("[calculationProcess] index: " + index);
}

function clickEntry(event) {
  // process restrictions first
  // the basic push into array the items clicked on
  let evtObj = document.querySelector(`#${event.target.id}`);
  if (event.target.id == "equals") {
    // send the array for calculation
    calculationProcess(calculationArray);
  }
  if (event.target.id == "zeroZero") {
    calculationArray.push(inputObj[event.target.id]);
    calculationArray.push(inputObj[event.target.id]);
  } else {
    calculationArray.push(inputObj[event.target.id]);
  }

  console.log("[clickEntry] calculationArray: " + calculationArray);
}

// const numberArray = [
//   "one",
//   "two",
//   "three",
//   "four",
//   "five",
//   "six",
//   "seven",
//   "eight",
//   "nine",
//   "zero",
//   "point",
//   "zeroZero",
// ];
// const operatorArray = [
//   "equals",
//   "plus",
//   "minus",
//   "multiplication",
//   "division",
//   "clear",
//   "percentage",
//   "squareRoot",
// ];

const operators = ["-", "+", "x", "/"];
const inputObj = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  zero: 0,
  zeroZero: 0,
  point: ".",
  plus: "+",
  minus: "-",
  multiplication: "x",
  division: "/",
};

const twoArgOperatorObj = {
  plus: "+",
  minus: "-",
  multiplication: "x",
  division: "/",
};

let numberStr = "";
let arithmeticOp = "";
// let numberStr = "";
let arithmeticArray = [];

// New Array to handle the arithmetic operations
let calculationArray = [];

const displayArea = document.querySelector(".operations");
let docButtons = document.querySelectorAll("button");
// docButtons.forEach((btn) => btn.addEventListener("click", btnClick));
docButtons.forEach((btn) => btn.addEventListener("click", clickEntry));
