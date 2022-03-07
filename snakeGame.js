// get all the necessary functions
import {snakeMovement, updateSnake,drawSnake,getHead,intersection} from "./snakePython.js"
import {updateApple, drawApple} from "./snakeApple.js"

let latestRender = 0
let lost = 0
const gameBox = document.getElementById('game-box') // get the gamebox

function game(currentTime){

    if(lost){ // simple function to get an alert if lost condition is met.
        if(confirm('you lost, press Ok to restart')){
            window.location = '/'
        }
        return
        
    }


    // update the game
    window.requestAnimationFrame(game)
    const timeSinceLastRender = (currentTime - latestRender) /1000

    if (timeSinceLastRender < 1 / snakeMovement) return
    console.log("Update")
    latestRender = currentTime

    updateGame()

    drawGame()
}

window.requestAnimationFrame(game)

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


function death(){
    lost = outOfBounds(getHead()) || intersection()
}

function outOfBounds(position){
    return(position.x < 1 || position.x > 21 || position.y < 1 || position.y > 21)

}