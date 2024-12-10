const sortArr = (arr, desc = false) => {
    arr.sort((a, b) => (desc) ? b - a : a - b);
    return arr;
}

console.log(sortArr([2, 3, 45, 16, 25, 257, 89, 69]));
console.log(sortArr([2, 3, 45, 16, 25, 257, 89, 69], true));