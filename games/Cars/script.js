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
function update() {
    roadImage.update()
}
function draw() {
    roadImage.init()
    roadImage.draw()
}
function animation() {
    draw()
    update()
    frame++
    requestAnimationFrame(animation);
}
animation();
