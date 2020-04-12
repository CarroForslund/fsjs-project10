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
            // res.render('error', {error: error})
            res.status(500).send(error);
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
router.post('/new', asyncHandler(async (req, res) => {
    const book = await Book.create(req.body);
    res.redirect('/books/' + book.id);
}));
//Get individual Book
router.get('/:id', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    res.render('update-book', { book, title: book.title });
}));
//Update individual Book
router.post('/:id', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    await book.update(req.body);
    res.redirect('/books/' + book.id);
}));
router.get('/:id/delete', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    await book.destroy();
    res.redirect('/');
}));


module.exports = router;