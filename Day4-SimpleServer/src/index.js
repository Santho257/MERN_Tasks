const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({path: "../.env"});

app.listen(process.env.PORT || 8000, (err) => {
    if(err) throw err;
    console.log("Server starting to listen",(process.env.PORT || 8000));
    console.log(`http://localhost:${process.env.PORT || 8000}`);
})