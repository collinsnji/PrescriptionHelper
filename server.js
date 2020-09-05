let express = require("express");
let bodyParser = require("body-parser");
let morgan = require('morgan');
let app = express();
let PORT = 5000;
let _drugs = require("./src/app");

const Drugs = new _drugs();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(morgan('combined'));

app.all("/", (req, res) => {
});
app.get("/drug/:id", async (req, res) => {
    let drugId = req.params.id;
    let drugInfo = await Drugs.getDrug(drugId);

    console.log(drugInfo.data());
    res.send(drugInfo.data());
});

app.get("/drugs/all", async (req, res) => {
    await Drugs.getAllDrugs().then(data => {
        res.send(data);
    });
})

app.listen(PORT, () => {
    console.log(`Node server is running on http://localhost:${PORT}`);
});
