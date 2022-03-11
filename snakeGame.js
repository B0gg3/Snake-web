// get all the necessary functions
import {snakeMovement, updateSnake,drawSnake,getHead,intersection,getScore,clearSnake} from "./snakePython.js"
import {updateApple, drawApple} from "./snakeApple.js"

let latestRender = 0
let lost = 0
let highScores = []
const gameBox = document.getElementById('game-box') // get the gamebox

function game(currentTime){
    if(lost){ // simple function to get an alert if lost condition is met.
        if(confirm('Congratiulation your score is ' + getScore())){
            clearSnake()
            lost = 0
            gameBox.innerHTML = '' // makes sure that previous html is cleared.
        }
        return    
    }

    // update the game
    window.requestAnimationFrame(game)
    const timeSinceLastRender = (currentTime - latestRender) /1000
    if (timeSinceLastRender < 1 / snakeMovement) return // makes the game go faster and slower based on snake speed
    latestRender = currentTime
    updateGame()
    drawGame()
}

// function to update the game
function updateGame(){
    updateSnake()
    updateApple()
    death()
}

// function to draw game
function drawGame(){
    gameBox.innerHTML = '' // makes sure that previous html is cleared.
    drawSnake(gameBox)
    drawApple(gameBox)
}

 // function that checks if you died.
function death(){
    lost = outOfBounds(getHead()) || intersection()
}

// checks if snake is out of bounds.
function outOfBounds(position){
    return(position.x < 1 || position.x > 41 || position.y < 1 || position.y > 41)
}

let infoBtn = document.getElementById("info-button"); // get information about the game.
infoBtn.addEventListener('click', event => {
    Swal.fire({
        title: 'Snake 2022 Info',
        text: "Snake 2022 is a fun game."
        +" The rules are simple: eat red dots, the dots make you longer. "
        +" The longer you get, the higher your score, but the harder you are to control. "
        +" If you crash into yourself or go outofbounds, it's game over. " 
        +" Move with arrow keys or the buttons  ",
        imageUrl: "/images/snake.jpg",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        background: "#000000",
      })
});

let startBtn = document.getElementById("start-button"); //Start the game when you press start.
startBtn.addEventListener('click', event => {
    window.requestAnimationFrame(game) // call game functions
});

let highScoreBtn = document.getElementById("highScore-button");
highScoreBtn.addEventListener('click', event => {
});


