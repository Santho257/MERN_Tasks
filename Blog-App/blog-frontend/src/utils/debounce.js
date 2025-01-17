export const debounce = (func, delay) => {
    let timeOut = null;
    return (...args) => {
        if(timeOut) clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            func(...args);
            timeOut = null;
        }, delay);
    }
}