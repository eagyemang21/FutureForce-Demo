/*

-Next, create a start button
    -once that button is pressed, it will turn into a stop button
-when game starts, the computer (at random), must start by putting in the first pattern
-if player chooses the right one, it continues, where the number of computer patterns increases by one, and the user repeats
-so on
-8 times is the maximum!
-If player loses, there is a browser pop-up that says "You lost the game." and will return to initial state.
-If player wins, there's a browser pop-up that says "Congratulations! You win!" and will return to initial state.
*/ 
//initiate boxes with colors
let boxColors = ["red", "purple", "green", "yellow"]
//next, I want to store the auto-generated computer patterns and player moves in arrays
let computerPatterns = []
let playerMoves = []

//initiate level
let level = 0

//player's turn must be false when computer turns occur, will turn true when computer
let playerTurn = false

function gameStart(){
    //call computerpatterns, level, playermoves, and subsequent rounds to either be manipulated
    computerPatterns = [];
    level = 0;
    playerMoves = [];
    subsequentRounds();

}

function subsequentRounds(){

}