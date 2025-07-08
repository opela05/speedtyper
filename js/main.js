// main.js

console.log(1000);

import { setupCaret } from './modules/caret.js';
import { loadWords } from './modules/loader.js';
import { setupEventListeners } from './modules/events.js';

document.addEventListener('DOMContentLoaded', () => {
  setupCaret();
  loadWords();
  setupEventListeners();
});

