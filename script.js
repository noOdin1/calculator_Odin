function updateDisplayArea(displayStr) {
  console.log("[updateDisplayArea] displayStr: " + displayStr);
  let btnTxt = document.querySelector(`#${displayStr}`);
  displayArea.textContent += btnTxt.textContent;
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

function btnClick(event) {
  // I find that using the classList would sometimes get a empty '' string
  // on the console. This might cause problems later on.
  let numberStr = "";

  console.log("[btnClick] event.target.id: " + event.target.id);
  if (numberArray.includes(event.target.id)) {
    console.log("[btnClick] This is a number");
    updateDisplayArea(event.target.id);
  }
  if (operatorArray.includes(event.target.id)) {
    console.log("[btnClick] This is an operator");
    // First function to test, 'clear' button
    if (event.target.id == "clear") {
      displayArea.textContent = "";
    } else {
      updateDisplayArea(event.target.id);
    }
  }
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
const displayArea = document.querySelector(".operations");
let docButtons = document.querySelectorAll("button");
docButtons.forEach((btn) => btn.addEventListener("click", btnClick));
