const express = require('express');
const router = express.Router();

// List All
router.get('/', (req, res) => {
    res.render('all_patrons');
});
// New Patron
router.get('/patrons/new', (req, res) => {
    res.render('new_patron');
});

module.exports = router;
