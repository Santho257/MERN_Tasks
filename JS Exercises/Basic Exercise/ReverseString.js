//Naive Approach
const naiveReverse = (str) => {
    let answer = "";
    for (let i = str.length - 1; i >= 0; i--) {
        answer += str[i];
    }
    return answer;
}

//JS method chaining approach
const methChainRev = str => str.split("").reverse().join("");

console.log(naiveReverse("naive rev"));
console.log(methChainRev("meth chain rev"));