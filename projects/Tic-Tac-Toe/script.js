const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#gameStatus');
const restartButton = document.querySelector('#restartGame');
const playerOne = document.querySelector('#playerOne');
let playerOneScore = 0;
let playerTwoScore = 0;
const playerTwo = document.querySelector('#playerTwo');
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
let currentPlayer = 'X';
let gameActive = false;
let options = ["", "", "", "", "", "", "", "", ""];
startGame();
function startGame() {
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    playerOne.textContent = `X:${playerOneScore}`;
    playerTwo.textContent = `O:${playerTwoScore}`;
    gameActive = true;
}
function handleCellClick() {
    const cellData = this.getAttribute('cell-data');
    if (options[cellData] !== "" || !gameActive) {
        return;
    }
    update(this, cellData);
    checkWinner();
}
function update(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
}
function handleRestartGame() {
    currentPlayer = 'X';
    options = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    gameActive = true;
}
function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const a = options[condition[0]];
        const b = options[condition[1]];
        const c = options[condition[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        if (currentPlayer === 'X') {
            playerOneScore++;
            playerOne.textContent = `X:${playerOneScore}`;
        } else {
            playerTwoScore++;
            playerTwo.textContent = `O:${playerTwoScore}`;
        }
        gameActive = false;
        return;
    }
    if (!options.includes("")) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
    } else {
        changePlayer();
    }
}