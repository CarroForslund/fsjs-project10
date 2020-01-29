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
    res.render('all_books', {title: 'All Books'});
});
// Create New Book Form
router.get('/new', (req, res) => {
    res.render('new_book', { book: {}, title: 'New Book'});
});
// Create New Book
router.post('/', asyncHandler(async (req, res) => {
    const book = await Book.create(req.body);
    console.log(req.body);
    res.redirect('/' + book.id);
}));
//Get individual Book
router.get('/:id', asyncHandler(async (req, res) => {
    res.render('book_detail'), {book: {}, title: 'Book Title'};
}));
// List Overdue
router.get('/books?filter=overdue', (req, res) => {
    res.render('overdue_books'), {title: 'Overdue Books'};
});
// List Checked Out
router.get('/books?filter=checked_out', (req, res) => {
    res.render('checked_books', {title: 'Checked Out Books'});
});

module.exports = router;
