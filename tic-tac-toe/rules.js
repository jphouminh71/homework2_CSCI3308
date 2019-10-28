/*
[IMPORTANT]
You are free to create any number of helper function you want.
We know the problem could be seached online, and we are aware of those solutions.
So please sight sources if you took help from any online resource.
*/

// counter for moves
var moveCount = 0;
// array to check wins
let win = [false,1]	// pass this into the win function

//IDs for all the table elements. You get the cell element just by using document.getElementById("A1")
var table_ids = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]

/*
An integer array of length 9.
Usaged: This is to store the state to the tictactoe board.
When a move is made
(Example player 1 (who is X) move at Cell 'A1' --- The board_state[0] will be made 1 )
Similarly, A move by player 2(who is O) at Cell 'A3' --- The board_state[2] will be made 0 )
We store the move of player 1 as '1' and player 2 as '0'. So after the above two moves the state should look like
[1, -1, 0, -1, -1, -1, -1, -1, -1]
*/
var board_state = [-1,-1,-1,-1,-1,-1,-1,-1,-1]


// A flag to keep track of the status of the game, false means the game is not started. The default value is set to false
var started = false

/*
A variable to keep track of each players turn. Since the game always starts with player 1 - The default value is set to '1'
1 means player_1
0 means player_0
*/
var turn = 1

/*
 @Return boolean
 @Param _str - A string variable - Note the type is not checked in the implementation
 The methods @Returns true is the _str is null or it has a length of 0, otherwise, the methods returns false
*/
function isEmpty(_str) {
	return (!_str || 0 === _str.length)
}

/*
@Return int This return the turn variable. Please note that
turn = 1 is for player_1 and
turn = 0 is for player_2
@Param - No param
*/
function whose_move(){
	return this.turn
}

/*
@Return void
@Param
This methods toggles the 'turn' variable.
if the turn is set to 1 it will make it 0
if the turn is set to 0 it will make it 1
*/
function toggle_move() {
	this.turn = !this.turn
}

/*
@Return boolean
@Param
The method returns the value of the 'started' flag.
true means the game has started
false means the game has not started
When the game has not started the flag is set to false. As soon as the game starts the flag must be set to true.
Once the game has finished or user has clicked on reset_play the flag must be set to false.
*/
function game_started(){
	return this.started
}


/*
TODO - Rule 1
This is the first method you'll implement. This method is called when the Begin Play button is clicked.
The method should do all the validations as stated in rule 1.
1. Verify if the player names are empty or not. Raise an alert if they are empty.
2. If the field are empty don't start the game. This just means the function will return and do nothing. The 'started' flag will not be modified.
3. If all verification is successful, disable the name fields and update the player moves as shown in the image.
4. If all verification is successful, update the turn information on the page. (See the source code and image). And set the started flag to true.(this will help you track at any instant if the game is in start state or not.)
5. Once game has started, Handle multiple clicks on begin play.
*/

function begin_play(){
	if (started == true){			// edge case to make sure they don't keep clicking the begin game
		window.alert("Game has already started, click reset to start again");
		return;
	}
	// step one
	var player1_name = document.getElementById("player1_id").value;
	var player2_name = document.getElementById("player2_id").value;
	if (isEmpty(player1_name) || isEmpty(player2_name)){
		window.alert("BOTH PLAYERS NEED A NAME");
		return;
	}
	// coming down here implies that the name validation was good to go and we are good to start the game
	started = true;		// starting the game
	document.getElementById("player1_id").disabled  = true;		// disabling the buttons
	document.getElementById("player2_id").disabled  = true;

	let x = "(X)";
	let o = "(O)"
	document.getElementById("player1_id").value = `${player1_name} ${x}`; // changing their names
	document.getElementById("player2_id").value = `${player2_name} ${o}`;

	/* in the original game, x's always start first so we will make player 1 go first*/
	if (turn == 1){
		document.getElementById("turn_info").innerText = "Turn for: X";
	}else{
		document.getElementById("turn_info").innerText = "Turn for: O";
	}
}

/*
TODO - Rule 2
This is the second method you'll implement. This method is called when the Reset Play button is clicked.
The method should do all the things as stated in rule 2.
1. The reset play button should reset the whole game.(At any time when reset is clicked - All the three text boxes should be cleared and Turn should be set to the default message.)
2. The text boxes for entering name should be enablled back.
3. The Tic Tac Toe Grid should be set to its default entries.
4. Clicking reset play again and again shall have the same effect.(or no effect when clicked multiple times)
Remember to set the started flag as false

*/
function reset_play(){
	if (started == false){		// going to assume that before the start of every game, if started = false then default values are already set
		alert("game already reset");
		return
	}
	turn = 1;			// reset the turn to player 1
	win = [false,1];
	started = false;		// change the game state to not started
	document.getElementById("player1_id").value = ''; // changing the names back to default
	document.getElementById("player2_id").value = '';	//

	document.getElementById("player1_id").disabled = false; 	// re-enabling the text entries
	document.getElementById("player2_id").disabled = false;

	document.getElementById("turn_info").innerText = "Game has not begun"; // reset the turn information

	document.getElementById("move_text_id").value = '';	// changing the move input back to its placeholder
	moveCount = 0;		// resetting the move count


	let i = 0;				// reseting the grid
	let size = table_ids.length;
	for(i = 0; i < size; i++){
		document.getElementById(table_ids[i]).innerText = table_ids[i];
		board_state[i] = -1;		// have to reset the board_state too
	}
}
/*
   array holds boolean of a win or not at index 0
	 			 holds number value for the winner that is returned at index 1

				 awful way to implement it but it works
*/
function checkWin(array){
	if (moveCount >= 9){	// should never be no more than 9 moves
		return "draw";
	}
	/* 0  1  2
	   3  4  5
		 6  7  8
	*/
	// check for horizontal matches
	if ((board_state[0] != -1)&&(board_state[1]!=-1)&&(board_state[2]!=-1)&&(board_state[0] == board_state[1]) && (board_state[0] == board_state[2])){	// first row win
		array[0] = true;
		array[1] = board_state[0]
		return array;
	}
	else if ((board_state[3] != -1)&&(board_state[4]!=-1)&&(board_state[5]!=-1)&&(board_state[3] == board_state[4]) && (board_state[3] == board_state[5])){	// second row win
		array[0] = true;
		array[1] = board_state[3]
		return array;
	}
	else if ((board_state[6] != -1)&&(board_state[7]!=-1)&&(board_state[8]!=-1)&&(board_state[6] == board_state[7]) && (board_state[6] == board_state[8])){	// third row win
		array[0] = true;
		array[1] = board_state[6]
		return array;
	}
	else if ((board_state[0] != -1)&&(board_state[3]!=-1)&&(board_state[6]!=-1)&&(board_state[0] == board_state[3]) && (board_state[0] == board_state[6])){	// first column win
		array[0] = true;
		array[1] = board_state[0]
		return array;
	}
	else if ((board_state[1] != -1)&&(board_state[4]!=-1)&&(board_state[7]!=-1)&&(board_state[1] == board_state[4]) && (board_state[1] == board_state[7])){	// second column win
		array[0] = true;
		array[1] = board_state[1]
		return array;
	}
	else if ((board_state[2] != -1)&&(board_state[5]!=-1)&&(board_state[8]!=-1)&&(board_state[2] == board_state[5]) && (board_state[2] == board_state[8])){	// third column win
		array[0] = true;
		array[1] = board_state[2]
		return array;
	}
	else if ((board_state[0] != -1)&&(board_state[4]!=-1)&&(board_state[8]!=-1)&&(board_state[0] == board_state[4]) && (board_state[0] == board_state[8])){	// left->right diagonal
		array[0] = true;
		array[1] = board_state[0]
		return array;
	}
	else if ((board_state[2] != -1)&&(board_state[4]!=-1)&&(board_state[6]!=-1)&&(board_state[2] == board_state[4]) && (board_state[2] == board_state[6])){	// right->left diagonal
		array[0] = true;
		array[1] = board_state[2]
		return array;
	}
}
/*
TODO - Rule 3
This is the last method you'll implement. This method is called everytime a move has been player( Play button was clicked).
The method should do all the things as stated in rule 2.
1. The moves should be validated can only be these ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]
2. Invalid moves should be reported by an alert message.(You are encorraged to use Modal which you learned in HW1 - Usage is not mandatory.)
3. If the move is a valid move, the grid should be updated with the correct move (Player 1 is always - 'X', and Player 2 is always 'O' (This is not zero!)) - The turn information should also be updated
	Hint: Use the turn variable to figure out who is currently playing. Use to toggle method to change moves.
4. A move should always be a valid move. (Example: If say a move was made in already filled cell, it should be invalidated with an alert.)
5. If the game has not started, clicking on <b>Play</b> should give an alert "The game has not started."<br/>
6. After any move, the state of the table should be validated.(see the document attached in the homework)
   If the there is winner - Show it in an alert message - (Ex - Winner is X or O) - Displaying name is not important. <br/>
7. The game should reset itself once a winner is determined.<br/>
8. After all the moves have exhausted, you're not required to display any message. (It should be obvious to Reset play.)<br/>
*/
function play() {
	if (started == false){				// edge case to check if the game hasn't started yet.
		alert("Game has not started!");
		return;
	}
	let input = document.getElementById("move_text_id").value;
	if (input[0].match(/[A-C]/g) && input[1].match(/[1-3]/g) ){	  // regex expression to validate
		// now you need to check if that input has already been used
		let indexOfInput = table_ids.indexOf(input); 		// returns the index of the the value you are tryiing to change
		if (board_state[indexOfInput] != -1){
			alert(`position ${input} is already used, pick another!`);
		}
		// if we get down to this that means we can update the cell to whoevers turn it is.
		else if (turn == 1){		// if its player 1 turn
			board_state[indexOfInput] = 1; 		// update that position to the board state to player1 spot
			document.getElementById(input).innerText = 'X';
			document.getElementById("move_text_id").value = '';
			/* update the turn text to player 2's turn */
			document.getElementById("turn_info").innerText = "Turn for: O";
			moveCount++;
		}
		else if (turn == 0){			// if its players 2 turn
			board_state[indexOfInput] = 0;
			document.getElementById(input).innerText = 'O';
			document.getElementById("move_text_id").value = '';
			/* update the turn text to player 1's turn */
			document.getElementById("turn_info").innerText = "Turn for: X";
			moveCount++;
		}
		if (moveCount >= 9){				// first edge case if the game was a draw
			alert("GAME OVER! It was a draw!")
			reset_play()
		}
		/* before we toggle the next move we should check if someone won in that recent turn*/
		checkWin(win);
		if (win[0] == true){
			if (win[1] == 1){			// player1 wins
				alert("X's won!");
				reset_play();
			}else{
				alert("O's won!")		// player2 wins
				reset_play();
			}
		}
		else{
			toggle_move(); 		// moves onto the next move
		}
	} else{
		alert("bad input!"); 			//automatically recalled since its an onlick function, no need for while loop
	}
}
/*
Do not change this method.
*/
function moveEnter(event) {
	if(event.keyCode == 13) {
		event.preventDefault()
		play()
	}

}
