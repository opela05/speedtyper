# Monkeytype UI Clone (Typing Speed Test)

This is project for me to gain better understanding of vanilla JS, HTML/CSS> A typing speed test interface inspired by Monkeytype. 

## Features

- Modular JavaScript codebase (`caret`, `timer`, `typing`, `stats`, `loader`, `events`)
- Adjustable settings:
  - Timer (30s, 60s, 90s)
  - Word count (10, 15, 20)
- Live caret that follows your typing
- Displays WPM, accuracy, correct/incorrect letters
- Keyboard shortcut: `Tab + Enter` to restart the test

## Word List Source

The `words.json` file used in this project is based on the open-source word list from:  
[https://github.com/RazorSh4rk/random-word-api/blob/master/words.json](https://github.com/RazorSh4rk/random-word-api/blob/master/words.json)

## Future Scope

- Add WPM-over-time graphs using Chart.js
- Support different typing modes (quotes, custom text, code snippets)
- Show key-level stats and trends over time

## Getting Started

Clone the repository and open `index.html` in a browser.

```bash
git clone <your-repo-url>
cd <repo-folder>
# open index.html manually or use Live Server
