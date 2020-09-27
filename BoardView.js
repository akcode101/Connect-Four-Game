

export const normalTurnText = playerNumber =>
{
	let playerColor=(playerNumber===1) ? 'red' : 'blue';
	document.getElementById('playerTurn').textContent=`Player ${playerNumber}'s Turn`;
	document.getElementById('playerTurn').style.backgroundColor=playerColor;

}


export const nullifySpecificColumn = (columnNumber) =>
{
	
		document.getElementById(`col${columnNumber}`).classList.remove('possibleColumn');
		document.getElementById(`col${columnNumber}`).classList.add('disabledColumn');
};


export const nullifyAllColumns = () =>
{
	for (let i=0; i<7; i++)
	{
		document.getElementById(`col${i}`).classList.remove('possibleColumn');
		document.getElementById(`col${i}`).classList.add('disabledColumn');
	}
};

//no double adding classing or removing a class that doesn't exist
export const displayEmptyBoard = (playerStart) =>
{
	let playerNumber = playerStart===true? 1 : 2;
	normalTurnText(playerNumber);
	for (let i=0; i<42; i++)
	{
		document.getElementById(`sq${i}`).classList.remove('playerOneMove', 'playerTwoMove', 'playerOneWinning', 'playerTwoWinning');
		document.getElementById(`sq${i}`).classList.add('emptySquare');
	}

	for (let i=0; i<7; i++)
	{
		document.getElementById(`col${i}`).classList.remove('disabledColumn');
		document.getElementById(`col${i}`).classList.add('possibleColumn');
	}
};

export const displaySingleToken = (squareId, playerNumber)=>
{
	document.getElementById(`sq${squareId}`).classList.remove('emptySquare');
	//console.log(document.getElementById(`sq${squareId}`).classList);
	if (playerNumber===1)
		document.getElementById(`sq${squareId}`).classList.add('playerOneMove');
		
	else
		document.getElementById(`sq${squareId}`).classList.add('playerTwoMove');
	//console.log(document.getElementById(`sq${squareId}`).classList);

}

export const displayWinningTokens = (listOfTokenNumbers, playerNumber) =>
{
	listOfTokenNumbers.forEach(el => 
	{
		if (playerNumber==1)
		{
			document.getElementById(`sq${el}`).classList.remove('playerOneMove', 'emptySquare');
			document.getElementById(`sq${el}`).classList.add('playerOneWinning');
		}
		else if (playerNumber===2)
		{
			document.getElementById(`sq${el}`).classList.remove('playerTwoMove', 'emptySquare');
			document.getElementById(`sq${el}`).classList.add('playerTwoWinning');
		}
	});
};

//1: player 1 wins; 2: player 2 wins; -1: neither wins; 0: draw
export const displayTurnText = (playerNumber, status) =>
{
	let playerColor=(playerNumber===1) ? 'red' : 'blue';
	if (status ===1 || status ===2)
	{
		document.getElementById('playerTurn').textContent=`Player ${playerNumber} wins!`;
		document.getElementById('playerTurn').style.backgroundColor=playerColor;
	}
	else if (status ===0)
	{
		document.getElementById('playerTurn').textContent=`DRAW!! Neither player wins`;
		document.getElementById('playerTurn').style.backgroundColor='purple';
	}
	else if (status==-1)
	{
		normalTurnText(playerNumber);
	}
};





export const displayNewScores = (playerOneScore, playerTwoScore) =>
{
	document.getElementById('player1Score').textContent=`Player 1 Score: ${playerOneScore}`;
	document.getElementById('player2Score').textContent=`Player 2 Score: ${playerTwoScore}`;
};