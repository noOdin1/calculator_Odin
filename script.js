function btnClick(event) {
  // I find that using the classList would sometimes get a empty '' string
  // on the console. This might cause problems later on.
  console.log("[btnClick] event.target.id: " + event.target.id);
}

let btns = document.querySelectorAll(".button");
// btn.addEventListener("click", btnClick);
btns.forEach((btn) => btn.addEventListener("click", btnClick));
