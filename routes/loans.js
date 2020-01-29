const express = require('express');
const router = express.Router();
const Loan = require('../models').Loan;

// List All
router.get('/', (req, res) => {
    res.render('all_loans', {title: 'All Loans'});
});
// New Loan
router.get('/new', (req, res) => {
    res.render('new_loan', {title: 'New Loan'});
});
// List Overdue
router.get('/loans?filter=overdue', (req, res) => {
    res.render('overdue_loans', {title: 'Overdue Loans'});
});
// List Checked Out
router.get('/loans?filter=checked_out', (req, res) => {
    res.render('checked_loans', {title: 'Checked Out Loans'});
});

module.exports = router;
