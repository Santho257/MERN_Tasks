import { app } from "./app.js";
import { port } from "./constants.js";
import { connectDB } from "./db/ConnectDB.js";

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`App listening to port :: ${port}`);
            console.log(`http://localhost:${port}`)
        })
    })
    .catch(err => {
        console.log("Error::"+err);
        process.exit(1);
    });