const express = require("express");
const {join} = require("path");
const WelcomeRouter = require("./routes/welcome.route");

const app = express();

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "../public", "static", "welcome.html"), (err) => {
        res.send(err);
    })
});

app.use("/welcome", WelcomeRouter)

module.exports = app;