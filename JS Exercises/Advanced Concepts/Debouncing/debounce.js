const search = e => {
    const li = document.createElement("li");
    li.innerText = e.target.value;
    document.getElementById("searched-values").appendChild(li);
}
const debounce = (func, delay) => {
    let timeOut = null;
    return (...args) => {
        if(timeOut) clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            func(...args);
            timeOut = null;
        }, delay);
    }
}

const debouncedSearch = debounce(search, 500);

document.querySelector("#search").addEventListener("input", debouncedSearch);
