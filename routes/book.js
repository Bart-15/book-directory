const express = require('express');
const Book = require('../model/book')
const router = express.Router();
require('../db/mongoose')
const validateBookInput = require('../validation/book')



// POST 
// @ '/api/book/'
// Add new Book to the collection
router.post('/api/book/', async (req, res) => {
    const {errors, isValid} = validateBookInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors)
    }
    try {
        const newBook = new Book({
            title: req.body.title,
            author:req.body.author,
            description:req.body.description,
            image:req.body.image,
            published:req.body.published,
        })

        await newBook.save()
        res.status(200).json(newBook)

    } catch (err) {
        res.status(400).json({error:"Bad Request"})
    }
})



// GET 
// @ '/api/books/'
// Get all books 
router.get('/api/books/', async (req, res) => {
    const errors = {}
    const book = await Book.find({})
    try {
        if(!book.length) {
            errors.no_book = "No Books"
            return res.status(400).send(errors)
        }

        res.status(200).json(book)

    }catch(err) {
        res.status(400).json({error:"No Book Found"})
    }
})


// GET 
// @ '/api/books/:id'
// Get single book by ID
router.get('/api/book/:id', async (req, res) =>  {
    let errors = {};
    const book = await Book.findById(req.params.id)

    try{ 
        if(!book) {
            errors.no_book = "Book not found"
            return res.status(404).json(errors)
        }

        res.status(200).json(book)
    }catch(err) {
        res.status(400).json({error:"No Book Found"})
    }

})


// DELETE 
// @ '/api/books/:id'
// Get single book by ID and Delete
router.delete('/api/book/:id', async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id)
    let errors = {};

    try {
        if(!book){
            errors.not_found = "Book not found"
            return res.status(404).send(errors)
        }

        res.json({success: true})

    } catch(err) {
       res.status.apply(400).json({error:"Book not found"}) 
    }
})

// PUT 
// @ '/api/books/:id'
// Update single book by ID
router.patch('/api/book/:id', async (req, res) => {

    // validate each field
    const {errors, isValid} = validateBookInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors)
    }

    const update = {
        title:req.body.title,
        author: req.body.author,
        description:req.body.description,
        image:req.body.image,
        published:req.body.published,
    }

    try {
        // Find book by ID
       const book = await Book.findByIdAndUpdate({_id:req.params.id}, update, {returnOriginal: false})
       if(!book) {
           return res.status(400).json({not_found:"Book not found"})
       }
       
       await book.save()
       res.status(200).json(book)
        
    } catch (err) {
        res.status(400).json({error:"Book not found"})
    }
})

module.exports = router;