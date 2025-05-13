const ROWS = 6;
const COLS = 7;
let board = [];
let currentPlayer = 'red';
let gameActive = true;

const gameBoard = document.getElementById('game-board');
const currentPlayerSpan = document.getElementById('current-player');
const restartBtn = document.getElementById('restart-btn');

function createBoard() {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    gameBoard.innerHTML = '';
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }
}

function handleCellClick(e) {
    if (!gameActive) return;
    const col = parseInt(e.target.dataset.col);
    // Find the lowest empty cell in this column
    for (let row = ROWS - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            updateBoard();
            if (checkWin(row, col)) {
                currentPlayerSpan.textContent = `${capitalize(currentPlayer)} wins!`;
                gameActive = false;
            } else if (board.flat().every(cell => cell)) {
                currentPlayerSpan.textContent = "It's a draw!";
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                updateCurrentPlayer();
            }
            break;
        }
    }
}

function updateBoard() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = gameBoard.children[row * COLS + col];
            cell.classList.remove('red', 'yellow');
            if (board[row][col]) {
                cell.classList.add(board[row][col]);
            }
        }
    }
}

function updateCurrentPlayer() {
    currentPlayerSpan.textContent = `${capitalize(currentPlayer)}'s turn`;
    currentPlayerSpan.style.color = currentPlayer === 'red' ? '#e74c3c' : '#f1c40f';
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function checkWin(row, col) {
    const directions = [
        { dr: 0, dc: 1 },   // horizontal
        { dr: 1, dc: 0 },   // vertical
        { dr: 1, dc: 1 },   // diagonal down-right
        { dr: 1, dc: -1 }   // diagonal down-left
    ];
    for (const { dr, dc } of directions) {
        let count = 1;
        count += countDirection(row, col, dr, dc);
        count += countDirection(row, col, -dr, -dc);
        if (count >= 4) return true;
    }
    return false;
}

function countDirection(row, col, dr, dc) {
    let r = row + dr;
    let c = col + dc;
    let count = 0;
    while (
        r >= 0 && r < ROWS &&
        c >= 0 && c < COLS &&
        board[r][c] === currentPlayer
    ) {
        count++;
        r += dr;
        c += dc;
    }
    return count;
}

restartBtn.addEventListener('click', () => {
    gameActive = true;
    currentPlayer = 'red';
    createBoard();
    updateCurrentPlayer();
});

// Initialize game
createBoard();
updateCurrentPlayer(); 