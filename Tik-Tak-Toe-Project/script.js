var origBoard;
const huPlayer = 'O';//humanPlayer
const aiPlayer = 'X';// systemPlayer
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]//possible combos of horizontal,vertical ,diogonal

const cells = document.querySelectorAll('.cell');
// querySelector will select each div named cell
startGame();// calling function to startGame

//Defining function startGame
function startGame() {
	document.querySelector(".endgame").style.display = "none";//display nothing also at the begenning 
	origBoard = Array.from(Array(9).keys());//giving numbers from 0-9 for reference for the actual board
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);//for each click it'll call turnClick()
	}
}
//Defining function turnClick
function turnClick(square) {
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, huPlayer)
		if (!checkTie()) turn(bestSpot(), aiPlayer);//checking tie with aiplayer calling checkTie() and finding wheather square has been already clicked ,calling bestSpot()
	}
}

//defining turn()
function turn(squareId, player) {
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
}
//defining checkWin()
function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

//defining gameOver()
function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer ? "yellow" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
    }
    
	declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose.");
}
  //DETERMINING WINNER

function declareWinner(who){
document.querySelector(".endgame").style.display = "block";//showing endgame section as block
document.querySelector(".endgame .text").innerText = who;//display who won at the div class text inside endgame
}

function emptySquares(){
   
	return origBoard.filter(s => typeof s == 'number');//its still not clicked,type is number its consider to be an empty square
}

  //defining bestSpot()
  function bestSpot(){
      return emptySquares()[0];//calling emptySqare() to find bestSpot to click by aiPlayer
  }

  //defining checktie()
  function checkTie()
  {
      if(emptySquares().length == 0)//if there's no empty squares ther'll be a tie or one won
      {
        for(var i = 0;i < cells.length;i++)
        {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click',turnClick,false)//removing EvntLstnr so that player can now click any cell because the game is over
            
        }
        declareWinner("Tie Game")
    
            return true;

        }
        return false;
      }

