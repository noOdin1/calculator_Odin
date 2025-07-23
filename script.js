function updateDisplayArea(displayStr) {
  console.log("[updateDisplayArea] displayStr: " + displayStr);
  let btnTxt = document.querySelector(`#${displayStr}`);
  displayArea.textContent += btnTxt.textContent;
}

function displayText(strToDisplay) {
  displayArea.textContent = strToDisplay;
}

function add(num1, num2) {
  return num1 + num2;
}

function substract(num1, num2) {
  return num1 - num2;
}

function multiplication(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(eqArray) {
  let num = 0;
  switch (eqArray[1]) {
    case "+":
      console.log("[operate] Sum of 2 numbers");
      num = add(eqArray[0], eqArray[2]);
      break;
    case "-":
      console.log("[operate] 1st number minus 2nd number");
      num = substract(eqArray[0], eqArray[2]);
      break;
    case "x":
      console.log("[operate] 1st number multiply by 2nd number");
      num = multiplication(eqArray[0], eqArray[2]);
      break;
    case "/":
      console.log("[operate] 1st number divide by 2nd number");
      num = divide(eqArray[0], eqArray[2]);
      break;
    default:
  }

  return num;
}

function clearDisplay() {
  displayArea.textContent = "";
}

function btnClick(event) {
  // I find that using the classList would sometimes get a empty '' string
  // on the console. This might cause problems later on.
  // console.log("[btnClick] event.target.id: " + event.target.id);
  if (numberArray.includes(event.target.id)) {
    let tmpChar = document.querySelector(`#${event.target.id}`).textContent;
    numberStr += tmpChar;
    // numberStr += document.querySelector(`#${event.target.id}`).textContent;
    // numberStr.concat(
    //   document.querySelector(`#${event.target.id}`).textContent,
    // );
    updateDisplayArea(event.target.id);
    // console.log("[btnClick] numberStr: " + numberStr);
  }
  if (operatorArray.includes(event.target.id)) {
    // console.log("[btnClick] This is an operator");
    // First function to test, 'clear' button
    if (event.target.id == "clear") {
      displayArea.textContent = "";
      arithmeticArray = [];
    } else if (event.target.id == "equals") {
      arithmeticArray.push(numberStr);
      numberStr = "";
      console.log("[btnClick] arithmeticArray: " + arithmeticArray);
      operate(arithmeticArray);
    } else {
      arithmeticArray.push(numberStr);
      numberStr = "";
      let tmpChar = document.querySelector(`#${event.target.id}`).textContent;
      if (event.target.id == "division") {
        arithmeticArray.push("/");
      } else {
        arithmeticArray.push(tmpChar);
      }
      updateDisplayArea(event.target.id);
    }
  }
  console.log("[btnClick] arithmeticArray: " + arithmeticArray);
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
let numberStr = "";
let arithmeticOp = "";
// let numberStr = "";
let arithmeticArray = [];

const displayArea = document.querySelector(".operations");
let docButtons = document.querySelectorAll("button");
docButtons.forEach((btn) => btn.addEventListener("click", btnClick));
