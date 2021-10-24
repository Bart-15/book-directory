const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');



// Route config
const book = require('./routes/book')


const port = process.env.PORT || 5000;

// body parser
app.use(bodyParser.urlencoded({extended: false,  limit: '50mb',
parameterLimit: 100000}));
app.use(bodyParser.json());


// Server static if in prod
if(process.env.NODE_ENV === 'production'){
    // Set static folder
     // Set static folder
     app.use(express.static('./client/build'))
     app.get('*', (req, res) => {
         res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
     })
}




app.use(book)

app.listen(port, () => {
    console.log('listening on port ' + port);
})