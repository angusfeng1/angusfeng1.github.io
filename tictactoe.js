let board = [0,0,0,0,0,0,0,0];

let gameStillGoing = true;
let winner = null;
let currentPlayer = null;

//Handles the player selection
const playerXcheck = document.querySelector("#playerX");
const playerOcheck = document.querySelector("#playerO");
const resetButton = document.querySelector(".resetButton");
function playerXclick() {
    currentPlayer = "X";
    resetAll();
    minimax();
    if (playerXcheck.checked !== true) {
        console.log("ticked");
        playerXcheck.checked = true;
    }
    playerOcheck.checked = false;
}
function playerOclick() {
    currentPlayer = "O"
    resetAll();
    if (playerOcheck.checked !== true) {
        playerOcheck.checked = true;
    }
    playerXcheck.checked = false;
}

//Reset Button
/*
resetButton.addEventListener("click", (event) => {
    resetAll();
});
*/
function resetAll() {
    for (const square of squares) {
        square.innerText = "";
    }
    for (const i in board) {
        board[i] = 0;
    }
}

const squares = document.querySelectorAll(".square");
for (const square of squares) {
    square.addEventListener("click", (event) => {
        playGame(square);
    });
}

function playGame(square) {
    if (square.innerText === "") {
        square.innerText = "O";
        board[square.id] = "O";
    }
    checkGameOver();
    minimax();
    
    if (gameStillGoing === false) {
        const winnerLine = document.querySelector("#winner");

        if (winner === "X" || winner === "O") {
            if (winner === "X") {
                winnerLine.innerText = "You lost!";
            } else {
                winnerLine.innerText = "You won!";
            }
        } else {
            winnerLine.innerText = "You drew!";
        }
    }
}


function checkGameOver() {
    checkWinner();
    checkTie();
}

function checkWinner() {
    rowWinner = checkRows();
    columnWinner = checkColumns();
    diagonalWinner = checkDiagonals();

    if (rowWinner) {
        winner = rowWinner;
    } else if (columnWinner) {
        winner = columnWinner;
    } else if (diagonalWinner) {
        winner = diagonalWinner;
    }
}

function checkRows() {
    const row1 = (board[0] === board[1] && board[1] === board[2] && board[0] != 0);
    const row2 = (board[3] === board[4] && board[4] === board[5] && board[3] != 0);
    const row3 = (board[6] === board[7] && board[7] === board[8] && board[6] != 0);

    if (row1 || row2 || row3) {
        gameStillGoing = false;
    }
    if (row1) {
        return board[0];
    } else if (row2) {
        return board[3];
    } else if (row3) {
        return board[6];
    }
    return;
}

function checkColumns() {
    const column1 = (board[0] === board[3] && board[3] === board[6] && board[0] != 0);
    const column2 = (board[1] === board[4] && board[4] === board[7] && board[1] != 0);
    const column3 = (board[2] === board[5] && board[5] === board[8] && board[2] != 0);

    if (column1 || column2 || column3) {
        gameStillGoing = false;
    }
    if (column1) {
        return board[0];
    } else if (column2) {
        return board[1];
    } else if (column3) {
        return board[2];
    }
    return;
}

function checkDiagonals() {
    const diagonal1 = (board[0] === board[4] && board[4] === board[8] && board[0] != 0);
    const diagonal2 = (board[2] === board[4] && board[4] === board[6] && board[2] != 0);

    if (diagonal1 || diagonal2) {
        gameStillGoing = false;
    }
    if (diagonal1) {
        return board[0];
    } else if (diagonal2) {
        return board[2];
    }
    return;
}

function checkTie() {
    if (!board.includes(0)) {
        gameStillGoing = false;
    }
}

function minimax() {
    for (const square in board) {
        if (board[square] === 0) {
            board[square] = "X";
            squares[square].innerText = "X";
            break;
        }
    }
    checkGameOver();
}



console.log("heyo");

/*
 # = id
 . = class
 no symbol = tagname
*/