const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let frame = 0;
let state = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2,
}
let degree = Math.PI/180

// State handler
function clickHandler() {
    switch (state.current) {
        case state.getReady:
            state.current = state.game
        break;
        case state.game:
            bird.flap()
        break;
        default:
            bird.speed = 0
            bird.rotation = 0
        state.current = state.getReady
        break;
    }
}

// Event listeners
document.addEventListener("click", clickHandler)
document.addEventListener("keydown", (e) => {
    if(e.which == 32) clickHandler() // Space key
})

// Load assets
const background = new Image();
background.src = "../../assets/FlappyBird/images/background-day.png";

const ground = new Image();
ground.src = "../../assets/FlappyBird/images/base.png";

const messages = new Image()
messages.src = "../../assets/FlappyBird/images/message.png"

const gameover = new Image();
gameover.src = "../../assets/FlappyBird/images/gameover.png";

// Bird animation
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
    draw: function() {
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
    draw: function() {
        ctx.drawImage(ground, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
};

// Bird
const bird = {
    animation: birdImages,
    w: 34, h: 24,
    x: 50, y: 150,
    speed: 0,
    gravity: 0.25,
    jump: 4.6,
    rotation: 0,
    animationIndex: 0,
    draw: function() {
        const currentFrame = this.animation[this.animationIndex];
        ctx.save();
        ctx.translate(this.x + this.w/2, this.y + this.h/2);
        ctx.rotate(this.rotation);
        ctx.drawImage(
            currentFrame,
            -this.w/2, -this.h/2, 
            this.w, this.h
        );
        ctx.restore();
    },
    update: function() {
        let period = state.current == state.getReady ? 10 : 5;
        if (frame % period === 0) {
            this.animationIndex = (this.animationIndex + 1) % this.animation.length;
        }
        if (state.current == state.getReady) {
            this.y = 150;
        } else {
            this.speed += this.gravity;
            this.y += this.speed;
            
            if (this.speed < this.jump) {
                this.rotation = - 10 * degree;
            } else {
                this.rotation = Math.min(90 * degree, this.rotation + 5 * degree);
            }
        }
        if (this.y + this.h >= canvas.height - base.h) {
            this.y = canvas.height - base.h - this.h;
            this.animationIndex = 1
            if (state.current == state.game) {
                state.current = state.over;
                this.rotation = 90 * degree;
            }
        }
    },
    flap: function() {
        this.speed = -this.jump;
    }
};

// game states
const getReady = {
    sX: 0, sY: 50,
    w: 184, h: 267,
    x: canvas.width/2 - 184/2,
    y: 50,
    draw: function() {
        if (state.current == state.getReady) 
            ctx.drawImage(messages, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
};

const gameOver = {
    sX: 0, sY: 0,
    w: 192, h: 44,
    x: canvas.width/2 - 192/2,
    y: 100,
    draw: function() {
        if(state.current == state.over)
            ctx.drawImage(gameover, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
};

function update() {
    bird.update();
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