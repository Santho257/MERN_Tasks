document.getElementById("changeColor").addEventListener("click", () => {
    let color = "#";
    const hexValues = ["a", "b", "c", "d", "e", "f"];
    for(let i = 1; i <= 6; i++){
        let num = Math.floor(Math.random() * 15);
        if( num > 9)    color += hexValues[num - 10];
        else color += num;
    }
    document.body.style.backgroundColor = color;
});