// get all the necessary functions
import { snakeMovement, updateSnake, drawSnake, getHead, intersection, getScore, clearSnake } from "./snakePython.js"
import { updateApple, drawApple } from "./snakeApple.js"
import { getHighScores } from "./highScores.js"

let latestRender = 0
let lost = 0
const gameBox = document.getElementById('game-box') // get the gamebox
let highScores = []
let score = 0

function game(currentTime) {
    if (lost) { // simple function to get an alert if lost condition is met.
        if (confirm("Well played !")) {
            // get highscores and score
            highScores = getHighScores()
            score = getScore()

            // add score if score is high enough for highscore.
            for (let p = 0; p < highScores.length; p++) {
                if (highScores[p][1] < score) {
                    Swal.fire({
                        title: "You made it onto the highscore",
                        text: "Name",
                        input: 'text',
                        showCancelButton: true,
                        background: "#000000",
                    }).then((result) => {
                        // insert and pop last element
                        highScores.insert(p, [result.value, score])
                        highScores.pop()
                    });
                    break
                }

            }
            // reset game
            clearSnake()
            lost = 0
            gameBox.innerHTML = '' // makes sure that previous html is cleared.
        }
        return
    }

    // update the game
    window.requestAnimationFrame(game)
    const timeSinceLastRender = (currentTime - latestRender) / 1000
    if (timeSinceLastRender < 1 / snakeMovement) return // makes the game go faster and slower based on snake speed
    latestRender = currentTime
    updateGame()
    drawGame()
}

// function to update the game
function updateGame() {
    updateSnake()
    updateApple()
    death()
}

// function to draw game
function drawGame() {
    gameBox.innerHTML = '' // makes sure that previous html is cleared.
    drawSnake(gameBox)
    drawApple(gameBox)
}

// function that checks if you died.
function death() {
    lost = outOfBounds(getHead()) || intersection()
}

// checks if snake is out of bounds.
function outOfBounds(position) {
    return (position.x < 1 || position.x > 41 || position.y < 1 || position.y > 41)
}

// fix info button information
let infoBtn = document.getElementById("info-button"); // get information about the game.
infoBtn.addEventListener('click', event => {
    Swal.fire({
        title: 'Snake 2022 Info',
        text: "Snake 2022 is a fun game."
            + " The rules are simple: eat red dots, the dots make you longer. "
            + " The longer you get, the higher your score, but the harder you are to control. "
            + " If you crash into yourself or go outofbounds, it's game over. "
            + " Move with arrow keys or the buttons  ",
        imageUrl: "/images/snake.jpg",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: "#000000",
    })
});

// start game
let startBtn = document.getElementById("start-button"); //Start the game when you press start.
startBtn.addEventListener('click', event => {
    window.requestAnimationFrame(game) // call game functions
});

// show highscores
let highScoreBtn = document.getElementById("highScore-button");
highScoreBtn.addEventListener('click', event => {
    highScores = getHighScores()
    swal.fire({
        html: `<table id="table" border=1>
                <thead>
                    <tr>
                        <th>Place</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>,
                        <td>"1"</td>
                        <td>"${highScores[0][0]}"</td>
                        <td>"${highScores[0][1]}"</td>
                    </tr>
                    <tr>,
                        <td>"2"</td>
                        <td>"${highScores[1][0]}"</td>
                        <td>${highScores[1][1]}</td>
                    </tr>
                    <tr>,
                        <td>"3"</td>
                        <td>"${highScores[2][0]}"</td>
                        <td>${highScores[2][1]}</td>
                    </tr>
                    <tr>,
                        <td>"4"</td>
                        <td>"${highScores[3][0]}"</td>
                        <td>${highScores[3][1]}</td>
                    </tr>
                    <tr>,
                        <td>"5"</td>
                        <td>"${highScores[4][0]}"</td>
                        <td>${highScores[4][1]}</td>
                    </tr>
                </tbody>
                </table>`,
        background: "#000000",
    })
});

// function to insert highscore into array
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};



