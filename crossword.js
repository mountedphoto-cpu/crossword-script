/* Crossword Grid */
.crossword-grid {
  display: inline-grid;
  gap: 2px;
  background: #fdfcf9; /* soft cream */
  padding: 10px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

/* Each cell */
.crossword-grid .cell {
  width: 40px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
}

.crossword-grid .cell input {
  width: 100%;
  height: 100%;
  text-align: center;
  border: none;
  outline: none;
  font-size: 18px;
  font-family: 'Georgia', serif; /* elegant serif font */
  color: #444;
  background: transparent;
  text-transform: uppercase;
}

/* Clue numbers */
.crossword-grid .cell::before {
  content: attr(data-number);
  position: absolute;
  top: 2px;
  left: 4px;
  font-size: 10px;
  color: #999;
}

/* Correct vs incorrect */
.crossword-grid .cell.correct {
  background: #f9f5f0; /* subtle champagne tone */
}

.crossword-grid .cell.incorrect {
  background: #ffe6e6; /* soft blush red for error */
}

/* Hint highlight */
.crossword-grid .cell.hint {
  background: #fff4f9; /* pink tint */
  border: 1px dashed #e7a2c6;
}

/* Buttons */
.crossword-controls button {
  background: #f6f0eb;
  border: none;
  padding: 8px 16px;
  margin: 6px;
  border-radius: 20px;
  font-family: 'Georgia', serif;
  font-size: 14px;
  color: #444;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.08);
}

.crossword-controls button:hover {
  background: #ecd7d2;
  color: #222;
}

/* Layout for controls */
.crossword-controls {
  margin-top: 12px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}
