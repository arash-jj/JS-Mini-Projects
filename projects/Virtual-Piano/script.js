const pianoKeys = document.querySelectorAll(".key")
const volumeInp = document.querySelector("#volume")
const showKeysInp = document.querySelector("#toggleKeys")
let allKeys = []
let audio = new Audio(`../../assets/Piano/tunes/a.wav`)

const playTune = (k)=>{
    audio.src = `../../assets/Piano/tunes/${k}.wav`
    audio.play()
    const clickedKey = document.querySelector(`[data-key="${k}"]`)
    clickedKey.classList.add("active")
    setTimeout(() => {
        clickedKey.classList.remove("active")
    }, 150);
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key)
    key.addEventListener("click", () => playTune(key.dataset.key))
})

const valueHandler = (e) => {
    audio.volume = e.target.value
}

const toggleKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"))
}

const pressedKey = (e) => {
    if(allKeys.includes(e.key)) playTune(e.key)
}

showKeysInp.addEventListener("click", toggleKeys)
volumeInp.addEventListener("input", valueHandler)
document.addEventListener("keydown", pressedKey)