// import functions
import { getDirection } from "./inputs.js"

export let snakeMovement = 5
const body = [{x:11,y:11}]
let newPiece = 0
let score = 0

export function updateSnake(){
    addPieceses()
    const direction =  getDirection()
     for (let movement = body.length - 2; movement >= 0; movement--){
         body[movement+1] = { ...body[movement] }
     }
    body[0].x += direction.x
    body[0].y += direction.y
}

export function drawSnake(gameBox){ // draw the snake
    body.forEach(piece => {

        const elementSnake = document.createElement('div')
        elementSnake.style.gridRowStart = piece.y
        elementSnake.style.gridColumnStart = piece.x

        elementSnake.classList.add('snake')
        gameBox.appendChild(elementSnake)
    })
}

export function addToSnake(size){ // add to snake size
    newPiece += size
}

export function snakeEat(position,{ignoreHead = false} = {}){  // check if snake ate the piece.
    return body.some((piece,index) => {
        if(ignoreHead && index === 0){ // ignore the head of the snake to check for intersection.
            return false
        }    
        return samePosition(piece,position) // return if apple and snake is right.
    })
}

function samePosition(value1,value2) { // check if position is same
    if (value1.x === value2.x && value1.y === value2.y){
        snakeSpeedIncrease()
        score +=1
    }
    return value1.x === value2.x && value1.y === value2.y
}

function addPieceses(){ // add piece to python aka snake
    for(let pieces = 0; pieces < newPiece; pieces++){
        body[body.length] = { ...body[body.length -1] }
    }
    newPiece = 0

}

export function getHead(){ // get head of snake, it is the first element of the array.
    return body[0]
}

export function intersection(){ // checks if the snake head ate any part of itself
    return snakeEat(body[0], {ignoreHead : true})
}

function snakeSpeedIncrease(){
    snakeMovement+=1
}

export function getScore(){
    return score
}
