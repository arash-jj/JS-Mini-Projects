const output = document.querySelector(".output")
const buttons = document.querySelectorAll(".button")

const calculate = (bv)=>{
    switch (bv) {
        case "=":
            output.value = eval(output.value)
            break;   
        case "AC":
            output.value = ""
            break;   
        case "DEL":
            output.value = output.value.slice(0, -1)
            break;   
        default:
            output.value += bv
    }
}
buttons.forEach(button=>{
    button.addEventListener("click", (e) => {calculate(e.target.dataset.value)})
})