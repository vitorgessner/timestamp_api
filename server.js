const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
})

app.get('/api/:date', (req, res) => {
    const date = req.params.date;
    let utc, unix;

    utc = new Date(date).toUTCString();
    unix = new Date(date).getTime();

    if (!isNaN(date)) {
        unix = Number(date);
        utc = new Date(Number(date));
    }
    res.json({unix, utc})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})