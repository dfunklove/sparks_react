/* 
  * if goal.value and !score.value, show an error message 
  */
export function checkFormErrors() {
  var error = false;
  const goals = document.querySelectorAll(".goal");
  for (let i=0; i<goals.length; i++) {
    const scoreElement = goals[i].parentElement?.querySelector(".score") as HTMLInputElement
    const errorElement = goals[i].parentElement?.querySelector(".error") as HTMLElement
    if ((goals[i] as HTMLInputElement).value && !scoreElement.value) {
      errorElement.innerText = "Required";
      error = true;
    } else {
      errorElement.innerText = "";
    }
  }
  const errorElement = document.querySelector("label[for='submit']")
  if (errorElement) {
    if (error)
      errorElement.innerHTML = "Please correct the errors to continue"
    else
      errorElement.innerHTML = ""
  }
  return error;
}