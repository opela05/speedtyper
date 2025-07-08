// cursor func -> called a caret
export const caret = document.createElement('div');

export function setupCaret() {
  caret.classList.add('caret');
  document.body.appendChild(caret);
}

export function moveCaretToLetter(span) {
  if (!span) return;
  const rect = span.getBoundingClientRect();
  const bodyRect = document.body.getBoundingClientRect();
  caret.style.left = `${rect.left - bodyRect.left}px`;
  caret.style.top = `${rect.top - bodyRect.top}px`;
}
