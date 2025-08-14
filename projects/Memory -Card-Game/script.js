// images array
const images = ["💐","🌹","🌻","🏵️","🌺","🌴","🌈","🍓","🍒","🍎","🍉","🍊","🥭","🍍","🍋","🍏","🍐","🥝","🍇","🥥","🍅","🌶️","🍄","🧅","🥦","🥑","🍔","🍕","🧁","🎂","🍬","🍩","🍫","🎈"];

// get random amount of the array
const randomNumGenerator = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}
let randomNum = randomNumGenerator(1, 26)
const selectedImages = images.slice(randomNum, randomNum + 8)

