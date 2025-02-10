/*

-Next, create a start button
    -once that button is pressed, it will turn into a stop button
-when game starts, the computer (at random), must start by putting in the first pattern
-make a hash table for sounds
-if player chooses the right one, it continues, where the number of computer patterns increases by one, and the user repeats
-so on
-8 times is the maximum!
-If player loses, there is a browser pop-up that says "You lost the game." and will return to initial state.
-If player wins, there's a browser pop-up that says "Congratulations! You win!" and will return to initial state.
*/
// Store sound files for each box when touched 
// make a list (object) that holds sounds for each color box
let sounds = {
    red: new Audio("red.wav"),
    purple: new Audio("purple.wav"),
    green: new Audio("green.wav"),
    yellow: new Audio("yellow.wav"),
};

let boxColors = ["red", "purple", "green", "yellow"];
let computerPatterns = [];
let playerMoves = [];
let level = 0;
let playerTurn = false;
let gameStarted = false;

function toggleGame() {
    let startButton = document.getElementById("startButton");

    if (!gameStarted) {  // Correct condition here
        startButton.textContent = "Stop";
        gameStart();
        gameStarted = true;
    } else {
        startButton.textContent = "Start";
        stopGame();
        gameStarted = false;
    }
}

function stopGame() {
    playerTurn = false;
    computerPatterns = [];
    playerMoves = [];
    level = 0;
    document.getElementById("notification").textContent = "Game Stopped!";
    gameStarted = false; // Reset the gameStarted flag here as well.
}

function gameStart() {
    computerPatterns = [];
    playerMoves = [];
    level = 0;
    document.getElementById("notification").textContent = "Game Started!";
    gameStarted = true;
    subsequentRounds();
}

function subsequentRounds() {
    playerMoves = [];
    playerTurn = false;
    level++;

    if (level > 8) {
        document.getElementById("notification").textContent = "You Won!";
        stopGame();
        return;
    }

    let newColor = boxColors[Math.floor(Math.random() * boxColors.length)];
    computerPatterns.push(newColor);

    playSequence();
}

function playSequence() {
    let i = 0;

    function flashNext() {
        if (i < computerPatterns.length) {
            let color = computerPatterns[i];
            flashColor(color);
            playSound(color);
            i++;
            setTimeout(flashNext, 800);
        } else {
            playerTurn = true;
            document.getElementById("notification").textContent = "Your Go!";
        }
    }

    flashNext();
}

function flashColor(color) {
    let box = document.getElementById(color + "box");
    box.classList.add("flash");

    setTimeout(() => {
        box.classList.remove("flash");
    }, 400);
}

function playSound(color) {
    if (sounds[color]) {
        sounds[color].play().catch(err => console.error("Audio playback failed: ", err));
    }
}

function playerClick(color) {
    if (!playerTurn) return;

    let box = document.getElementById(color + "box");
    box.classList.add("clicked");
    playSound(color);

    setTimeout(() => box.classList.remove("clicked"), 300);

    playerMoves.push(color);

    let correctSoFar = true;
    for (let i = 0; i < playerMoves.length; i++) {
        if (playerMoves[i] !== computerPatterns[i]) {
            correctSoFar = false;
            break;
        }
    }

    if (!correctSoFar) {
        document.getElementById("notification").textContent = "Wrong box. Game Over!";
        stopGame();
        return;
    }

    if (playerMoves.length === computerPatterns.length) {
        document.getElementById("notification").textContent = "Correct!";
        setTimeout(subsequentRounds, 1000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("redbox").addEventListener("click", () => playerClick("red"));
    document.getElementById("purplebox").addEventListener("click", () => playerClick("purple"));
    document.getElementById("greenbox").addEventListener("click", () => playerClick("green"));
    document.getElementById("yellowbox").addEventListener("click", () => playerClick("yellow"));

    document.getElementById("startButton").addEventListener("click", toggleGame);
});