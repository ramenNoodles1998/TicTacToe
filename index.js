var playerTurn = true;
var computerMoveTimeout = 0;

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
            computerMoveTimeout = setTimeout(makeComputerMove, 1000);
        }
        
    }
}


function makeComputerMove() {
    // Your code here
    var markCellBool = false;
    while (markCellBool == false) {
        markCellBool = markCell();
    }
    switchTurn();

}

function markCell() {
    var num1 = Math.random();
    var num2 = Math.random();
    var x = document.getElementById("gameBoard").rows[0].cells;
    var z = document.getElementById("gameBoard").rows[1].cells;
    var y = document.getElementById("gameBoard").rows[2].cells;
    if (num1 > .75) {
        if (num2 > .75) {
            //check if cell is open
            //then return true or false
            if (x[0].innerHTML == "&nbsp;") {
                x[0].innerHTML = "O";
                x[0].style.color = "blue";
                return true;
            }
            else {
                return false;
            }
        }
        else if (num2 > .3) {
            if (x[1].innerHTML == "&nbsp;") {
                x[1].innerHTML = "O";
                x[1].style.color = "blue";
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (x[2].innerHTML == "&nbsp;") {
                x[2].innerHTML = "O";
                x[2].style.color = "blue";
                return true;
            }
            else {
                return false;
            }

        }
    }
    else if (num1 > .3) {
        if (num2 > .75) {
            if (z[0].innerHTML == "&nbsp;") {
                z[0].innerHTML = "O";
                z[0].style.color = "blue";
                return true;
            }
            else {
                return false;
            }

        }
        else if (num2 > .3) {
            if (z[1].innerHTML == "&nbsp;") {
                z[1].innerHTML = "O";
                z[1].style.color = "blue";
                return true;
            }
            else {
                return false;
            }

        }
        else {
            if (z[2].innerHTML == "&nbsp;") {
                z[2].innerHTML = "O";
                z[2].style.color = "blue";
                return true;
            }
            else {
                return false;
            }

        }
    }
    else {
        if (num2 > .75) {
            if (y[0].innerHTML == "&nbsp;") {
                y[0].innerHTML = "O";
                y[0].style.color = "blue";
                return true;
            }
            else {
                return false;
            }

        }
        else if (num2 > .3) {
            if (y[1].innerHTML == "&nbsp;") {
                y[1].innerHTML = "O";
                y[1].style.color = "blue";
                return true;
            }
            else {
                return false;
            }

        }
        else {
            if (y[2].innerHTML == "&nbsp;") {
                y[2].innerHTML = "O";
                y[2].style.color = "blue";
                return true;
            }
            else {
                return false;
            }

        }

    }
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
        f.innerHTML = "You Win!";
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
