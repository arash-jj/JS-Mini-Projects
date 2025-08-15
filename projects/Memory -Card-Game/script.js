const cardsContainer = document.querySelector('.cards')
const cards = document.querySelectorAll('.card')
const images = ["💐","🌹","🌻","🏵️","🌺","🌴","🌈","🍓","🍒","🍎","🍉","🍊","🥭","🍍","🍋","🍏","🍐","🥝","🍇","🥥","🍅","🌶️","🍄","🧅","🥦","🥑","🍔","🍕","🧁","🎂","🍬","🍩","🍫","🎈"];

// get random amount of the array
const randomNumGenerator = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}
const randomNum = randomNumGenerator(1, 26)
const selectedImages = images.slice(randomNum, randomNum + 8)

// putting the images in the UI
const cardGenerator = () => {
    let cards = ''
    selectedImages.map(image => {
        cards += `
        <div class="card">
            <div class="back">${image}</div>
            <div class="front">?</div>
        </div>
        `
    })
    cardsContainer.innerHTML = cards
    const shuffled = selectedImages.toSorted(() => Math.random() - 0.5);
    let shuffledCard = ''
    shuffled.map(image => {
        shuffledCard += `
        <div class="card">
            <div class="back">${image}</div>
            <div class="front">?</div>
        </div>
        `
    })
    cardsContainer.innerHTML += shuffledCard
}
cardGenerator()

// ! test
document.querySelectorAll(".card").forEach(elem=>{
    elem.addEventListener("click",()=>{
        elem.classList.add("flip")
        console.log(flippedCards);
        
    })
})
