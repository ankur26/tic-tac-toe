const GameBoard = ( () => {
    let gameBoard = ["","","","","","","","",""];
    let roundover = false;
    let winner = "";
    const roundOver = () => roundover;
    const Winner = () => winner;
    const refresh = () => {
        gameBoard = ["","","","","","","","",""];
        roundover = false;
        winner = "";
    }
    const checkGridFilled = () => {
        let filled = true;
        gameBoard.forEach((element,index) => {
            // console.log({index,element});
            if(element === "") filled = false;
        });
        return filled;
        // console.log(gameBoard);
    }
    const winningCondidtionCheck = (string) =>{
        if(
            (string.includes("0") && string.includes("1") && string.includes("2"))  || 
            (string.includes("3") && string.includes("4") && string.includes("5")) || 
            (string.includes("6") && string.includes("7") && string.includes("8")) ||
            (string.includes("0") && string.includes("3") && string.includes("6")) ||
            (string.includes("1") && string.includes("4") && string.includes("7")) ||
            (string.includes("2") && string.includes("6") && string.includes("8")) ||
            (string.includes("0") && string.includes("4") && string.includes("8")) ||
            (string.includes("2") && string.includes("4") && string.includes("6"))
        ){
            return true;
        }
        else{
            return false;
        }
    }
    const checkWinner = () => {
        let xString = "";
        let oString = "";
        gameBoard.forEach((element,index)=>{
            if (element){
                if (element === "X" ) xString+=`${index}`;
                else if(element === "O" ) oString+=`${index}`;
            }
        });
        if(winningCondidtionCheck(xString)){
            roundover = true;
            winner = "X";
        }else if(winningCondidtionCheck(oString)){
            roundover = true;
            winner = "O"
        }else if(checkGridFilled() && !winningCondidtionCheck(xString) && !winningCondidtionCheck(oString)){
            roundover = true;
            winner = "draw";
        }
    }
    const updateGrid = (location,value) =>{
        if(gameBoard[location-1] === ""){
            gameBoard[location-1]=value;
            checkWinner();
            return true;
        }else{
            console.log("Wrong move, someone has already got a hold of that grid");
            return false;
        }
    }
    return {roundOver,Winner,updateGrid,refresh};
})();



// console.log(GameBoard());
