const factorial = n => {
    if(n == 0 || n == 1)    return 1n;
    return n * factorial(n - 1n);
}

console.log(factorial(100n));