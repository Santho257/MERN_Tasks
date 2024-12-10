let counter = 0;

document.getElementById("titleForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const titleElem = document.getElementById("title");
    if (titleElem.value.trim()) {
        const listArea = document.getElementById("listArea");
        const h4 = document.createElement("h4");
        h4.innerText = titleElem.value.trim();

        const button = document.createElement("button");
        button.innerText = "+";
        button.addEventListener("click", addListItem);
        h4.append(button);

        listArea.appendChild(h4);
        const ul = document.createElement("ul");
        ul.id = "list";
        listArea.append(ul);
        e.target.style.display = "none";
    }
});

const addListItem = (e, nextTo = false) => {
    const li = document.createElement("li");
    let item;
    do{
        item = prompt("Enter List Value: ");
        if(item?.trim()) break;
    }while(true);
    li.innerText = item.trim();
    const addButton = document.createElement("button");
    addButton.innerText = "+";
    addButton.addEventListener("click", (e) => addListItem(e, li));
    li.append(addButton);

    const remButton = document.createElement("button");
    remButton.innerText = "-";
    remButton.addEventListener("click", (e) => li.remove());
    addButton.after(remButton);

    if (!nextTo) {
        document.getElementById("list").prepend(li);
    }
    else {
        nextTo.after(li);
    }
}