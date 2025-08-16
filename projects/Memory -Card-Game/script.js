const cardsContainer = document.querySelector('.cards')
const points = document.querySelector("#points")
const refreshBtn = document.querySelector("#refreshBtn")
const images = ["💐","🌹","🌻","🏵️","🌺","🌴","🌈","🍓","🍒","🍎","🍉","🍊","🥭","🍍","🍋","🍏","🍐","🥝","🍇","🥥","🍅","🌶️","🍄","🧅","🥦","🥑","🍔","🍕","🧁","🎂","🍬","🍩","🍫","🎈"];
let disableDeck = false
let cardOne, cardTwo
let matched = 0

// get random amount of the array
const randomNumGenerator = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}
const randomNum = randomNumGenerator(1, 26)
const selectedImages = images.slice(randomNum, randomNum + 8)

// click handler
const clickHandler = ({target : clickedCard}) => {
    if (!disableDeck) {
        clickedCard.classList.add('flip')
        if (!cardOne) return cardOne = clickedCard
        cardTwo = clickedCard
        disableDeck = true
        let cardOneValue = cardOne.children[0].textContent
        let cardTwoValue = cardTwo.children[0].textContent
        checker(cardOneValue, cardTwoValue)
    }
}

// match checker
const checker = (value1, value2) => {
    if (value1 == value2) {
        matched++
        points.textContent = matched
        if (matched == 8) {
            setTimeout(() => {
                return cardGenerator
            }, 1000);
        }
        cardOne.removeEventListener("click", clickHandler)
        cardTwo.removeEventListener("click", clickHandler)
        cardOne = cardTwo = ""
        return disableDeck = false
    }else {
        setTimeout(() => {
            cardOne.classList.add('shakeAnimation')
            cardTwo.classList.add('shakeAnimation')
        }, 400);
        setTimeout(() => {
            cardOne.classList.remove('shakeAnimation', 'flip')
            cardTwo.classList.remove('shakeAnimation', 'flip')
            cardOne = cardTwo = ""
            disableDeck = false
        }, 1200);
    }
    
}

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

refreshBtn.addEventListener("click", ()=>{
    cardGenerator()
    matched = 0
    points.textContent  = 0
})

document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('click', clickHandler)
})