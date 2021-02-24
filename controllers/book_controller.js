// Require express and models
const express = require('express');
const book = require('../models/book.js');
// Create router function
const router = express.Router();
// Home route
router.get('/', (req, res) => {
    book.selectAll(function(data) {
        const hbsObject = {
            books: data
        };
        res.render('index', hbsObject);
    })
});

router.post('/api/books', (req, res) => {
    book.insertOne(['book_name', 'have_read'], [req.body.book_name, req.body.have_read], (result) => {
        res.json({ id: result.insertId })
    })
});
// Route for individual burgers by their id
router.put('/api/books/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;

    book.updateOne(
        {
            have_read: req.body.have_read
        },
        condition,
        (result) => {
            if(result.changedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    )
});

module.exports = router;