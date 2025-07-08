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

//word count + timer
document.addEventListener('DOMContentLoaded', () =>
{
  loadWords()
  setupWordCountSelector()
  setupTimerSelector()
  setupKeyboardShortcuts()
  document.addEventListener('keydown', startTimerFirst)
})

function setupWordCountSelector()
{
  document.querySelectorAll('input[name="count"]').forEach(input =>
  {
    input.addEventListener('change', () =>
    {
      wordCount = parseInt(input.value)
      loadWords()
    })
  })
}

function setupTimerSelector()
{
  document.querySelectorAll('input[name="timer"]').forEach(input =>
  {
    input.addEventListener('change', () =>
    {
      timer = parseInt(input.value)
      loadWords()
    })
  })
}

function setupKeyboardShortcuts()
{
  let tabPressed = false

  document.addEventListener('keydown', (e) =>
  {
    if (e.key === 'Tab')
    {
      e.preventDefault()
      tabPressed = true
    }
    else if (e.key === 'Enter' && tabPressed)
    {
      e.preventDefault()
      restartTest()
      tabPressed = false
    }
    else
    {
      tabPressed = false
    }
  })
}

function startTimerFirst()
{
  document.removeEventListener('keydown', startTimerFirst)
  startTimer(timer)
}

function startTimer(time)
{
  let tot = time
  const display = document.getElementById('timer-display')
  display.textContent = `${tot}s`

  clearInterval(timerInterval)
  timerInterval = setInterval(() =>
  {
    tot--
    display.textContent = `${tot}s`

    if (tot <= 0)
    {
      clearInterval(timerInterval)
      display.textContent = 'suck it'
      showStats()
    }
  }, 1000)
}

function showStats() {
  clearInterval(timerInterval);
  const wordGrid = document.querySelector('.word-grid');
  const statsDiv = document.getElementById('stats');

  wordGrid.style.display = 'none';
  caret.style.display = 'none';

  const totalTyped = correct + incorrect;
  const wpm = Math.round((totalTyped / 5) / (timer / 60));
  const accuracy = totalTyped ? Math.round((correct / totalTyped) * 100) : 0;

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
          <p class="mb-1">correct letters: <span class="text-success">${correct}</span></p>
          <p class="mb-3">incorrect letters: <span class="text-danger">${incorrect}</span></p>
          <button class="btn btn-outline-light" onclick="restartTest()">Restart Test</button>
        </div>
      </div>
    </div>
  `;

  statsDiv.style.display = 'block';
}


//put words from json into grid
function loadWords()
{
  fetch('words.json')
    .then(response => response.json())
    .then(words =>
    {
      const wordGrid = document.querySelector('.word-grid')
      let output = ''

      for (let i = 0; i < wordCount; i++)
      {
        const word = words[Math.floor(Math.random() * words.length)] + ' '
        const letterHTML = word
          .split('')
          .map(letter => `<span class="letter">${letter}</span>`)
          .join('')
        output += `<span class="word">${letterHTML}</span>`
      }

      wordGrid.innerHTML = output.trim()

      currentWordIndex = 0
      currentLetterIndex = 0
      wordSpans = document.querySelectorAll('.word')
      letterSpans = wordSpans[currentWordIndex].querySelectorAll('.letter')

      moveCaretToLetter(letterSpans[currentLetterIndex])

      document.removeEventListener('keydown', handleTyping)
      document.addEventListener('keydown', handleTyping)
    })
    .catch(err => console.error('Error loading words:', err))
}

//typing logic
function handleTyping(e)
{
  caret.style.display = 'block'
  if (!wordSpans || !letterSpans) return

  if (e.key === 'Backspace')
  {
    if (currentLetterIndex > 0)
    {
      currentLetterIndex--
      const letter = letterSpans[currentLetterIndex]
      letter.classList.remove('correct', 'incorrect')
      moveCaretToLetter(letter)
    }
    return
  }

  if (e.key.length === 1 && currentLetterIndex < letterSpans.length)
  {
    const letter = letterSpans[currentLetterIndex]
    const expected = letter.textContent

    if (e.key === expected)
    {
      letter.classList.add('correct')
      correct += 1
    }
    else
    {
      letter.classList.add('incorrect')
      incorrect += 1
    }

    currentLetterIndex++

    if (currentLetterIndex < letterSpans.length)
    {
      moveCaretToLetter(letterSpans[currentLetterIndex])
    }
    else
    {
      currentWordIndex++
      currentLetterIndex = 0

      if (wordSpans[currentWordIndex])
      {
        letterSpans = wordSpans[currentWordIndex].querySelectorAll('.letter')
        moveCaretToLetter(letterSpans[currentLetterIndex])
      }
      else
      {
        showStats()
      }
    }
  }
}

function restartTest()
{
  correct = 0
  incorrect = 0
  clearInterval(timerInterval)
  document.getElementById('stats').style.display = 'none'
  document.querySelector('.word-grid').style.display = 'block'
  caret.style.display = 'block'
  document.getElementById('timer-display').textContent = `${timer}s`
  loadWords()
  document.addEventListener('keydown', startTimerFirst)
}
