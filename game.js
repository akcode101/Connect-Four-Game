

import BoardLogic from './BoardLogic';
import * as boardView from './BoardView';


/**
	Player 1 wins;
	Player 2 wins;
	Player number started
*/

const state={
	player1Score: 0,
	player2Score: 0,
	playerOneStarted: true
};
window.state=state;

const playMove = (columnNumber) => {
	let moveObject=state.currentBoard.playMoveOnColumn(columnNumber);
	//console.log(moveObject, moveObject.winObject.fourIDs);
	if (moveObject.winObject.gameWinner!==-1)
	{

		//console.log('GW', moveObject.winObject.gameWinner, 'four ids', moveObject.winObject.fourIDs);
		boardView.displayWinningTokens(moveObject.winObject.fourIDs, moveObject.winObject.gameWinner);
		boardView.displayTurnText(state.currentBoard.currentTurnPlayerNumber,moveObject.winObject.gameWinner);
		boardView.nullifyAllColumns();
		if (moveObject.winObject.gameWinner===1)
		{
			state.player1Score++;
		}
		else if (moveObject.winObject.gameWinner===2)
		{
			state.player2Score++;
		}
		boardView.displayNewScores(state.player1Score, state.player2Score);
	}
	else if (moveObject.state==='draw')
	{
		boardView.displaySingleToken(moveObject.latestToken, state.currentBoard.currentTurnPlayerNumber);
		boardView.displayTurnText(state.currentBoard.currentTurnPlayerNumber,0);
		boardView.nullifyAllColumns();
		state.player1Score+=0.5;
		state.player2Score+=0.5;
		boardView.displayNewScores(state.player1Score, state.player2Score);
	}

	else if (moveObject.state==='playing')
	{
		//console.log(moveObject);
		//console.log("here playing");
		//console.log('column index', columnIndex);
		//console.log(moveObject.latestToken, state.currentBoard.currentTurnPlayerNumber);	
		boardView.displaySingleToken(moveObject.latestToken, state.currentBoard.currentTurnPlayerNumber);
		state.currentBoard.changeUpActivePlayer();
		boardView.displayTurnText(state.currentBoard.currentTurnPlayerNumber,-1);
		if (moveObject.columnObject.filled===true)
		{
			//console.log("Column filled:  ", moveObject.columnObject.columnOfInterest);
			boardView.nullifySpecificColumn(moveObject.columnObject.columnOfInterest);
		}
	}
};


//Restore like recipeson page load
window.addEventListener('load', () =>
{
	state.currentBoard=new BoardLogic(state.playerOneStarted);
	boardView.displayEmptyBoard(state.playerOneStarted);
});


document.getElementById('newGame').addEventListener('click', ()=>
{
	state.playerOneStarted=!state.playerOneStarted;
	state.currentBoard=new BoardLogic(state.playerOneStarted);
	boardView.displayEmptyBoard(state.playerOneStarted);

});


const arrSquares=document.getElementsByClassName('boardSquare');
Array.from(arrSquares).forEach(function(element) {
      element.addEventListener('click', e=>{
      	//console.log(e);
		let squareIndex=e.target.id;
		let squareNumberString=squareIndex.slice(2);
		let squareNumber=parseInt(squareNumberString);
		let columnNumber=Math.floor(squareNumber/6);
		if (state.currentBoard.highestFloorForEachColumn[columnNumber]<6 && state.currentBoard.state==='playing') //column not full & game playing
		{
			//console.log("Not full");
			playMove(columnNumber);
		}
      });
    });


document.querySelector('.columnButtons').addEventListener('click', e=>
{
	let columnIndex=e.target.id;
	//console.log(columnIndex);
	if (columnIndex)
	{

		let columnNumber=parseInt(columnIndex[3]);
		//console.log("Column number", columnNumber);
		playMove(columnNumber);
		
	}
	
	
});