const GameBoard = (() => {
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let roundover = false;
    let winner = "";
    const getGameBoard = () => gameBoard;
    const roundOver = () => roundover;
    const Winner = () => winner;
    const refresh = () => {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        roundover = false;
        winner = "";
    }
    const checkGridFilled = () => {
        let filled = true;
        gameBoard.forEach((element, index) => {
            // console.log({index,element});
            if (element === "") filled = false;
        });
        return filled;
        // console.log(gameBoard);
    }
    const winningCondidtionCheck = (string) => {
        if (
            (string.includes("0") && string.includes("1") && string.includes("2")) ||
            (string.includes("3") && string.includes("4") && string.includes("5")) ||
            (string.includes("6") && string.includes("7") && string.includes("8")) ||
            (string.includes("0") && string.includes("3") && string.includes("6")) ||
            (string.includes("1") && string.includes("4") && string.includes("7")) ||
            (string.includes("2") && string.includes("6") && string.includes("8")) ||
            (string.includes("0") && string.includes("4") && string.includes("8")) ||
            (string.includes("2") && string.includes("4") && string.includes("6"))
        ) {
            return true;
        }
        else {
            return false;
        }
    }
    const checkWinner = () => {
        let xString = "";
        let oString = "";
        gameBoard.forEach((element, index) => {
            if (element) {
                if (element === "X") xString += `${index}`;
                else if (element === "O") oString += `${index}`;
            }
        });
        if (winningCondidtionCheck(xString)) {
            roundover = true;
            winner = "X";
        } else if (winningCondidtionCheck(oString)) {
            roundover = true;
            winner = "O"
        } else if (checkGridFilled() && !winningCondidtionCheck(xString) && !winningCondidtionCheck(oString)) {
            roundover = true;
            winner = "draw";
        }
    }
    const updateGrid = (location, value) => {
        if (gameBoard[location - 1] === "") {
            gameBoard[location - 1] = value;
            checkWinner();
            return true;
        } else {
            console.log("Wrong move, someone has already got a hold of that grid");
            return false;
        }
    }
    return { getGameBoard, roundOver, Winner, updateGrid, refresh };
})();



// console.log(GameBoard());
const displayController = (() => {
    const board = GameBoard;
    const gameBoardDisplay = document.getElementById("game-board");
    const gameGrids = document.querySelectorAll(".grid-square");
    const resetButton = document.getElementById("reset");
    const player = document.querySelector(".current-player");
    const winnerText = document.getElementById("winner-prompt");
    // console.log(player);
    const initialize = () => {
        board.refresh();
        gameGrids.forEach((gameGrid, index) => {
            gameGrid.classList.add("unfilled");
            gameGrid.addEventListener('click', playTurn);
        });
    }
    const reset = () => {
        console.log("In reset");
        board.refresh();
        gameGrids.forEach((gameGrid, index) => {
            if (gameGrid.textContent !== "") {
                gameGrid.textContent = "";
                gameGrid.classList.add("unfilled");
                gameGrid.addEventListener('click', playTurn);
            }
        });
        player.classList.remove("none");
        winnerText.classList.add("none");
    };
    let current = true;
    const currentPlayer = () => current ? "X" : "O";
    const flipPlayer = () => current = !current;
    const roundover = () => board.roundOver();
    const disableButtonsAndShowWinner = () => {
        gameGrids.forEach(gameGrid => gameGrid.removeEventListener('click',playTurn))
        player.classList.add("none");
        winnerText.textContent = board.Winner() === "draw" ? "It's a Draw !" : `${board.Winner()} wins this round !`;
        winnerText.classList.remove("none");
    }
    function playTurn() {
        this.textContent = currentPlayer();
        this.classList.remove("unfilled");
        this.removeEventListener('click', playTurn);
        board.updateGrid(this.dataset.grid, currentPlayer());
        if (!roundover()) {
            flipPlayer();
            player.textContent = `Player ${currentPlayer()}'s turn`;
        }
        else {
            disableButtonsAndShowWinner();
        }

        //check winner here to disable the buttons and only reset will be present then .
    }

    resetButton.addEventListener('click', reset);
    // board.refresh();
    initialize();
    // return {currentPlayer,flipPlayer}
    return { board }
})();

const display = displayController;