console.log(1000);

let timer = 30
let timerInterval
let wordCount = 10
let currentWordIndex = 0
let currentLetterIndex = 0
let letterSpans, wordSpans

//data for stats
let correct = 0, incorrect = 0

//cursor func -> called a caret
const caret = document.createElement('div')
caret.classList.add('caret')
document.body.appendChild(caret)

function moveCaretToLetter(span)
{
  if (!span) return;
  const rect = span.getBoundingClientRect()
  const bodyRect = document.body.getBoundingClientRect()
  caret.style.left = `${rect.left - bodyRect.left}px`
  caret.style.top = `${rect.top - bodyRect.top}px`
}

//word count
document.addEventListener('DOMContentLoaded', () =>
{
  loadWords();

  document.querySelectorAll('input[name="count"]').forEach(input =>
  {
    input.addEventListener('change', () =>
    {
      wordCount = parseInt(input.value);
      loadWords(); 
    });
  });
});

//timer
document.addEventListener('DOMContentLoaded', () =>
  {
    loadWords();
  
    document.querySelectorAll('input[name="timer"]').forEach(input =>
    {
      input.addEventListener('change', () =>
      {
        timer = parseInt(input.value);
        loadWords(); 
      });
    });
    document.addEventListener('keydown', startTimerFirst);
});
  
function startTimerFirst()
{
  document.removeEventListener('keydown', startTimerFirst);
  startTimer(timer);
}

function startTimer(time)
{
  let tot = time
  const display = document.getElementById('timer-display');
  display.textContent = `${tot}s`;

  timerInterval = setInterval(() =>
  {
    tot--;
    display.textContent = `${tot}s`;

    if (tot <= 0)
    {
      clearInterval(timerInterval);
      display.textContent = 'suck it';
      disableTyping(); 
    }
  }, 1000);
}

function disableTyping()
{
  document.removeEventListener('keydown', handleTyping);
}

//put words from json into grid
function loadWords()
{
  fetch('words.json')
    .then(response => response.json())
    .then(words =>
    {
      const wordGrid = document.querySelector('.word-grid');
      let output = '';

      for (let i = 0; i < wordCount; i++)
      {
        const word = words[Math.floor(Math.random() * words.length)] + ' ';
        const letterHTML = word
          .split('')
          .map(letter => `<span class="letter">${letter}</span>`)
          .join('');
        output += `<span class="word">${letterHTML}</span>`;
      }

      wordGrid.innerHTML = output.trim();

      currentWordIndex = 0;
      currentLetterIndex = 0;
      wordSpans = document.querySelectorAll('.word');
      letterSpans = wordSpans[currentWordIndex].querySelectorAll('.letter');

      moveCaretToLetter(letterSpans[currentLetterIndex]);
      
      document.removeEventListener('keydown', handleTyping);
      document.addEventListener('keydown', handleTyping);
    })
    .catch(err => console.error('Error loading words:', err));
}

//typing logic
function handleTyping(e)
{
  if (!wordSpans || !letterSpans) return;

  if (e.key === 'Backspace')
  {
    if (currentLetterIndex > 0)
    {
      currentLetterIndex--;
      const letter = letterSpans[currentLetterIndex];
      letter.classList.remove('correct', 'incorrect');
      moveCaretToLetter(letter);
    }
    return;
  }

  if (e.key.length === 1 && currentLetterIndex < letterSpans.length)
  {
    const letter = letterSpans[currentLetterIndex];
    const expected = letter.textContent;

    if (e.key === expected)
    {
      letter.classList.add('correct');
      correct += 1;
    }
    else
    {
      letter.classList.add('incorrect');
      incorrect += 1;
    }

    currentLetterIndex++;

    if (currentLetterIndex < letterSpans.length)
    {
      moveCaretToLetter(letterSpans[currentLetterIndex]);
    }
    else
    {
      currentWordIndex++;
      currentLetterIndex = 0;

      if (wordSpans[currentWordIndex])
      {
        letterSpans = wordSpans[currentWordIndex].querySelectorAll('.letter');
        moveCaretToLetter(letterSpans[currentLetterIndex]);
      }

      else
      {
        console.log(correct + ' ' + incorrect)
      }
    }
  }
}
