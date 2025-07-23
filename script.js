function btnClick(event) {
  // I find that using the classList would sometimes get a empty '' string
  // on the console. This might cause problems later on.
  console.log("[btnClick] event.target.id: " + event.target.id);
  if (numberArray.includes(event.target.id)) {
    console.log("[btnClick] This is a number");
  }
  if (operatorArray.includes(event.target.id)) {
    console.log("[btnClick] This is an operator");
    // First function to test, 'clear' button
    if (event.target.id == "clear") {
      let displayArea = document.querySelector(".operations");
      displayArea.textContent = "";
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
let docButtons = document.querySelectorAll("button");
docButtons.forEach((btn) => btn.addEventListener("click", btnClick));
