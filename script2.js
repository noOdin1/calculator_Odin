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

function calculationProcess(calcArr) {
  let index = 0;
  operatorsSymbol.forEach((op) => {
    index = calcArr.indexOf(op) == -1 ? index : calcArr.indexOf(op);
    // console.log("[calculationProcess] index: " + index);
  });
  let arg1 = calcArr.slice(0, index);
  arg1 = arg1.join("");
  let arg2 = calcArr.slice(index + 1);
  arg2 = arg2.join("");
  console.log("[calculationProcess] index: " + index);
  let symbol = calcArr.slice(index, index + 1);

  console.log(
    "[calculationProcess] arg1: " + arg1 + ", b: " + symbol + ", arg2: " + arg2,
  );
  return operate([arg1, `${symbol}`, arg2]);
}

function clickEntry(event) {
  // process restrictions first
  // the basic push into array the items clicked on
  let evtObj = document.querySelector(`#${event.target.id}`);
  if (event.target.id == "clear") {
    calculationArray = []; // clear the calculation array
    arg1 = [];
    arg2 = [];
    arithmeticSymbol = "";
    result = 0;
    return;
  }
  if (event.target.id == "equals") {
    // send the array for calculation
    result = calculationProcess(calculationArray);
    console.log("[clickEntry] The result: " + result);
    calculationArray = [];
    console.log(
      "[clickEntry] length of calculationArray: " + calculationArray.length,
    );
    // This return statement is necessary. Skipping this statement would mean
    // that if (event.target.id == "zeroZero") {..} would execute.
    return;
  }
  if (event.target.id == "zeroZero") {
    calculationArray.push(inputObj[event.target.id]);
    calculationArray.push(inputObj[event.target.id]);
  } else {
    if (operatorsVerb.includes(event.target.id)) {
      if (result != 0 && calculationArray.length == 0) {
        // this means that the user continued with the process with
        // result from the previous calculation
        // TODO: There's a possible error here. It causes the
        //       check below to fail
        calculationArray.push(result.toString().split(""));
      }
    }
    if (event.target.id == "point") {
      // check if there's any previous '.'
      if (
        !operatorsSymbol.some((symbol) => calculationArray.includes(symbol))
      ) {
        if (calculationArray.indexOf(".") != -1) {
          console.warn("[clickEntry] too many points");
          return;
        }
      } else {
        console.info(
          // "[clickEntry] index of point: " + calculationArray.indexOf("."),
          "[clickEntry] index of point: " + calculationArray.indexOf(`${"."}`),
        );
        let tmpStr = calculationArray.slice(calculationArray.indexOf(".") + 1);
        console.info("[clickEntry] tmpStr: " + tmpStr);
        if (tmpStr.indexOf(".") != -1) {
          // console.info("[clickEntry] tmpStr: " + tmpStr);
          console.warn("[clickEntry] too many points");
          return;
        }
      }
    }
    calculationArray.push(inputObj[event.target.id]);
    console.log(
      "[clickEntry] length of calculationArray: " + calculationArray.length,
    );
  }

  console.log("[clickEntry] calculationArray: " + calculationArray);
}

const numberArray = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "zero",
  "point",
  "zeroZero",
];
const operatorArray = [
  "equals",
  "plus",
  "minus",
  "multiplication",
  "division",
  "clear",
  "percentage",
  "squareRoot",
];

const operatorsSymbol = ["-", "+", "x", "/"];
const operatorsVerb = ["minus", "plus", "multiplication", "division"];
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

let result = "";

let numberStr = "";
let arithmeticOp = "";
// let numberStr = "";
let arithmeticArray = [];

// New Array to handle the arithmetic operations
let calculationArray = [];
let arg1 = [];
let arg2 = [];
let arithmeticSymbol = "";

const displayArea = document.querySelector(".operations");
let docButtons = document.querySelectorAll("button");
docButtons.forEach((btn) => btn.addEventListener("click", clickEntry));
