const revString = str => str.split("").reverse().join("");

const isPalindrome = str => str.toLowerCase() == revString(str.toLowerCase());

console.log(isPalindrome("Malaylam"))