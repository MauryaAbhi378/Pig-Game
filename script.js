//Selecting elements
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const dice = document.querySelector(".dice");
const rollDice = document.querySelector(".btn--roll");
const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");
const hold = document.querySelector(".btn--hold");

let currentScore, score, playing, activePlayer;

const init = () => {
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;

  document.querySelector("#score--0").textContent = 0;
  document.querySelector("#score--1").textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  dice.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player1.classList.remove("player--active");
  player0.classList.add("player--active");
};
init()

// Function of Switch player
const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

//Rolling Dice Functionality
rollDice.addEventListener("click", () => {
  if (playing) {
    // 1. Generating random dice roll
    const randomNum = Math.floor(Math.random() * 6) + 1;

    // 2. Displaying the dice
    dice.src = `dice-${randomNum}.png`;
    dice.classList.remove("hidden");

    // 3. Check for roll 1
    if (randomNum !== 1) {
      //Add dice to current score
      currentScore += randomNum;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to another player
      switchPlayer();
    }
  }
});

hold.addEventListener("click", () => {
  if (playing) {
    // 1. Update Scoreboard of active player
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    // If score >= 100
    if (score[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //Switch to another player
      switchPlayer();
    }
  }
});

document.querySelector(".btn--new").addEventListener("click", init);