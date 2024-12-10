const recuranceFib = (n) => {
    if(n == 0 || n == 1)    return n;
    return recuranceFib(n - 1) + recuranceFib(n - 2);
}

const memoizedFib = (n, dp = {}) => {
    if(n == 0n || n == 1n)    return n;
    if(n in dp)   return dp[n];
    dp[n] = memoizedFib(n - 1n, dp) + memoizedFib(n - 2n, dp);
    return dp[n];
}

const tabulatedFib = (n) => {
    const arr = [0n, 1n];
    for(let i = 2; i <= n; i++){
        arr.push(arr[i - 1] + arr[i - 2]);
    }
    return arr[n];
}

console.log(tabulatedFib(100n));