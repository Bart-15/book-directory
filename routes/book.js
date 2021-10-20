const express = require('express');
const Book = require('../model/book')
const fs = require('fs');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
require('../db/mongoose')
const validateBookInput = require('../validation/book')



// multer options
const upload = multer({
    limits : {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)){
        cb(new Error('Please upload an image.'))
        }
        cb(undefined, true)
    }
})


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
    const book = await Book.find({}).select("-image")
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
        published:req.body.published,
    }

    try {
        // Find book by ID
       const book = await Book.findByIdAndUpdate({_id:req.params.id}, update, {returnOriginal: false}).select("-image")
       if(!book) {
           return res.status(400).json({not_found:"Book not found"})
       }
       
       await book.save()
       res.status(200).json(book)
        
    } catch (err) {
        res.status(400).json({error:"Book not found."})
    }
})

// Upload image
// @POST
// Upload image by ID
router.post('/api/book/upload/:id', upload.single('image'), async (req, res) => {
   if(!req.file) {
       return res.status(400).json({message:"Image Field is required"})
   }

   const book = await Book.findById(req.params.id)

   try {
       if(!book) {
           return res.status(400).json({error:"Book not found."})
       }

       const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer();
       book.image = buffer
       await book.save();
       res.status(200).json({success:true})


   }catch(err) {
       res.status(400).json({error:"Book not found"})
   } 
   


    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})



router.get('/api/book/image/:id', async (req, res, next) => {
    const book = await Book.findById(req.params.id)
    try {
        if(!book || !book.image) {
            return res.status(400).json({error:"Book not found"})
        } 

        if(!book.image) {
            return res.status(400).json({error:"Book has no image right now!"})
        }
        const base64 = new Buffer.from(book.image).toString("base64")
       
        res.json(base64)

    }catch(e) {
        res.status(404).send()
    }
})

// DELETE
// Delete book image by id
router.delete('/api/book/image/:id', async (req, res) => {
    const book = await Book.findById(req.params.id)
    
    try{
       
        if(!book.image) {
            return res.status(400).json({not_found: "You have not yet uploaded an image."})
        }

        book.image = undefined; // set the value to undefined
        
        await book.save()
        res.json({success: true})

    }catch(e) {
        res.status(400).send({error:"Book not found."})
    }
})

module.exports = router;