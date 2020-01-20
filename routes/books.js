const express = require('express');
const router = express.Router();

// List All
router.get('/', (req, res) => {
    res.render('all_books');
});
// New Book
router.get('/books/new', (req, res) => {
    res.render('new_book');
});
// List Overdue
router.get('/books?filter=overdue', (req, res) => {
    res.render('overdue_books');
});
// List Checked Out
router.get('/books?filter=checked_out', (req, res) => {
    res.render('checked_books');
});

module.exports = router;
