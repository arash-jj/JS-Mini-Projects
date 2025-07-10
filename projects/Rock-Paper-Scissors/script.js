const elements = document.querySelectorAll(".elements")
const statusTextPlayer = document.getElementById("statusTextPlayer")
const statusTextComputer = document.getElementById("statusTextComputer")
const statusTextDraw = document.getElementById("statusTextDraw")
const playerMove = document.getElementById("playerMove")
const computerMove = document.getElementById("computerMove")
let playerScore = 0;
let computeScore = 0;
let draw = 0;
let playerAction;
let computerNum;
let computerAction;
elements.forEach((element)=> {
    element.addEventListener("click",()=>{
        playerAction = element.dataset.action
        playerMove.textContent = playerAction
        computerNum = generateNum(1,4)
        computerAction = checkComputerAction()
        computerMove.textContent = computerAction
        if (
            (playerAction == "paper" && computerAction == "Scissor" ) ||
            (playerAction == "Scissor" && computerAction == "rock" ) ||
            (playerAction == "rock" && computerAction == "paper" )
        ) {
            computeScore++
            statusTextComputer.textContent = computeScore
        } else if (playerAction == computerAction) {
            draw++
            statusTextDraw.textContent = draw
        }else {
            playerScore++
            statusTextPlayer.textContent = playerScore
        }
    })
})
function generateNum(max,min) {
    return Math.floor(Math.random() * (max-min) + min)
}
function checkComputerAction()  {
    if (computerNum == 1) {
        return "Scissor"
    }else if (computerNum == 2) {
        return "paper"
    }else {
        return "rock"
    }
}

