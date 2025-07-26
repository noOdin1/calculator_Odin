function updateDisplayArea(displayStr) {
  console.log("[updateDisplayArea] displayStr: " + displayStr);
  displayArea.textContent = displayStr;
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
  arithmeticOpObj.memory = [];
  arithmeticOpObj.decimalPointPos1 = -1;
  arithmeticOpObj.decimalPointPos2 = -1;
  arithmeticOpObj.arithmeticSymbolPos = -1;
  // arithmeticOpObj.result = "";

  // console.clear();
}

function decimalPointFilter() {
  if (arithmeticOpObj.arithmeticSymbolPos == -1) {
    // checks for 1st argument decimal points
    if (arithmeticOpObj.decimalPointPos1 != -1) {
      console.warn(
        "[decimalPointFilter] Too many decimal points for 1st argument, " +
          arithmeticOpObj.returnArgument("1"),
      );
      // console.warn(
      //   "[decimalPointFilter] Too many decimal points for 1st argument",
      // );
      arithmeticOpObj.showValues("decimalPointFilter - 1");
      return false;
    }
    arithmeticOpObj.decimalPointPos1 = arithmeticOpObj.memory.length;
    return true;
  }
  if (arithmeticOpObj.arithmeticSymbolPos != -1) {
    // checks 2nd argument for decimal points
    if (arithmeticOpObj.decimalPointPos2 != -1) {
      console.warn(
        "[decimalPointFilter] Too many decimal points for 2nd argument, " +
          arithmeticOpObj.returnArgument("2"),
      );
      // console.warn(
      //   "[decimalPointFilter] Too many decimal points for 2nd argument",
      // );
      arithmeticOpObj.showValues("decimalPointFilter - 2");
      return false;
    }
    arithmeticOpObj.decimalPointPos2 = arithmeticOpObj.memory.length;
    return true;
  }

  console.warn("[decimalPointFilter] Something was not detected.");

  return false;
}

function arithmeticSymbolFilter(symbol) {
  if (arithmeticOpObj.arithmeticSymbolPos == -1) {
    // This is the condition where the first number is a negative number
    if (arithmeticOpObj.memory.length == 0 && symbol == "minus") {
      // If the user wishes to proceed with another operation
      if (arithmeticOpObj.result != 0) {
        arithmeticOpObj.moveResultToMemory();
      }
      return true;
    }
    // condition: if user decides to continue with calculation after pressing
    // equals sign
    if (arithmeticOpObj.memory.length == 0 && arithmeticOpObj.result != 0) {
      arithmeticOpObj.moveResultToMemory();
      console.log(
        "[arithmeticSymbolFilter] arithmeticOpObj.memory: " +
          arithmeticOpObj.memory,
      );
      arithmeticOpObj.result = 0;
      return true;
    }
    // check if symbols were added right after a decimal point
    if (arithmeticOpObj.memory.length == arithmeticOpObj.decimalPointPos1 + 1) {
      console.warn("[arithmeticSymbolFilter] Cannot add symbol here");
      return false;
    }
    arithmeticOpObj.arithmeticSymbolPos = arithmeticOpObj.memory.length;
    return true;
  }
  if (arithmeticOpObj.arithmeticSymbolPos != -1) {
    // condition where the user presses another arithmetic symbol
    arithmeticEquals();

    arithmeticOpObj.moveResultToMemory();
    console.log(
      "[arithmeticSymbolFilter] arithmeticOpObj.memory: " +
        arithmeticOpObj.memory,
    );
    arithmeticOpObj.result = 0;
    return true;
  }

  console.warn("[arithmeticSymbolFilter] Something was not detected.");

  return false;
}

function arithmeticEquals() {
  arithmeticOpObj.showValues("arithmeticEquals");
  // This condition will not assume anything, but check for it
  if (
    arithmeticOpObj.arithmeticSymbolPos != -1 &&
    arithmeticOpObj.memory.length > arithmeticOpObj.arithmeticSymbolPos + 1
  ) {
    let arg1 = arithmeticOpObj.memory.slice(
      0,
      arithmeticOpObj.arithmeticSymbolPos,
    );
    let arg2 = arithmeticOpObj.memory.slice(
      arithmeticOpObj.arithmeticSymbolPos + 1,
    );
    let symbol = arithmeticOpObj.memory.slice(
      arithmeticOpObj.arithmeticSymbolPos,
      arithmeticOpObj.arithmeticSymbolPos + 1,
    );

    arg1 = arg1.join("");
    arg2 = arg2.join("");
    console.log(
      "[arithmeticEquals] arg1: " +
        arg1 +
        ", sym: " +
        symbol +
        ", arg2: " +
        arg2,
    );
    arithmeticOpObj.result = operate([arg1, `${symbol}`, arg2]);
    clearCalculationMemory();
    console.log("[arithmeticEquals] result: " + arithmeticOpObj.result);

    return;
  }
  if (
    arithmeticOpObj.memory.length ==
    arithmeticOpObj.arithmeticSymbolPos + 1
  ) {
    arithmeticOpObj.memory.pop();
    arithmeticOpObj.arithmeticSymbolPos = -1;
    return;
  }
}

function clickEntry(event) {
  if (event.target.id == "clear") {
    clearCalculationMemory();
    arithmeticOpObj.result = "";
    clearDisplay();
    return;
  }

  if (event.target.id == "point") {
    if (!decimalPointFilter()) {
      return;
    }
  }

  if (operatorsVerb.includes(event.target.id)) {
    if (!arithmeticSymbolFilter(event.target.id)) {
      return;
    }
  }

  if (event.target.id == "equals") {
    arithmeticEquals();
    let displayResult =
      arithmeticOpObj.memory.length == 0
        ? arithmeticOpObj.result
        : arithmeticOpObj.memory.join("");
    // updateDisplayArea(arithmeticOpObj.result);
    updateDisplayArea(displayResult);

    return;
  }

  arithmeticOpObj.memory.push(inputObj[event.target.id]);

  updateDisplayArea(arithmeticOpObj.memory.join(""));

  arithmeticOpObj.showValues("clickEntry");
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
  result: "",

  showValues: function (functionName) {
    console.log(
      `[${functionName}] arithmeticOpObj values = memory: ${this.memory} 
        operator symbol pos: ${this.arithmeticSymbolPos}` +
        `, decimal point pos1: ${this.decimalPointPos1}` +
        `, decimal point pos2: ${this.decimalPointPos2}` +
        `, result: ${this.result}, memory length: ${this.memory.length}`,
    );
  },
  moveResultToMemory: function () {
    arithmeticOpObj.memory = arithmeticOpObj.result.toString().split("");
    arithmeticOpObj.arithmeticSymbolPos = arithmeticOpObj.memory.length;
  },
  returnArgument: function (arg) {
    if (arg == "1") {
      let len =
        this.arithmeticSymbolPos == -1
          ? this.memory.length
          : this.arithmeticSymbolPos;
      return this.memory.slice(0, len).join("");
    }
    if (arg == "2") {
      return this.arithmeticSymbolPos == -1
        ? "-1"
        : this.memory.slice(this.arithmeticSymbolPos + 1).join("");
    }
    if (arg == "symbol") {
      if (this.arithmeticSymbolPos == -1) {
        return "-1";
      }
      return this.memory.slice(
        this.arithmeticSymbolPos,
        this.arithmeticSymbolPos + 1,
      );
    }
  },
  valuesForDisplay: function () {
    if (this.arithmeticSymbolPos == -1) {
      return this.memory.join("");
    }
    if (this.memory.length > this.arithmeticSymbolPos + 1) {
      return this.memory.slice(this.arithmeticSymbolPos + 1).join();
    }
    return "";
  },
};

const displayArea = document.querySelector(".operations");
let docButtons = document.querySelectorAll("button");
docButtons.forEach((btn) => btn.addEventListener("click", clickEntry));
