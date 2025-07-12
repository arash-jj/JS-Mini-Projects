const output = document.querySelector("h1 span")
const words = ['Love','Hard as Hell','Enjoyable',"Everything"]
let wordIdx = 0
let charIdx = 0
let isDeleting = false

const typeHandler = () => {
    const currentWord = words[wordIdx]
    const currentCharacter = currentWord.substring(0, charIdx)
    output.textContent = currentCharacter
    output.classList.add("stopBlinking")
    if (!isDeleting && charIdx < currentWord.length) {
        charIdx++
        setTimeout(typeHandler, 200)
    } else if(isDeleting && charIdx > 0){
        charIdx--
        setTimeout(typeHandler, 100)
    }else{
        isDeleting = !isDeleting
        output.classList.remove("stopBlinking")
        wordIdx = !isDeleting ? (wordIdx + 1 ) % words.length : wordIdx
        setTimeout(typeHandler, 1200)
    }
}

typeHandler()