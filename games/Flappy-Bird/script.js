const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let frame = 0;
let state = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2,
}
// stateHandler
function clickHandler() {
    switch (state.current) {
        case state.getReady:
            state.current = state.game

        break;
        case state.game:
            bird.flap()
        break;
        default:
        state.current = state.getReady
        break;
    }
}
// eventHandler
document.addEventListener("click",clickHandler)
document.addEventListener("keydown",(e)=>{
    //32 = spaceKey on keyboard
    if(e.which == 32 ) clickHandler()
    
})

// Load images
const background = new Image();
background.src = "../../assets/FlappyBird/images/background-day.png";

const ground = new Image();
ground.src = "../../assets/FlappyBird/images/base.png";

// messages
const messages = new Image()
messages.src = "../../assets/FlappyBird/images/message.png"

const gameover = new Image();
gameover.src = "../../assets/FlappyBird/images/gameover.png";

// Bird animation frames
const yellowBirdFrames = [
    "../../assets/FlappyBird/images/yellowbird-upflap.png",
    "../../assets/FlappyBird/images/yellowbird-midflap.png",
    "../../assets/FlappyBird/images/yellowbird-downflap.png",
    "../../assets/FlappyBird/images/yellowbird-midflap.png",
];
const birdImages = yellowBirdFrames.map(src => {
    const img = new Image();
    img.src = src;
    return img;
});

// Background
const bg = {
    sX: 0, sY: 0,
    w: 288, h: 512,
    x: 0,
    y: canvas.height - 512,
    draw: function () {
        ctx.drawImage(background, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(background, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }
};

// Ground
const base = {
    sX: 0, sY: 0,
    w: 336, h: 112,
    x: 0,
    y: canvas.height - 112,
    draw: function () {
        ctx.drawImage(ground, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
};

// Bird
const bird = {
    animation: birdImages,
    w: 34, h: 24,
    x: 50, y: 150,
    animationIndex: 0,
    draw: function () {
        const currentFrame = this.animation[this.animationIndex];
        ctx.drawImage(currentFrame, this.x, this.y, this.w, this.h);
    },
    flap : function () {
        
    }
};

// game State
const getReady = {
    sX: 0, sY: 50,
    w: 184, h: 267,
    x: canvas.width/2 -184/2,
    y: 50,
    draw: function () {
        if (state.current == state.getReady) 
            ctx.drawImage(messages, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
}
const gameOver = {
    sX: 0, sY: 0,
    w: 192, h: 44,
    x: canvas.width/2 -192/2,
    y: 100,
    draw: function () {
        if(state.current == state.over)
            ctx.drawImage(gameover, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
}
function update() {
    // if (frame % 10 === 0) {
    //     bird.animationIndex = (bird.animationIndex + 1) % bird.animation.length;
    // }
}

function draw() {
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    bg.draw();
    base.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
}

function animate() {
    update();
    draw();
    frame++;
    requestAnimationFrame(animate);
}

animate();
