const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/src/index.html');
})

app.get('/api/:date', (req, res) => {
    const date = req.params.date;
    let utc, unix;

    utc = new Date(date).toUTCString();
    unix = new Date(date).getTime();

    if (!isNaN(date)) {
        unix = Number(date);
        utc = new Date(Number(date)).toUTCString();
    }

    if (unix === null || utc === "Invalid Date") {
        return res.json({error: "Invalid Date"})
    }
    return res.json({unix, utc})
})

app.get('/api/', (req, res) => {
    utc = new Date().toUTCString();
    unix = new Date().getTime();
    return res.json({unix, utc});
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})