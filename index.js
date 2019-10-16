var playerTurn = true;
var computerMoveTimeout = 0;
var human = "X";
var aiPlayer = "O";

// Returns an array of 9 <td> elements that make up the game board. The first 3 
// elements are the top row, the next 3 the middle row, and the last 3 the 
// bottom row. 
function getGameBoard() {
    var gameBoardTable = document.getElementById("gameBoard");
    var result = [];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            result.push(gameBoardTable.rows[i].cells[j]);
            
        }
    }
    return result;
}

function start() {
    // Setup the click event for the "New game" button
    var newBtn = document.getElementById("newGameButton");
    newBtn.addEventListener("click", newGame);

    // Create click-event listeners for each cell in the game board
    var cells = getGameBoard();
    for (let cell of cells) {
        cell.addEventListener("click", function() { cellClicked(cell); });
    }

    // Call the newGame function to make sure the board is clear
    newGame();
}

function newGame() {


    var x = document.getElementById("gameBoard").rows[0].cells;
    var z = document.getElementById("gameBoard").rows[1].cells;
    var y = document.getElementById("gameBoard").rows[2].cells;
    var f = document.getElementById("turnInfo");
    x[0].innerHTML = "&nbsp";
    x[1].innerHTML = "&nbsp";
    x[2].innerHTML = "&nbsp";
    z[0].innerHTML = "&nbsp";
    z[1].innerHTML = "&nbsp";
    z[2].innerHTML = "&nbsp";
    y[0].innerHTML = "&nbsp";
    y[1].innerHTML = "&nbsp";
    y[2].innerHTML = "&nbsp";
    playerTurn = true;
    f.innerHTML = "Your turn";
    clearTimeout();
    computerMoveTimeout = 0;



}

function cellClicked(cell) {
    winnerCheckO();
    winnerCheckX();
    // Your code here
    if (playerTurn == true) {
        if (cell.innerHTML == "X" || cell.innerHTML == "O") {
            playerTurn = false;
            
            switchTurn();
        }
        else {
            cell.innerHTML = "X";
            cell.style.color = "red";
            
            switchTurn();
        }
    }
}

function switchTurn() {
    // Your code here
    winnerCheckO();
    winnerCheckX();
    var f = document.getElementById("turnInfo");
    if (playerTurn == false) {
        if (f.innerHTML == "Draw game"|| f.innerHTML == "You Win!" || f.innerHTML =="Computer wins!") {
            setTimeout(function(){ 
                alert(f.innerHTML); 
                newGame();
            }, 1000);
            
            
        }
        else{
            f.innerHTML = "Your Turn";
            playerTurn = true;
        }
        
        
        

    }
    else {
        
        if (f.innerHTML == "Draw game"|| f.innerHTML == "You Win!" || f.innerHTML =="Computer wins!") {
            setTimeout(function(){ 
                alert(f.innerHTML); 
                newGame();
            }, 1000);
            
            
        }
        else{
            
            f.innerHTML = "Computer's turn";
            playerTurn = false;
            //makeComputerMove();
            computerMoveTimeout = setTimeout(makeComputerMove, 1000);
        }
        
    }
}


function makeComputerMove() {
    
    var gameBoard = document.getElementById("gameBoard");
    var matrix = boardMatrixMaker(gameBoard);
    
    var mark = minimax(matrix, aiPlayer);
    if(mark.index >= 6){
        if(mark.index == 6){
            gameBoard.rows[2].cells[0].innerHTML = "O";
            gameBoard.rows[2].cells[0].style.color = "blue";
        }
        else if(mark.index == 7){
            gameBoard.rows[2].cells[1].innerHTML = "O";
            gameBoard.rows[2].cells[1].style.color = "blue";
        }
        else if(mark.index == 8){
            gameBoard.rows[2].cells[2].innerHTML = "O";
            gameBoard.rows[2].cells[2].style.color = "blue";
        }

    }
    else if(mark.index >= 3){
        if(mark.index == 3){
            gameBoard.rows[1].cells[0].innerHTML = "O";
            gameBoard.rows[1].cells[0].style.color = "blue";
        }
        else if(mark.index == 4){
            gameBoard.rows[1].cells[1].innerHTML = "O";
            gameBoard.rows[1].cells[1].style.color = "blue";
        }
        else if(mark.index == 5){
            gameBoard.rows[1].cells[2].innerHTML = "O";
            gameBoard.rows[1].cells[2].style.color = "blue";
        }

    }
    else{
        if(mark.index == 0){
            gameBoard.rows[0].cells[0].innerHTML ="O";
            gameBoard.rows[0].cells[0].style.color = "blue";
        }
        else if(mark.index == 1){
            gameBoard.rows[0].cells[1].innerHTML = "O";
            gameBoard.rows[0].cells[1].style.color = "blue";
        }
        else if(mark.index == 2){
            gameBoard.rows[0].cells[2].innerHTML = "O";
            gameBoard.rows[0].cells[2].style.color = "blue";
        }

    }
    switchTurn();
    

}

function minimax(newBoardM, player){
    var availSpots = emptySquares(newBoardM); 
    
    if(checkWin(newBoardM, human)){
        return {score:-10};
    }
    
    else if(checkWin(newBoardM, aiPlayer)){
        return {score: 10};
    }
    
    else if(availSpots.length === 0){
        return {score: 0};
    }
    var moves = [];
    for(var i = 0; i < availSpots.length; i++){
        var move={};
        move.index = newBoardM[availSpots[i]];
        newBoardM[availSpots[i]] = player;

        if(player == aiPlayer){
            var result = minimax(newBoardM, human);
            move.score = result.score;
        }else{
            var result = minimax(newBoardM, aiPlayer);
            move.score = result.score;
        }
        
        newBoardM[availSpots[i]]=move.index;
        moves.push(move);
        
    }
    
    var bestMove;
    if(player === aiPlayer){
        var bestScore = -1000;
        for(var i = 0; i < moves.length; i++){
            if(moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }else{
        var bestScore = 1000;
        for(var i = 0; i < moves.length; i++){
            if(moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    
    return moves[bestMove];
}

function checkWin(board, player){// player == 2 is computer or player == 1 is human
    
    if(board[0] === player && board[1]===player && board[2]===player){
        return true;
    }
    else if(board[3] === player && board[4]===player && board[5]===player){
        return true;
    }
    else if(board[6] === player && board[7]===player && board[8]===player){
        return true;
    }
    else if(board[0] === player && board[3]===player && board[6]===player){
        return true;
    }
    else if(board[1] === player && board[4]===player && board[7]===player){
        return true;
    }
    else if(board[2] === player && board[5]===player && board[8]===player){
        return true;
    }
    else if(board[2] === player && board[4]===player && board[6]===player){
        return true;
    }
    else if(board[0] === player && board[4]===player && board[8]===player){
        return true;
    }
    return false;
}
function boardMatrixMaker(board){
    var matrix = [];
    for(var i=0; i < 3; i++){
        for(var j=0; j < 3; j++){
            if(board.rows[i].cells[j].innerHTML == "O"){
                matrix.push("O");
            }
            else if(board.rows[i].cells[j].innerHTML == "X"){
                matrix.push("X");
            }
            else{
                
                if(i == 0){
                    matrix.push(j);
                }
                else if(i == 1){
                    matrix.push(j+3)

                }
                else{
                    matrix.push(j+6);
                }
                
            }
        }
    }
    return matrix;
}
function emptySquares(boardM){
    var emptySquares=[];
    for(var i=0; i < boardM.length; i++){
       
        if(boardM[i]!= "X" && boardM[i] != "O"){// push a 0 for empty spot
            emptySquares.push(boardM[i]);
            
            
        }
    }
    return emptySquares;
}



function winnerCheckX() {
    //all are full so tie game
    var x = document.getElementById("gameBoard").rows[0].cells;
    var y = document.getElementById("gameBoard").rows[1].cells;
    var z = document.getElementById("gameBoard").rows[2].cells;
    var f = document.getElementById("turnInfo");
    if (x[0].innerHTML != "&nbsp;" && x[1].innerHTML != "&nbsp;" && x[2].innerHTML != "&nbsp;" && y[0].innerHTML != "&nbsp;" && y[1].innerHTML != "&nbsp;" && y[2].innerHTML != "&nbsp;" && z[0].innerHTML != "&nbsp;" && z[1].innerHTML != "&nbsp;" && z[2].innerHTML != "&nbsp;") {
        f.innerHTML = "Draw game";
        
    }
    if (x[0].innerHTML == "X" && x[1].innerHTML == "X" && x[2].innerHTML == "X") {
        f.innerHTML = "You Win!";
        
    }
    if (z[0].innerHTML == "X" && z[1].innerHTML == "X" && z[2].innerHTML == "X") {
        f.innerHTML = "You Win!";
        
    }
    if (y[0].innerHTML == "X" && y[1].innerHTML == "X" && y[2].innerHTML == "X") {
        
    }
    if (x[0].innerHTML == "X" && y[0].innerHTML == "X" && z[0].innerHTML == "X") {
        f.innerHTML = "You Win!";
        
    }
    if (x[1].innerHTML == "X" && y[1].innerHTML == "X" && z[1].innerHTML == "X") {
        f.innerHTML = "You Win!";
    }
    if (x[2].innerHTML == "X" && y[2].innerHTML == "X" && z[2].innerHTML == "X") {
        f.innerHTML = "You Win!";
    }
    if (x[0].innerHTML == "X" && y[1].innerHTML == "X" && z[2].innerHTML == "X") {
        f.innerHTML = "You Win!";
    }
    if (x[2].innerHTML == "X" && y[1].innerHTML == "X" && z[0].innerHTML == "X") {
        f.innerHTML = "You Win!";
         
    }
}

function winnerCheckO() {
    //all are full so tie game
    var x = document.getElementById("gameBoard").rows[0].cells;
    var y = document.getElementById("gameBoard").rows[1].cells;
    var z = document.getElementById("gameBoard").rows[2].cells;
    var f = document.getElementById("turnInfo");
    if (x[0].innerHTML != "&nbsp;" && x[1].innerHTML != "&nbsp;" && x[2].innerHTML != "&nbsp;" && y[0].innerHTML != "&nbsp;" && y[1].innerHTML != "&nbsp;" && y[2].innerHTML != "&nbsp;" && z[0].innerHTML != "&nbsp;" && z[1].innerHTML != "&nbsp;" && z[2].innerHTML != "&nbsp;") {
        f.innerHTML = "Draw game";
    }
    if (x[0].innerHTML == "O" && x[1].innerHTML == "O" && x[2].innerHTML == "O") {
        f.innerHTML = "Computer wins!";
    }
    if (z[0].innerHTML == "O" && z[1].innerHTML == "O" && z[2].innerHTML == "O") {
        f.innerHTML = "Computer wins!";
        
    }
    if (y[0].innerHTML == "O" && y[1].innerHTML == "O" && y[2].innerHTML == "O") {
        f.innerHTML = "Computer wins!";
        
    }
    if (x[0].innerHTML == "O" && y[0].innerHTML == "O" && z[0].innerHTML == "O") {
        f.innerHTML = "Computer wins!";
        
    }
    if (x[1].innerHTML == "O" && y[1].innerHTML == "O" && z[1].innerHTML == "O") {
        f.innerHTML = "Computer wins!";
       
    }
    if (x[2].innerHTML == "O" && y[2].innerHTML == "O" && z[2].innerHTML == "O") {
        f.innerHTML = "Computer wins!";
        
    }
    if (x[0].innerHTML == "O" && y[1].innerHTML == "O" && z[2].innerHTML == "O") {
        f.innerHTML = "Computer wins!";
    }
    if (x[2].innerHTML == "O" && y[1].innerHTML == "O" && z[0].innerHTML == "O") {
        f.innerHTML = "Computer wins!";
    }
}
