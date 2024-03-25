const counterEl = document.querySelector(".counter");
const increaseButtonEl = document.querySelector(".counter__button--increase");
const decreaseButtonEl = document.querySelector(".counter__button--decrease");
const resetButtonEl = document.querySelector(".counter__reset-button");
const counterValueEl = document.querySelector(".counter__value");
const counterTitleEl = document.querySelector(".counter__title");

// arrow function syntax
const resetCounter = () => {
  // set counter value to 0
  counterValueEl.textContent = 0;

  // reset background color
  counterEl.classList.remove("counter--limit");

  // reset counter title
  counterTitleEl.textContent = "Fancy Counter";

  // enable increase and decrease buttons
  increaseButtonEl.disabled = false;
  decreaseButtonEl.disabled = false;

  // unfocus (blur) reset button
  resetButtonEl.blur();
};

// regular function syntax
function incrementCounter() {
  // get current value of counter
  const currentValue = counterValueEl.textContent;

  // convert value to number type
  const currentValueAsNumber = +currentValue;

  // increment by 1
  let newValue = currentValueAsNumber + 1;

  // check if new value is greater than 5
  if (newValue > 5) {
    // if it is, force it to be 5 instead
    newValue = 5;

    // give visual indicator that limit has been reached
    counterEl.classList.add("counter--limit");

    // update counter title to say limit has been reached
    counterTitleEl.innerHTML = "Limit! Buy <b>Pro</b> for >5";

    // disable increase and decrease buttons
    increaseButtonEl.disabled = true;
    decreaseButtonEl.disabled = true;
  }

  // update counter element with new value
  counterValueEl.textContent = newValue;

  // unfocus (blur) increment button
  increaseButtonEl.blur();
}

function decrementCounter() {
  // get current value of counter
  const currentValue = counterValueEl.textContent;

  // convert value to number type
  const currentValueAsNumber = +currentValue;

  // decrement by 1
  let newValue = currentValueAsNumber - 1;

  // check if new value is less than 0
  if (newValue < 0) {
    // if it is, force it to be 0 instead
    newValue = 0;
  }

  // update counter element with new value
  counterValueEl.textContent = newValue;

  // unfocus (blur) decrement button
  decreaseButtonEl.blur();
}

resetButtonEl.addEventListener("click", resetCounter);
increaseButtonEl.addEventListener("click", incrementCounter);
decreaseButtonEl.addEventListener("click", decrementCounter);
document.addEventListener("keydown", incrementCounter);
