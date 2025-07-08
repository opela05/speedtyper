// loader.js
import { setupTyping } from './typing.js';
import { moveCaretToLetter } from './caret.js';

export let wordCount = 10; // default

export function setWordCount(count) {
  wordCount = count;
}

export function loadWords() {
  fetch('words.json')
    .then(response => response.json())
    .then(words => {
      const wordGrid = document.querySelector('.word-grid');
      let output = '';

      for (let i = 0; i < wordCount; i++) {
        const word = words[Math.floor(Math.random() * words.length)] + ' ';
        const letterHTML = word
          .split('')
          .map(letter => `<span class="letter">${letter}</span>`)
          .join('');
        output += `<span class="word">${letterHTML}</span>`;
      }

      wordGrid.innerHTML = output.trim();

      const wordSpans = document.querySelectorAll('.word');
      const letterSpans = wordSpans[0].querySelectorAll('.letter');

      moveCaretToLetter(letterSpans[0]);
      setupTyping(wordSpans, letterSpans);
    })
    .catch(err => console.error('Error loading words:', err));
}
