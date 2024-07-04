// Variables to track game state
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', '']; // Represents the 3x3 board

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle cell click
function cellClicked(cellClickedIndex) {
    if (gameState[cellClickedIndex] === '' && gameActive) {
        gameState[cellClickedIndex] = currentPlayer;
        document.getElementById(`cell${Math.floor(cellClickedIndex / 3)}${cellClickedIndex % 3}`).textContent = currentPlayer;
        
        // Check for win
        checkWin();
        
        // Check for draw
        checkDraw();
        
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Function to check for a win
function checkWin() {
    for (let condition of winningConditions) {
        let a = gameState[condition[0]];
        let b = gameState[condition[1]];
        let c = gameState[condition[2]];
        
        if (a !== '' && a === b && b === c) {
            gameActive = false;
            document.getElementById('message').textContent = `${currentPlayer} wins!`;
            break;
        }
    }
}

// Function to check for a draw
function checkDraw() {
    if (!gameState.includes('') && gameActive) {
        gameActive = false;
        document.getElementById('message').textContent = "It's a draw!";
    }
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    document.getElementById('message').textContent = '';
}

// Event listeners
document.querySelectorAll('.cell').forEach((cell, index) => {
    cell.addEventListener('click', () => cellClicked(index));
});

document.getElementById('reset').addEventListener('click', resetGame);
