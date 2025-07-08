//typing.js
import { moveCaretToLetter } from './caret.js';
import { showStats } from './stats.js';
import { resetTimer, startTimer } from './timer.js';

export let correct = 0;
export let incorrect = 0;

let currentWordIndex = 0;
let currentLetterIndex = 0;
let wordSpans, letterSpans;
let typingEnabled = true;

export function handleTyping(e) {
  if (!typingEnabled || !wordSpans || !letterSpans) return;

  if (e.key === 'Backspace') {
    if (currentLetterIndex > 0) {
      currentLetterIndex--;
      const letter = letterSpans[currentLetterIndex];
      letter.classList.remove('correct', 'incorrect');
      moveCaretToLetter(letter);
    }
    return;
  }

  if (e.key.length === 1 && currentLetterIndex < letterSpans.length) {
    const letter = letterSpans[currentLetterIndex];
    const expected = letter.textContent;

    if (e.key === expected) {
      letter.classList.add('correct');
      correct++;
    } else {
      letter.classList.add('incorrect');
      incorrect++;
    }

    currentLetterIndex++;

    if (currentLetterIndex < letterSpans.length) {
      moveCaretToLetter(letterSpans[currentLetterIndex]);
    } else {
      currentWordIndex++;
      currentLetterIndex = 0;

      if (wordSpans[currentWordIndex]) {
        letterSpans = wordSpans[currentWordIndex].querySelectorAll('.letter');
        moveCaretToLetter(letterSpans[currentLetterIndex]);
      } else {
        showStats();
      }
    }
  }
}

export function setupTyping(_wordSpans, _letterSpans) {
  wordSpans = _wordSpans;
  letterSpans = _letterSpans;
  currentWordIndex = 0;
  currentLetterIndex = 0;
  correct = 0;
  incorrect = 0;
  typingEnabled = true;
  document.addEventListener('keydown', handleTyping);
}

export function disableTyping() {
  typingEnabled = false;
  document.removeEventListener('keydown', handleTyping);
}
