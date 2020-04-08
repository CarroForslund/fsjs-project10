const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

// Handler function to wrap each route
function asyncHandler(cb){
    return async(req, res, next) => {
        try{
            await cb(req, res, next)
        } catch(error) {
            res.status(500).send(error);
        }
    }
}

// List All
router.get('/', (req, res) => {
    res.render('all-books', {title: 'All Books'});
});
// Create New Book Form
router.get('/new', (req, res) => {
    res.render('new-book', { book: {}, title: 'New Book'});
});
// Create New Book
router.post('/', asyncHandler(async (req, res) => {
    const book = await Book.create(req.body);
    console.log(req.body);
    res.redirect('/' + book.id);
}));
//Get individual Book
router.get('/:id', asyncHandler(async (req, res) => {
    res.render('update-book'), {book: {}, title: 'Book Title'};
}));

module.exports = router;
