const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");
cvs.width  = 500;  
cvs.height = 600;
let frame = 0
let state = {
    currentState : 1,
    readyToStart : 0,
    inGame : 1,
    GameOver : 2
}
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
    { id: 11, x: 660, y: 466, width:  81, height:  81, dx: 660, dy: 466, dw:  81, dh:  81 }, // hole
]
const mainCar = {
    car: sprites[9],
    draw : function () {
        ctx.drawImage(spriteSheet, this.car.x, this.car.y, this.car.width, this.car.height, this.car.dx, this.car.dy, this.car.dw, this.car.dh)
    }
}
function changeCarDirection(e){
    // w = 87 , d = 68, s = 83, a= 65,
    const keyPressed = e.keyCode;
    let speed = 10;
    const car = sprites[9];
    if (keyPressed === 87) {
        car.dy = car.dy-speed
    }else if(keyPressed === 83) {
        car.dy = car.dy+speed
    }else if(keyPressed === 65) {
        car.dx = car.dx-speed
    }else if(keyPressed === 68) {
        car.dx = car.dx+speed
    }
}
function update() {
    roadImage.update()
}
function draw() {
    roadImage.init()
    roadImage.draw()
    mainCar.draw()
}
function animation() {
    draw()
    update()
    frame++
    requestAnimationFrame(animation);
}
animation();
