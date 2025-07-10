const input = document.querySelector('input')
const button = document.querySelector('#checkBtn')
let infoTxt = document.querySelector('.resultTxt')
let filteredTxt
// button clicking handler
button.addEventListener('click',()=>{
    
    let reversTxt = filteredTxt.split("").reverse().join("")
    infoTxt.style.display = "block"
    if(filteredTxt != reversTxt)
        return infoTxt.innerHTML = `No, <span class="inputValue">${input.value}</span> is not palindrome!`
    infoTxt.innerHTML = `Yes, <span class="inputValue">${input.value}</span> is palindrome!`
})
// keyup handler
input.addEventListener("keyup",()=>{
    filteredTxt = input.value.toLocaleLowerCase().replace(/[^A-Z0-]/ig,"")
})