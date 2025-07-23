function btnClick(event) {
  // I find that using the classList would sometimes get a empty '' string
  // on the console. This might cause problems later on.
  console.log("[btnClick] event.target.id: " + event.target.id);
}

let btns.forEach((btn) => btn.addEventListener("click", btnClick));
docButtons.forEach((btn) => btn.addEventListener("click", btnClick));
