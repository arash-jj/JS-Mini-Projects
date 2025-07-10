const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");
cvs.width  = 500;  
cvs.height = 600;
let frame = 0
let state = {
    currentState : 0,
    readyToStart : 0,
    inGame : 1,
    GameOver : 2
}
const laneCenters = [
    cvs.width * 0.25,
    cvs.width * 0.50,
    cvs.width * 0.75
];
// Events
window.addEventListener("keydown",changeCarDirection)
// Loading Assets
const road = new Image();
road.src = "../../assets/Cars/road.png";
const roadImage = {
    imgW: 0,
    imgH: 0,
    scale: 1,
    w: 0,
    h: 0,
    x: 0,
    y: 0,
    offsetY:0,
    dy:2,
    init() {
        this.imgW = road.width;
        this.imgH = road.height;
        this.scale = Math.min(cvs.width / this.imgW, cvs.height / this.imgH);
        this.w = this.imgW * this.scale;
        this.h = this.imgH * this.scale;
    },
    update : function() {
        this.offsetY = (this.offsetY - this.dy + this.h) % this.h;
    },
    draw() {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        const rows = Math.ceil(cvs.height / this.h) + 1;
        for (let row = 0; row < rows; row++) {
            const y = -this.offsetY + row * this.h
            ctx.drawImage(road ,0, 0, this.imgW, this.imgH, 0, y, this.w, this.h);
        }
    }
};
const spriteSheet = new Image()
spriteSheet.src = "../../assets/Cars/game_elements.png"
const sprites = [
    { id:  1, x: 474, y:   0, width: 120, height: 256, dx: 474, dy:   0, dw: 120, dh: 256 }, // red short truck
    { id:  2, x: 601, y:   0, width: 119, height: 256, dx: 601, dy:   0, dw: 119, dh: 256 }, // green short truck
    { id:  3, x: 764, y:   0, width: 119, height: 419, dx: 764, dy:   0, dw: 119, dh: 419 }, // blue long truck
    { id:  4, x: 905, y:   0, width: 119, height: 419, dx: 905, dy:   0, dw: 119, dh: 419 }, // green long truck
    { id:  5, x:   0, y: 228, width: 108, height: 206, dx:   0, dy: 228, dw: 108, dh: 206 }, // green car
    { id:  6, x: 120, y: 228, width: 109, height: 206, dx: 120, dy: 228, dw: 109, dh: 206 }, // orange car
    { id:  7, x: 240, y: 228, width: 108, height: 206, dx: 240, dy: 228, dw: 108, dh: 206 }, // red car
    { id:  8, x: 358, y: 228, width: 108, height: 206, dx: 358, dy: 228, dw: 108, dh: 206 }, // gray car
    { id:  9, x: 480, y: 261, width: 108, height: 206, dx: 480, dy: 261, dw: 108, dh: 206 }, // police car
    { id: 10, x: 240, y: 448, width: 108, height: 202, dx: 196, dy: 500, dw: 108, dh: 202 }, // main car
]
const mainCar = {
    car: sprites[9],
    draw : function () {
        ctx.drawImage(spriteSheet, this.car.x, this.car.y, this.car.width, this.car.height, this.car.dx, this.car.dy, this.car.dw, this.car.dh)
    },
    update : function () {
        if (this.car.dx == 6 || this.car.dx == 386 || this.car.dy == 0) {
            state.currentState = state.GameOver
        }
    }
}
function changeCarDirection(e){
    // w = 87 , d = 68, s = 83, a = 65, space = 32, enter = 13, r = 82, 
    const car = sprites[9];
    const keyPressed = e.keyCode;
    let speed = 10;
    if (state.currentState === state.readyToStart) {
        if (keyPressed === 13 || keyPressed === 32) {
            state.currentState = state.inGame;
        }
    }else if (state.currentState === state.inGame) {
        if (keyPressed === 87) {
            car.dy = car.dy-speed
        }else if(keyPressed === 83) {
            car.dy = car.dy+speed
        }else if(keyPressed === 65) {
            car.dx = car.dx-speed
        }else if(keyPressed === 68) {
            car.dx = car.dx+speed
        }
    }else if(state.currentState === state.GameOver){
        if (keyPressed === 82) resetGame();
    }
}
function overlaps(a, b) {
    return !(
        a.x + a.width  < b.x ||
        b.x + b.width  < a.x ||
        a.y + a.height < b.y ||
        b.y + b.height < a.y
    );
}
function canSpawnAt(candidate) {
    return obstacles.list.every(existing =>
        !overlaps(
            { x: candidate.dx, y: candidate.dy, width: candidate.dw, height: candidate.dh },
            { x: existing.dx, y: existing.dy, width: existing.dw, height: existing.dh }
        )
    );
}
const obstacles = {
    list: [],
    spawnInterval: 120,
    maxTries: 5,
    update() {
        if (frame % this.spawnInterval === 0) {
            this.spawn();
        }
        this.list.forEach(o => o.dy += roadImage.dy);
        this.list = this.list.filter(o => o.dy < cvs.height);
        const mc = mainCar.car;
        const mainRect = {
            x: mc.dx, y: mc.dy,
            width: mc.dw, height: mc.dh
        };
        for (let o of this.list) {
            const obsRect = { x: o.dx, y: o.dy, width: o.dw, height: o.dh };
            if (overlaps(mainRect, obsRect)) {
                state.currentState = state.GameOver;
                break;
            }
        }
    },
    draw() {
        this.list.forEach(o => {
            ctx.drawImage(
            spriteSheet,
            o.x, o.y, o.width, o.height,
            o.dx, o.dy, o.dw, o.dh
            );
        });
        
    },
    spawn() {
        let tries = 0;
        while (tries < this.maxTries) {
            tries++;
            const pool = sprites.filter(s => s.id !== 10);
            const s = pool[Math.floor(Math.random() * pool.length)];
            const cx = laneCenters[Math.floor(Math.random() * laneCenters.length)];
            const candidate = {
                x: s.x,
                y: s.y,
                width: s.width,
                height: s.height,
                dx: cx - s.width/2,
                dy: -s.height,
                dw: s.width,
                dh: s.height
            };
            if (canSpawnAt(candidate)) {
                this.list.push(candidate);
                return;
            }
        }
    }
};
function resetGame() {
    mainCar.car.dx = 196;
    mainCar.car.dy = 500;
    obstacles.list = [];
    frame = 0;
    state.currentState = state.readyToStart;
}
function drawReadyScreen() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = "black";
    ctx.font = "24px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("PRESS ENTER OR SPACE TO START", cvs.width/2, cvs.height/2);
}
function drawGameOverScreen() {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = "white";
    ctx.font = "40px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", cvs.width/2, cvs.height/2 - 20);
    ctx.font = "20px sans-serif";
    ctx.fillText("PRESS R TO RESTART", cvs.width/2, cvs.height/2 + 20);
}
function update() {
    roadImage.update()
    obstacles.update();
    mainCar.update()
}
function draw() {
    roadImage.init()
    roadImage.draw()
    mainCar.draw()
    obstacles.draw();
}
function animation() {
    switch(state.currentState) {
        case state.readyToStart:
            drawReadyScreen();
            break;
        case state.inGame:
            update();
            draw();
            break;
        case state.GameOver:
            draw();
            drawGameOverScreen();
        break;
    }
    frame++
    requestAnimationFrame(animation);
}
road.onload = () => {
    roadImage.init();
    animation();
};
