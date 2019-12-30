// Game Board
let gameBoard = [0,0,0,0,0,0,0,0,0];
// Variable to see if game is still going
let gameStillGoing = false;
// The winner of the game
let winner = null;

// The line that displays winner
const winnerLine = document.querySelector("#winner");

// Handles the player selection and starts game
function playerXclick() {
    resetAll();
    gameStillGoing = true;
    // First move of the AI
    minifax();
}
function playerOclick() {
    resetAll();
    gameStillGoing = true;
}

// Resets the game board
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

// Adds click events to the squares of the board
const squares = document.querySelectorAll(".square");
for (const square of squares) {
    square.addEventListener("click", (event) => {
        // If clicked, the player will play the game
        if (square.innerText === "" && gameStillGoing === true) {
            playGame(square);
        }
    });
}

// Plays the game
function playGame(square) {
    // Player clicked, fills square, checks if game is over
    if (square.innerText === "") {
        square.innerText = "O";
        gameBoard[square.id] = "O";
    }
    checkGameOver();
    
    // Game isn't over so the AI goes
    if (gameStillGoing === true) {
        bestMove();
    }
    
    // Game is over so prints a message
    if (gameStillGoing === false) {
        if (winner === "X" || winner === "O") {
            if (winner === "X") {
                winnerLine.innerText = "You lost!";
            } else {
                winnerLine.innerText = "You won!";
            }
        } else {
            winnerLine.innerText = "It's a draw!";
        }
    }
}

// Checks if the game is over
function checkGameOver() {
    checkWinner();
    checkTie();
}

// Checks if there is a winner
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

// Checks if it is a draw
function checkTie() {
    if (!gameBoard.includes(0)) {
        gameStillGoing = false;
        return 1;
    }
}

// Checks the rows
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

// Checks the columns
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

// Checks the diagonals
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

// Evaluation function for minimax
// Returns -10 if player has won, returns 10 if AI has won, returns 0 for draw
// This will determine which squares/branches are winning moves
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

// Minimax algorithm with alpha beta pruning
function minimax(board, AIPlayer, alpha, beta) {
    let score = evaluate(board);
    // Reached the end of a branch
    if (score !== 0) {
        return score;
    }
    // Draw, no moves left
    if (!board.includes(0)) {
        return 0;
    }

    // AI player
    if (AIPlayer) {
        let best = -1000;
        for (const square in board) {
            // If empty square, tries move and recurses
            if (board[square] === 0) {
                board[square] = "X";
                best = Math.max(best, minimax(board, false, alpha, beta));
                board[square] = 0;
                alpha = Math.max(alpha, best);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return best;
    // Actual Player
    } else {
        let best = 1000;
        for (const square in board) {
            // If empty square, tries move and recurses
            if (board[square] === 0) {
                board[square] = "O";
                best = Math.min(best, minimax(board, true, alpha, beta));
                board[square] = 0;
                beta = Math.min(beta, best);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return best;
    }
}

function bestMove() {
    let bestVal = -1000;
    let bestMove = 0;

    // Tries every move possible
    for (const square in gameBoard) {
        if (gameBoard[square] === 0) {
            gameBoard[square] = "X";
            // Gets a score
            let moveVal = minimax(gameBoard, false, -1000, 1000);
            gameBoard[square] = 0;
            // If this move is better than the already best move then replace it
            if (moveVal > bestVal) {
                bestMove = square;
                bestVal = moveVal; 
            }
        }
    }

    // Performs the best move
    gameBoard[bestMove] = "X";
    squares[bestMove].innerText = "X";
    checkGameOver();
}

// Function for AI to perform first move - could be randomized
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