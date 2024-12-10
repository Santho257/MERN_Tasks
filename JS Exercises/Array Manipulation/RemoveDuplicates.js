const removeDuplicates = arr => {
    arr.sort((a, b) => a - b);
    let i = 0, j = 1;
    while(j < arr.length){
        if(arr[i] != arr[j]){
            arr[++i] = arr[j];
        }
        j++;
    }
    return arr.slice(0, i + 1);
}

const removeDuplicatesWithOrder = arr => {
    const answer = [arr[0]], answerSet = new Set();
    answerSet.add(arr[0]);
    for(let i = 1; i < arr.length; i++){
        if(!answerSet.has(arr[i])){
            answer.push(arr[i]);
            answerSet.add(arr[i]);
        }   
    }
    return answer;
}

console.log(removeDuplicates([7, 6 , 8, 8, 1, 7, 3]));
console.log(removeDuplicatesWithOrder([7, 6 , 8, 8, 1, 7, 3]));