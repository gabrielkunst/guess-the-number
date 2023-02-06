"use strict";

/* PSEUDO CODE

1) again button
on click, reset background color, reset number to ?, reset number width, reset message to insira um numero, reset score, reset guess value, reset win value, generate a new random number

2) check button
on click, see if win = false and if score > 1 {
 if guess = empty  {
  change message
  change score
 } if guess < 1 or guess > 100 {
    change message
    change score
 } if guess < random {
  too low
  change message
  change score
 } if guess > random {
  too high
  change message
  change score
 } if guess === random {
  winner()
 }
}

winner() {
 change background, change number width, show number, change win = true, change message, change highscore
}

loser() {
 change background, change number width, show number, change message, change highscore, change score
}

*/

const btnAgainEl = document.querySelector(".btn--again");
const btnCheckEl = document.querySelector(".btn--check");
const guessEl = document.querySelector(".guess");
const scoreEl = document.querySelector(".score-value");
const highscoreEl = document.querySelector(".highscore-value");
const messageEl = document.querySelector(".message");
const numberEl = document.querySelector(".number");
const bodyEl = document.querySelector("body");
let score = scoreEl.textContent;
let highscore = highscoreEl.textContent;
let win = false;
let random = Math.floor(Math.random() * 100) + 1;

function changeElement(element, value) {
  element.textContent = value;
}

function scoreDown() {
  score--;
  changeElement(scoreEl, score);
}

function highscoreUp() {
  highscore++;
  changeElement(highscoreEl, highscore);
}

function changeNumber() {
  numberEl.style.width = "15rem";
  numberEl.textContent = random;
}

function winner() {
  bodyEl.style.background = "var(--gradient--green)";
  changeNumber();
  changeElement(messageEl, "Você venceu!");
  highscoreUp();
  win = true;
}

function loser() {
  changeNumber();
  changeElement(messageEl, "Você perdeu!");
  highscore = 0;
  changeElement(highscoreEl, highscore);
  bodyEl.style.background = "var(--gradient--red)";
  score = 0;
  changeElement(scoreEl, score);
  setTimeout(function () {
    alert("Clique no 'Tentar Novamente' para jogar de novo!");
  }, 100);
}

const reset = function () {
  changeElement(messageEl, "Insira um número...");
  bodyEl.style.background = "var(--background)";
  numberEl.style.width = "clamp(100px, 7vw, 150px)";
  numberEl.textContent = "?";
  score = 10;
  changeElement(scoreEl, score);
  guessEl.value = "";
  win = false;
  random = Math.floor(Math.random() * 100) + 1;
};

const check = function () {
  if (!win && score > 1) {
    let guess = Number(guessEl.value);
    if (!guess || guess < 1 || guess > 100) {
      changeElement(messageEl, "Número inválido!");
      scoreDown();
    } else if (guess > random || guess < random) {
      guess > random
        ? changeElement(messageEl, "Alto de mais!")
        : changeElement(messageEl, "Baixo de mais!");
      scoreDown();
    } else if (guess === random) {
      winner();
    }
  } else {
    win ? alert("Clique no 'Tentar Novamente' para jogar de novo!") : loser();
  }
};
btnCheckEl.addEventListener("click", check);
btnAgainEl.addEventListener("click", reset);
document.querySelector(".guess").addEventListener("keydown", (event) => {
  let key = event.key;
  if (key === "Enter") {
    check();
  }
});
