let heading = document.getElementById("heading");
let button = document.getElementById("changeBtn");

// Track the current state
let isClicked = false;

button.addEventListener("click", function() {
  if (isClicked) {
    heading.textContent = "Hello, Web3 Learner!";
    isClicked = false;
  } else {
    heading.textContent = "You clicked the button!";
    isClicked = true;
  }
});
