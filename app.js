/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if he/she looses
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input');
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    // Validate
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Enter a number between ${min} and ${max}`, 'red');
    }

    // Check if won
    if(guess === winningNum) {
        gameOver(true, `${winningNum} is correct. You win!`)
    } else if (!isNaN(guess) && guess !== winningNum) {
        // Subtract from guesses
        guessesLeft -= 1;

        if(guessesLeft <= 0) {
            gameOver(false, `Game over! The correct answer was ${winningNum}`);
        } else {
            // Change border color
            guessInput.style.borderColor = 'red';
            // Clear input
            guessInput.value = '';
            // Set message
            setMessage(`Wrong answer, try again. You have ${guessesLeft} guesses left.`, 'red');
        }
    }
});

// Game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable Input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Set message
    setMessage(msg, color);

    // Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get winning number
function getRandomNum(min, max) {
    return Math.floor((Math.random() * (max - min + 1) + min));
}


function setMessage(msg,color) {
    message.style.color = color;
    message.textContent = msg;
}
