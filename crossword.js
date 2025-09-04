/**
 * crossword.js
 * Usage: createCrossword(containerId, crosswordData, rows, cols);
 */

function createCrossword(containerId, crosswordData, rows, cols) {
  const grid = document.getElementById(containerId);
  if (!grid) { console.error('createCrossword: container not found', containerId); return; }
  grid.classList.add("crossword");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = `repeat(${cols}, 40px)`;
  grid.style.gridAutoRows = "40px";
  grid.style.gap = "2px";
  grid.style.margin = "20px 0";

  // Build grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;

      let input = document.createElement("input");
      input.maxLength = 1;
      input.style.width = "100%";
      input.style.height = "100%";
      input.style.border = "none";
      input.style.textAlign = "center";
      input.style.fontSize = "20px";
      input.style.textTransform = "uppercase";
      input.autocomplete = "off";
      input.spellcheck = false;

      input.addEventListener('input', () => checkAnswers(containerId));
      cell.appendChild(input);
      grid.appendChild(cell);
    }
  }

  // Place words
  function placeWord(word, row, col, dir) {
    const letters = word.toUpperCase().split('');
    letters.forEach((ch, i) => {
      const rr = row + (dir === 'down' ? i : 0);
      const cc = col + (dir === 'across' ? i : 0);
      const cell = grid.querySelector(`.cell[data-row="${rr}"][data-col="${cc}"]`);
      if (cell) cell.dataset.letter = ch;
    });
  }

  Object.values(crosswordData.across || {}).forEach(w =>
    placeWord(w.answer, w.row, w.col, 'across')
  );
  Object.values(crosswordData.down || {}).forEach(w =>
    placeWord(w.answer, w.row, w.col, 'down')
  );

  // Disable unused cells
  grid.querySelectorAll('.cell').forEach(cell => {
    if (!cell.dataset.letter) {
      cell.classList.add('block');
      const inp = cell.querySelector('input');
      inp.disabled = true;
      inp.style.visibility = 'hidden';
    }
  });

  // Auto-checking
  function checkAnswers() {
    grid.querySelectorAll('.cell').forEach(cell => {
      const inp = cell.querySelector('input');
      if (!cell.dataset.letter) return;
      if (inp.value.toUpperCase() === cell.dataset.letter) {
        cell.classList.add('correct');
      } else {
        cell.classList.remove('correct');
      }
    });
  }
  window.checkAnswers = checkAnswers;
  checkAnswers();

  // Controls
  const controls = document.createElement('div');
  controls.classList.add('crossword-controls');

  // Hints (limit = 3)
  let hintsUsed = 0;
  const maxHints = 3;

  const hintBtn = document.createElement('button');
  hintBtn.innerText = `Show hint (${maxHints})`;

  hintBtn.onclick = () => {
    if (hintsUsed >= maxHints) {
      hintBtn.disabled = true;
      hintBtn.innerText = "No more hints";
      return;
    }

    const candidates = [...grid.querySelectorAll('.cell')].filter(c => c.dataset.letter && c.querySelector('input').value.toUpperCase() !== c.dataset.letter);
    if (!candidates.length) return;

    const target = candidates[Math.floor(Math.random()*candidates.length)];
    target.querySelector('input').value = target.dataset.letter;
    target.classList.add('hint');
    checkAnswers();

    hintsUsed++;
    hintBtn.innerText = `Show hint (${maxHints - hintsUsed} left)`;

    if (hintsUsed >= maxHints) {
      hintBtn.disabled = true;
    }
  };

  // Check button
  const checkBtn = document.createElement('button');
  checkBtn.innerText = 'Check all';
  checkBtn.onclick = checkAnswers;

  // Clear button
  const clearBtn = document.createElement('button');
  clearBtn.innerText = 'Clear';
  clearBtn.onclick = () => {
    grid.querySelectorAll('.cell').forEach(cell => {
      const inp = cell.querySelector('input');
      if (cell.dataset.letter) {
        inp.value = '';
        cell.classList.remove('correct','hint');
      }
    });
    hintsUsed = 0;
    hintBtn.disabled = false;
    hintBtn.innerText = `Show hint (${maxHints})`;
  };

  controls.appendChild(hintBtn);
  controls.appendChild(checkBtn);
  controls.appendChild(clearBtn);

  grid.after(controls);
}
