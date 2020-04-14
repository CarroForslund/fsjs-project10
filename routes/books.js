const express = require('express');
const router = express.Router();
const db = require('../db');
const { Book } = db.models;

// Handler function to wrap each route
function asyncHandler(cb){
    return async(req, res, next) => {
        try{
            await cb(req, res, next)
        } catch(error) {
            next(error);
        }
    }
}

// List All Books
router.get('/', asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.render('index', { books, title: 'Books' });
}));

// Create New Book Form
router.get('/new', (req, res) => {
    res.render('new-book', { book: {}, title: 'New Book' });
});

// Create New Book
router.post('/new', asyncHandler(async (req, res, next) => {
    let book;
    try {
        book = await Book.create(req.body);
        res.redirect('/books/' + book.id);
    } catch (error){
        console.log('error');
        if(error.name === 'SequelizeValidationError') {
            book = await Book.build(req.body);
            res.render('new-book', { book, errors: error.errors, title: book.title })
        } else {
            next(error);
        } 
    };
}));

//Get individual Book
router.get('/:id', asyncHandler(async (req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    if (book){
        res.render('update-book', { book, title: book.title });
    } else {
        const err = new Error(404);
        err.name = 'Book with ID ' + req.params.id + ' was not found';
        next(err);
    }
}));

//Update individual Book
router.post('/:id', asyncHandler(async (req, res, next) => {
    let book;
    try {
        book = await Book.findByPk(req.params.id);
        await book.update(req.body);
        res.redirect('/books/' + book.id);
    } catch (error){
        if(error.name === 'SequelizeValidationError') {
            book = await Book.build(req.body);
            book.id = req.params.id
            res.render('update-book', { book, errors: error.errors, title: book.title })
        } else {
            next(error);
        }
    };
}));

// Delete book
router.post('/:id/delete', asyncHandler(async (req, res) => {
    book = await Book.findByPk(req.params.id);
    await book.destroy();
    res.redirect('/');
}));


module.exports = router;