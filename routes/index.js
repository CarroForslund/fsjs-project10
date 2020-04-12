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

router.get('/', (req, res) => {
    res.redirect('/books');
});

module.exports = router;