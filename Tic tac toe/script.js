const board = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const winnerMsg = document.getElementById('winner-msg');
const winnerDiv = document.getElementById('winner');
let currentPlayer = 'X';

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
    });
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent);
}

function handleClick(event) {
    const cell = event.target;

    if (cell.classList.contains('cell') && !cell.textContent && !checkWin()) {
        cell.textContent = currentPlayer;

        if (checkWin()) {
            setTimeout(() => {
                winnerDiv.textContent = `${currentPlayer} wins!`;
                winnerMsg.style.display = 'block';
                cells.forEach(cell => cell.removeEventListener('click', handleClick));
            }, 100);
        } else if (checkDraw()) {
            setTimeout(() => {
                winnerDiv.textContent = "It's a draw!";
                winnerMsg.style.display = 'block';
            }, 100);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function resetGame() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    winnerMsg.style.display = 'none';
    cells.forEach(cell => cell.addEventListener('click', handleClick));
}

// Initialize cells
cells.forEach(cell => cell.addEventListener('click', handleClick));

// Event listener for the reset button
resetButton.addEventListener('click', resetGame);
