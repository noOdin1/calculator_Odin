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

function clickEntry(event) {
  if (
    // checks for 1st argument decimal points
    event.target.id == "point" &&
    arithmeticOpObj.decimalPointPos1 != -1 &&
    arithmeticOpObj.arithmeticSymbolPos == -1
  ) {
    console.warn("[clickEntry] Too many decimal points for 1st argument");
    return;
  }
  if (
    // checks for 2nd arguments decimal points
    event.target.id == "point" &&
    arithmeticOpObj.decimalPointPos1 != -1 &&
    arithmeticOpObj.arithmeticSymbolPos != -1 &&
    arithmeticOpObj.decimalPointPos2 != -1
  ) {
    console.warn("[clickEntry] Too many decimal points for 2nd argument");
    return;
  }
  if (event.target.id == "point" && arithmeticOpObj.decimalPointPos1 == -1) {
    arithmeticOpObj.decimalPointPos1 = arithmeticOpObj.memory.length;
  }
  if (
    event.target.id == "point" &&
    arithmeticOpObj.decimalPointPos1 != -1 &&
    arithmeticOpObj.arithmeticSymbolPos != -1
  ) {
    arithmeticOpObj.decimalPointPos2 = arithmeticOpObj.memory.length;
  }
  if (operatorsVerb.includes(event.target.id)) {
    arithmeticOpObj.arithmeticSymbolPos = arithmeticOpObj.memory.length;
  }
  arithmeticOpObj.memory.push(inputObj[event.target.id]);
  console.log(
    "[clickEntry] memory: " +
      arithmeticOpObj.memory +
      "\noperator symbol pos: " +
      arithmeticOpObj.arithmeticSymbolPos +
      ", decimal point pos1: " +
      arithmeticOpObj.decimalPointPos1 +
      ", decimal point pos2: " +
      arithmeticOpObj.decimalPointPos2,
  );
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
  equals: "=",
};

const twoArgOperatorObj = {
  plus: "+",
  minus: "-",
  multiplication: "x",
  division: "/",
};

const arithmeticOpObj = {
  memory: [],
  decimalPointPos1: -1,
  decimalPointPos2: -1,
  arithmeticSymbolPos: -1,
};

const displayArea = document.querySelector(".operations");
let docButtons = document.querySelectorAll("button");
docButtons.forEach((btn) => btn.addEventListener("click", clickEntry));
