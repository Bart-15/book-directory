module.exports = {
    MONGO_URI:'mongodb+srv://book:bookdirectory@bookdirectory.za8s2.mongodb.net/book-directory?retryWrites=true&w=majority'
}

if(process.env.NODE_ENV === 'production') {
    module.exports = require('./keys_prod')
} else {
    module.exports = require('./keys_dev')
}