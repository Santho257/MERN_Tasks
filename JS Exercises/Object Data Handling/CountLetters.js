const countFrequency = str => {
    const lower = str.toLowerCase();
    const answer = {};
    for(let chr of lower){
        if(chr in answer){
            answer[chr]++;
        }
        else    answer[chr] = 1;
    }
    return answer;
}

console.log(countFrequency("Santhosh"));