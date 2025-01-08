import { app } from "./app.js";
import { port } from "./constants.js";
import { connectDB } from "./db/ConnectDB.js";

connectDB()
    .then(() => {
        app.listen(port || 8888, () => {
            console.log(`App listening to port :: ${port || 7502}`);
        })
    })
    .catch(err => {
        console.log("Error::"+err);
        process.exit(1);
    });

export {app as server}