document.getElementById("roadmap").addEventListener("click", (e) => {
    const node = e.target;
    if(node.tagName == "LI")    alert(node.innerText);
})