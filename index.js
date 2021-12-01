const GameBoard = ( () => {
    const gameBoard = new Array(9);
    const roundover = false;
    const winner = "";
    const refresh = () => {
        this.gameBoard = new Array(9);
        this.roundover = false;
        this.winner = "";
    }
    const checkGridFilled = () => {
        this.gameBoard.forEach(element => {
            if(!element) return false;
        });
        return true;
    }
    const checkWinner = () => {
        
    }
    const updateGrid = (location,value) =>{
        this.gameBoard[location-1]=value;
        this.checkWinner();
    }

})();

// console.log(GameBoard());
