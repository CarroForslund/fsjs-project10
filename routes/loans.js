const express = require('express');
const router = express.Router();

// List All
router.get('/', (req, res) => {
    res.render('all_loans');
});
// New Loan
router.get('/loans/new', (req, res) => {
    res.render('new_loan');
});
// List Overdue
router.get('/loans?filter=overdue', (req, res) => {
    res.render('overdue_loans');
});
// List Checked Out
router.get('/loans?filter=checked_out', (req, res) => {
    res.render('checked_loans');
});

module.exports = router;
