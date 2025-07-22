function btnClick(event) {
  console.log("[btnClick] event.target.classList: " + event.target.classList);
}

let btns = document.querySelectorAll(".button");
// btn.addEventListener("click", btnClick);
btns.forEach((btn) => btn.addEventListener("click", btnClick));
