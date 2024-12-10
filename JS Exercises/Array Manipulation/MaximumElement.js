const naiveMaximum = arr => {
    let max = arr[0];
    for(let i = 1; i < arr.length; i++){
        if(arr[i] > max)    max = arr[i];
    }
    return max;
}

const mathMaximum = arr => Math.max(...arr);

console.log(naiveMaximum([2, 3, 45, 16, 25, 257, 89, 69]));
console.log(mathMaximum([2, 3, 45, 16, 25, 69]));