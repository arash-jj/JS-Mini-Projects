const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
const restartBtn = document.querySelector("#restartBtn"); 
const canvasWidth = cvs.width;
const canvasHeight= cvs.height;
const cvsBg = "#2b2b2b";
const snakeColor = "#00ff00";
const snakeBorderColor = "#000000";
const cherryColor = "#ff0000";
const unitSize = 20;
let inGame = false;
let X = unitSize;
let Y = 0;
let foodX;
let foodY;
let score = document.querySelector("#score");
let scoreValue = 0;
let snake = [
    {x:unitSize * 4,y:0},
    {x:unitSize * 3,y:0},
    {x:unitSize * 2,y:0},
    {x:unitSize * 1,y:0},
    {x:0,y:0}
]

window.addEventListener("keydown",changeDirection);
restartBtn.addEventListener("click",restart);

gameStart();
function gameStart() {
    inGame = true;
    score.textContent = scoreValue;
    createFood();
    drawFood();
    nextTick(); 
}
function nextTick() {
    if (inGame) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick()
        }, 1000 / 10);
    } else {
        displayGameOver()
    }
}
function clearBoard() {
    ctx.fillStyle = cvsBg;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}
function createFood() {
    function randomFoodPosition(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum
    }
    foodX = randomFoodPosition(0, canvasWidth - unitSize)
    foodY = randomFoodPosition(0, canvasWidth - unitSize)
}
function drawFood() {
    ctx.fillStyle = cherryColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}
function moveSnake() {
    const head = {x: snake[0].x + X, y: snake[0].y + Y};
    snake.unshift(head);
    if (snake[0].x == foodX && snake[0].y == foodY) {
        scoreValue++;
        score.textContent = scoreValue;
        createFood();
        drawFood();
    }else{
        snake.pop();
    }
}
function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorderColor;
    snake.forEach((snakePart) => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
}
function changeDirection(e) {
    const keyPressed = e.keyCode;
    if (keyPressed === 37 && X !== unitSize) {
        X = -unitSize;
        Y = 0;
    } else if (keyPressed === 38 && Y !== unitSize) {
        X = 0;
        Y = -unitSize;
    } else if (keyPressed === 39 && X !== -unitSize) {
        X = unitSize;
        Y = 0;
    } else if (keyPressed === 40 && Y !== -unitSize) {
        X = 0;
        Y = unitSize;
    }

}
function checkGameOver() {
    if (snake[0].x < 0 || snake[0].x >= canvasWidth || snake[0].y < 0 || snake[0].y >= canvasHeight) {
        inGame = false;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            inGame = false;
        }
    }
}
function displayGameOver() {
    ctx.font = "50px Comic Sans MS";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvasWidth / 2, canvasHeight / 2);
    inGame = false;
}
function restart() {
    scoreValue = 0;
    X = unitSize;
    Y = 0;
    snake = [
        {x:unitSize * 4,y:0},
        {x:unitSize * 3,y:0},
        {x:unitSize * 2,y:0},
        {x:unitSize * 1,y:0},
        {x:0,y:0}
    ]
    gameStart();
}



