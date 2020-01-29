const express = require('express');
const router = express.Router();

// List All
router.get('/', (req, res) => {
    res.render('all_patrons', {title: 'All Patrons'});
});
// New Patron
router.get('/new', (req, res) => {
    res.render('new_patron', {title: 'New Patron'});
});

module.exports = router;
