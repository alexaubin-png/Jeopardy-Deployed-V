let player1Score = 0; // Score for Player 1
let player2Score = 0; // Score for Player 2
let currentPlayer = 1; // Tracks the current player
const correctAnswer = "7"; // The correct answer for the final question
const bonusPoints = 500; // Bonus points for correct answer
let scores = { player1: player1Score, player2: player2Score }; // Object to hold scores

// Load scores from local storage on initialization
function loadScores() {
    const savedScores = localStorage.getItem('scores');
    if (savedScores) {
        scores = JSON.parse(savedScores);
        player1Score = scores.player1;
        player2Score = scores.player2;
        document.getElementById("player1-score").textContent = player1Score;
        document.getElementById("player2-score").textContent = player2Score;
    }
}

// Function to update the score display
function updateScoreDisplay() {
    document.getElementById('finalResult').innerHTML = `Final Score: Player 1: ${scores.player1}, Player 2: ${scores.player2}`;
}

// Attach submitAnswer function to button
document.getElementById('submitFinalAnswer').addEventListener('click', submitAnswer);

// Submit answer function
function submitAnswer() {
    const inputField = document.getElementById('finalAnswer'); // Match HTML ID
    let playerBet = parseInt(document.getElementById('finalBet').value); // Match HTML ID

    // Validate the bet amount
    if (isNaN(playerBet) || playerBet <= 0) {
        alert("Please enter a valid bet amount!");
        return;
    }

    if (playerBet > scores[`player${currentPlayer}`]) {
        alert("You cannot bet more than your current score!");
        return;
    }

    if (playerBet > 1000) {
        alert("You cannot bet more than 1000!");
        return;
    }

    // Get the player's answer
    let playerAnswer = inputField.value.toLowerCase().trim();

    // Check the answer and update scores
    if (playerAnswer === correctAnswer) {
        alert('Correct Answer');
        scores[`player${currentPlayer}`] += bonusPoints; // Add bonus points
    } 

    // Bonus points for entering "7"
    if (playerAnswer === "7") {
        alert('You entered 7! Bonus Points awarded!');
        scores[`player${currentPlayer}`] += bonusPoints; // Add bonus points for entering 7
    } else {
        scores[`player${currentPlayer}`] -= playerBet; // Deduct bet if incorrect
        alert('Incorrect Answer');
    }

    // Update the scores in the DOM
    document.getElementById("player" + currentPlayer + "-score").textContent = scores[`player${currentPlayer}`];

    // Save scores to local storage
    localStorage.setItem('scores', JSON.stringify(scores));

    // Update final result display
    updateScoreDisplay();

    // Switch players
    switchPlayers();
}

// Switch players function
function switchPlayers() {
    currentPlayer = (currentPlayer === 1) ? 2 : 1; // Toggle between players
    document.getElementById("switchPlayers1").textContent = "Player " + currentPlayer + " Please pick a card";
}

// Load scores when the game initializes
loadScores();
