const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const gameContainer = document.getElementById("game");
const startButton = document.getElementById("startGame");
gameContainer.appendChild(canvas);
canvas.width = 400;
canvas.height = 400;

tileSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = { x: tileSize, y: 0 };
let food = { x: 100, y: 100 };
let gameRunning = false;

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -tileSize };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: tileSize };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -tileSize, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: tileSize, y: 0 };
            break;
    }
});

function update() {
    if (!gameRunning) return;
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    
    if (newHead.x < 0 || newHead.y < 0 || newHead.x >= canvas.width || newHead.y >= canvas.height || 
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        gameRunning = false;
        alert("Game Over!");
        return;
    }

    snake.unshift(newHead);
    
    if (newHead.x === food.x && newHead.y === food.y) {
        food = { 
            x: Math.floor(Math.random() * (canvas.width / tileSize)) * tileSize,
            y: Math.floor(Math.random() * (canvas.height / tileSize)) * tileSize
        };
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, tileSize, tileSize);

    ctx.fillStyle = "lime";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, tileSize, tileSize));
}

function gameLoop() {
    if (!gameRunning) return;
    update();
    draw();
    setTimeout(gameLoop, 100);
}

startButton.addEventListener("click", () => {
    if (!gameRunning) {
        snake = [{ x: 200, y: 200 }];
        direction = { x: tileSize, y: 0 };
        gameRunning = true;
        gameLoop();
    }
});
