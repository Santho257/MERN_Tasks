const express = require("express");
const {join} = require("path");

const app = express();

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "../public", "static", "welcome.html"), (err) => {
        res.send(err);
    })
})

module.exports = app;