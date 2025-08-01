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
    // the first time an arithmetic symbol was pressed
    if (symbol == "minus") {
      // If the user entered 'minus'
      if (arithmeticOpObj.memory.length == 0) {
        if (arithmeticOpObj.result != 0) {
          // the user decided to continue with the calculation but entered
          // a minus for a negative number.
          arithmeticOpObj.moveResultToMemory();
          arithmeticOpObj.result = "";
          return true;
        }
        // the minus is the first letter, a negative number
        return true;
      }
      // store the arithmetic pos.
      arithmeticOpObj.arithmeticSymbolPos = arithmeticOpObj.memory.length;
      return true;
    }
    if (arithmeticOpObj.memory == 0 && arithmeticOpObj.result != 0) {
      // if the user decides to continue using previous result
      arithmeticOpObj.moveResultToMemory();
      arithmeticOpObj.result = "";
      arithmeticOpObj.arithmeticSymbolPos = arithmeticOpObj.memory.length;

      return true;
    }
    // store the arithmetic pos.
    arithmeticOpObj.arithmeticSymbolPos = arithmeticOpObj.memory.length;
    return true;
  }

  if (arithmeticOpObj.arithmeticSymbolPos != -1) {
    // Arithmetic symbol already entered
    if (
      symbol == "minus" &&
      arithmeticOpObj.arithmeticSymbolPos == arithmeticOpObj.memory.length - 1
    ) {
      return true;
    }
    if (
      arithmeticOpObj.memory.length ==
      arithmeticOpObj.arithmeticSymbolPos + 1
    ) {
      // This is the behaviour described in TOP assignment
      arithmeticOpObj.memory.pop();

      return true;
    }
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

function displaySnarkyRemarks() {
  let randnum = Math.floor(Math.random() * snarkyRemarks.length);
  arithmeticOpObj.result = snarkyRemarks[randnum];
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

    if (`${symbol}` === "/" && Number(arg2) === 0) {
      // display snarky remark here
      displaySnarkyRemarks();
      clearCalculationMemory();

      return;
    }
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
    // Add a decimal round here
    arithmeticOpObj.result =
      arithmeticOpObj.result % 1 !== 0
        ? Number(arithmeticOpObj.result).toFixed(fixedDecimalPoints)
        : arithmeticOpObj.result;
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

function processUndo() {
  if (arithmeticOpObj.arithmeticSymbolPos == -1) {
    arithmeticOpObj.memory = [];
  }
  if (arithmeticOpObj.arithmeticSymbolPos != -1) {
    arithmeticOpObj.memory = arithmeticOpObj.memory.slice(
      0,
      arithmeticOpObj.arithmeticSymbolPos + 1,
    );
  }
  let textOut =
    arithmeticOpObj.memory.length == 0 ? "0" : arithmeticOpObj.memory.join("");
  updateDisplayArea(textOut);
}

function processInputs(signal) {
  console.log("[processInputs] signal: " + signal);
  // Function to process all the inputs from the user
  // This function will remove all the desicion making
  // from clickEntry and userKeyPress function.
  if (signal == "clear") {
    clearCalculationMemory();
    arithmeticOpObj.result = "";
    clearDisplay();
    return;
  }

  if (signal == "backSpace") {
    processUndo();
    return;
  }

  if (signal == "point") {
    if (!decimalPointFilter()) {
      return;
    }
  }

  if (operatorsVerb.includes(signal)) {
    if (!arithmeticSymbolFilter(signal)) {
      return;
    }
  }

  if (signal == "equals") {
    arithmeticEquals();
    let displayResult =
      arithmeticOpObj.memory.length == 0
        ? arithmeticOpObj.result
        : arithmeticOpObj.memory.join("");
    // updateDisplayArea(arithmeticOpObj.result);
    updateDisplayArea(displayResult);

    return;
  }

  arithmeticOpObj.memory.push(inputObj[signal]);

  updateDisplayArea(arithmeticOpObj.memory.join(""));

  arithmeticOpObj.showValues("processInputs");
}

function userKeyPress(event) {
  // processInputs(Object.keys(inputObj).find((key) => object[key] === value));

  // The following was how we can get the reverse of a key from an object:
  //   src: https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
  let tmpVal = Object.keys(inputObj).find((key) => inputObj[key] === event.key);

  // console.log("[userKeyPress] event.key: " + event.key);
  // if (event.key === event.keyBackSpace) {
  if (event.key === "Backspace") {
    tmpVal = "backSpace";
  }

  if (typeof tmpVal === "undefined") {
    console.log(
      "[userKeyPress] exiting, no value to process, tmpVal: " +
        tmpVal +
        ", event.key" +
        event.key,
    );
    return;
  }
  console.log("[userKeyPress] tmpVal: " + tmpVal);
  processInputs(`${tmpVal}`);
  //processInputs(event.key);
}

function clickEntry(event) {
  processInputs(event.target.id);
}

const operatorsVerb = ["minus", "plus", "multiplication", "division"];
const inputObj = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  zero: "0",
  zeroZero: "0",
  point: ".",
  plus: "+",
  minus: "-",
  multiplication: "x",
  division: "/",
  equals: "=",
  undo: "backSpace",
};
const snarkyRemarks = [
  "Really?",
  "..to infinity and beyond?",
  "Crashed.. Not!",
];

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

const fixedDecimalPoints = 4;
const displayArea = document.querySelector(".operations");
let docButtons = document.querySelectorAll("button");
docButtons.forEach((btn) => btn.addEventListener("click", clickEntry));
document.addEventListener("keydown", userKeyPress);
