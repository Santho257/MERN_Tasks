const requestSimulation = () => {
    const networkRequest = new Promise((resolve, reject) => {
        setTimeout(() => {
            let statusCode = 200 + Math.floor(Math.random() * 400);
            if(statusCode < 400){
                resolve(`Request worked successfully with statusCode :: ${statusCode}`);
            }
            else{
                reject(`Request failed with statusCode :: ${statusCode}`);
            }
        }, 2000);
    });
    
    const result = networkRequest.then(console.log, console.log);
}

requestSimulation();