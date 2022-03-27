import { snakeEat, addToSnake } from './snakePython.js' // import necessary functions

let apple = randomizeApplePosition()
const SNAKE_GROWTH = 1

export function updateApple() { // function to update apple position
    if (snakeEat(apple)) { // if the snake eats the apple add a piece to the snake.
        addToSnake(SNAKE_GROWTH)
        apple = randomizeApplePosition() // randomize the apple position
    }
}

export function drawApple(gameBox) { // simple function to draw "put the apple" on the grid.
    const elementApple = document.createElement('div')
    elementApple.style.gridRowStart = apple.y
    elementApple.style.gridColumnStart = apple.x
    elementApple.classList.add('apple')
    gameBox.appendChild(elementApple)

}

function randomizeApplePosition() { // randomize apple position
    let newApplePosition
    while (newApplePosition == null || snakeEat(newApplePosition)) { // make sure the apple is not where the snake is
        newApplePosition = { x: Math.floor(Math.random() * 41), y: Math.floor(Math.random() * 41) }
        if (newApplePosition.x < 1) { // if else fixes bug where apple could not be picked up. Since it was outside the grid
            newApplePosition.x = 1
        } else if (newApplePosition.y < 1) {
            newApplePosition.y = 1
        }
    }

    return newApplePosition // return the cordinates for the apple
}