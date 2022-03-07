let direction = {x: 0, y: 0} // place holder for the direction
let lastestInput = {x: 0, y: 0} // place holder for the previous direction

// This is a simple function to get input for the game
window.addEventListener("keydown", keyboardInput =>{
    switch(keyboardInput.key){
        case 'ArrowUp':
            if (lastestInput.y != 0) break // Make sure the snake can not go same direction or opposite
            direction = {x:0, y :-1} // makes the snake go up
            break
        case 'ArrowDown':
            if (lastestInput.y != 0) break // Make sure the snake can not go same direction or opposite
            direction = {x:0, y :1} // makes the snake go down
            break
        case 'ArrowLeft':
            if (lastestInput.x != 0) break // Make sure the snake can not go same direction or opposite
            direction = {x:-1, y :0} // makes the snake go left
            break
        case 'ArrowRight':
            if (lastestInput.x != 0) break // Make sure the snake can not go same direction or opposite
            direction = {x:1, y :0} // makes the snake go right
            break
    }
})

export function getDirection(){ // function to return the new direction
    lastestInput = direction // keeps the direction so we can check make the checks in the eventlistener
    return direction // returns the direction
}