const squares = document.querySelectorAll(".square");
const turnIndicator = document.getElementById("turn-indicator");
const resetButton = document.getElementById("reset-button");
const scoresButton = document.getElementById("scores-button");
const teamsButton = document.getElementById("teams-button");

let turn = "X";
let gameOver = false;
let xScore = 0;
let oScore = 0;
let winningCombination;

// Add click event listeners to squares
squares.forEach((square) => {
    square.addEventListener("click", function () {
        if (gameOver) {
            return;
        }
        if (square.textContent) {
            return;
        }
        square.textContent = turn;
        checkWin();
        updateTurnIndicator();
        if (!gameOver) {
            turn = turn === "X" ? "O" : "X";
        }
    });
});

// Update the turn indicator with the current team's symbol
function updateTurnIndicator() {
    turnIndicator.textContent = `Vez: ${turn}`;
}

// Reset game button
resetButton.addEventListener("click", function () {
    squares.forEach((square) => {
        square.textContent = "";
        square.style.backgroundColor = "white";
    });
    gameOver = false;
    turn = "X";
    updateTurnIndicator();
});

// Scores button
scoresButton.addEventListener("click", function () {
    if (gameOver){
        alert(`X: ${xScore}  O: ${oScore}`);
    } else {
        alert("A partida ainda não terminou!");
    }
});

// Teams button
teamsButton.addEventListener("click", function () {
    let teamChoice = prompt("Escolha sua equipe (X ou O):").toUpperCase();
    if (teamChoice === "X") {
        turn = "X";
        updateTurnIndicator();
    } else if (teamChoice === "O") {
        turn = "O";
        updateTurnIndicator();
    } else {
        alert("Seleção inválida. Insira X ou O.");
    }
});

// Check for win
function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
        const square1 = squares[combination[0]];
        const square2 = squares[combination[1]];
        const square3 = squares[combination[2]];

        if (square1.textContent === "" || square2.textContent === "" || square3.textContent === "") {
            continue;
        }

        if (square1.textContent === square2.textContent && square2.textContent === square3.textContent) {
            gameOver = true;
            winningCombination = combination;
            highlightWinningLine(combination);
            if (turn == "X"){
                xScore++;
            } else {
                oScore++;
            }
            break;
        }
    }
}

// Highlight winning line
function highlightWinningLine(combination) {
    for (const index of combination) {
        squares[index].style.backgroundColor = "green";
    }
    setTimeout(()=> {
        for (const index of combination) {
            squares[index].style.backgroundColor = "white";
        }
    }, 1000)
}
