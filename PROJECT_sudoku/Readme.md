# Sudoku Solver

A polished, full-fledged Sudoku Solver web application built with React, Vite, and Tailwind CSS. This project serves as a frontend mini-project demonstrating the **Recursive Backtracking Algorithm** with a visually engaging, step-by-step solving animation.

## 🚀 Features

- **Interactive 9x9 Board**: Manually input puzzles by clicking and typing numbers.
- **Recursive Backtracking Solver**: Accurately solves any valid Sudoku puzzle.
- **Solving Animation**: Watch the algorithm work in real-time with adjustable speed controls (Slow, Medium, Fast, Instant).
- **Validation**: Checks if the current board state is valid and highlights conflicts.
- **Sample Puzzles**: Quickly load Easy, Medium, or Hard sample puzzles to test the solver.
- **Modern UI/UX**: Clean design, responsive layout, clear visual hierarchy, and intuitive color-coding (selected cell, conflicting values, algorithm focus).
- **Frontend Only**: No backend required. All logic runs efficiently in the browser.

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Lucide React** - Beautiful, consistent icons

## 🧠 Algorithm: Recursive Backtracking

The application uses depth-first search (backtracking) to solve the puzzle:
1. **Find Empty Cell**: The algorithm scans the board for the first empty cell (represented by `0`).
2. **Guess a Number**: It tries placing a number from `1` to `9`.
3. **Validate (`isSafe`)**: It checks if the number violates Sudoku rules (must be unique in its row, column, and 3x3 subgrid).
4. **Recurse**: If the number is safe, the algorithm recursively attempts to solve the rest of the board.
5. **Backtrack**: If a dead-end is reached (no valid numbers can be placed in subsequent cells), it "backtracks" by erasing the current cell's number and trying the next possible number.

## 📁 Folder Structure

```text
sudoku/
├── public/               # Static assets
├── src/                  # Source code
│   ├── components/       # Reusable React components
│   │   ├── Board.jsx     # 9x9 Grid component
│   │   ├── Cell.jsx      # Individual square component
│   │   ├── Controls.jsx  # Action buttons (Solve, Clear, etc.)
│   │   ├── Header.jsx    # Project title and description
│   │   └── StatusPanel.jsx # Feedback and speed controls
│   ├── utils/
│   │   └── sudokuLogic.js # Backtracking logic and sample puzzles
│   ├── App.jsx           # Main application state and layout
│   ├── index.css         # Tailwind directives and custom styles
│   └── main.jsx          # React entry point
├── package.json          # Project dependencies
├── tailwind.config.js    # Tailwind configuration
└── vite.config.js        # Vite configuration
```

## 💻 How to Run Locally

1. **Clone or Download** the project repository.
2. **Navigate** into the `sudoku` directory:
   ```bash
   cd sudoku
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
5. **Open in Browser**: The terminal will display a local URL (usually `http://localhost:5173/`). Click it to view the app.

## 🎓 Academic Submission

This project is structured for competitive programming and frontend technologies assessment. It demonstrates strong proficiency in component-based UI architecture, state management in React, implementation of classic computer science algorithms (backtracking), and modern CSS frameworks.
