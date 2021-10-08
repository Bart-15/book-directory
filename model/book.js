const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const BookSchema =  new Schema({
    title : {
        type:String, 
        required: true, 
    },
    author: {
        type: String, 
        required: true, 
    },
    description : {
        type:String, 
        required: true, 
    },
    image : {
        type:Buffer, 
    },
    published : {
        type: Date,
    }
})

const Book = mongoose.model('book', BookSchema);

module.exports = Book;