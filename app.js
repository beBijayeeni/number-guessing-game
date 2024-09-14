let randomNumber = Math.floor(Math.random() * (120 - 20 + 1)) + 20;

// DOM-related things usually prefix variable names with a $ sign.
const $submitButton = document.querySelector("#submitButton");
const $userInput = document.querySelector("#guessField");
const $guessSlot = document.querySelector(".guesses");
const $remainingCount = document.querySelector(".lastResult");
const $startOverGame = document.querySelector(".resultParas");
const $guessingResult = document.querySelector(".guessingResult");
const $newGameGuide = document.createElement("p");
const $circleArea = document.querySelector(".circleArea");
const $answerCircleArea = document.querySelector(".answerCircleArea");
const $guessCircleArea = document.querySelector(".guessCircleArea");

let numGuesses = 1;
let playGame = true;

// This is the part where we start the game.
if (playGame) {
  makeAnswerCircle(randomNumber, "answer");
  $guessingResult.innerHTML = `<h1>Please enter a number.</h1>`;
  $submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt($userInput.value);
    checkGuess(guess);
  });
}

// This is the part where we check the correct answer.
// This function is called when the submit button $submitButton is clicked.
function checkGuess(guess) {
  if (validate(guess)) {
    if (numGuesses === 10 && guess !== randomNumber) {
      displayGuesses(guess);
      displayMessage(`You've lost! The correct answer was ${randomNumber}`);
      endGame();
    } else {
      displayGuesses(guess);
      clearCircle();
      compareGuess(guess);
    }
  }
}

function validate(guess) {
  if (isNaN(guess)) {
    alert("Invalid input! Please enter a valid number.");
    return false;
  } else if (guess < 20) {
    alert("Number is too low! Please enter a number between 20 and 120.");
    return false;
  } else if (guess > 120) {
    alert("Number is too high! Please enter a number between 20 and 120.");
    return false;
  }

  return true;
}

function clearCircle() {
    if ($guessCircleArea.childElementCount >= 1) {
    $guessCircleArea.removeChild($guessCircleArea.firstChild);
  }
}

function compareGuess(guess) {
  if (guess === randomNumber) {
    makeGuessCircle(guess, "guess");
    displayMessage(`Correct!`);
    endGame();
  } else if (guess < randomNumber) {
    makeGuessCircle(guess, "guess");
    displayMessage(`You're too low! Try again!`);
  } else if (guess > randomNumber) {
    makeGuessCircle(guess, "guess");
    displayMessage(`That's too high! Try again!`);
  }
}

// Show the user's input.
function displayGuesses(guess) {
  $userInput.value = "";
  $guessSlot.innerHTML += `${guess}  `;
  numGuesses++;
  // Implementation 1. Please fill in the = after below so we can show the remaining count!
  $remainingCount.innerHTML = `${11-numGuesses}`;
}

// Enter a message to display to the user.
function displayMessage(message) {
  // Implementation 2. Implement the following area to show the message to the user
  $guessingResult.innerHTML=`<h1>${message}</h1>`;
}

// Ending the game after success or failure
function endGame() {
  $userInput.disabled = true;
  $submitButton.disabled = true;
  $newGameGuide.innerHTML = `<h2>Over... Reload to start a new game!</h2>`;
  $newGameGuide.classList.add("newGame");
  $startOverGame.appendChild($newGameGuide);
  playGame = false;
  newGame();
}

function makeAnswerCircle(guess) {
  const CIRCLE_NAME = "answer"
  // Implement 3. To make it easier for the user to infer the correct answer from the size of the circle, implement this part using the showCircle function,
  // When the showCircle function is done "working", enter the name of the circle in the corresponding div
  showCircle(guess, CIRCLE_NAME, $answerCircleArea).then((div)=>{
    div.id = "answerCircle";
    div.append(CIRCLE_NAME);
  });
}

function makeGuessCircle(guess) {
  const CIRCLE_NAME = "guess"
  // Implement 3. To make it easier for the user to infer the correct answer by the size of the circle, implement this part using the showCircle function,
  // After the showCircle function is done "working", enter the name of the circle in the corresponding div
  showCircle(guess, CIRCLE_NAME, $guessCircleArea).then((div)=>{
    div.id = "guessCircle";
    div.append(CIRCLE_NAME);
 });
}

// This function draws a circle, animating the speed at which it is drawn with CSS,
// Takes in the size, name, and area of the circle and draws the area with the size and the name taken as arguments.
// To call this function, we need the size to be the number the user guessed, and the area and name to be something like $guessCircleArea.
function showCircle(size, circleName, area) {
  // Set up the dimensions and coordinates of the circle
  const radius = size; // Use the size directly for radius
  let div = document.createElement("div");
  area.appendChild(div);

  div.id = `${circleName}`;
  div.className = "circle";

  // Initially set the size of the circle to 0, and position it in the middle
  div.style.width = 0;
  div.style.height = 0;
  div.style.position = "relative"; // Use relative positioning
  div.style.margin = "auto"; // Center the circle horizontally

  return new Promise((resolve) => {
    setTimeout(() => {
      // Set the final size of the circle using the radius
      div.style.width = radius * 2 + "px";
      div.style.height = radius * 2 + "px";
      div.style.borderRadius = "50%"; // Make it a perfect circle

      div.addEventListener("transitionend", function handler() {
        div.removeEventListener("transitionend", handler);
        resolve(div);
      });
    }, 0);
  });
}

