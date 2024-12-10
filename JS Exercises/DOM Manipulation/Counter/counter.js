document.getElementById("decrement").addEventListener("click", (e) => {
    const resultElem = document.getElementById("result");
    resultElem.innerText =  parseInt(resultElem.innerText) - 1;
    if(parseInt(resultElem.innerText) == 0){
        e.target.disabled = true;
        document.getElementById("reset").disabled = true;
    }
});
document.getElementById("reset").addEventListener("click", (e) => {
    document.getElementById("result").innerText =  0;
    e.target.disabled = true;
    document.getElementById("decrement").disabled = true;
});

document.getElementById("increment").addEventListener("click", (e) => {
    const resultElem = document.getElementById("result");
    resultElem.innerText =  parseInt(resultElem.innerText) + 1;
    document.getElementById("decrement").disabled = false;
    document.getElementById("reset").disabled = false;
});

