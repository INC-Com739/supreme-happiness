let currentPlayer = '';
let resetBtn = document.querySelector('#reset');
let XBtn = document.querySelector('#X');
let OBtn = document.querySelector('#O');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let playerScore = 0;
let computerScore = 0;

const buttons = document.querySelectorAll(".box");
const resultEl = document.getElementById("result");
const playerScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");

XBtn.addEventListener('click', () => {
    currentPlayer = 'X';
    startGame();
});

OBtn.addEventListener('click', () => {
    currentPlayer = 'O';
    startGame();
});

function startGame() {
    // Enable the boxes and reset messages
    buttons.forEach(box => {
        box.textContent = '';
        box.disabled = false;
        box.style.color = 'black';
        box.addEventListener('click', playerMove);
    });
    msgContainer.classList.add('hide');
    if (currentPlayer === 'O') {
        computerMove(); // If the player chose O, the computer plays first
    }
}

function playerMove(event) {
    const box = event.target;
    if (box.textContent === '') {
        box.textContent = currentPlayer;
        box.disabled = true;
        if (checkWin(currentPlayer)) {
            msg.textContent = `${currentPlayer} wins!`;
            msgContainer.classList.remove('hide');
            updateScore(currentPlayer);
        } else {
            computerMove();
        }
    }
}

function computerMove() {
    const emptyBoxes = Array.from(buttons).filter(box => box.textContent === '');
    if (emptyBoxes.length > 0) {
        const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        randomBox.textContent = currentPlayer === 'X' ? 'O' : 'X'; // Computer plays the opposite symbol
        randomBox.disabled = true;
        if (checkWin(randomBox.textContent)) {
            msg.textContent = `${randomBox.textContent} wins!`;
            msgContainer.classList.remove('hide');
            updateScore(randomBox.textContent);
        }
    }
}

function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6] // Diagonal
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return buttons[index].textContent === player;
        });
    });
}

function updateScore(winner) {
    if (winner === 'X' || winner === 'O') {
        playerScore += winner === currentPlayer ? 1 : 0;
        computerScore += winner !== currentPlayer ? 1 : 0;
    }
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
}

resetBtn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
    startGame();
});