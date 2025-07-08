//events.js
import { loadWords, setWordCount } from './loader.js';
import { setTimer, startTimer } from './timer.js';

export function setupEventListeners() {
  //word count button change
  document.querySelectorAll('input[name="count"]').forEach(input => {
    input.addEventListener('change', () => {
      const count = parseInt(input.value);
      setWordCount(count);
      loadWords();
    });
  });

  //timer button change
  document.querySelectorAll('input[name="timer"]').forEach(input => {
    input.addEventListener('change', () => {
      setTimer(parseInt(input.value));
      loadWords(); 
    });
  });

  document.addEventListener('keydown', startOnKey);

  let tabPressed = false;
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      tabPressed = true;
    } else if (e.key === 'Enter' && tabPressed) {
      e.preventDefault();
      location.reload(); 
    } else {
      tabPressed = false;
    }
  });
}

function startOnKey(e) {
  document.removeEventListener('keydown', startOnKey);
  startTimer();
}
