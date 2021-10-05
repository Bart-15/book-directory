const validator = require('validator')

const isEmpty = require('./isEmpty');


module.exports = function validateBookInput(data) {
    let errors = {}

    data.title = !isEmpty(data.title) ? data.title : ""
    data.author = !isEmpty(data.author) ? data.author : ""
    data.description = !isEmpty(data.description) ? data.description : ""

    if(validator.isEmpty(data.title)) {
        errors.title = "Title Field is required"
    }

    if(validator.isEmpty(data.author)) {
        errors.author = "Author Field is required"
    }

    if(validator.isEmpty(data.description)) {
        errors.description = "Description Field is required"
    }

    return {errors, isValid:isEmpty(errors)};
}