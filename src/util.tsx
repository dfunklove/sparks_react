/* 
  * if goal.value and !score.value, show an error message 
  */
export function checkFormErrors() {
  var error = false;
  const goals = document.querySelectorAll(".goal");
  for (let i=0; i<goals.length; i++) {
    const scoreElement = goals[i].parentElement?.querySelector(".score") as HTMLInputElement
    if ((goals[i] as HTMLInputElement).value && !scoreElement.value) {
      scoreElement.required = true;
      error = true;
    } else {
      scoreElement.required = false;
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

export function msToTime(milli: number)
{
  function pad(n: number) {
    return ('00' + n).slice(-2);
  }

  var minutes = Math.floor((milli / (1000 * 60)) % 60);
  var hours = Math.floor((milli / (60 * 60 * 1000)) % 60);
  return pad(hours) + ":" + pad(minutes);
}
