export default class BoardLogic {
	constructor(playerOneStarted)
	{
		this.operators=  {
		   '+': function(a, b){ return a+b},
		   '-': function(a, b){ return a-b}
		};
		
		this.gameBoard = Array.from(Array(7), () => new Array(6));
		this.state= 'playing';
		this.highestFloorForEachColumn= [0,0,0,0,0,0,0];
		this.tokenCount= 0;
		if (playerOneStarted)
		{
			this.currentTurnPlayerNumber=1;
		}
		else
		{
			this.currentTurnPlayerNumber=2;
		}
	
	}

	//two ideas: check all possible four in a rows: by checking vertical 4, horizontal 4, or diagonal 4
	//another idea: after every move: only check wins possible from that move, more practical idea

	isWithinBounds(columnNumber, rowNumber)
	{
		return columnNumber>=0 && columnNumber<=6 && rowNumber>=0 && rowNumber<=5;
	}

	checkFour(columnNumber, rowNumber, latestVal, dir)
	{
		// let key= (dir=="leftDiag" ? key='-': key='+');
		// let otherKey= (dir=="leftDiag" ? key='+': key='-');
		
		// let topCol=this.operators[key](columnNumber,3);
		// let topRow=rowNumber+3;

		//starting coordinates of four in a row checks based on latest token entered
		let startCol;
		let startRow;

		if (dir==="leftDiag")
		{
			startCol=columnNumber-3;
			startRow=rowNumber+3;
		}
		else if (dir==="rightDiag")
		{
			startCol=columnNumber+3;
			startRow=rowNumber+3;
		}
		else if (dir==="horizontal")
		{
			startCol=columnNumber-3;
			startRow=rowNumber;
		}
		else if (dir==="vertical")
		{
			startCol=columnNumber;
			startRow=rowNumber+3;
		}
		for (let i=0; i<4; i++)
		{
			//Current coordinates of position checked when checking for connect 4
			let colCurr;
			let rowCurr;
			if (dir==="leftDiag")
			{
				colCurr=startCol+i;
				rowCurr=startRow-i;
			}
			else if (dir==="rightDiag")
			{
				colCurr=startCol-i;
				rowCurr=startRow-i;
			}
			else if (dir==="horizontal")
			{
				colCurr=startCol+i;
				rowCurr=startRow;
			}
			else if (dir==="vertical")
			{
				colCurr=startCol;
				rowCurr=startRow-i;
			}
			// let colCurr=this.operators[otherKey](topCol, i);
			// let rowCurr=topRow-i;
			let allFour=true;
			let fourIDs=[];
			for (let i=0; i<4; i++)
			{
				if (!this.isWithinBounds(colCurr, rowCurr) || this.gameBoard[colCurr][rowCurr]!==latestVal)
				{
					allFour=false;
					break;

				}
				else
				{
					// colCurr=this.operators[otherKey](colCurr, 1);
					// rowCurr-=1;
					fourIDs.push(colCurr*6+rowCurr);

					if (dir==="leftDiag")
					{
						colCurr=colCurr+1;
						rowCurr=rowCurr-1;
					}
					else if (dir==="rightDiag")
					{
						colCurr=colCurr-1;
						rowCurr=rowCurr-1;
					}
					else if (dir==="horizontal")
					{
						colCurr=colCurr+1;
						rowCurr=rowCurr;
					}
					else if (dir==="vertical")
					{
						colCurr=colCurr;
						rowCurr=rowCurr-1;
					}

				}
			}
			if (allFour)
				return {gameWinner: latestVal, fourIDs};
			
		}
		return {gameWinner: -1, fourIDs: []};
	}


	//return 1 for player 1 win, return 2 for player 2 win, return -1 for neither win
	//if win, return id list of four in a row coordinates, else return empty list
	checkWin(columnNumber, rowNumber)
	{
		const latestPosVal=this.gameBoard[columnNumber][rowNumber];
		const leftDiagCheck=this.checkFour(columnNumber, rowNumber, latestPosVal, "leftDiag");
		if (leftDiagCheck.gameWinner!==-1)
		{
			return leftDiagCheck;
		}
		const rightDiagCheck=this.checkFour(columnNumber, rowNumber, latestPosVal, "rightDiag");
		if (rightDiagCheck.gameWinner!==-1)
		{
			return rightDiagCheck;
		}

		const horizontalCheck=this.checkFour(columnNumber, rowNumber, latestPosVal, "horizontal");
		if (horizontalCheck.gameWinner!==-1)
		{
			return horizontalCheck;
		}
		const verticalCheck=this.checkFour(columnNumber, rowNumber, latestPosVal, "vertical");
		if (verticalCheck.gameWinner!==-1)
		{
			return verticalCheck;
		}
		return {gameWinner: -1, fourIDS: []};
	}

	playMoveOnColumn(columnNumber)
	{
		let rowAvailable=this.highestFloorForEachColumn[columnNumber];
		this.gameBoard[columnNumber][rowAvailable]=this.currentTurnPlayerNumber;
		this.highestFloorForEachColumn[columnNumber]++;
		let columnFilled={filled: false, columnOfInterest: columnNumber};
		if (this.highestFloorForEachColumn[columnNumber]>=6)
		{
			columnFilled.filled=true;
		}
		this.tokenCount++;
		let winObject=this.checkWin(columnNumber, rowAvailable);
		let tokenNumber=6*columnNumber+rowAvailable;
		if (winObject.gameWinner!==-1 && this.tokenCount<=42)
		{
			this.state=`player${this.currentTurnPlayerNumber}Wins`;
		}
		else
		{
			if (this.tokenCount===42)
			{
				this.state='draw';
			}
			else
			{
				this.state='playing';
				
			}
		}
		this.moveInfo={winObject, state: this.state, columnObject: columnFilled, latestToken: tokenNumber};
		return this.moveInfo;
	}

	changeUpActivePlayer()
	{
		if (this.state==='playing' && this.tokenCount<42)
		{
			this.currentTurnPlayerNumber=this.currentTurnPlayerNumber===1 ? 2 : 1;
		}
	}

};