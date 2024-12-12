const welcome = (req, res) => {
    const { name } = req.query;
    if(name)    res.send("Welcome " + name);
    res.send("Welcome Everyone");
}

const welcomeByParams = (req, res) => {
    const { viewer } = req.params;
    res.send("Welcome " + viewer);
}

module.exports = {
    welcome,
    welcomeByParams
}