let express = require("express");
let bodyParser = require("body-parser");
let path = require("path");
let cors = require('cors');

let app = express();
let PORT = 8080;
let _drugs = require("./src/app");

const Drugs = new _drugs();
const DrugNames = require("./src/drug_names")

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.options('*', cors())
app.use('/drug', express.static(path.join(__dirname, 'public')))
app.set('views', './public')
app.set('view engine', 'pug');

app.all('/', (req, res) => {
    res.render('index', { title: 'Medherence', greetings: 'Hello Collin!' })
})
app.all("/elements", (req, res) => {
    res.render('elements');
})
app.get("/drug/:id", async (req, res) => {
    let drugId = req.params.id;
    let drugInfo = await Drugs.getDrug(drugId);
    let rtf_time = new Intl.RelativeTimeFormat('en', { style: 'narrow' });
    let time = rtf_time.format(3, 'hour')
    res.render('generic', { title: drugId, drug_name: drugId, drug_info: drugInfo.data(), time: time });
});

app.get("/drugs/new", (req, res) => {
    DrugNames.forEach(d => {
        Drugs.addNewDrug(d.brandName, {
            genericName: d.genericName,
            brandName: d.brandName,
            drugClass: d.drugClass,
            numberOfPills: d.numberOfPills,
            interactions: d.interactions
        });
    })
    res.send("Updated all")
})
app.get("/drugs/all", async (req, res) => {
    await Drugs.getAllDrugs().then(data => {
        res.send(data)
    });
})

app.listen(PORT, () => {
    console.log(`Node server is running on http://localhost:${PORT}`);
});
