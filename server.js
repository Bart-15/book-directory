const express = require('express');
const bodyParser = require('body-parser');
const app = express();



// Route config
const book = require('./routes/book')


const port = process.env.PORT || 5000;

// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(book)

app.listen(port, () => {
    console.log('listening on port ' + port);
})