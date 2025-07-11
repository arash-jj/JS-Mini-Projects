const gradientBox = document.querySelector(".gradientBox")
const directionSelector = document.querySelector("#direction-selector")
const colors = document.querySelectorAll("input[type='color']")
const output = document.querySelector("textarea")
const refreshBtn = document.querySelector(".refresh")
const copyBtn = document.querySelector(".copy")
// random color generator
function randomColor() {
    const randomHex = Math.floor(Math.random() * 0xffffff).toString(16)
    return `#${randomHex}`
}
// gradient generator logic
function gradientGenerator(isRandom) {
    if(isRandom){
        colors[0].value = randomColor()
        colors[1].value = randomColor()
    }
    const result = `linear-gradient(${directionSelector.value}, ${colors[0].value}, ${colors[1].value})`
    gradientBox.style.background = result
    output.value = `background: ${result};`
}
// copy button handler
function copyHandler() {
    navigator.clipboard.writeText(output.value)
    copyBtn.innerText = "Code Copied";
    setTimeout(() => {
        copyBtn.innerText = "Copy Code"
    }, 1600);
}
// calling gradient generator on each color input 
colors.forEach(color =>{
    color.addEventListener('input',() => gradientGenerator(false))
})
// other elements handler
directionSelector.addEventListener('change', () => gradientGenerator(false))
refreshBtn.addEventListener('click', () => gradientGenerator(true))
copyBtn.addEventListener('click', copyHandler)