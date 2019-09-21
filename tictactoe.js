let gameBoard = [0,0,0,0,0,0,0,0,0];

let gameStillGoing = false;
let winner = null;

const winnerLine = document.querySelector("#winner");

//Handles the player selection
function playerXclick() {
    resetAll();
    gameStillGoing = true;
    minifax();
}
function playerOclick() {
    resetAll();
    gameStillGoing = true;
}

function resetAll() {
    for (const square of squares) {
        square.innerText = "";
    }
    for (const i in gameBoard) {
        gameBoard[i] = 0;
    }
    winnerLine.innerText = "";
    gameStillGoing = true;
    winner = null;
}

const squares = document.querySelectorAll(".square");
for (const square of squares) {
    square.addEventListener("click", (event) => {
        if (square.innerText === "" && gameStillGoing === true) {
            playGame(square);
        }
    });
}

function playGame(square) {
    if (square.innerText === "") {
        square.innerText = "O";
        gameBoard[square.id] = "O";
    }
    checkGameOver();
    
    if (gameStillGoing === true) {
        bestMove();
    }
    
    if (gameStillGoing === false) {
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
    rowWinner = checkRows(gameBoard);
    columnWinner = checkColumns(gameBoard);
    diagonalWinner = checkDiagonals(gameBoard);

    if (rowWinner) {
        winner = rowWinner;
    } else if (columnWinner) {
        winner = columnWinner;
    } else if (diagonalWinner) {
        winner = diagonalWinner;
    }

    if (winner !== null) {
        gameStillGoing = false;
    }
}

function checkRows(board) {
    const row1 = (board[0] === board[1] && board[1] === board[2] && board[0] != 0);
    const row2 = (board[3] === board[4] && board[4] === board[5] && board[3] != 0);
    const row3 = (board[6] === board[7] && board[7] === board[8] && board[6] != 0);

    if (row1) {
        return board[0];
    } else if (row2) {
        return board[3];
    } else if (row3) {
        return board[6];
    }
    return;
}

function checkColumns(board) {
    const column1 = (board[0] === board[3] && board[3] === board[6] && board[0] != 0);
    const column2 = (board[1] === board[4] && board[4] === board[7] && board[1] != 0);
    const column3 = (board[2] === board[5] && board[5] === board[8] && board[2] != 0);

    if (column1) {
        return board[0];
    } else if (column2) {
        return board[1];
    } else if (column3) {
        return board[2];
    }
    return;
}

function checkDiagonals(board) {
    const diagonal1 = (board[0] === board[4] && board[4] === board[8] && board[0] != 0);
    const diagonal2 = (board[2] === board[4] && board[4] === board[6] && board[2] != 0);

    if (diagonal1) {
        return board[0];
    } else if (diagonal2) {
        return board[2];
    }
    return;
}

function checkTie() {
    if (!gameBoard.includes(0)) {
        gameStillGoing = false;
        return 1;
    }
}

function evaluate(board) {
    if (checkRows(board) === "O") {
        return -10
    } else if (checkRows(board) === "X") {
        return 10;
    }

    if (checkColumns(board) === "O") {
        return -10
    } else if (checkColumns(board) === "X") {
        return 10;
    }

    if (checkDiagonals(board) === "O") {
        return -10
    } else if (checkDiagonals(board) === "X") {
        return 10;
    }

    return 0;
}

function minimax(board, AIPlayer) {
    let score = evaluate(board);
    if (score !== 0) {
        return score;
    }
    if (!board.includes(0)) {
        return 0;
    }

    if (AIPlayer) {
        let best = -1000;
        for (const square in board) {
            if (board[square] === 0) {
                board[square] = "X";
                best = Math.max(best, minimax(board, false));
                board[square] = 0;
            }
        }
        return best;
    } else {
        let best = 1000;
        for (const square in board) {
            if (board[square] === 0) {
                board[square] = "O";
                best = Math.min(best, minimax(board, true));
                board[square] = 0;
            }
        }
        return best;
    }
}

function bestMove() {
    let bestVal = -1000;
    let bestMove = 0;

    for (const square in gameBoard) {
        if (gameBoard[square] === 0) {
            gameBoard[square] = "X";
            let moveVal = minimax(gameBoard, false);
            gameBoard[square] = 0;
            if (moveVal > bestVal) {
                bestMove = square;
                bestVal = moveVal; 
            }
        }
    }

    gameBoard[bestMove] = "X";
    squares[bestMove].innerText = "X";
    checkGameOver();
}

function minifax() {
    for (const square in gameBoard) {
        if (gameBoard[square] === 0) {
            gameBoard[square] = "X";
            squares[square].innerText = "X";
            break;
        }
    }
    checkGameOver();
}

//console.log(Math.max(10, 100));
/*
 # = id
 . = class
 no symbol = tagname
*/