const connectionURI = require('../config/keys').MONGO_URI;
const mongoose = require('mongoose')


mongoose.connect(connectionURI, {useNewUrlParser: true, useUnifiedTopology: true})


