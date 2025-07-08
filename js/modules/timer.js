//timer.js

import { showStats } from './stats.js';
import { disableTyping } from './typing.js';

let timerInterval;
export let timer = 30;
let elapsed = 0;

export function setTimer(value) {
  timer = value;
}

export function startTimer() {
  const display = document.getElementById('timer-display');
  let timeLeft = timer;
  elapsed = 0;

  clearInterval(timerInterval);
  display.textContent = `${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    elapsed++;
    display.textContent = `${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      display.textContent = 'done';
      disableTyping();
      showStats();
    }
  }, 1000);
}

export function getElapsedTime() {
  return elapsed;
}

export function resetTimer() {
  clearInterval(timerInterval);
}
