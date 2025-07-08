//stats.js
import { timer } from './timer.js';
import { caret } from './caret.js';
import { correct, incorrect } from './typing.js';
import { wordCount } from './loader.js';

export function showStats() {
  const wordGrid = document.querySelector('.word-grid');
  const statsDiv = document.getElementById('stats');

  wordGrid.style.display = 'none';
  caret.style.display = 'none';

  const spaces = wordCount; 
  const totalTyped = correct + incorrect - spaces;
  const adjustedCorrect = correct - spaces;
  const adjustedIncorrect = incorrect;

  const wpm = Math.round((totalTyped / 5) / (timer / 60));
  const accuracy = totalTyped > 0 ? Math.round((adjustedCorrect / totalTyped) * 100) : 0;

  statsDiv.innerHTML = `
    <div class="result-box text-center p-4">
      <div class="d-flex flex-wrap justify-content-around text-center mb-4">
        <div>
          <h3 class="text-warning">wpm</h3>
          <div class="display-4 font-weight-bold">${wpm}</div>
        </div>
        <div>
          <h3 class="text-warning">accuracy</h3>
          <div class="display-4 font-weight-bold">${accuracy}%</div>
        </div>
        <div>
          <h3 class="text-warning">time</h3>
          <div class="display-4 font-weight-bold">${timer}s</div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-auto">
          <p class="mb-1">correct letters: <span class="text-success">${adjustedCorrect}</span></p>
          <p class="mb-3">incorrect letters: <span class="text-danger">${adjustedIncorrect}</span></p>
          <button class="btn btn-outline-light" onclick="window.location.reload()">Restart Test</button>
        </div>
      </div>
    </div>
  `;

  statsDiv.style.display = 'block';
}
