// main.js

console.log(1000);

const wordCount = 15;

let currentWordIndex = 0;
let currentLetterIndex = 0;
let letterSpans, wordSpans;

fetch('words.json')
  .then(response => response.json())
  .then(words => {
    const wordGrid = document.querySelector('.word-grid');
    let output = '';

    for (let i = 0; i < wordCount; i++) {
      const word = words[Math.floor(Math.random() * words.length)];
      const letterSpans = word
        .split('')
        .map(letter => `<span class="letter">${letter}</span>`) 
        .join('');
      output += `<span class="word">${letterSpans}</span> `;
    }

    wordGrid.innerHTML = output.trim();

    wordSpans = document.querySelectorAll('.word');
    letterSpans = wordSpans[currentWordIndex].querySelectorAll('.letter');

    document.addEventListener('keydown', (e) => {
      if (!wordSpans) return;

      if (e.key === ' ') {
        e.preventDefault();
        currentWordIndex++;
        currentLetterIndex = 0;

        if (wordSpans[currentWordIndex]) {
          letterSpans = wordSpans[currentWordIndex].querySelectorAll('.letter');
        }
        return;
      }

      if (e.key === 'Backspace') {
        if (currentLetterIndex > 0) {
          currentLetterIndex--;
          const letter = letterSpans[currentLetterIndex];
          letter.classList.remove('correct', 'incorrect');
        }
        return;
      }

      if (e.key.length === 1 && currentLetterIndex < letterSpans.length) {
        const letter = letterSpans[currentLetterIndex];
        const expected = letter.textContent;

        if (e.key === expected) {
          letter.classList.add('correct');
        } else {
          letter.classList.add('incorrect');
        }

        currentLetterIndex++;
      }
    });
  })
  .catch(error => console.error('Error loading words.json:', error));